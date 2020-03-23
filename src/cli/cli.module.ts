import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryModule } from 'src/country/country.module'
import config from '../config/ormconfig'
import { SeederService } from './seeder/seeder.service';

const connectDb:any = config

@Module({
  imports: [TypeOrmModule.forRoot(connectDb), ConsoleModule, CountryModule],
  providers: [SeederService],
  exports: [SeederService]
})
export class CliModule {}
