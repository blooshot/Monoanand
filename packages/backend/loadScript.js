import http from "k6/http";
import { check, sleep } from "k6";

//https://grafana.com/docs/k6/latest/using-k6/k6-options/how-to/

export const options = {
  vus: 500,
  //   duration: "60s",
  batch: 15,
  thresholds: { http_req_duration: ["avg<100", "p(95)<200"] },
  stages: [
    { duration: "30s", target: 20 },
    { duration: "1m30s", target: 10 },
    { duration: "20s", target: 0 },
  ],
};
const url = "http://localhost:3000/api/student";

export default function () {
  const data = {
    name: "alooVerma",
    email: "aloo@gmail.com",
    contact: "7836860680",
    class: 1,
    father_name: "PratapSingh",
    gender: "female",
    profile_img: "aloo.jpg",
  };

  let res = http.post(url, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  console.log(res.json());
  //   sleep(1);
}
