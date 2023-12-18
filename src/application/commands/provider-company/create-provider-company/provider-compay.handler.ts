import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProviderCompanyCommand } from './provider-company.command';
import { IProviderCompanyRepository } from '@application/common/interfaces/provider-company/provider-company-repository.interface';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { ProviderCompany } from '@domain/provider-company/entity/provider-company';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { UserRoles } from '@domain/user/enums';
import { UserOnboardingService } from '@application/services/onboarding/user-onboarding.service';

@CommandHandler(CreateProviderCompanyCommand)
class CreateProviderCompanyHandler
  implements ICommandHandler<CreateProviderCompanyCommand>
{
  constructor(
    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: IProviderCompanyRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    private readonly onboardingService: UserOnboardingService,
  ) {}

  async execute({ dto }: CreateProviderCompanyCommand): Promise<any> {
    const providerCompany = new ProviderCompany(
      dto.name,
      dto.email,
      dto.website,
    );

    const user = await this.userRepository.findOneByEmail(dto.email);

    if (user) {
      throw new BadRequestException('Could not create company');
    }

    const createdCompany = await this.providerRepository.create(
      providerCompany,
    );

    if (!createdCompany) {
      throw new BadRequestException('Could not create company supervisor');
    }

    await this.onboardingService.onboardProvider({
      firstName: dto.firstName,
      middleName: dto.middleName,
      lastName: dto.lastName,
      email: dto.email,
      password: dto.password,
      userRole: UserRoles.PROVIDER_SUPERVISOR,
      companyId: createdCompany.getId,
      nationality: user.getNationality,
      phone: user.getPhone,
    });

    return {
      isCompleted: true,
    };
  }
}

export default CreateProviderCompanyHandler;
