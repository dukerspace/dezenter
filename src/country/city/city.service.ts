import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { City } from './city.entity'

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  public async create(data): Promise<City> {
    return await this.cityRepository.save(data)
  }
  public async findCityEN(name: string, provinceId?: number) {
    return await this.cityRepository.findOne({
      where: {
        province_id: provinceId,
        city_name_en: Like(`%${name}%`)
      }
    })
  }
  public async findCityTH(name: string, provinceId?: number) {
    return await this.cityRepository.findOne({
      where: {
        province_id: provinceId,
        city_name_th: Like(`%${name}%`)
      }
    })
  }
}
