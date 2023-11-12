import requestIp from "request-ip";
import axios from "axios";
import bodyParser from "body-parser";

interface Config {
  exclude?: string | string[];
}

export const record = (apiKey: string, config?: Config) => {
  return async (req: any, res: any, next: any) => {
    bodyParser.json()(req, res, () => {
      const requestStartTime = process.hrtime();
      const clientIp = requestIp.getClientIp(req);

      const shouldExclude = (endpoint: string) => {
        if (!config || !config.exclude) {
          return false;
        }
        const exclude = Array.isArray(config.exclude)
          ? config.exclude
          : [config.exclude];
        return exclude.some((pattern) => {
          const regex = new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
          return regex.test(endpoint);
        });
      };

      const recordData = {
        statusCode: 0,
        userAgent: req.headers["user-agent"],
        endpoint: req.originalUrl?.split("?")[0],
        url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
        ip: clientIp,
        requestHeaders: JSON.stringify(req.headers),
        requestBody: JSON.stringify(req.body),
        responseBody: undefined,
        requestTime: new Date().toISOString(),
        responseTime: undefined as string | undefined,
        responseHeaders: undefined as Record<string, string> | undefined,
        elapsedDuration: undefined as number | undefined,
        method: req.method,
      };

      if (!shouldExclude(recordData.endpoint)) {
        const originalSetHeader = res.setHeader;
        //@ts-ignore
        (res.setHeader as any) = function (
          this: Response,
          name: string,
          value: string | string[]
        ): void {
          if (!recordData.responseHeaders) {
            recordData.responseHeaders = {};
          }
          //@ts-ignore
          recordData.responseHeaders[name] = value;
          originalSetHeader.apply(this, arguments);
        };

        const originalEnd = res.end as (
          this: Response,
          ...args: any[]
          //@ts-ignore
        ) => Response<any, Record<string, any>>;

        const originalWrite = res.write;
        //@ts-ignore
        res.write = function (
          this: Response,
          chunk: any,
          encodingOrCallback?:
            | BufferEncoding
            | ((error: Error | null | undefined) => void),
          callback?: (error: Error | null | undefined) => void
        ): boolean {
          if (typeof encodingOrCallback === "function") {
            return originalWrite.call(this, chunk, "utf8", encodingOrCallback);
          }

          const encoding = encodingOrCallback || "utf8";

          return originalWrite.call(this, chunk, encoding, callback);
        };

        //@ts-ignore
        res.end = function (
          this: Response,
          ...args: any[]
          //@ts-ignore
        ): Response<any, Record<string, any>> {
          //@ts-ignore
          recordData.statusCode = this.statusCode;

          if (
            args &&
            args.length > 0 &&
            args[0] !== null &&
            args[0] !== undefined
          ) {
            //@ts-ignore
            recordData.responseBody = args[0].toString("utf8");
          }

          //@ts-ignore
          const responseTime = process.hrtime(requestStartTime);
          //@ts-ignore
          const responseTimeMs = responseTime[0] * 1e3 + responseTime[1] / 1e6;

          //@ts-ignore
          recordData.responseTime = new Date().toISOString();
          //@ts-ignore
          recordData.elapsedDuration = responseTimeMs;

          axios
            .post("https://logdrop.co/api/v1/log", recordData, {
              headers: {
                Authorization: `Bearer ${apiKey}`,
              },
            })
            .then(() => {})
            .catch((error) => {
              console.error(
                "LOGDROP FAILED: " +
                  (error.response?.data.message || "Something went wrong")
              );
            });

          return originalEnd.apply(this, args);
        };
      }

      next();
    });
  };
};
