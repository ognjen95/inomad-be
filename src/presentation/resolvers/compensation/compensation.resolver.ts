import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CompensationService } from './compensation.service';
import { Compensation } from '../../entities/compensation/compensation.entity';
import { CreateCompensationInput } from '../../dto/compensation/create-compensation.input';
import { UpdateCompensationInput } from '../../dto/compensation/update-compensation.input';

@Resolver(() => Compensation)
export class CompensationResolver {
  constructor(private readonly compensationService: CompensationService) {}

  @Mutation(() => Compensation)
  createCompensation(
    @Args('createCompensationInput')
    createCompensationInput: CreateCompensationInput,
  ) {
    return this.compensationService.create(createCompensationInput);
  }

  @Query(() => [Compensation], { name: 'compensation' })
  findAll() {
    return this.compensationService.findAll();
  }

  @Query(() => Compensation, { name: 'compensation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.compensationService.findOne(id);
  }

  @Mutation(() => Compensation)
  updateCompensation(
    @Args('updateCompensationInput')
    updateCompensationInput: UpdateCompensationInput,
  ) {
    // return this.compensationService.update(updateCompensationInput);
  }

  @Mutation(() => Compensation)
  removeCompensation(@Args('id', { type: () => Int }) id: number) {
    return this.compensationService.remove(id);
  }
}
