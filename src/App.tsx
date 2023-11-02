import React, {
  ChangeEventHandler,
  useCallback,
  useContext,
  useState,
} from "react";
import { debounce } from "lodash";
import { getWeather } from "./services/weather-service";
import { ThemeContext } from "./context/themeContext";
import ReactCountryFlag from "react-country-flag";
import WeeklyStats from "./components/weeklyStats";
import TodayHighlight from "./components/todayHighlight";
import SearchLocation from "./components/searchLocation";
import CompareLocation from "./components/compareLocation";

export interface Location {
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
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>({});

  // Context
  const { theme, toggle } = useContext(ThemeContext);

  const handleLocation = async (loc: any) => {
    setLoading(true);
    setLocations([]);
    const { data } = await getWeather(loc?.name, 7);
    setLoading(false);
    setWeather(data);
  };

  const { forecast } = weather;

  return (
    <div
      className={`h-screen w-full ${
        theme == "dark" ? `bg-[#172146]` : `bg-[#F9F2DF]`
      } lg:p-14 p-5`}
    >
      <div
        className={`h-full w-full ${
          theme == "dark" ? `bg-[#0A153E]` : `bg-[#fffcf0]`
        } rounded-2xl overflow-scroll overflow-x-hidden main pb-10`}
      >
        <div className="grid lg:grid-cols-3 grid-cols-1 items-start">
          <div className="col-span-2 md:m-10 m-5">
            <div className="flex lg:flex-row flex-col gap-5 justify-between">
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
            <WeeklyStats theme={theme} forecast={forecast} />
            <TodayHighlight theme={theme} weather={weather} />
          </div>
          <div>
            <SearchLocation
              theme={theme}
              locations={locations}
              weather={weather}
              setLocations={setLocations}
              handleLocation={handleLocation}
            />
            <CompareLocation
              weather={weather}
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
