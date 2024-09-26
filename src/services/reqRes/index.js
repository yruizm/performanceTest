import http from 'k6/http';
import { describe } from 'https://jslib.k6.io/functional/0.0.3/index.js';
import { check, group, sleep } from 'k6'
import { smokeTestStages, loadTestStages, stressTestStages } from '../stage.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { dataUserUpdate } from './dataUserUpdate.js';


const TARGET_URL = __ENV.TEST_TARGET || 'https://reqres.in'
const SLEEP = __ENV.SLEEP || 0.5

export const headers = {
    'Content-Type': 'application/json',
};

const dataUserCreate = JSON.stringify({
    name: "Yefri",
    job: "Qa Automation"
  });


export const options = {
    stages: loadTestStages,
  };

  
export default function testSuite() {
 
    describe('01. Test GET User 2 with validatión status code and data response', (t) => {
        http.get(TARGET_URL);
        let url =  TARGET_URL + '/api/users/2'
        let res = http.get(url, {headers})
        t.expect(res.status).as("response status").toEqual(200)
        check(res, {
            'Update API response time is within limits': (r) => r.timings.duration < 2000,
        })

        group('Check Response Data', () => {
        check(res, {
            'response data validate ID': (r) => JSON.parse(r.body).data.id === 2,
            'response data validate Email': (r) => JSON.parse(r.body).data.email === "janet.weaver@reqres.in",
            'response data validate First Name': (r) => JSON.parse(r.body).data.first_name === 'Janet',
            });
            sleep(SLEEP)
        })
    });   

    describe('02. Test POST Create Userwith validatión status code and data response', (t) => {
        http.get(TARGET_URL);
        let url =  TARGET_URL + '/api/users'
        let res = http.post(url, dataUserCreate, {headers})
        t.expect(res.status).as("response status").toEqual(201)
        check(res, {
            'Update API response time is within limits': (r) => r.timings.duration < 2000,
        })

        group('Check Response Data', () => {
        check(res, {
            'response data validate Create User Name': (r) => r.body.name == dataUserCreate.name,
            'response data validate Create User Job': (r) => r.body.job == dataUserCreate.job,
            });

            sleep(SLEEP)
        })
    });   

    describe('03. Test PUT Create Userwith validatión status code and data response', (t) => {
        http.get(TARGET_URL);
        let url =  TARGET_URL + '/api/users/2'
        let res = http.put(url, dataUserUpdate, {headers})
        t.expect(res.status).as("response status").toEqual(200)
        check(res, {
            'Update API response time is within limits': (r) => r.timings.duration < 2000,
        })

        group('Check Response Data', () => {
        check(res, {
            'response data validate Update Name': (r) => r.body.name == dataUserUpdate.name,
            'response data validate Update Job': (r) => r.body.job == dataUserUpdate.job,
            });

            sleep(SLEEP)
        })
    });   


    

}

export function handleSummary(data) {
    return {
      "load-test-script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }