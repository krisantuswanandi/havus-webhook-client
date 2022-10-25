<template>
  <div id="dashboard" class="min-h-screen relative flex pt-16">
    <div id="leftbar" class="w-80 bg-gray-blue-50">
      <div id="header-request-list" class="px-6 py-2">
        <p class="text-xl font-semibold text-gray-blue-900">REQUEST ({{requests.length}})</p>
      </div>

      <div
        v-for="(request, i) in requests"
        :key="i"
        :class="`px-6 py-2 hover:cursor-pointer
        ${
          selectedData.id == request.id ?
            ' bg-gray-blue-900 text-white' :
            'text-gray-blue-900 hover:bg-slate-200'
        }`"
        @click="selectData(request)"
      >
        <div>
          <Badge variant="yellow">{{ request.method }}</Badge>
          <span class="ml-3">
            #{{ request.id.slice(0,6) }} {{ request.ip_address }}
          </span>
        </div>

        <div class="mt-2">10/23/2022 10:32:37 PM</div>
      </div>
    </div>

    <div id="request-detail">
      <h1>{{ selectedData.id }}</h1>
    </div>
  </div>
</template>

<script>
import Badge from '../components/Badge.vue';

export default {
  name: 'RequestsView',
  components: {
    Badge,
  },
  data() {
    return {
      selectedData: {},
      requests: [
        {
          id: '63554ff27503050ef2198158',
          uuid: 'e52479d2-2f25-488a-9f77-fdfc06892ab1',
          account_id: 'billing-123',
          raw_headers: '{"Accept":["*/*"],"Accept-Encoding":["gzip, deflate, br"],"Cache-Control":["no-cache"],"Connection":["keep-alive"],"Content-Length":["746"],"Content-Type":["application/json"],"Cookie":["ahoy_visitor=49c32009-5909-4932-b28a-9e8b6392da04"],"Postman-Token":["b6430a58-86c5-4cf6-ae5b-051dbaa49859"],"User-Agent":["PostmanRuntime/7.29.2"]}',
          raw_query_strings: '{"name":["dragon"],"suffix":["flux"]}',
          raw_body: '"{\n    "sales_order": {\n        "memo": "",\n        "tags": [\n            "new_subscription",\n            "new"\n        ],\n        "person_name": "Budi 123zxxx",\n        "email": "buset@mail.co",\n        "address": "jaln 123",\n        "transaction_date": "08/09/2020",\n        "due_date": "11/09/2020",\n        "discount_type_name": "Percent",\n        "reference_no": "ref-no",\n        "transaction_no": "BS/asoaiiq/1231/co1",\n        "transaction_lines_attributes": [\n            {\n                "rate": "750000",\n                "discount": "0",\n                "quantity": 12,\n                "line_tax_id": null,\n                "product_name": "Talenta Standard Flat",\n                "line_tax_name": "PPN-"\n            }\n        ]\n    }\n}',
          method: 'POST',
          ip_address: '12.34.5.678',
          hostname: 'localhost:3000',
          user_agent: 'PostmanRuntime/7.29.2',
          created_at: '2022-10-23 14:30:10.286 +0000 UTC',
        },
        {
          id: '263554ff27503050ef2198158',
          uuid: 'e52479d2-2f25-488a-9f77-fdfc06892ab1',
          account_id: 'billing-123',
          raw_headers: '{"Accept":["*/*"],"Accept-Encoding":["gzip, deflate, br"],"Cache-Control":["no-cache"],"Connection":["keep-alive"],"Content-Length":["746"],"Content-Type":["application/json"],"Cookie":["ahoy_visitor=49c32009-5909-4932-b28a-9e8b6392da04"],"Postman-Token":["b6430a58-86c5-4cf6-ae5b-051dbaa49859"],"User-Agent":["PostmanRuntime/7.29.2"]}',
          raw_query_strings: '{"name":["dragon"],"suffix":["flux"]}',
          raw_body: '"{\n    "sales_order": {\n        "memo": "",\n        "tags": [\n            "new_subscription",\n            "new"\n        ],\n        "person_name": "Budi 123zxxx",\n        "email": "buset@mail.co",\n        "address": "jaln 123",\n        "transaction_date": "08/09/2020",\n        "due_date": "11/09/2020",\n        "discount_type_name": "Percent",\n        "reference_no": "ref-no",\n        "transaction_no": "BS/asoaiiq/1231/co1",\n        "transaction_lines_attributes": [\n            {\n                "rate": "750000",\n                "discount": "0",\n                "quantity": 12,\n                "line_tax_id": null,\n                "product_name": "Talenta Standard Flat",\n                "line_tax_name": "PPN-"\n            }\n        ]\n    }\n}',
          method: 'POST',
          ip_address: '::1',
          hostname: 'localhost:3000',
          user_agent: 'PostmanRuntime/7.29.2',
          created_at: '2022-10-23 14:30:10.286 +0000 UTC',
        },
        {
          id: '363554ff27503050ef2198158',
          uuid: 'e52479d2-2f25-488a-9f77-fdfc06892ab1',
          account_id: 'billing-123',
          raw_headers: '{"Accept":["*/*"],"Accept-Encoding":["gzip, deflate, br"],"Cache-Control":["no-cache"],"Connection":["keep-alive"],"Content-Length":["746"],"Content-Type":["application/json"],"Cookie":["ahoy_visitor=49c32009-5909-4932-b28a-9e8b6392da04"],"Postman-Token":["b6430a58-86c5-4cf6-ae5b-051dbaa49859"],"User-Agent":["PostmanRuntime/7.29.2"]}',
          raw_query_strings: '{"name":["dragon"],"suffix":["flux"]}',
          raw_body: '"{\n    "sales_order": {\n        "memo": "",\n        "tags": [\n            "new_subscription",\n            "new"\n        ],\n        "person_name": "Budi 123zxxx",\n        "email": "buset@mail.co",\n        "address": "jaln 123",\n        "transaction_date": "08/09/2020",\n        "due_date": "11/09/2020",\n        "discount_type_name": "Percent",\n        "reference_no": "ref-no",\n        "transaction_no": "BS/asoaiiq/1231/co1",\n        "transaction_lines_attributes": [\n            {\n                "rate": "750000",\n                "discount": "0",\n                "quantity": 12,\n                "line_tax_id": null,\n                "product_name": "Talenta Standard Flat",\n                "line_tax_name": "PPN-"\n            }\n        ]\n    }\n}',
          method: 'POST',
          ip_address: '::1',
          hostname: 'localhost:3000',
          user_agent: 'PostmanRuntime/7.29.2',
          created_at: '2022-10-23 14:30:10.286 +0000 UTC',
        },
      ],
    };
  },
  methods: {
    selectData(newVal) {
      this.selectedData = newVal;
    },
  },
};
</script>
