import { TimeOff } from '@domain/time-off/entity/TimeOff';
import { EdgesResponse } from '../../types/query-return.type';

export interface ITimeOffRepository {
  create(dto: TimeOff): Promise<TimeOff>;
  update(dto: TimeOff): Promise<TimeOff>;
  findOneById(id: string): Promise<TimeOff>;
  findAll(queryOptions?: any): Promise<EdgesResponse<TimeOff>>;
  findByEmployeeId(employeeId: string, forYear?: number): Promise<TimeOff[]>;
}
