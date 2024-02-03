import { useContext, useEffect, useState } from "react";
import api from "../endpoints/api";
import propTypes from "prop-types";
import { GalleryContext } from "../App";

const MainGrid = () => {
  // eslint-disable-next-line no-undef
  const glightbox = new GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
  });

  const { state, dispatch } = useContext(GalleryContext);
  const deleteImage = async (image, deletePermanently) => {
    console.log("hello");
    try {
      const res = await fetch(api.deleteImage, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify({
          image,
          path: state.folderName,
          deletePermanently,
        }),
      });

      const data = await res.json();
      if (data.deleted) {
        glightbox.close();
        const images = state.images.filter((img) => img !== image);
        dispatch({ type: "deleteImage", payload: images });
      } else {
        console.log("not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {state.images.map((img) => {
        return (
          <div key={img}>
            <a
              href={`${api.images}/${state.folderName}/${img}`}
              className="glightbox"
              data-gallery="gallery"
              data-glightbox="description: .custom-desc1"
            >
              <img
                src={`${api.images}/${state.folderName}/${img}`}
                className="w-[475px] h-[475px] object-cover"
                alt="Image Here"
              />
            </a>
            <div className="glightbox-desc custom-desc1">
              <button
                onClick={() => deleteImage(img, true)}
                className="deleteImageButton btn delete-btn mr-2"
              >
                Delete Permanently
              </button>
              <button
                onClick={() => deleteImage(img, false)}
                className="moveToRecycleBin btn recycle-btn"
              >
                Move To Recycle Bin
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
};

MainGrid.propTypes = {
  images: propTypes.array,
  path: propTypes.string,
};

export default MainGrid;
