import { Test, TestingModule } from '@nestjs/testing';
import { ContractInteractionService } from './contract-interaction.service';

describe('ContractInteractionService', () => {
  let service: ContractInteractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractInteractionService],
    }).compile();

    service = module.get<ContractInteractionService>(
      ContractInteractionService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
