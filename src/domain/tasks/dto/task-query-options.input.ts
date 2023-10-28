import { InputType, PartialType } from '@nestjs/graphql';
import { UpdateTaskInput } from './update-task.input';

@InputType()
export class TaskQueryOptionsInput extends PartialType(UpdateTaskInput) {}
