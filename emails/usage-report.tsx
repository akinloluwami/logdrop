import { Html } from "@react-email/html";
import { Tailwind } from "@react-email/tailwind";

export default function UsageReport() {
  const usage = {
    totalLogs: 137,
    averageResponseTime: "50ms",
    topEndpointLogs: [
      { endpoint: "/api/07yf1q", logs: 22 },
      { endpoint: "/api/0oievf", logs: 16 },
      { endpoint: "/api/0xgmng", logs: 20 },
      { endpoint: "/api/0yyeg", logs: 20 },
      { endpoint: "/api/134smr", logs: 14 },
      { endpoint: "/api/1n8nf", logs: 32 },
      { endpoint: "/api/1oaagj", logs: 24 },
      { endpoint: "/api/1v4r7i", logs: 34 },
      { endpoint: "/api/2kqc1i", logs: 62 },
      { endpoint: "/api/01v9g", logs: 30 },
    ],
    requestsByMethod: [
      { method: "OPTIONS", count: 22 },
      { method: "PUT", count: 18 },
      { method: "POST", count: 18 },
      { method: "CONNECT", count: 17 },
      { method: "PATCH", count: 17 },
      { method: "DELETE", count: 14 },
      { method: "GET", count: 11 },
      { method: "TRACE", count: 10 },
      { method: "HEAD", count: 10 },
    ],
  };

  return (
    <Tailwind>
      <Html className="text-gray-100">
        <p>LogDrop</p>
        <h2 className="text-xl font-semibold mt-3">api.uploadfly.cloud</h2>
        <p>Weekly Report (20th November 20203)</p>

        <hr className="my-5" />

        <div className="my-6">
          <p className="">Total logs</p>
          <h2 className="text-2xl font-semibold mt-1">{usage.totalLogs}</h2>
        </div>
        <div className="my-6">
          <p>Average response time</p>
          <h2 className="text-2xl font-semibold mt-1">
            {usage.averageResponseTime}
          </h2>
        </div>
        <div className="my-6">
          <p className="text-lg uppercase font-semibold mt-1">Endpoints</p>
          <div className="w-full">
            {usage.topEndpointLogs.map((log, index) => (
              <div key={index} className="flex justify-between my-3">
                <p>{log.endpoint}</p>
                <p>{log.logs}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="my-6">
          <p className="text-lg uppercase font-semibold mt-1">Methods</p>
          <div className="w-full">
            {usage.requestsByMethod.map((method, index) => (
              <div key={index} className="flex justify-between my-3">
                <p>{method.method}</p>
                <p>{method.count}</p>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </Tailwind>
  );
}
