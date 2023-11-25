import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UserEntity } from '../user/entity/user.entity';
import { TaskPriority, TaskStatus, TaskType } from './enums';
import { AggregateRoot } from '@nestjs/cqrs';
import { User } from '../user/entity/user';

@ObjectType()
export class TaskEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field()
  protected name: string;

  @Field({ nullable: true })
  protected description?: string;

  @Field(() => Date)
  protected startDate: Date;

  @Field(() => Date)
  protected endDate: Date;

  @Field(() => TaskStatus)
  protected taskStatus: TaskStatus;

  @Field(() => TaskPriority)
  protected priority: TaskPriority;

  @Field(() => TaskType)
  protected taskType: TaskType;

  @Field()
  protected createdById: string;

  @Field()
  protected createdByName: string;

  @Field({ nullable: true })
  protected caseId?: string;

  @Field({ nullable: true })
  protected caseName?: string;

  @Field(() => [String], { nullable: true })
  protected assigneesIds?: string[];

  @Field(() => [UserEntity], { nullable: true })
  protected assignees?: User[];
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
