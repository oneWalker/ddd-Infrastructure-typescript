interface LiteralObject {
  [index: string]: unknown;
}

export abstract class ValueObject<Props extends Record<any, any>> {
  props: Readonly<Props>;

  constructor(props: Props) {
    this.props = Object.freeze(props);
  }

  /**
   * Get the properties of the ValueObject.
   * Note: The properties can only be read, not modified.
   */
  getProps(): Readonly<Props> {
    return this.props;
  }

  /**
   * Abstract method for validation logic
   */
  // protected abstract validate(props: Properties): void;

  /**
   * Check equality by shallow equals of properties.
   * It can be override.
   */
  equals(obj?: ValueObject<Props>): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }
    if (obj.props === undefined) {
      return false;
    }
    const shallowObjectEqual = (
      props1: LiteralObject,
      props2: LiteralObject
    ) => {
      const keys1 = Object.keys(props2);
      const keys2 = Object.keys(props1);

      if (keys1.length !== keys2.length) {
        return false;
      }
      return keys1.every(
        (key) => props2.hasOwnProperty(key) && props2[key] === props1[key]
      );
    };
    return shallowObjectEqual(this.props, obj.props);
  }
}
