
module.exports = {
  reactStrictMode: false, // was true
  // HTTPS настройки
  server: {
    https: {
      key: './ssl/key.pem',
      cert: './ssl/cert.pem',
    },
  },
};


