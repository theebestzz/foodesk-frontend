import ACTIONS from "../actions";

const initialState = {
  images: [],
};

const sliderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    default:
      return state;
  }
};

export default sliderReducer;
