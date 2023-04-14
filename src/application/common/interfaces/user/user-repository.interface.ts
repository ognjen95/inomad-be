import { User } from 'src/domain/user/User';
import { EdgesResponse } from '../../types/query-return.type';
import { QueryOptions } from '../../dtos/query-options/query-options.dto';

export interface IUserRepository {
  create(dto: User): Promise<User>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<User>>;
  findOneById(id: string): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  remove(id: string): Promise<User>;
}
