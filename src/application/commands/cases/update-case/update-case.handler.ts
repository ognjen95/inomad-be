import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCaseCommand } from './update-case.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

@CommandHandler(UpdateCaseCommand)
class UpdateCaseHandler implements ICommandHandler<UpdateCaseCommand> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ dto }: UpdateCaseCommand) {
    try {
      const foundCase = await this.caseRepository.findOneById(dto.id);

      if (!foundCase) {
        return {
          isCompleted: false,
          errorMsg: 'Case not found',
        };
      }

      foundCase.update(dto);

      this.caseRepository.update(foundCase);

      return {
        isCompleted: true,
      };
    } catch (error) {
      return {
        isCompleted: false,
        errorMsg: "Couldn't Update case",
        error: error.message,
      };
    }
  }
}

export default UpdateCaseHandler;
