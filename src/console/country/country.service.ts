import { Injectable } from '@nestjs/common'
import { CountryService as Country } from '../../country/country/country.service'
import { ProvinceService } from '../../country/province/province.service'
import { CityService } from '../../country/city/city.service'
import addressJson from '../../utils/ThailandLocation.json'

@Injectable()
export class CountryConsoleService {
  constructor(
    private readonly countryService: Country,
    private readonly provinceService: ProvinceService,
    private readonly cityService: CityService
  ) {}
  public async insertData() {
    try {
      // await createConnection()
      //   .then(async connection => {
      //     console.log('Database connected.')
      //   })
      //   .catch(error => console.log('Database connection error: ', error))
      console.log('x')
      return
      // const countryData = {
      //   country_name_th: 'ประเทศไทย',
      //   country_name_en: 'Thailand'
      // }

      // const getCountry = await this.countryService.create(countryData)
      // for (const p in addressJson) {
      //   const provinceNameTH = addressJson[p].PROVINCE_NAME
      //   const provinceNameEN = addressJson[p].PROVINCE_NAME_ENG

      //   const provinceData = {
      //     country: getCountry.id,
      //     province_name_th: provinceNameTH,
      //     province_name_en: provinceNameEN
      //   }
      //   const getProvince = await this.provinceService.create(provinceData)
      //   for (const a in addressJson[p].amphurs) {
      //     const cityNameTH = addressJson[p].amphurs[a].AMPHUR_NAME
      //     const cityNameEN = addressJson[p].amphurs[a].AMPHUR_NAME_ENG

      //     const cityData = {
      //       province: getProvince.id,
      //       city_name_th: cityNameTH,
      //       city_name_en: cityNameEN
      //     }
      //     await this.cityService.create(cityData)
      //   }
      // }
    } catch (e) {
      console.log('error', e.message)
    }
  }
}
