'use strict';

const path = require('path');
const google = require('@googleapis/forms');
const {authenticate} = require('@google-cloud/local-auth');

const formID = "1F1rolBJhKvU9aqDAK1IdapRtNn2AfEY4383vHu5_TgM"; //id of the form

async function runSample() {
  const auth = await authenticate({
    keyfilePath: path.join(__dirname, 'credentials2.json'),
    scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
  });
  const forms = google.forms({
    version: 'v1',
    auth: auth,
  });
  const res = await forms.forms.get({formId: formID});
  console.log(res.data);
  for (let i in res.data.items) {
    console.log(res.data.items[i].title)
  }
  return res.data;
}

if (module === require.main) {
  runSample().catch(console.error);
}
module.exports = runSample;