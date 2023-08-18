import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCaseCommand } from './create-case.command';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { Case } from 'src/domain/case/case';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';

@CommandHandler(CreateCaseCommand)
class CreateCaseHandler implements ICommandHandler<CreateCaseCommand> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ dto }: CreateCaseCommand) {
    const newCase = new Case(
      dto.name,
      dto.applicantsIds,
      dto.isPrivate,
      dto.providersIds,
      dto.employeesIds,
    );

    try {
      this.caseRepository.create(newCase);
      return {
        isCompleted: true,
      };
    } catch (error) {
      return {
        isCompleted: false,
        errorMsg: "Couldn't create case",
        error: error.message,
      };
    }
  }
}

export default CreateCaseHandler;
