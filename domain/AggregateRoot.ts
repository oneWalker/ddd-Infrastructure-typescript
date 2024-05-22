import { Entity } from "./Entity";
import { DomainEvent } from "./DomainEvent";

export abstract class AggregateRoot<Id, Properties> extends Entity<
  Id,
  Properties
> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected inceptDomainEventsFrom(
    aggregateRoot: AggregateRoot<Id, Properties>
  ): void {
    this._domainEvents = aggregateRoot.domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  protected addDomainEvents(domainEvents: DomainEvent[]): void {
    this._domainEvents.push(...domainEvents);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }
}
