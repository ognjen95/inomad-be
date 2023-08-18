import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProviderCompanyCommand } from './provider-company.command';
import { IProviderCompanyRepository } from 'src/application/common/interfaces/provider-company/provider-company-repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { ProviderCompany } from 'src/domain/provider-company/provider-company';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { User } from 'src/domain/user/user';
import { UserRoles } from 'src/domain/user/enums';

@CommandHandler(CreateProviderCompanyCommand)
class CreateProviderCompanyHandler
  implements ICommandHandler<CreateProviderCompanyCommand>
{
  constructor(
    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: IProviderCompanyRepository,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ dto }: CreateProviderCompanyCommand): Promise<any> {
    const providerCompany = new ProviderCompany(
      dto.name,
      dto.email,
      dto.website,
    );

    try {
      const user = await this.userRepository.findOneByEmail(dto.email);

      if (user) {
        throw new BadRequestException('Could not create company supervisor');
      }

      const createdCompany = await this.providerRepository
        .create(providerCompany)
        .catch(() => {
          throw new BadRequestException("Couldn't create provider company");
        });

      const providerCompanySupervisor = new User(
        dto.firstName,
        dto.middleName ?? '',
        dto.lastName,
        dto.email,
        dto.password,
        UserRoles.PROVIDER_SUPERVISOR,
      );

      providerCompanySupervisor.setProviderCompanyId = createdCompany.getId;

      await this.userRepository.create(providerCompanySupervisor).catch(() => {
        throw new BadRequestException(
          "Couldn't create provider company supervisor",
        );
      });

      return {
        isCompleted: true,
      };
    } catch (error) {
      return {
        isCompleted: false,
        error: error.message,
      };
    }
  }
}

export default CreateProviderCompanyHandler;
