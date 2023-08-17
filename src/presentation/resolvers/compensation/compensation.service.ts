import { Injectable } from '@nestjs/common';
import { CreateCompensationInput } from '../../dto/compensation/create-compensation.input';
import { UpdateCompensationInput } from '../../dto/compensation/update-compensation.input';

@Injectable()
export class CompensationService {
  create(createCompensationInput: CreateCompensationInput) {
    return 'This action adds a new compensation';
  }

  findAll() {
    return `This action returns all compensation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compensation`;
  }

  update(id: number, updateCompensationInput: UpdateCompensationInput) {
    return `This action updates a #${id} compensation`;
  }

  remove(id: number) {
    return `This action removes a #${id} compensation`;
  }
}
