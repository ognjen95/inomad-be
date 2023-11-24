import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Case } from '../../../domain/case/case';
import { generateCaseName } from '../../../domain/case/utils/generate-case-name';
import { CreateUserInput } from '../../../domain/user/dtos/create-user.input';
import { User } from '../../../domain/user/user';
import {
  USER_REPOSITORY_TOKEN,
  CASE_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  AUTH_SERVICE_TOKEN,
  CHAT_SERVICE_TOKEN,
} from '../../common/constants/tokens';
import { IAuthService } from '../../common/interfaces/auth/auth.interface';
import { ICaseRepository } from '../../common/interfaces/case/case-request-repository.interface';
import { IChatServiceInterface } from '../../common/interfaces/chat/chat-service.interface';
import { IUserRepository } from '../../common/interfaces/user/user-repository.interface';
import { MutationReturn } from '../../common/return-dtos/mutation-return-dt0';

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

    @Inject(CHAT_SERVICE_TOKEN)
    private readonly chatService: IChatServiceInterface,
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

    const caseName = generateCaseName(
      newUser.getFirstName,
      newUser.getLastName,
    );

    const newCase = new Case(caseName, [newUser.getId], false, [], []);

    newCase.setGeneralInfo = {
      firstName: newUser.getFirstName,
      lastName: newUser.getLastName,
      middleName: newUser.getMiddleName,
      birthday: newUser.getBirthday,
      email: newUser.getEmail,
      phone: '',
      nationality: '',
      passportFileId: '',
    };

    const createdCase = await this.caseRepository.create(newCase);

    newUser.setApplicationIds = [createdCase.getId];

    const createdUser = await this.userRepository.update(newUser.getId, user);

    await this.createChatUser(
      createdUser.getId,
      createdUser.getFirstName,
      createdUser.getLastName,
    );

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

    const createdUser = await this.userRepository.create(user);

    await this.createChatUser(
      createdUser.getId,
      createdUser.getFirstName,
      createdUser.getLastName,
    );

    return {
      isCompleted: true,
    };
  }

  private async createChatUser(
    userId: string,
    firstName: string,
    lastName: string,
    imageUrl?: string,
  ) {
    const nickname = `${firstName} ${lastName}`;

    return await this.chatService.createChatUser(userId, nickname, imageUrl);
  }
}
