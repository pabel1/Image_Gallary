import React from "react";
import { BiImage } from "react-icons/bi";
import { data } from "../imageData";

const Gallery = () => {
  return (
    <div className="p-4">
      <div className="w-full flex items-center justify-between border-b-2 border-gray-400 p-6">
        <div className="flex items-center gap-3">
          <input type="checkbox" name="" id="" />
          <h1 className="text-xl text-gray-800">1 File Selected</h1>
        </div>

        <div>
          <button className="text-red-600">Delete File</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-4 mt-4 p-6">
        {data &&
          data.map((item, i) => (
            <div
              className={`col-span-1 sm:col-span-${
                i === 0 ? "2" : "1"
              } row-span-1 sm:row-span-${
                i === 0 ? "2" : "1"
              } border-2 border-gray-400 rounded-xl shadow-md  relative group cursor-pointer`}
              key={i}
            >
              <img
                className=" rounded-lg"
                src={item.image}
                alt={`Image ${i + 1}`}
              />

              <div className="rounded-lg hidden w-full h-full absolute top-0  bg-[rgba(0,0,0,0.2)] transition ease-in-out delay-150 p-5 group-hover:block">
                <input type="checkbox" name="" id="" />
              </div>
            </div>
          ))}
        <div
          className={`col-span-1  row-span-1  border-2 border-gray-300 rounded-xl shadow-md p-1 flex flex-col items-center justify-center gap-3 border-dashed   transition ease-in-out delay-150 `}
        >
          <BiImage size={24} className="text-gray-600 rotate-[360deg]" />
          <p className="text-lg text-gray-600 font-semibold">Add Images</p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
