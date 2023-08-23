import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user';
import {
  CASE_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { generateCaseName } from 'src/domain/case/utils/generate-case-name';
import { Case } from 'src/domain/case/case';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';

@Injectable()
export class UserOnboardingService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: ICaseRepository,
  ) {}

  async onboardCustomer(user: User): Promise<MutationReturn> {
    const newUser = await this.userRepository.create(user);

    const caseName = generateCaseName(newUser.getLastName);

    const newCase = new Case(caseName, [newUser.getId], false, [], []);

    const createdCase = await this.caseRepository.create(newCase);

    newUser.setApplicationIds = [createdCase.getId];

    await this.userRepository.update(newUser.getId, user);

    return {
      isCompleted: true,
    };
  }

  async onboardProvider(user: User): Promise<MutationReturn> {
    if (!user.getProviderCompanyId) {
      throw new BadRequestException('Provider company is required');
    }

    const providerCompany = await this.providerRepository.findOneById(
      user.getProviderCompanyId,
    );

    if (!providerCompany) {
      throw new BadRequestException('Provider company not found');
    }

    await this.userRepository.create(user);

    return {
      isCompleted: true,
    };
  }
}
