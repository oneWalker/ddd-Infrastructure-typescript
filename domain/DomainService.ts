export interface DomainService<Input, Output, Context> {
  execute(ctx: Context, input: Input): Promise<Output>;
}