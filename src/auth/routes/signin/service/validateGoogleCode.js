const axios = require('axios');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

module.exports = async (code) => {
  const { data } = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: 'http://www.example.com/authenticate/google',
      grant_type: 'authorization_code',
      code,
    },
  });
  const { data: info } = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });
  return { data, info };
};
