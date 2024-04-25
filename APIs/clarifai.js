const { clarifai } = require("../constants");

const detectFaces = async (imageURL) => {
      const fnResponse = {
        successful: false,
        data: null,
      };

      const body = JSON.stringify({
        user_app_id: {
          user_id: clarifai.userId,
          app_id: clarifai.appId,
        },
        inputs: [
          {
            data: {
              image: {
                url: imageURL,
              },
            },
          },
        ],
      });

      const requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key " + clarifai.PAT,
        },
        body,
      };
      console.log("requestOptions: ", requestOptions)
      
      console.log("url: ", `${clarifai.baseUrl}/${clarifai.modelID}/outputs`)
      
      const response = await fetch(
        `${clarifai.baseUrl}/${clarifai.modelID}/outputs`,
        requestOptions
      );
      console.log("response: ", response)

      if (response.ok) {
        const serializedResponse = await response.json();

        const { status, outputs } = serializedResponse;

        if (status.description?.toLowerCase() === "ok") {
          const prioritizedOutput = outputs[0];
          const regions = prioritizedOutput?.data?.regions || [];
          
          fnResponse.successful = true
          fnResponse.data = regions.map(
            ({
              region_info: { // eslint-disable-next-line camelcase
                bounding_box: { top_row, bottom_row, left_col, right_col },
              },
            }) => ({ // eslint-disable-next-line camelcase
              top: top_row, // eslint-disable-next-line camelcase
              bottom: 1 - bottom_row, // eslint-disable-next-line camelcase
              left: left_col, // eslint-disable-next-line camelcase
              right: 1 - right_col,// eslint-disable-next-line camelcase
            })
          );          
        } 
      }
  
      return fnResponse
  }

  module.exports = {
    detectFaces
  }