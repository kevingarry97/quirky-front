import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import PartlyCloud from "./assets/images/partlycloudy.png";
import { TfiLocationPin } from "react-icons/tfi";
import { TbUvIndex, TbSunset, TbSunrise } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { debounce } from "lodash";
import { fetchLocations, getWeather } from "./services/weather-service";
import { AiOutlineAntCloud } from "react-icons/ai";
import { weatherImages } from "./utils/utli";
import { ThemeContext } from "./context/themeContext";
import ReactCountryFlag from "react-country-flag";

interface Location {
  name: string;
  country: String;
}

function App() {
  // Global Variables
  const event: any = new Date();
  const titleOptions = { year: "numeric", month: "long" };
  const semiOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  // State Variables
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>({});

  // Context
  const { theme, toggle } = useContext(ThemeContext);

  const handleSearch = async ({ target }: any) => {
    if (target?.value && target?.value.length > 2) {
      const { data } = await fetchLocations(target?.value);
      setLocations(data);
    }
  };

  const handleLocation = async (loc: any) => {
    setLoading(true);
    setLocations([]);
    const { data } = await getWeather(loc?.name, 7);
    setLoading(false);
    console.log("Data ", data);
    setWeather(data);
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 900), []);
  const { location, current, forecast } = weather;

  return (
    <div
      className={`h-screen w-full ${
        theme == "dark" ? `bg-[#172146]` : `bg-[#F9F2DF]`
      } p-14`}
    >
      <div
        className={`h-full w-full ${
          theme == "dark" ? `bg-[#0A153E]` : `bg-[#fffcf0]`
        } rounded-2xl overflow-scroll overflow-x-hidden main`}
      >
        <div className="grid grid-cols-3 items-start">
          <div className="col-span-2 md:m-10">
            <div className="flex justify-between">
              <div>
                <h2
                  className={`${
                    theme == "dark" ? `text-[#FFF]` : `text-[#1A2028]`
                  } text-3xl font-medium mb-2.5`}
                >
                  {event.toLocaleDateString("en-US", titleOptions)}
                </h2>
                <h6
                  className={`text-white text-sm ${
                    theme == "dark" ? `text-[#99A4C2]` : `text-[#A5A7AA]`
                  } mb-4`}
                >
                  {event.toLocaleDateString("en-US", semiOptions)}
                </h6>
              </div>
              <div className="flex items-center gap-5">
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    theme == "dark" && `bg-[#172146]`
                  } px-3 py-1 rounded-xl`}
                  onClick={toggle}
                >
                  <div className="w-4 h-4 bg-[#1a285c] rounded-full"></div>
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode="RW"
                    style={{
                      fontSize: "1.3em",
                      lineHeight: "1.3em",
                    }}
                    aria-label="United States"
                  />
                </div>
                <div
                  className={`flex items-center gap-2 cursor-pointer ${
                    theme == "light" && `bg-[#F9F2DF]`
                  } px-3 py-1 rounded-xl`}
                  onClick={toggle}
                >
                  <div className="w-4 h-4 bg-[#FFF] rounded-full"></div>
                  <ReactCountryFlag
                    className="emojiFlag"
                    countryCode="SE"
                    style={{
                      fontSize: "1.3em",
                      lineHeight: "1.3em",
                    }}
                    aria-label="United States"
                  />
                </div>
              </div>
            </div>
            <div className="mt-10">
              <h2
                className={`text-xl ${
                  theme == "dark" ? `text-white` : `text-[#1A2028]`
                } font-semibold mb-5`}
              >
                Weekly's Stats
              </h2>
              <div
                className={`grid lg:grid-cols-7 md:grid-cols-2 grid-cols-1 gap-4`}
              >
                {forecast?.forecastday?.map((item: any, key: any) => {
                  const date = new Date(item.date);
                  const options: any = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];

                  return (
                    <div
                      key={key}
                      className={`${
                        theme == "dark" ? `bg-[#202e66af]` : `bg-[#fffbe7]`
                      } rounded-lg flex flex-col items-center py-5`}
                    >
                      <h3
                        className={`${
                          theme == "dark" ? "text-[#FFF]" : "text-[#1C222C]"
                        } text-white`}
                      >
                        {dayName}
                      </h3>
                      <img
                        src={
                          weatherImages[item?.day?.condition?.text || "other"]
                        }
                        className="w-1/2 my-5"
                        alt=""
                      />
                      <h5
                        className={`${
                          theme == "dark" ? "text-gray-300" : "text-[#AAABAE]"
                        } text-[14px] font-medium`}
                      >
                        {item?.day?.avgtemp_c}&#176; C
                      </h5>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mt-10">
              <h2
                className={`text-2xl ${
                  theme == "dark" ? "text-white" : "text-[#1A2028]"
                } font-semibold`}
              >
                Today's Highlight
              </h2>
              {Object.keys(weather).length > 0 ? (
                <div className="grid grid-cols-3 gap-5 my-5">
                  <div
                    className={`${
                      theme == "dark" ? "bg-[#202e66af]" : "bg-[#fff9ee]"
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      UV Index
                    </h6>
                    <div className="flex w-full justify-center my-5">
                      <TbUvIndex size={58} color="#FDCC57" />
                    </div>
                    <h1
                      className={`${
                        theme == "dark" ? `text-[#e4dede]` : `text-[#1C232E]`
                      } text-4xl font-bold text-center`}
                    >
                      {current?.uv}
                    </h1>
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? `bg-[#16214C]` : `bg-[#FFFFFF]`
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      Wind Status
                    </h6>
                    <div className="flex gap-1 my-3">
                      <h1
                        className={` ${
                          theme == "dark" ? "text-[#e4dede]" : "text-[#1C232E]"
                        } text-[52px]`}
                      >
                        {current?.wind_kph}
                      </h1>
                      <small className="text-[15px] text-[#b8b3b3] mt-10">
                        km/h
                      </small>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-7 h-7 ${
                          theme == "dark" ? "bg-[#323A5E]" : "bg-[#EFF6FF]"
                        } rounded-full flex items-center justify-center`}
                      >
                        <FaLocationDot size={15} color="#1A73E8" />
                      </div>
                      <h1
                        className={`${
                          theme == "dark" ? "text-[#e4dede]" : "text-[#121B27]"
                        } text-[14px]`}
                      >
                        {location?.name + ", " + location?.country}
                      </h1>
                    </div>
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? `bg-[#16214C]` : `bg-[#FFFFFF]`
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      Sunrise and Sunset
                    </h6>
                    <div className="flex flex-col gap-7 mt-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#F59400] flex items-center justify-center">
                          <TbSunrise color="#FFF" size={20} />
                        </div>
                        <h6
                          className={`${
                            theme == "dark"
                              ? "text-[#a5a6a4]"
                              : "text-[#262C32]"
                          } text-sm font-bold`}
                        >
                          {forecast?.forecastday[0]?.astro?.sunrise}
                        </h6>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FDCC57] flex items-center justify-center">
                          <TbSunset color="#FFF" size={20} />
                        </div>
                        <h6
                          className={`${
                            theme == "dark"
                              ? "text-[#a5a6a4]"
                              : "text-[#262C32]"
                          } text-sm font-bold`}
                        >
                          {forecast?.forecastday[0]?.astro?.sunset}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? `bg-[#16214C]` : `bg-[#FFFFFF]`
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      Humidity
                    </h6>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 my-3">
                        <h1
                          className={`${
                            theme == "dark"
                              ? "text-[#e4dede]"
                              : "text-[#1C2A37]"
                          } text-[52px]`}
                        >
                          {current?.humidity}
                        </h1>
                        <small className="text-[15px] text-[#b8b3b3] mt-10">
                          %
                        </small>
                      </div>
                      <div
                        className={`h-20 p-1 ${
                          current?.humidity < 50
                            ? `bg-[#d4e7ff]`
                            : current?.humidity < 75
                            ? `bg-[#FEFBEA]`
                            : `bg-[#feeaea]`
                        } rounded-full flex ${
                          current?.humidity < 50
                            ? "items-end"
                            : current?.humidity < 75
                            ? "items-center"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 ${
                            current?.humidity < 50
                              ? `bg-[#5C9CFF]`
                              : current?.humidity < 75
                              ? `bg-[#FFD05C]`
                              : `bg-[#ff5c5c]`
                          } rounded-full`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h6
                        className={`text-[12px] ${
                          theme == "dark" ? `text-[#EDEDED]` : `text-[#A6A8AD]`
                        } font-medium`}
                      >
                        Status:
                      </h6>
                      <h6
                        className={`text-[13px] font-semibold ${
                          current?.humidity < 50
                            ? "text-[#5B9BFF]"
                            : current?.humidity < 75
                            ? "text-[#FDCC57]"
                            : "text-[#BC3433]"
                        }`}
                      >
                        {current?.humidity < 50
                          ? "Good Quality"
                          : current?.humidity < 75
                          ? "Average"
                          : "Excess"}
                      </h6>
                    </div>
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? `bg-[#16214C]` : `bg-[#FFFFFF]`
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      Visibility
                    </h6>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 my-3">
                        <h1
                          className={`${
                            theme == "dark"
                              ? "text-[#e4dede]"
                              : "text-[#1C2A37]"
                          } text-[52px]`}
                        >
                          {current?.vis_km}
                        </h1>
                        <small className="text-[15px] text-[#b8b3b3] mt-10">
                          km/h
                        </small>
                      </div>
                      <div
                        className={`h-20 p-1 ${
                          current?.vis_km < 50
                            ? `bg-[#d4e7ff]`
                            : current?.vis_km < 75
                            ? `bg-[#FEFBEA]`
                            : `bg-[#feeaea]`
                        } rounded-full flex ${
                          current?.vis_km < 50
                            ? "items-end"
                            : current?.vis_km < 75
                            ? "items-center"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 ${
                            current?.vis_km < 50
                              ? `bg-[#5C9CFF]`
                              : current?.vis_km < 75
                              ? `bg-[#FFD05C]`
                              : `bg-[#ff5c5c]`
                          } rounded-full`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h6
                        className={`text-[12px] ${
                          theme == "dark" ? `text-[#EDEDED]` : `text-[#A6A8AD]`
                        } font-medium`}
                      >
                        Status:
                      </h6>
                      <h6
                        className={`text-[13px] font-semibold ${
                          current?.vis_km < 50
                            ? "text-[#5B9BFF]"
                            : current?.vis_km < 75
                            ? "text-[#FDCC57]"
                            : "text-[#BC3433]"
                        }`}
                      >
                        {current?.vis_km < 50
                          ? "Good Quality"
                          : current?.vis_km < 75
                          ? "Average"
                          : "Excess"}
                      </h6>
                    </div>
                  </div>
                  <div
                    className={`${
                      theme == "dark" ? `bg-[#16214C]` : `bg-[#FFFFFF]`
                    } rounded-lg p-5`}
                  >
                    <h6
                      className={`${
                        theme == "dark" ? "text-[#cac9c9]" : "text-[#6F7075]"
                      } text-sm font-medium`}
                    >
                      Air Quality
                    </h6>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1 my-3">
                        <h1
                          className={`${
                            theme == "dark"
                              ? "text-[#e4dede]"
                              : "text-[#1C2A37]"
                          } text-[52px]`}
                        >
                          {current?.cloud}
                        </h1>
                      </div>
                      <div
                        className={`h-20 p-1 ${
                          current?.cloud < 50
                            ? `bg-[#d4e7ff]`
                            : current?.cloud < 75
                            ? `bg-[#FEFBEA]`
                            : `bg-[#feeaea]`
                        } rounded-full flex ${
                          current?.cloud < 50
                            ? "items-end"
                            : current?.cloud < 75
                            ? "items-center"
                            : ""
                        }`}
                      >
                        <div
                          className={`w-4 h-4 ${
                            current?.cloud < 50
                              ? `bg-[#5C9CFF]`
                              : current?.cloud < 75
                              ? `bg-[#FFD05C]`
                              : `bg-[#ff5c5c]`
                          } rounded-full`}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <h6
                        className={`text-[12px] ${
                          theme == "dark" ? `text-[#EDEDED]` : `text-[#A6A8AD]`
                        } font-medium`}
                      >
                        Status:
                      </h6>
                      <h6
                        className={`text-[13px] font-semibold ${
                          current?.cloud < 50
                            ? "text-[#5B9BFF]"
                            : current?.cloud < 75
                            ? "text-[#FDCC57]"
                            : "text-[#BC3433]"
                        }`}
                      >
                        {current?.cloud < 50
                          ? "Good Quality"
                          : current?.cloud < 75
                          ? "Average"
                          : "Excess"}
                      </h6>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-16 w-full flex items-center justify-center gap-5">
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
          </div>
          <div>
            <div
              className={`md:m-10 m-5 md:p-10 pt-5 ${
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
                        theme == "dark"
                          ? "hover:bg-[#5f6881]"
                          : "hover:bg-[#fffcd3]"
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
            <div className={`mx-10 md:px-10 px-5 bg-[#25305c71] rounded-xl`}>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
