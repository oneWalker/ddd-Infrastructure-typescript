export interface ApplicationService<Input, Output, Context> {
  execute(ctx: Context, input: Input): Promise<Output>;
}