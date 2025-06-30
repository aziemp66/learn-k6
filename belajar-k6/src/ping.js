import http from 'k6/http';
import { sleep, check } from 'k6';
import { Trend } from 'k6/metrics';

export const options = {
  vus: 10000,
  duration: '1s',
};

let randomNumber = new Trend('random_number');

export default function () {
  let res = http.get('http://localhost:3000/get-random');

  const body = JSON.parse(res.body)
  randomNumber.add(body["random_number"])
  check(res, {
    "status is 200": (res) => res.status === 200,
  });
}
