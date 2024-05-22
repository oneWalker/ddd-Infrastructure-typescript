export interface SystemService {
  readonly name: string;
  start?: Function;
  stop: () => Promise<void>;
}
