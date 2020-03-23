import { Injectable, HttpService } from '@nestjs/common'
import * as Influx from 'influx'
import moment from 'moment'
import { CronJob } from 'cron'
import { ProvinceService } from '../../country/province/province.service'
import { CityService } from '../../country/city/city.service'
import { PlaceService } from '../../place/place.service'
import { InfluxService } from '../../influx/influx.service'
import { Place } from '../../place/place.entity'

@Injectable()
export class Air4thaiService {
  url: string
  schema = [
    {
      measurement: 'air_quality',
      fields: {
        'PM2.5': Influx.FieldType.INTEGER,
        PM10: Influx.FieldType.INTEGER,
        O3: Influx.FieldType.INTEGER,
        CO: Influx.FieldType.FLOAT,
        NO2: Influx.FieldType.INTEGER,
        SO2: Influx.FieldType.INTEGER,
        AQI: Influx.FieldType.INTEGER,
        LEVEL: Influx.FieldType.INTEGER
      },
      tags: ['placeId', 'source']
    }
  ]
  constructor(
    private readonly httpService: HttpService,
    private readonly provinceRepo: ProvinceService,
    private readonly cityRepo: CityService,
    private readonly placeRepo: PlaceService,
    private readonly influx: InfluxService
  ) {
    this.url = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php'
    this.handleCron()
  }
  public async handleCron() {
    new CronJob(
      '*/20 * * * *',
      async () => {
        console.log('Fetch data')
        await this.run()
      },
      null,
      true,
      'Asia/Bangkok'
    )
  }
  public async run() {
    const url = this.url
    await this.httpService.get(url).subscribe(res => {
      const data = res.data.stations

      data.map(async d => {
        const nameTH = d.nameTH
        const nameEN = d.nameEN
        const areaTH = d.areaTH
        const areaEN = d.areaEN
        const splitTH: Array<string> = areaTH.split(' ')
        const splitEN: Array<string> = areaEN.split(',')
        const lat = d.lat
        const lng = d.long
        const data = d.LastUpdate
        const date = moment(`${d.LastUpdate.date} ${d.LastUpdate.time}`, 'YYYY-MM-DD HH:mm')
        let insertData = {}

        if (!isNaN(Number(data.PM25.value))) {
          insertData = Object.assign(
            {
              'PM2.5': Number(data.PM25.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.PM10.value))) {
          insertData = Object.assign(
            {
              PM10: Number(data.PM10.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.O3.value))) {
          insertData = Object.assign(
            {
              O3: Number(data.O3.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.CO.value))) {
          insertData = Object.assign(
            {
              CO: Number(data.CO.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.NO2.value))) {
          insertData = Object.assign(
            {
              NO2: Number(data.NO2.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.PM25.value))) {
          insertData = Object.assign(
            {
              'PM2.5': Number(data.SO2.value)
            },
            insertData
          )
        }

        if (!isNaN(Number(data.AQI.aqi)) && !isNaN(Number(data.AQI.Level))) {
          insertData = Object.assign(
            {
              AQI: Number(data.AQI.aqi),
              LEVEL: Number(data.AQI.Level)
            },
            insertData
          )
        }

        const place = await this.getPlace(nameTH, nameEN)

        if (
          place &&
          moment(place.last_updated).isSame(moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm'))
        ) {
          return
        } else if (
          place &&
          !moment(place.last_updated).isSame(
            moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm')
          )
        ) {
          const timeSeries = {
            measurement: 'air_quality',
            tags: {
              placeId: place.id,
              source: 'air4thai'
            },
            fields: insertData
          }
          if (Object.keys(insertData).length === 0) {
            return
          }
          this.placeRepo.update(place.id, {
            last_updated: moment(`${data.date} ${data.time}`, 'YYYY-MM-DD HH:mm')
          })
          await this.influx.create(this.schema, timeSeries)
          return
        } else {
          // create new place
          const cityReverseEN = splitEN.reverse()
          const provinceNameEN = cityReverseEN[0].trim()
          const cityNameEN = cityReverseEN[1].trim()

          const cityReverseTH = splitTH.reverse()
          const provinceNameTH = cityReverseTH[0].trim()
          const cityNameTH = cityReverseTH[1]
            .trim()
            .replace('อ.', '')
            .replace(',', '')

          const provinceId = await this.getProvince(provinceNameTH, provinceNameEN)

          if (provinceId) {
            const cityId = await this.getCity(provinceId, cityNameTH, cityNameEN)

            if (cityId) {
              const createPlace = {
                city: cityId,
                place_name_th: nameTH,
                place_name_en: nameEN,
                lat: lat,
                long: lng,
                last_updated: date
              }
              await this.createPlace(createPlace, insertData)
            }
          }
        }
      })
    })
  }

  public async getProvince(nameTH: string, nameEN: string): Promise<number | void> {
    const getProvinceTH = await this.provinceRepo.findProvinceTH(nameTH)
    if (getProvinceTH) {
      return getProvinceTH.id
    }
    const getProvinceEN = await this.provinceRepo.findProvinceEN(nameEN)
    if (getProvinceEN) {
      return getProvinceEN.id
    }
  }

  public async getCity(provinceId: number, nameTH: string, nameEN: string): Promise<number | void> {
    const getCityTH = await this.cityRepo.findCityTH(nameTH, provinceId)
    if (getCityTH) {
      return getCityTH.id
    }
    const getCityEN = await this.cityRepo.findCityEN(nameEN, provinceId)
    if (getCityEN) {
      return getCityEN.id
    }
  }

  public async getPlace(nameTH: string, nameEN: string): Promise<Place> {
    const getPlaceTH = await this.placeRepo.findPlaceTH(nameTH)
    if (getPlaceTH) {
      return getPlaceTH
    }
    const getPlaceEN = await this.placeRepo.findPlaceEN(nameEN)
    if (getPlaceEN) {
      return getPlaceEN
    }
  }

  public async createPlace(data, insertData) {
    const result = await this.placeRepo.create(data)
    const placeId = result.id
    if (placeId) {
      const timeSeries = {
        measurement: 'air_quality',
        tags: {
          placeId: placeId
        },
        fields: insertData
      }
      await this.influx.create(this.schema, timeSeries)
    }
  }
}
