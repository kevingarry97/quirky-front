import React, { useCallback, useState } from "react";
import { MdCompareArrows } from "react-icons/md";
import { debounce } from "lodash";
import { TfiLocationPin } from "react-icons/tfi";
import { AiOutlineAntCloud } from "react-icons/ai";
import { weatherCompare, fetchLocations, getWeather } from "../services/weather-service";
import { weatherImages } from "../utils/utli";
import { Location } from "../App";

interface Props {
  weather: any;
  theme: string | any;
}

const CompareLocation = ({ weather, theme }: Props) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [compareLocations, setCompareLocations] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState<any>({});
  const [compareWeather, setCompareWeather] = useState<any>({});
  const [isCompare, setIsCompare] = useState(false);


  const handleCompare = async () => {
    setIsCompare(true);

    const payload = {
        selectedCountry: selectedWeather?.location?.name + ', ' + selectedWeather?.location.name,
        comparedCountry: compareWeather?.location?.name + ', ' + compareWeather?.location.name,
        results: {
            selectedCountryWeather: selectedWeather,
            comparedCountryWeather: compareWeather
        }
    }

    const result = await weatherCompare(payload);
    console.log('Data ', result)
  }

  const handleSelectCountry = async ({ target }: any) => {
    setIsCompare(false);
    if (target?.value && target?.value.length > 2) {
      const { data } = await fetchLocations(target?.value);
      setSelectedLocations(data);
    }
  };

  const handleCompareCountry = async ({ target }: any) => {
    setIsCompare(false);
    if (target?.value && target?.value.length > 2) {
      const { data } = await fetchLocations(target?.value);
      setCompareLocations(data);
    }
  };

  const handleSelectedLocation = async (loc: any) => {
    setSelectedLocations([]);
    const { data } = await getWeather(loc?.name);
    setSelectedWeather(data);
  };

  const handleCompareLocation = async (loc: any) => {
    setCompareLocations([]);
    const { data } = await getWeather(loc?.name);
    setCompareWeather(data);
  };

  const handleSelectDebounce = useCallback(
    debounce(handleSelectCountry, 900),
    []
  );
  const handleCompareDebounce = useCallback(
    debounce(handleCompareCountry, 900),
    []
  );

  const { location: selectLocate, current: selectCurrent } = selectedWeather;
  const { location: compareLocate, current: compareCurrent } = compareWeather;
  return (
    <div
      className={`md:mx-10 mx-5 md:px-10 p-5 ${
        theme == "dark" ? "bg-[#25305c71]" : "bg-[#fffbe4]"
      } rounded-xl`}
    >
      <div className="flex md:flex-row flex-col lg:justify-evenly gap-5">
        <div className={`flex flex-col`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className={`block w-full p-4 pl-14 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${
                theme == "dark" ? "dark:bg-[#323a5e]" : "bg-[#f3ebcd]"
              } dark:border-gray-600 dark:placeholder-gray-400 ${
                theme == "dark" ? "text-white" : "text-[#323a5e]"
              } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Type Country"
              onChange={handleSelectDebounce}
              required
            />
          </div>
          {selectedLocations.length > 0 && (
            <div
              className={`w-full my-5 ${
                theme == "dark" ? "bg-[#323a5e]" : "bg-[#f3f0dd]"
              } dark:border-gray-600 rounded`}
            >
              {selectedLocations.map((loc: Location, index) => (
                <div
                  className={`flex items-center gap-5 p-3 cursor-pointer ${
                    theme == "dark"
                      ? "hover:bg-[#5f6881]"
                      : "hover:bg-[#fffcd3]"
                  }`}
                  onClick={() => handleSelectedLocation(loc)}
                >
                  <TfiLocationPin size={18} color="#7c7a7a" />
                  <h6
                    className={`text-base ${
                      theme == "dark" ? `text-[#d6d3d3]` : `text-[#474745]`
                    } font-medium`}
                  >
                    {loc?.name + ", " + loc?.country}
                  </h6>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-[#E8F2FC] lg:w-20 w-12 h-12 rounded-full flex items-center justify-center">
          <button className="bg-[#3488E7] p-2 rounded-full" onClick={handleCompare}>
            <MdCompareArrows color="#fff" />
          </button>
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              className={`block w-full p-4 pl-14 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ${
                theme == "dark" ? "dark:bg-[#323a5e]" : "bg-[#f3ebcd]"
              } dark:border-gray-600 dark:placeholder-gray-400 ${
                theme == "dark" ? "text-white" : "text-[#323a5e]"
              } dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Compare with"
              onChange={handleCompareDebounce}
              required
            />
          </div>
          {compareLocations.length > 0 && (
            <div
              className={`w-full my-5 ${
                theme == "dark" ? "bg-[#323a5e]" : "bg-[#f3f0dd]"
              } dark:border-gray-600 rounded`}
            >
              {compareLocations.map((loc: Location, index) => (
                <div
                  className={`flex items-center gap-5 p-3 cursor-pointer ${
                    theme == "dark"
                      ? "hover:bg-[#5f6881]"
                      : "hover:bg-[#fffcd3]"
                  }`}
                  onClick={() => handleCompareLocation(loc)}
                >
                  <TfiLocationPin size={18} color="#7c7a7a" />
                  <h6
                    className={`text-base ${
                      theme == "dark" ? `text-[#d6d3d3]` : `text-[#474745]`
                    } font-medium`}
                  >
                    {loc?.name + ", " + loc?.country}
                  </h6>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full md:flex-row flex-col md:justify-evenly items-center md:gap-20 mb-3">
        {(Object.keys(selectedWeather).length > 0 && isCompare) && (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <img
                    src={weatherImages[selectCurrent?.condition?.text || "other"]}
                    className="w-1/2 mb-10"
                    alt=""
                  />
            <h2
              className={`text-[28px] font-medium ${
                theme == "dark" ? "text-white" : "text-[#1C232E]"
              }`}
            >
              {selectCurrent?.temp_c}<sup>o</sup>C
            </h2>
            <div className="flex gap-1 items-center ">
              <TfiLocationPin size={13} color="#7c7a7a" />
              <h6 className="text-sm text-[#7c7a7a] font-medium">
                {selectLocate?.name + ", " + selectLocate?.country}
              </h6>
            </div>
          </div>
        )}
        {(Object.keys(compareWeather).length > 0 && isCompare) && (
          <div className="mt-12 flex flex-col items-center justify-center text-center">
            <img
              src={weatherImages[compareCurrent?.condition?.text || "other"]}
              className="w-1/2 mb-10"
              alt=""
            />
            <h2
              className={`text-[28px] font-medium ${
                theme == "dark" ? "text-white" : "text-[#1C232E]"
              }`}
            >
              {compareCurrent?.temp_c}
              <sup>o</sup>C
            </h2>
            <div className="flex gap-1 items-center ">
              <TfiLocationPin size={13} color="#7c7a7a" />
              <h6 className="text-sm text-[#7c7a7a] font-medium">
                {compareLocate?.name + ", " + compareLocate?.country}
              </h6>
            </div>
          </div>
        )}
        {((Object.keys(selectedWeather).length < 1 &&
          Object.keys(compareWeather).length < 1) || !isCompare) && (
            <div className="mt-16 flex items-center justify-center gap-5">
              <AiOutlineAntCloud
                color={`${theme == "dark" ? "#B3B1B1" : "#FDCC57"}`}
                size={52}
              />
              <h2
                className={`text-[20px] ${
                  theme == "dark" ? "text-[#b3b1b1]" : "text-[#FDCC57]"
                } font-bold`}
              >
                Nothing Selected
              </h2>
            </div>
          )}
      </div>
    </div>
  );
};

export default CompareLocation;
