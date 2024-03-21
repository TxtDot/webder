import { ConfigService } from "./config/config.service";
import Fastify from "fastify";
import getConfig from "./config/main";
import { puppeteer } from "./puppeteer";

class App {
  config: ConfigService;
  constructor() {
    this.config = getConfig();
  }
  listen() {
    const fastify = Fastify({
      logger: true,
      trustProxy: this.config.reverse_proxy,
      connectionTimeout: this.config.timeout,
    });

    fastify.get<{ Querystring: { url: string } }>(
      "/render",
      {
        schema: {
          querystring: {
            type: "object",
            properties: {
              url: { type: "string" },
            },
            required: ["url"],
          },
        },
      },
      async (request, reply) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(request.query.url);

        try {
          await page.waitForNetworkIdle({
            timeout: this.config.wait_for_page_load_timeout,
            idleTime: 100,
          });
        } catch {
          reply.header("x-message", "Page load timeout");
        }

        const data = await page.content();

        browser.close();

        reply.type("text/html");
        return data;
      }
    );

    fastify.listen(
      { host: this.config.host, port: this.config.port },
      (err) => {
        err && console.log(err);
      }
    );
  }
}

const app = new App();
app.listen();
