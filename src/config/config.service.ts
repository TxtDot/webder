import { config } from "dotenv";

export class ConfigService {
  public readonly host: string;
  public readonly port: number;
  public readonly timeout: number;
  public readonly wait_for_page_load_timeout: number;
  public readonly reverse_proxy: boolean;
  constructor() {
    config();

    this.host = process.env.HOST || "0.0.0.0";
    this.port = Number(process.env.PORT) || 8080;

    this.timeout = Number(process.env.TIMEOUT) || 0;
    this.wait_for_page_load_timeout =
      Number(process.env.WAIT_FOR_PAGE_LOAD_TIMEOUT) || 2000;

    this.reverse_proxy = this.parseBool(process.env.REVERSE_PROXY, false);
  }

  parseBool(value: string | undefined, def: boolean): boolean {
    if (!value) return def;
    return value === "true" || value === "1";
  }
}
