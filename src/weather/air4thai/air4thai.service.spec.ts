import { Test, TestingModule } from '@nestjs/testing'
import { Air4thaiService } from './air4thai.service'

describe('Air4thaiService', () => {
  let service: Air4thaiService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Air4thaiService]
    }).compile()

    service = module.get<Air4thaiService>(Air4thaiService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
