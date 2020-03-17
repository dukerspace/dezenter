import { Test, TestingModule } from '@nestjs/testing'
import { ProvinceController } from './province.controller'

describe('Province Controller', () => {
  let controller: ProvinceController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvinceController]
    }).compile()

    controller = module.get<ProvinceController>(ProvinceController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
