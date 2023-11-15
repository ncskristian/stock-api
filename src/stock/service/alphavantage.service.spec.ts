import { Test, TestingModule } from '@nestjs/testing';
import { AlphavantageService } from './alphavantage.service';

describe('AlphavantageService', () => {
  let service: AlphavantageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlphavantageService],
    }).compile();

    service = module.get<AlphavantageService>(AlphavantageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
