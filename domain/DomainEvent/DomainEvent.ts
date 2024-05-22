import { v4 as uuidv4 } from "uuid";

export interface DomainEventProperties {
  id: string;
  name: string;
  occurredOn: Date;
}

export abstract class DomainEvent {
  readonly id: string;
  readonly name: string;
  readonly occurredOn: Date;

  constructor() {
    this.id = uuidv4();
    this.name = this.constructor.name;
    this.occurredOn = new Date();
  }

  get properties(): DomainEventProperties {
    return {
      id: this.id,
      name: this.name,
      occurredOn: this.occurredOn,
    };
  }
}
