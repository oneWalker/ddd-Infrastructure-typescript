// it can be used for the project with errorCode
export class HyperError extends Error {
  private readonly props: {
    serviceName: string;
    code: number;
    description?: string;
    extraInfo?: Record<string, any>;
  };

  constructor(
    serviceName: string,
    code: number,
    message?: string,
    description?: string,
    extraInfo?: Record<string, any>
  ) {
    super(message);
    this.props = {
      serviceName,
      code: typeof code !== "number" ? 1 : code,
      description,
      extraInfo,
    };
  }

  get code(): number {
    return this.props.code;
  }

  get serviceName(): string {
    return this.props.serviceName;
  }

  get description(): string {
    return this.props.description;
  }

  get extraInfo(): Record<string, any> {
    return this.props.extraInfo;
  }

  toJSON() {
    return {
      ...this.props,
      message: this.message,
    };
  }
}
