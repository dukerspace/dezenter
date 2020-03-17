import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { Province } from './province.entity'

@Injectable()
export class ProvinceService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>
  ) {}

  public async pagination(page: number, limit: number) {
    const skip = page === 1 ? 0 : (page - 1) * limit
    return await this.provinceRepository
      .createQueryBuilder(`${this.provinceRepository}`)
      // .where({
      //   is_delete: false
      // })
      .skip(skip)
      .take(limit)
      .getMany()
  }
  public async create(data) {
    return await this.provinceRepository.save(data)
  }
  public async find(id: number) {
    return await this.provinceRepository.findOne(id)
  }
  public async update(id: number, data) {
    return await this.provinceRepository.update(id, data)
  }
  public async delete(id: number) {
    return await this.provinceRepository.delete(id)
  }
  public async findProvinceEN(name: string) {
    return await this.provinceRepository.findOne({
      province_name_en: Like(`%${name}%`)
    })
  }
  public async findProvinceTH(name: string) {
    return await this.provinceRepository.findOne({
      province_name_th: Like(`%${name}%`)
    })
  }
}
