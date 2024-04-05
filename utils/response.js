const sendErrorResponse = (res, statusCode, message = "", error = null,) => {  
    return res?.status(statusCode).json({
      success: false,
      message,
      error,
    });
  };
  
const sendSuccessResponse = (res, message, data = null, statusCode = 200) => {
return res?.status(statusCode).json({
    success: true,
    message,
    data,
});
};
  

module.exports = {
  sendErrorResponse,
  sendSuccessResponse
}