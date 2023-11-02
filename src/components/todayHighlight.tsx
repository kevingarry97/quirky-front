import React from "react";
import { TbUvIndex, TbSunset, TbSunrise } from "react-icons/tb";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineAntCloud } from "react-icons/ai";

interface Props {
    theme: string | any;
    weather: any
}

const TodayHighlight = ({theme, weather}: Props) => {

    const { location, current, forecast } = weather;
  return (
    <div className="mt-10">
      <h2
        className={`text-2xl ${
          theme == "dark" ? "text-white" : "text-[#1A2028]"
        } font-semibold`}
      >
        Today's Highlight
      </h2>
      {Object.keys(weather).length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 my-5">
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
              <small className="text-[15px] text-[#b8b3b3] mt-10">km/h</small>
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
                    theme == "dark" ? "text-[#a5a6a4]" : "text-[#262C32]"
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
                    theme == "dark" ? "text-[#a5a6a4]" : "text-[#262C32]"
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
                    theme == "dark" ? "text-[#e4dede]" : "text-[#1C2A37]"
                  } text-[52px]`}
                >
                  {current?.humidity}
                </h1>
                <small className="text-[15px] text-[#b8b3b3] mt-10">%</small>
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
                    theme == "dark" ? "text-[#e4dede]" : "text-[#1C2A37]"
                  } text-[52px]`}
                >
                  {current?.vis_km}
                </h1>
                <small className="text-[15px] text-[#b8b3b3] mt-10">km/h</small>
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
                    theme == "dark" ? "text-[#e4dede]" : "text-[#1C2A37]"
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
  );
};

export default TodayHighlight;
