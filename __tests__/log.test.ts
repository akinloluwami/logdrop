import request from "supertest";
import app from "@/pages/api/hello";

describe("Test", () => {
  it("test", async () => {
    const response = await request(app).get("/hello");
    expect(response.status).toBe(200);
    expect(response.text).toBe("ok");
  }, 10000);
});
