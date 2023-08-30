import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { IAuthService } from 'src/application/common/interfaces/auth/auth.interface';

@Injectable()
export class AuthService implements IAuthService {
  private userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
  }

  async registerUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    return new Promise((resolve, reject) => {
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'given_name',
            Value: firstName,
          }),
          new CognitoUserAttribute({
            Name: 'family_name',
            Value: lastName,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            console.log({
              result,
              atr: result.user.getUserAttributes((err, data) =>
                console.log({ err, data }),
              ),
              client: result.user.getUserData((err, data) =>
                console.log({ err, data }),
              ),
            });
            resolve(result.userSub);
          }
        },
      );
    });
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    console.log({ email, password });
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (error) => {
          if (error.code === 'UserNotConfirmedException') {
            throw new UnauthorizedException('Please verify your email address');
          } else {
            throw new UnauthorizedException('Invalid credentials');
          }
        },
      });
    });
  }
}
