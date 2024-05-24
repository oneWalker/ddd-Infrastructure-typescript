import IORedis from "ioredis";
import { SystemService } from "../foundation/SystemService";
import { logger } from "../logger";

export class Redis implements SystemService {
  name: string;
  private readonly _client: IORedis.Redis | IORedis.Cluster;
  private readonly url: string;
  private health: boolean;

  constructor(url?: string) {
    this.url = url || process.env.REDIS_URL;
    this.name = Redis.name;
    const nodes = this.getNodes();
    this._client =
      nodes.length === 1
        ? new IORedis(nodes[0].port, nodes[0].host, {
            showFriendlyErrorStack: true,
            enableReadyCheck: true,
          })
        : new IORedis.Cluster(nodes, {
            scaleReads: "slave",
            enableReadyCheck: true,
          });
    this.addEvents(this._client);
  }

  private getNodes() {
    const nodes:any[] = [];
    this.url.split(",").forEach((v) => {
      const s = v.split(":");
      nodes.push({ host: s[0], port: s[1] });
    });
    if (nodes.length <= 0) {
      nodes.push({ port: 6379, host: "127.0.0.1" });
    }
    return nodes;
  }

  private addEvents(client: IORedis.Redis | IORedis.Cluster) {
    if (client) {
      client
        .on("error", (error: Error) => {
          this.health = false;
          logger.error({
            errorService: Redis.name,
            error,
          });
        })
        .on("ready", () => {
          this.health = true;
        })
        .on("end", () => {
          this.health = false;
        })
        .on("close", () => {
          this.health = false;
        });
    }
  }

  async stop(): Promise<void> {
    await this._client?.disconnect();
  }

  get client(): IORedis.Redis | IORedis.Cluster {
    return this._client;
  }
}
