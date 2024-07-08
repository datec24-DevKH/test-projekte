import { environment } from './environments/environment.development';

export { AppServerModule as default } from './app/app.module.server';

import fetch from 'node-fetch';

const url = environment.personio.apiUrl;
const options = {
  method: 'POST',
  headers: {accept: 'application/json', 'content-type': 'application/json'},
  body: JSON.stringify({
    client_id: environment.personio.clientId,
    client_secret: environment.personio.clientSecret
  })
};

fetch(url, options)
  .then((res: { json: () => any; }) => res.json())
  .then((json: any) => console.log(json))
  .catch((err: string) => console.error('error:' + err));