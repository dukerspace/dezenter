import { Module } from '@nestjs/common';
import { Air4thaiService } from './air4thai/air4thai.service';

@Module({
  providers: [Air4thaiService]
})
export class WeatherModule {}
