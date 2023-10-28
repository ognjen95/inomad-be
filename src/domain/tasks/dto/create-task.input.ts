import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { TaskPriority, TaskStatus, TaskType } from '../enums';

@InputType()
export class CreateTaskInput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => TaskPriority)
  priority: TaskPriority;

  @Field(() => TaskType)
  type: TaskType;

  @Field({ nullable: true })
  caseId?: string;

  @Field(() => [String], { nullable: true })
  assigneeIds?: string[];
}

registerEnumType(TaskStatus, {
  name: 'TaskStatus',
  description: 'Status of the task',
});

registerEnumType(TaskPriority, {
  name: 'TaskPriority',
  description: 'Priority of the task',
});

registerEnumType(TaskType, {
  name: 'TaskType',
  description: 'Type of the task',
});
