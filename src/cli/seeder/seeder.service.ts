import { Injectable } from '@nestjs/common';
import { Console, Command } from 'nestjs-console'
import { CountryService } from 'src/country/country/country.service'
import { ProvinceService } from 'src/country/province/province.service'
import { CityService } from 'src/country/city/city.service'
import addressJson from '../../utils/ThailandLocation.json'

@Injectable()
@Console({
  name: 'seeder',
  description: 'Seeder database'
})
export class SeederService {
  constructor(
    private readonly countryService: CountryService,
    private readonly provinceService: ProvinceService,
    private readonly cityService: CityService
  ){}

  @Command({
    command: 'country',
    description: 'Create database country, province, city'
  })
  public async insertCountry() {
    try {
      console.log('start seed country')
      const countryData = {
        country_name_th: 'ประเทศไทย',
        country_name_en: 'Thailand'
      }

      const getCountry = await this.countryService.create(countryData)
      for (const p in addressJson) {
        const provinceNameTH = addressJson[p].PROVINCE_NAME
        const provinceNameEN = addressJson[p].PROVINCE_NAME_ENG

        const provinceData = {
          country: getCountry.id,
          province_name_th: provinceNameTH,
          province_name_en: provinceNameEN
        }
        const getProvince = await this.provinceService.create(provinceData)
        for (const a in addressJson[p].amphurs) {
          const cityNameTH = addressJson[p].amphurs[a].AMPHUR_NAME
          const cityNameEN = addressJson[p].amphurs[a].AMPHUR_NAME_ENG

          const cityData = {
            province: getProvince.id,
            city_name_th: cityNameTH,
            city_name_en: cityNameEN
          }
          await this.cityService.create(cityData)
        }
      }
      console.log('success seed country')
    } catch (e) {
      console.log('error', e.message)
    }
  }
}
