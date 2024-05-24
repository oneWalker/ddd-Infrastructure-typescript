// use jeager to trace the service
import jaeger from "jaeger-client";

const SERVICE_NAME = process.env.SERVICE_NAME;
const JAEGER_ENDPOINT = process.env.JAEGER_ENDPOINT;
const LOGGING_LEVEL = process.env.LOGGING_LEVEL;

export let tracer: jaeger.JaegerTracer;

try {
  if (JAEGER_ENDPOINT) {
    tracer = jaeger.initTracer(
      {
        serviceName: SERVICE_NAME,
        sampler: {
          type: "const",
          param: 1,
        },
        reporter: {
          collectorEndpoint: JAEGER_ENDPOINT,
          logSpans: true,
        },
      },
      {
        tags: {},
        logger: {
          info(msg) {
            if (LOGGING_LEVEL === "debug") {
              console.log("INFO ", msg);
            }
          },
          error(msg) {
            if (LOGGING_LEVEL === "debug") {
              console.log("ERROR", msg);
            }
          },
        },
      }
    );
  }
} catch (err) {
  console.log(err.stack);
}
