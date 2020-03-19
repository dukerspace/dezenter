import { Module } from '@nestjs/common'
import { ConsoleModule as Console } from 'nestjs-console'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryConsoleService } from './country/country.service'
import { CountryModule } from 'src/country/country.module'
import config from '../config/ormconfig'
import { ConsoleService } from './console.service'

const connectDb:any = config

@Module({
  imports: [TypeOrmModule.forRoot(connectDb), Console, CountryModule],
  providers: [CountryConsoleService, ConsoleService],
  exports: [CountryConsoleService, ConsoleService]
})
export class ConsoleModule {}
