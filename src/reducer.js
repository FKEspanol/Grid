const initialState = {
  folderName: localStorage.getItem("path") || "",
  images: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "changeDirectory":
      return {
        folderName: action.payload.folderName,
        images: [...action.payload.images],
      };

    case "deleteImage":
      return {
        ...state,
        images: [...action.payload],
      };

    default:
      return { ...state };
  }
};

export { initialState, reducer };
