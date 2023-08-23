import { User } from 'src/domain/user/user';
import { QueryOptions } from '../../../../domain/question/dtos/query-options.dto';

export interface IUserRepository {
  create(dto: User): Promise<User>;
  findAll(queryOptions?: QueryOptions): Promise<User[]>;
  findOneById(id: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  remove(id: string): Promise<User>;
}
