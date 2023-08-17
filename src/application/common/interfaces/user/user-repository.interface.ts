import { User } from 'src/domain/user/User';
import { QueryOptions } from '../../../../domain/question/dtos/query-options.dto';

export interface IUserRepository {
  create(dto: User);
  findAll(queryOptions?: QueryOptions): Promise<User[]>;
  findOneById(id: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  remove(id: string): Promise<User>;
}
