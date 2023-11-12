import { httpMethods } from "@/lib/methods";
import { httpStatusCodes } from "@/lib/statusCodes";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { random } from "user-agents";

function getRandomArrayElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export const generateRandomLog = () => {
  const userAgent = random().toString();
  const randomIdentifier = Math.random().toString(36).substring(7);
  const randomElapsedDuration = Math.floor(Math.random() * 100);

  const endpoint = `/api/${randomIdentifier}`;
  const url = `https://example.com/api/${randomIdentifier}`;

  const { code: statusCode } = getRandomArrayElement(httpStatusCodes);

  return {
    endpoint,
    url,
    userAgent,
    method: httpMethods[Math.floor(Math.random() * httpMethods.length)],
    ip: faker.internet.ipv4(),
    statusCode,
    responseBody: `{"data": "${randomIdentifier}"}`,
    requestHeaders: `{"Header1": "${randomIdentifier}"}`,
    responseHeaders: `{"Header2": "${randomIdentifier}"}`,
    requestBody: `{"param": "${randomIdentifier}"}`,
    requestTime: dayjs().toISOString(),
    responseTime: dayjs()
      .add(Math.random() * 100, "ms")
      .toISOString(),
    elapsedDuration: randomElapsedDuration,
  };
};
