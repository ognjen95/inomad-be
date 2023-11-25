import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { CurrentUserInfo } from './types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      _audience: process.env.COGNITO_CLIENT_ID,
      issuer: process.env.AWS_COGNITO_AUTHORITY,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: process.env.AWS_COGNITO_AUTHORITY + '/.well-known/jwks.json',
      }),
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOneByExternalId(payload.sub);

    if (!user) {
      throw new Error('User not found');
    }

    const userInfo: CurrentUserInfo = {
      firstName: user.getFirstName,
      lastName: user.getLastName,
      userId: user.getId,
      userRole: user.getUserRole,
      tenantId: user?.getProviderCompanyId,
      applicationId: user?.getApplicationIds[0],
    };

    return userInfo;
  }
}
