interface WadawRequest {
  id: string;
  uuid: string;
  account_id: string;
  url: string;
  raw_headers: string;
  raw_query_strings: string;
  raw_body: string;
  method: string;
  ip_address: string;
  hostname: string;
  user_agent: string;
  created_at: string;
}
