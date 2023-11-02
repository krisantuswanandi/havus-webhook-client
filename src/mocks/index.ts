import { setupWorker } from "msw/browser";
import { http, HttpResponse, delay } from "msw";
import { faker } from "@faker-js/faker";

faker.seed(12345);

export const handlers = [
  http.get(
    "https://api.wadaw.my.id/api/v1/admin/:accountId/requests",
    async ({ params }) => {
      await delay();
      return HttpResponse.json({
        data: new Array(10).fill(0).map(() => ({
          id: faker.string
            .hexadecimal({ length: 24, casing: "lower" })
            .slice(2),
          uuid: faker.string.uuid(),
          raw_headers:
            '{"Accept":["*/*"],"Accept-Encoding":["gzip;q=1.0,deflate;q=0.6,identity;q=0.3"],"Authorization":["Bearer this-dummy-verif-token"],"Connection":["close"],"Content-Length":["1265"],"Content-Type":["application/json"],"User-Agent":["Faraday v0.15.4"],"X-Datadog-Parent-Id":["2334877440119874"],"X-Datadog-Sampling-Priority":["2"],"X-Datadog-Tags":["_dd.p.dm=-3"],"X-Datadog-Trace-Id":["1633180387074788681"],"X-Forwarded-For":["149.129.225.170"]}',
          raw_query_strings: '{"search":"keyword"}',
          raw_body:
            '{"event_uuid":"9a8b3ee6-3bd8-45b6-9cad-7ddb41245dda","resource_name":"client_invoice","resource_event":"create","id":157363,"tag":"new","type":"upgrade","gross_amount":"100000.0","net_amount":111000.0,"status":{"id":0,"status":"not_enabled"},"order_id":3525696,"order_source":"delivery","active_from":"2023-09-01","end_at":"2023-09-06","period":"0.2","period_type":"month","remarks":"","notes":"","serial_number":"SC/2023/09/01","external_id":null,"created_by":"manual","paid_date":null,"created_at":"2023-09-01T03:16:20+00:00","updated_at":"2023-09-01T03:16:20+00:00","company_record":{"email":"hr@company.com","name":"John Doe","number":"3871293123"},"packages":[{"id":169587,"package":{"id":109,"client_id":null},"name":"Additional Request","code":"","type":{"id":2,"name":"Additional"},"quantity":1,"details":[{"category":"request","name":"Request","quantity":1,"component_code":null}],"subscription":{"id":83883,"app":{"id":9,"name":"Webhook"},"company_sso_id":null,"company_id":935364,"status":{"id":0,"name":"active"}}}],"invoices":[]}',
          account_id: params.accountId,
          url: `/api/v1/${params.accountId}/receive`,
          ip_address: faker.internet.ipv4(),
          method: "POST",
          hostname: "api.wadaw.my.id",
          user_agent: "Faraday v0.15.4",
          created_at: faker.date.past().toISOString(),
        })),
      });
    },
  ),
];

export const worker = setupWorker(...handlers);
