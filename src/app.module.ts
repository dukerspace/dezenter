import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from './weather/weather.module';
import { CountryModule } from './country/country.module';
import { PlaceModule } from './place/place.module';
import { ConfigModule } from './config/config.module';
import { InfluxModule } from './influx/influx.module';

@Module({
  imports: [WeatherModule, CountryModule, PlaceModule, ConfigModule, InfluxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
