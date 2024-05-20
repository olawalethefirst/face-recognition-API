const errorMessages = {
  valiadationError: "Validation Error",
  internalServerError: "An unknown error occurred occured",
  unathorizedUser: "User is unauthorized to make request",
};

const {
  CLARIFAI_PAT,
  CLARIFAI_USER_ID,
  CLARIFAI_APP_ID,
  CLARIFAI_MODEL_ID,
  CLARIFAI_BASE_URL,
  JWTOKEN_SECRET_KEY,
  DATEABASE_HOST,
  DATEABASE_NAME,
  DATEABASE_PORT,
  DATEABASE_USER,
  DATEABASE_PASSWORD,
} = process.env;

module.exports = {
  errorMessages,
  clarifai: {
    PAT: CLARIFAI_PAT,
    userId: CLARIFAI_USER_ID,
    appId: CLARIFAI_APP_ID,
    modelID: CLARIFAI_MODEL_ID,
    baseUrl: CLARIFAI_BASE_URL,
  },
  jwToken: {
    SECRET_KEY: JWTOKEN_SECRET_KEY,
  },
  cookiesKeys: {},
  database: {
    host: DATEABASE_HOST,
    name: DATEABASE_NAME,
    port: DATEABASE_PORT,
    user: DATEABASE_USER,
    password: DATEABASE_PASSWORD,
  },
};
