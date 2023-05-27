import { TimeOff } from 'src/domain/time-off/TimeOff';
import { QueryOptions } from '../../../../domain/question/dtos/query-options.dto';
import { EdgesResponse } from '../../types/query-return.type';

export interface ITimeOffRepository {
  create(dto: TimeOff): Promise<TimeOff>;
  update(dto: TimeOff): Promise<TimeOff>;
  findOneById(id: string): Promise<TimeOff>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<TimeOff>>;
  findByEmployeeId(employeeId: string, forYear?: number): Promise<TimeOff[]>;
}
