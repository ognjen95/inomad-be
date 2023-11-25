import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCaseCommand } from './create-case.command';
import { Inject } from '@nestjs/common';
import { Case } from '@domain/case';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

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

    this.caseRepository.create(newCase);

    return {
      isCompleted: true,
    };
  }
}

export default CreateCaseHandler;
