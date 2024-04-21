const errorMessages = {
  valiadationError: "Validation Error",
  internalServerError: "An unknown error occurred occured",
};

const {
  CLARIFAI_PAT,
  CLARIFAI_USER_ID,
  CLARIFAI_APP_ID,
  CLARIFAI_FACE_DETECTION_MODEL_ID,
  CLARIFAI_BASE_URL,
} = process.env;

module.exports = {
  errorMessages,
  clarifai: {
    PAT: CLARIFAI_PAT,
    userId: CLARIFAI_USER_ID,
    appId: CLARIFAI_APP_ID,
    modelID: CLARIFAI_FACE_DETECTION_MODEL_ID,
    baseUrl: CLARIFAI_BASE_URL,
  },
};
