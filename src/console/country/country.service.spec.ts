import { Test, TestingModule } from '@nestjs/testing';
import { CountryConsoleService } from './country.service';

describe('CountryService', () => {
  let service: CountryConsoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryConsoleService],
    }).compile();

    service = module.get<CountryConsoleService>(CountryConsoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
