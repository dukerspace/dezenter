import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlaceController } from './place.controller'
import { PlaceService } from './place.service'
import { Place } from './place.entity'
import { CountryModule } from 'src/country/country.module'

@Module({
  imports: [TypeOrmModule.forFeature([Place]), CountryModule],
  controllers: [PlaceController],
  providers: [PlaceService],
  exports: [PlaceService]
})
export class PlaceModule {}
