import React, { useCallback } from "react";
import { TfiLocationPin } from "react-icons/tfi";
import { debounce } from "lodash";
import { fetchLocations } from "../services/weather-service";
import { AiOutlineAntCloud } from "react-icons/ai";
import {Location} from '../App';
import { weatherImages } from "../utils/utli";

interface Props {
  theme: string | any;
  locations: any[];
  setLocations: (value: any) => void;
  handleLocation: (value: any) => void;
  weather: any
}

const SearchLocation = ({ theme, locations, weather, setLocations, handleLocation }: Props) => {

  const handleSearch = async ({ target }: any) => {
    if (target?.value && target?.value.length > 2) {
      const { data } = await fetchLocations(target?.value);
      setLocations(data);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 900), []);
  const { location, current } = weather;

  return (
    <div
      className={`md:m-10 m-5 md:p-10 p-5 ${
        theme == "dark" ? "bg-[#25305c71]" : "bg-[#fffbe4]"
      } rounded-xl`}
    >
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
          placeholder="Search for locations"
          onChange={handleTextDebounce}
          required
        />
      </div>
      {locations.length > 0 && (
        <div
          className={`w-full my-5 ${
            theme == "dark" ? "bg-[#323a5e]" : "bg-[#f3f0dd]"
          } dark:border-gray-600 rounded`}
        >
          {locations.map((loc: Location, index) => (
            <div
              className={`flex items-center gap-5 p-3 cursor-pointer ${
                theme == "dark" ? "hover:bg-[#5f6881]" : "hover:bg-[#fffcd3]"
              }`}
              onClick={() => handleLocation(loc)}
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
      {Object.keys(weather).length > 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <img
            src={weatherImages[current?.condition?.text || "other"]}
            className="w-1/2 mb-10"
            alt=""
          />
          <h2
            className={`text-[48px] font-medium ${
              theme == "dark" ? "text-white" : "text-[#1C232E]"
            }`}
          >
            {current?.temp_c}
            <sup>o C</sup>
          </h2>
          <div className="flex gap-1 items-center ">
            <TfiLocationPin size={18} color="#7c7a7a" />
            <h6 className="text-base text-[#7c7a7a] font-medium">
              {location?.name + ", " + location?.country}
            </h6>
          </div>
        </div>
      ) : (
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
            No City Selected yet !
          </h2>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
