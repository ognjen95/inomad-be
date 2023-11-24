// import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
// import { Compensation } from '../../../domain/compensation/compensation.entity';
// import { CreateCompensationInput } from '../../../domain/compensation/dtos/compensation/create-compensation.input';

// @Resolver(() => Compensation)
// export class CompensationResolver {
//   @Mutation(() => Compensation)
//   createCompensation(
//     @Args('createCompensationInput')
//     // createCompensationInput: CreateCompensationInput,
//   ) {
//     // return this.compensationService.create(createCompensationInput);
//   }

//   @Query(() => [Compensation], { name: 'compensation' })
//   findAll() {
//     return this.compensationService.findAll();
//   }

//   @Query(() => Compensation, { name: 'compensation' })
//   findOne(@Args('id', { type: () => Int }) id: number) {
//     // return this.compensationService.findOne(id);
//   }

//   // @Mutation(() => Compensation)
//   // updateCompensation(
//   //   @Args('updateCompensationInput')
//   //   updateCompensationInput: UpdateCompensationInput,
//   // ) {
//   //   // return this.compensationService.update(updateCompensationInput);
//   // }

//   @Mutation(() => Compensation)
//   removeCompensation(@Args('id', { type: () => Int }) id: number) {
//     // return this.com/pensationService.remove(id);
//   }
// }
