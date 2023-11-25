import { Module } from '@nestjs/common';
import { TasksResolver } from '../../resolvers/tasks/tasks.resolver';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { TaskRepository } from '@infrastructure/repositories/task/task.repository';
import {
  CASE_REPOSITORY_TOKEN,
  TASK_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import CreateTaskHandler from '@application/commands/tasks/create-task/create-task.handler';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { CaseRepository } from '@infrastructure/repositories/case/case.repository';
import FindAllTasksHandler from '@application/queries/tasks/get-all-tasks/get-all-tasks.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    TasksResolver,
    PrismaModule,
    {
      provide: TASK_REPOSITORY_TOKEN,
      useClass: TaskRepository,
    },
    {
      provide: CASE_REPOSITORY_TOKEN,
      useClass: CaseRepository,
    },
    CreateTaskHandler,
    FindAllTasksHandler,
  ],
})
export class TasksModule {}
