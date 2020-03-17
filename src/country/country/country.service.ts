import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Country } from './country.entity'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ) {}

  async paginate() {
    return
  }

  async create(data) {
    return await this.countryRepository.save(data)
  }

  async find(id: number) {
    return await this.countryRepository.findOne(
      {
        id: id
      }
    )
  }

  async findWithProvince(id: number) {
    return await this.countryRepository.findOne(
      {
        id: id
      },
      {
        relations: ['provinces']
      }
    )
  }

  async update() {
    return
  }

  async delete() {
    return
  }
}
