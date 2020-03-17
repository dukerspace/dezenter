import { Module } from '@nestjs/common';
import { InfluxService } from './influx.service'

@Module({
  providers: [InfluxService]
})
export class InfluxModule {}
