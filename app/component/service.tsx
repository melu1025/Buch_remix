import axios from 'axios';
import https from 'node:https';
import fs from 'node:fs';

export async function fetchBuch(suchkriterien: string) {
  return await axios
    .get(`https://localhost:3000/rest/?${suchkriterien}`, {
      httpsAgent: new https.Agent({
        ca: fs.readFileSync('app/certificate/certificate.crt'),
      }),
      validateStatus: function (status) {
        return true;
      },
    })
    .then(function (response) {
      if (response.status == 404) {
        return response.status;
      }
      return response.data;
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return;
      }
    });
}
