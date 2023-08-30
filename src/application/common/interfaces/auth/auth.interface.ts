export interface IAuthService {
  registerUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<unknown>;
  authenticateUser(
    email: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
