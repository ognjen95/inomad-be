import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EXAMPLECommand } from './EXAMPLE.command';

@CommandHandler(EXAMPLECommand)
class EXAMPLEHandler implements ICommandHandler<EXAMPLECommand> {
  // constructor(private readonly userRepository: IUserRepository) {}

  async execute({}: EXAMPLECommand): Promise<any> {
    // console.log('EXAMPLECommand');
  }
}

export default EXAMPLEHandler;
