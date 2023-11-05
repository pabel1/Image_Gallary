import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(images);
    const [reorderedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, reorderedImage);

    setImages(reorderedImages);
  };
  return (
    <div className="py-2 w-full px-8">
      {/* Conditional rendering based on selected images */}
      <div className=" border-b-2">
        {selectedImages.length > 0 ? (
          <div className=" flex items-center justify-between py-2 px-6">
            <div className="flex items-center gap-3">
              <input
                checked
                type="checkbox"
                name=""
                id=""
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              <h1 className="text-xl text-gray-800">
                {selectedImages.length} Files Selected
              </h1>
            </div>

            <button className="text-red-600" onClick={handleDeleteImages}>
              Delete File
            </button>
          </div>
        ) : (
          <div className="px-6 py-2">
            {" "}
            <h1 className=" text-xl text-gray-800 font-semibold ">Gallery</h1>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="image-gallery"
          direction="horizontal"
          mode=""
          isCombineEnabled={true}
          ignoreContainerClipping={true}
          // isCombineEnabled={false}
        >
          {(provided) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-4 mt-4 p-6"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {images.map((item, i) => (
                <Draggable key={i} draggableId={`image-${i}`} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={` col-span-${i === 0 ? "2" : "1"} row-span-${
                        i === 0 ? "2" : "1"
                      } border-2 border-gray-400 rounded-xl shadow-md relative group cursor-pointer `}
                      key={i}
                      onClick={() => handleImageClick(i)}
                    >
                      <img
                        className="rounded-lg w-full"
                        src={item.image}
                        alt={`Image ${i + 1}`}
                      />

                      {/* Checkbox overlay on hover */}
                      <div className="rounded-lg hidden w-full h-full absolute top-0 bg-[rgba(0,0,0,0.2)] transition ease-in-out delay-150 p-5 group-hover:block">
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          style={{
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </div>

                      {/* Checked checkbox overlay for selected images */}
                      {selectedImages.includes(i) && (
                        <div className="w-full h-full absolute top-0 bg-[rgba(0,0,0.5,0.2)] transition ease-in-out delay-150 p-5">
                          <input
                            type="checkbox"
                            checked
                            className="text-blue-500"
                            onChange={() => handleImageClick(i)}
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {/* Placeholder for adding images */}
              <div
                className={`col-span-1 row-span-1 border-2 border-gray-300 rounded-xl shadow-md p-1 flex flex-col items-center justify-center gap-3 border-dashed transition ease-in-out delay-150`}
              >
                <BiImage size={24} className="text-gray-600 rotate-[360deg]" />
                <p className="text-lg text-gray-600 font-semibold">
                  Add Images
                </p>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Gallery;
