import React, { useState } from "react";
import { BiImage } from "react-icons/bi";
import { data } from "../imageData";

const Gallery = () => {
  // State for images, selected images, and the featured image
  const [images, setImages] = useState(data);
  const [selectedImages, setSelectedImages] = useState([]);
  const [featureImage, setFeatureImage] = useState(images[0]);

  // Handle image selection and deselection
  const handleImageClick = (index) => {
    if (selectedImages.includes(index)) {
      const updatedSelectedImages = selectedImages.filter((i) => i !== index);
      setSelectedImages(updatedSelectedImages);
    } else {
      setSelectedImages([...selectedImages, index]);
    }
  };

  // Handle image deletion
  const handleDeleteImages = () => {
    const updatedImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  // Set the first image as the feature image
  const handleSetFeatureImage = () => {
    setFeatureImage(images[0]);
  };

  return (
    <div className="p-4">
      {/* Conditional rendering based on selected images */}
      {selectedImages.length > 0 ? (
        <div className="w-full flex items-center justify-between border-b-2 border-gray-400 p-6">
          <div className="flex items-center gap-3">
            <input checked type="checkbox" name="" id="" />
            <h1 className="text-xl text-gray-800">
              {selectedImages.length} Files Selected
            </h1>
          </div>
          <div>
            <button className="text-red-600" onClick={handleDeleteImages}>
              Delete File
            </button>
          </div>
        </div>
      ) : (
        <h1 className="text-xl text-gray-800 font-semibold px-6 border-b-2 border-gray-400">
          Gallery
        </h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-4 mt-4 p-6">
        {images.map((item, i) => (
          <div
            className={`col-span-1 sm:col-span-${
              i === 0 ? "2" : "1"
            } row-span-1 sm:row-span-${
              i === 0 ? "2" : "1"
            } border-2 border-gray-400 rounded-xl shadow-md relative group cursor-pointer`}
            key={i}
            onClick={() => handleImageClick(i)}
          >
            <img
              className="rounded-lg"
              src={item.image}
              alt={`Image ${i + 1}`}
            />

            {/* Checkbox overlay on hover */}
            <div
              className="rounded-lg hidden w-full h-full absolute top-0 bg-[rgba(0,0,0,0.2)] transition ease-in-out delay-150 p-5 group-hover:block"
              onClick={() => handleImageClick(i)}
            >
              <input type="checkbox" name="" id="" />
            </div>

            {/* Checked checkbox overlay for selected images */}
            {selectedImages.includes(i) && (
              <div className="w-full h-full absolute top-0 bg-[rgba(0,0,0.5,0.2)] transition ease-in-out delay-150 p-5">
                <input
                  type="checkbox"
                  checked
                  className="text-blue-500"
                  onChange={() => handleImageClick(i)}
                />
              </div>
            )}
          </div>
        ))}

        {/* Placeholder for adding images */}
        <div
          className={`col-span-1 row-span-1 border-2 border-gray-300 rounded-xl shadow-md p-1 flex flex-col items-center justify-center gap-3 border-dashed transition ease-in-out delay-150`}
        >
          <BiImage size={24} className="text-gray-600 rotate-[360deg]" />
          <p className="text-lg text-gray-600 font-semibold">Add Images</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
