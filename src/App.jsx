import { useState, useEffect, useReducer, createContext } from "react";
import api from "./endpoints/api";
import MainGrid from "./components/MainGrid";
import DirChooser from "./components/DirChooser";
import { initialState, reducer } from "./reducer";

export const GalleryContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [path, setPath] = useState(initialState.folderName);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(api.images, {
          method: "GET",
          headers: {
            path: path,
          },
        });

        const data = await response.json();
        dispatch({ type: "changeDirectory", payload: data });
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, [path]);
  return (
    <>
      <div className="root flex flex-wrap">
        <GalleryContext.Provider value={{ state, dispatch }}>
          <MainGrid />
          <DirChooser setPath={setPath} />
        </GalleryContext.Provider>
      </div>
    </>
  );
}

export default App;
