import React from "react";
import { weatherImages } from "../utils/utli";

interface ForeCastDay {
  forecastday: any[];
}

interface Props {
  theme: string | any;
  forecast: ForeCastDay;
}

const WeeklyStats = ({ theme, forecast }: Props) => {
  return (
    <div className="mt-10">
      <h2
        className={`text-xl ${
          theme == "dark" ? `text-white` : `text-[#1A2028]`
        } font-semibold mb-5`}
      >
        Weekly's Stats
      </h2>
      <div className={`grid lg:grid-cols-7 md:grid-cols-2 grid-cols-1 gap-4`}>
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
                src={weatherImages[item?.day?.condition?.text || "other"]}
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
  );
};

export default WeeklyStats;
