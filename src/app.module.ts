import { Module } from '@nestjs/common'
import { WeatherModule } from './weather/weather.module'
import { CountryModule } from './country/country.module'
import { PlaceModule } from './place/place.module'
import { ConfigModule } from './config/config.module'
import { InfluxModule } from './influx/influx.module'
import { ConsoleModule } from 'nestjs-console'
@Module({
  imports: [ConsoleModule, WeatherModule, CountryModule, PlaceModule, ConfigModule, InfluxModule]
})
export class AppModule {}
