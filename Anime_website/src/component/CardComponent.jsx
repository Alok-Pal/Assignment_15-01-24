import React from "react";
import imgNature from "../Assets/images.jpg";
import { AiOutlineArrowRight } from "react-icons/ai";

const CardComponent = (props) => {
  const { wholeAnimeData } = props;
  const redirectToGoogle = (url) => {
    window.open(`${url}`, "_blank");
  };

  return (
    <>
      {wholeAnimeData?.map((data) => (
        <div
          key={data?.mal_id}
          className="flex mt-10  items-center justify-center content-center relative"
        >
          <div className="w-11/12 h-32 border-2 border-gray-500  shadow bg-gray-400 dark:border-gray-700 flex">
            {/* Image */}
            <div className="flex items-center ps-3">
              <img
                className="w-28 h-24 object-cover"
                src={data?.images?.jpg?.image_url}
                alt="anime_image"
              />
            </div>

            {/* Content */}
            <div className="flex-grow p-4   ">
              <div className="flex justify-between">
                <div>
                  <p className=" text-xl font-bold text-gray-900 dark:text-white">
                    {data?.name}
                  </p>
                </div>
                <div className="h-10">
                  <span
                    className="h-10"
                    style={{ fontSize: "300%", color: "red" }}
                  >
                    &hearts;
                  </span>
                  <span className="fontFamily font-bold">{data?.favorites}</span>
                </div>
              </div>
              <div className="flex">
                {data?.nicknames.map((nicknamesData, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 p-1 px-4 mx-2 rounded-lg fontFamily"
                  >
                    {nicknamesData}
                  </div>
                ))}
              </div>
            </div>

            {/* Link with right border */}
            <div className="flex justify-center items-center border-l-2 border-black dark:border-gray-700">
              <button
                className="flex p-4 relative font-bold item-center hover:bg-gray-300"
                onClick={() => redirectToGoogle(data?.url)}
                style={{ cursor: "pointer" }}
              >
                <AiOutlineArrowRight
                  style={{ fontSize: "40", color: "purple" }}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardComponent;
