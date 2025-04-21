const  ApiV1Prefix = process.env.ApiV1Prefix;

module.exports = (app) => {

    app.use(`/api/v1`, require('./booking'));
  };