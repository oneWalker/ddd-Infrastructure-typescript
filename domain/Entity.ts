import { DomainEvent } from "./DomainEvent";
import { ValueObject } from "./ValueObject";
export abstract class Entity<Id, Properties> {
  id: Id;
  protected props: Properties;

  protected constructor(props?: Properties) {
    this.props = props || ({} as Properties);
  }

  equals(obj?: Entity<Id, Properties>): boolean {
    if (obj == null || obj === undefined) {
      return false;
    }

    const isEntity = (v: unknown): v is Entity<Id, Properties> => {
      return v instanceof Entity;
    };
    if (!isEntity(obj)) {
      return false;
    }

    return this.id === obj.id;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected toPureJSON(value: any): any {
    if (value?.toJSON) {
      return value;
    }
    if (Array.isArray(value)) {
      return value.map((item) => this.toPureJSON(item));
    } else if (value instanceof ValueObject || value instanceof Entity) {
      const pureJson: Record<string, any> = {};
      if (value instanceof Entity) {
        pureJson.id = value.id;
      } else {
        Object.keys(value.props).forEach((key) => {
          pureJson[key] = this.toPureJSON(value.props[key]);
        });
      }
      return pureJson;
    } else if (Object.prototype.toString.call(value) === "[object Object]") {
      const pureJson: Record<string, any> = {};
      Object.keys(value).forEach((key) => {
        pureJson[key] = this.toPureJSON(value[key]);
      });
      return pureJson;
    } else {
      return value;
    }
  }

  /**
   * @description filter pure json object from domain model
   */
  toJSON(): any {
    return {
      id: this.id,
      props: this.toPureJSON(this.props),
    };
  }
}
