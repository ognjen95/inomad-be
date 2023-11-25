import { User } from '@domain/user/entity/user';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';

export interface IUserRepository {
  create(dto: User): Promise<User>;
  findAll(queryOptions?: UserQueryOptionsInput): Promise<User[]>;
  findOneById(id: string): Promise<User>;
  findOneByExternalId(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  remove(id: string): Promise<User>;
}
