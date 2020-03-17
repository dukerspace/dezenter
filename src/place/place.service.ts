import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Place } from './place.entity'

@Injectable()
export class PlaceService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>
  ) {}

  public async create(data): Promise<Place> {
    return await this.placeRepo.save(data)
  }

  public async update(id, data) {
    return await this.placeRepo.update(id, data)
  }

  public async findPlaceEN(name: string) {
    return await this.placeRepo.findOne({
      where: {
        place_name_en: name
      }
    })
  }

  public async findPlaceTH(name: string) {
    return await this.placeRepo.findOne({
      where: {
        place_name_th: name
      }
    })
  }
}
