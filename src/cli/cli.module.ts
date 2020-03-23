import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryConsoleService } from './country/country.service'
import { CountryModule } from 'src/country/country.module'
import config from '../config/ormconfig'
import { CliService } from './cli.service'

const connectDb:any = config

@Module({
  imports: [TypeOrmModule.forRoot(connectDb), ConsoleModule, CountryModule],
  providers: [CountryConsoleService, CliService],
  exports: [CountryConsoleService, CliService]
})
export class CliModule {}
