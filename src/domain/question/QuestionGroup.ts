import { AggregateRoot } from '@nestjs/cqrs';

export class QuestionGroup extends AggregateRoot {
  private id: string;

  constructor(private name: string) {
    super();
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }
}
