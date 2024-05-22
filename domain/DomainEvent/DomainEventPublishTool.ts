import { DomainEvent } from "./DomainEvent";
import { AggregateRoot } from "../AggregateRoot";
import { RequestContext } from "../../infrastructure/foundation/RequestContext";

type DomainEventHandler<T> = (ctx: RequestContext, event: T) => void;

export abstract class DomainEventPublishTool {
  private handlersMap: {
    [index: string]: Array<DomainEventHandler<DomainEvent>>;
  };

  protected constructor() {
    this.handlersMap = {};
  }

  register<T extends DomainEvent>(
    eventName: string,
    eventHandler: DomainEventHandler<T>
  ): void {
    if (!this.handlersMap.hasOwnProperty(eventName)) {
      this.handlersMap[eventName] = [
        eventHandler as DomainEventHandler<DomainEvent>,
      ];
    } else {
      this.handlersMap[eventName].push(
        eventHandler as DomainEventHandler<DomainEvent>
      );
    }
  }

  clearHandlers(eventName: string): void {
    this.handlersMap[eventName] = [];
  }

  publish(ctx: RequestContext, event: DomainEvent): void {
    const eventName = event.name;
    if (this.handlersMap.hasOwnProperty(eventName)) {
      const handlers: Array<DomainEventHandler<DomainEvent>> =
        this.handlersMap[eventName];
      for (const handle of handlers) {
        handle(ctx, event);
      }
    }
  }

  publishAll(ctx: RequestContext, events: DomainEvent[]): void {
    for (const event of events) {
      this.publish(ctx, event);
    }
  }

  publishAllInAggregate(
    ctx: RequestContext,
    aggregateRoot: AggregateRoot<unknown, unknown>
  ): void {
    this.publishAll(ctx, aggregateRoot.domainEvents);
    aggregateRoot.clearEvents();
  }
}
