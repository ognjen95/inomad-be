import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EXAMPLEQuery } from './EXAMPLE.query';

@QueryHandler(EXAMPLEQuery)
class EXAMPLEHandler implements IQueryHandler<EXAMPLEQuery> {
  // constructor(private readonly userRepository: IUserRepository) {}

  async execute({}: EXAMPLEQuery): Promise<any> {
    // console.log('EXAMPLECommand');
  }
}

export default EXAMPLEHandler;
