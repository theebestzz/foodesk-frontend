import ACTIONS from "./index";
import axios from "axios";

const setImages = (images) => {
  return {
    type: ACTIONS.SET_IMAGES,
    payload: images,
  };
};

export const getImages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/sliders");
      dispatch(setImages(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};
