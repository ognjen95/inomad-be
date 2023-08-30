import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from 'src/domain/user/user';
import {
  AUTH_SERVICE_TOKEN,
  CASE_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { generateCaseName } from 'src/domain/case/utils/generate-case-name';
import { Case } from 'src/domain/case/case';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { IAuthService } from 'src/application/common/interfaces/auth/auth.interface';
import { CreateUserInput } from 'src/domain/user/dtos/create-user.input';

@Injectable()
export class UserOnboardingService {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: ICaseRepository,

    @Inject(AUTH_SERVICE_TOKEN)
    private readonly authService: IAuthService,
  ) {}

  async onboardCustomer(dto: CreateUserInput): Promise<MutationReturn> {
    const user = new User(
      dto.firstName,
      dto.middleName,
      dto.lastName,
      dto.email,
      dto.password,
      dto.userRole,
    );

    const userExists = await this.userRepository.findOneByEmail(user.getEmail);

    if (userExists) {
      throw new BadRequestException('You can not create user');
    }

    const externalUserId = await this.authService.registerUser(
      user.getEmail,
      user.getPassword,
      user.getFirstName,
      user.getLastName,
    );

    user.setExternalId = externalUserId as string;

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

  async onboardProvider(dto: CreateUserInput): Promise<MutationReturn> {
    const user = new User(
      dto.firstName,
      dto.middleName,
      dto.lastName,
      dto.email,
      dto.password,
      dto.userRole,
    );

    user.setProviderCompanyId = dto.companyId;

    const userExists = await this.userRepository.findOneByEmail(user.getEmail);

    if (userExists) {
      throw new BadRequestException('You can not create user');
    }

    if (!user.getProviderCompanyId) {
      throw new BadRequestException('Provider company is required');
    }

    const providerCompany = await this.providerRepository.findOneById(
      user.getProviderCompanyId,
    );

    if (!providerCompany) {
      throw new BadRequestException('Provider company not found');
    }

    const externalUserId = await this.authService.registerUser(
      user.getEmail,
      user.getPassword,
      user.getFirstName,
      user.getLastName,
    );

    user.setExternalId = externalUserId as string;

    await this.userRepository.create(user);

    return {
      isCompleted: true,
    };
  }
}
