import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateFamilyInfoCommand } from './update-family-info.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

@CommandHandler(UpdateFamilyInfoCommand)
class UpdateFamilyInfoHandler
  implements ICommandHandler<UpdateFamilyInfoCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ dto }: UpdateFamilyInfoCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) throw new Error('Case not found');

    foundCase.updateFamilyInfo(dto);

    await this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateFamilyInfoHandler;
