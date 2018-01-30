const express = require('express');

const app = express();

const fetch = require('node-fetch');

app.enable('trust proxy');

// @todo: extract to a config
const NPR_CLIENT_ID = 'nprone_trial_vNlQ3IUlacqy';
const NPR_SECRET = 'h0cfDAS6I6unufB4yCHPrEkWCN2MsIPuy2yQty1i';

const bodyParser = require('body-parser');
const FormData = require('form-data');

app.use(bodyParser.json());

app.post('/nprauth', (req, res) => {
  Promise.resolve(true)
    .then(() => {
      const {code, redirect_uri} = req.body;
      console.log('code:', code, redirect_uri);

      const formData = new FormData();
      formData.append('grant_type', 'authorization_code');
      formData.append('client_id', NPR_CLIENT_ID);
      formData.append('client_secret', NPR_SECRET);
      formData.append(
        'redirect_uri',
        'https://auth.expo.io/@joenoon/ciasom-app'
      );
      formData.append('code', code);

      return fetch('https://api.npr.org/authorization/v2/token', {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: formData,
      });
    })
    .then(res => res.json())
    .then(json => {
      const {access_token} = json;
      console.log('token response:', json);
      res.send({access_token});
    })
    .catch(err => {
      console.error('ERROR:', err);
      res.status(500).send('Something broke!');
    });
});

const port = process.env.PORT;
if (port) {
  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });
}

module.exports = app;
