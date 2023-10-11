"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.record = void 0;
const request_ip_1 = __importDefault(require("request-ip"));
const axios_1 = __importDefault(require("axios"));
const body_parser_1 = __importDefault(require("body-parser"));
const record = (apiKey, config) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        body_parser_1.default.json()(req, res, () => {
            var _a;
            const requestStartTime = process.hrtime();
            const clientIp = request_ip_1.default.getClientIp(req);
            const shouldExclude = (endpoint) => {
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
                endpoint: (_a = req.originalUrl) === null || _a === void 0 ? void 0 : _a.split("?")[0],
                url: `${req.protocol}://${req.headers.host}${req.originalUrl}`,
                ip: clientIp,
                requestHeaders: JSON.stringify(req.headers),
                requestBody: JSON.stringify(req.body),
                responseBody: undefined,
                requestTime: new Date().toISOString(),
                responseTime: undefined,
                responseHeaders: undefined,
                elapsedDuration: undefined,
                method: req.method,
            };
            if (!shouldExclude(recordData.endpoint)) {
                const originalSetHeader = res.setHeader;
                //@ts-ignore
                res.setHeader = function (name, value) {
                    if (!recordData.responseHeaders) {
                        recordData.responseHeaders = {};
                    }
                    //@ts-ignore
                    recordData.responseHeaders[name] = value;
                    originalSetHeader.apply(this, arguments);
                };
                const originalEnd = res.end;
                const originalWrite = res.write;
                //@ts-ignore
                res.write = function (chunk, encodingOrCallback, callback) {
                    if (typeof encodingOrCallback === "function") {
                        return originalWrite.call(this, chunk, "utf8", encodingOrCallback);
                    }
                    const encoding = encodingOrCallback || "utf8";
                    return originalWrite.call(this, chunk, encoding, callback);
                };
                //@ts-ignore
                res.end = function (...args
                //@ts-ignore
                ) {
                    //@ts-ignore
                    recordData.statusCode = this.statusCode;
                    if (args &&
                        args.length > 0 &&
                        args[0] !== null &&
                        args[0] !== undefined) {
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
                    axios_1.default
                        .post("https://logdrop.co/api/v1/log", recordData, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`,
                        },
                    })
                        .then(() => { })
                        .catch((error) => {
                        var _a;
                        console.error("LOGDROP FAILED: " +
                            (((_a = error.response) === null || _a === void 0 ? void 0 : _a.data.message) || "Something went wrong"));
                    });
                    return originalEnd.apply(this, args);
                };
            }
            next();
        });
    });
};
exports.record = record;
