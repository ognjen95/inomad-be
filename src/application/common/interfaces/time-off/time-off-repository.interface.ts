import { TimeOff } from 'src/domain/time-off/TimeOff';
import { QueryOptions } from '../../dtos/query-options/query-options.dto';
import { EdgesResponse } from '../../types/query-return.type';

export interface ITimeOffRepository {
  create(dto: TimeOff): Promise<TimeOff>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<TimeOff>>;
  findByEmployeeId(employeeId: string, forYear?: number): Promise<TimeOff[]>;
  // update(id: string, test: Partial<Test>): Promise<Test>;
  //   remove(id: string): Promise<Question>;
}
