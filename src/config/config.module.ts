import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from './ormconfig'

const connectDb: any = config
@Module({
  imports: [
    TypeOrmModule.forRoot(connectDb)
  ]
})
export class ConfigModule {}
