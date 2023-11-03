import hello from "@/pages/api/hello";
import { createMocks } from "node-mocks-http";

describe("API Endpoint Tests", () => {
  it("should return hello world message", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    hello(req, res);

    const data = JSON.parse(res._getData());

    expect(res.statusCode).toBe(200);
    expect(data.message).toBe("Hello World!");
  });
});
