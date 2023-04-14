import { Module } from '@nestjs/common';
import { TestsService } from '../../../tests.service';
import { TestsResolver } from '../../resolvers/tests/tests.resolver';

@Module({
  providers: [TestsResolver, TestsService],
})
export class TestsModule {}
