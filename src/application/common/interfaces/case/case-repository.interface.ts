import { Case } from 'src/domain/case/Case';
import { UserQueryOptions } from 'src/domain/user/dtos/user-query-options';

export interface ICaseRepository {
  create(dto: Case): void;
  update(dto: Case): void;
  findOneById(id: string): Promise<Case>;
  findAll(options: UserQueryOptions): Promise<Array<Case>>;
}
