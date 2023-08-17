import { Module } from '@nestjs/common';
import { CompensationService } from '../../resolvers/compensation/compensation.service';
import { CompensationResolver } from '../../resolvers/compensation/compensation.resolver';

@Module({
  providers: [CompensationResolver, CompensationService],
})
export class CompensationModule {}
