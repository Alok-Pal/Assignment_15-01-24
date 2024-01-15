import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnime } from "../redux/action/fetchAnimeAction";
import CardComponent from "../component/CardComponent";
import Images from "../Assets/2102.i518.009_sky_cloud_evening_illustration.jpg";

const HomePage = () => {
  // use to do the search
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalNumberData, setTotalNumberData] = useState(0);

  const [wholeAnimeData, setWholeAnimeData] = useState([]);
  // to get data from state
  const animeData = useSelector((data) => data?.homePage);
  console.log("🚀 ~ HomePage ~ animeData:", animeData);
  // To call api
  const dispatch = useDispatch();

  // Fetch api
  const fetchSearchResults = async (page = 1) => {
    try {
      const val = {
        page: page,
        search: searchQuery,
      };
      dispatch(fetchAnime(val));
    } catch (error) {}
  };

  //   set total pages
  useEffect(() => {
    setTotalPages(animeData?.data?.pagination?.last_visible_page);
    setTotalNumberData(animeData?.data?.pagination?.items?.total);
    setWholeAnimeData(animeData?.data?.data);
  }, [animeData]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "back" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // to set debounce delay of 1800 ms.
  useEffect(() => {
    let resTimer;
    if (searchQuery !== "") {
      resTimer = setTimeout(() => {
        fetchSearchResults(currentPage);
      }, 800);
    } else {
      fetchSearchResults(currentPage);
    }

    return () => {
      clearTimeout(resTimer);
    };
  }, [currentPage, searchQuery]);

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${Images})`,
        margin: "0px",
        padding: "0px",
        minHeight: "100vh",
      }}
    >
      <div className="">
        {/* heading */}
        <div className="text-2xl text-orange-500 text-center  fontFamily">
          <p className="pt-9">Search Anime Characters</p>
        </div>

        {/* search input */}
        <div className="flex justify-center pt-3">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-center">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full lg:w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-xl dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => {
                handleSearchChange(e);
              }}
            />
          </div>
        </div>

        {/* Total found */}
        <div className="flex justify-center fontFamily my-9">
          <p>
            Total {totalNumberData ? totalNumberData : 0} matching anime
            characters found
          </p>
        </div>

        {/* buttons */}
        <div className="flex justify-center mb-3 border-t-2  border-black dark:border-gray-700 ">
          <div className="flex justify-between mt-9 w-11/12">
            <button
              className="rounded-md  bg-gray-500 text-white font-bold w-32 text-center h-10"
              onClick={() => {
                handlePagination("back");
              }}
              style={{ cursor: "pointer" }}
            >
              &larr; Previous
            </button>

            <button
              className="rounded-md bg-gray-500 text-white font-bold  mx-3 w-20  text-center h-10"
              onClick={() => {
                handlePagination("next");
              }}
              style={{ cursor: "pointer" }}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>

      {totalNumberData !== 0 && totalNumberData ? (
        <CardComponent wholeAnimeData={wholeAnimeData} />
      ) : (
        <>
          {totalNumberData !== undefined ? (
            <>
              <div className="mt-10 text-center font-bold fontFamily text-3xl ">
                <p>No Results Found !!!</p>
              </div>
            </>
          ) : (
            <>
              <div className="mt-10 text-center font-bold  fontFamily text-3xl ">
                <p>No Results Found !!! </p>
              </div>
              <p className="text-center text-red-500">
                *Go back to previous page then come back !!! *
              </p>
            </>
          )}
        </>
      )}

      <div
        className="w-full h-10 bg-gray-600 mt-10 "
        style={
          totalNumberData &&
          animeData?.data?.data &&
          animeData?.data?.data.length > 0
            ? {}
            : { position: "fixed", bottom: "0" }
        }
      ></div>
    </div>
  );
};

export default HomePage;
