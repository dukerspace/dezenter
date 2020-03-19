import { Module, HttpModule } from '@nestjs/common'
import { Air4thaiService } from './air4thai/air4thai.service'
import { ProvinceService } from '../country/province/province.service'
import { CityService } from '../country/city/city.service'
import { PlaceService } from '../place/place.service'
import { InfluxService } from '../influx/influx.service'
import { CountryModule } from 'src/country/country.module'
import { InfluxModule } from 'src/influx/influx.module'
import { PlaceModule } from 'src/place/place.module'
@Module({
  imports: [HttpModule, CountryModule, InfluxModule, PlaceModule],
  providers: [Air4thaiService]
})
export class WeatherModule {}
