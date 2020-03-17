import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryController } from './country/country.controller'
import { CountryService } from './country/country.service'
import { Country } from './country/country.entity'
import { Province } from './province/province.entity'
import { City } from './city/city.entity'
import { ProvinceController } from './province/province.controller'
import { ProvinceService } from './province/province.service'
import { CityService } from './city/city.service'
import { CityController } from './city/city.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Country, Province, City])],
  controllers: [CountryController, ProvinceController, CityController],
  providers: [CountryService, ProvinceService, CityService],
  exports: [CountryService, ProvinceService, CityService]
})
export class CountryModule {}
