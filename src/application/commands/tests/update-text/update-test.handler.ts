import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTestCommand } from './update-test.command';
import { ITestRepository } from '@application/common/interfaces/test/test-repository.interface';
import { Inject } from '@nestjs/common';
import { TEST_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

@CommandHandler(UpdateTestCommand)
class UpdateTestHandler implements ICommandHandler<UpdateTestCommand> {
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
  ) {}

  async execute({ dto }: UpdateTestCommand): Promise<any> {
    const test = await this.testRepository.findOneById(dto.id);
    test.update(dto);

    return await this.testRepository.upsert(test);
  }
}

export default UpdateTestHandler;
