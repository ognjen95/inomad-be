import { Module } from '@nestjs/common';
import { AuthResolver } from '../../resolvers/auth/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from '@application/services/auth/auth-service';
import AuthenticateUserHandler from '@application/commands/auth/authenticate-user/authenticate-user.handler';
import {
  AUTH_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtStrategy } from '@presentation/resolvers/auth/jwt.strategy';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';

@Module({
  imports: [CqrsModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [
    AuthResolver,
    AuthenticateUserHandler,
    JwtStrategy,
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
