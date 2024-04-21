import { clarifai } from "../constants";

const detectFaces =
  (async (imageURL) => {
    try {
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
                // "base64": IMAGE_BYTES_STRING
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

      const response = await fetch(
        `${clarifai.baseUrl}/${clarifai.modelID}/outputs`,
        requestOptions
      );

      if (response.ok) {
        const serializedResponse = await response.json();

        const { status, outputs } = serializedResponse;

        if (status.description?.toLowerCase() === "ok") {
          const prioritizedOutput = outputs[0];

          const regions = prioritizedOutput?.data?.regions || [];

          const facesBoundary = regions.map(
            ({
              region_info: {
                bounding_box: { top_row, bottom_row, left_col, right_col },
              },
            }) => ({
              top: top_row,
              bottom: 1 - bottom_row,
              left: left_col,
              right: 1 - right_col,
            })
          );

          const preloadedImageUrl = await preloadImageAsync(_imageURL);
        } else {
          console.warn("something wrong may have happened: ", status);
        }
      } else throw new Error(await response.json());
    } catch (error) {
      console.error("An error occured: ", error);
    }
  },
  []);
