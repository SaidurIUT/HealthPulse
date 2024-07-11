import React from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import ReactAnimatedWeather from "react-animated-weather";
import "../style/servicePage/Weather.css";
import TextToSpeechButton from "./TextToSpeechButton"; // Make sure you have this component

import banner from "../images/banner/kidsCorner.mp4";
import Background from "../components/basicComponents/Background";
import Base from "../components/Base";
import { getCurrentUserDetail } from "../auth";

const geminiKey = "AIzaSyBtbcmMGUk34mU0LGJ83pLAfKVWTUKXGIE";
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: undefined,
      lon: undefined,
      errorMessage: undefined,
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      main: undefined,
      errorMsg: undefined,
      healthRecommendation: "", // State for health recommendation
      weight: "",
      heightCm: "",
      age: "",
      gender: "",
      bmi: "",
    };
  }

  componentDidMount() {
    const user = getCurrentUserDetail();
    console.log("Fetched user details:", user); // Debugging line to check user details

    if (user) {
      this.setState({
        weight: user.weight > 0 ? user.weight : "",
        heightCm: user.height > 0 ? user.height : "",
        age: user.age > 0 ? user.age : "",
        gender: user.gender ? user.gender : "",
        bmi: user.bmi > 0 ? user.bmi : "",
      });
    }

    if (navigator.geolocation) {
      this.getPosition()
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real-time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }

    this.timerID = setInterval(
      () => this.getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );
      const data = await api_call.json();
      this.setState({
        lat: lat,
        lon: lon,
        city: data.name,
        temperatureC: Math.round(data.main.temp),
        temperatureF: Math.round(data.main.temp * 1.8 + 32),
        humidity: data.main.humidity,
        main: data.weather[0].main,
        country: data.sys.country,
      });
      this.setIcon(data.weather[0].main);
      this.fetchHealthRecommendation(
        data.weather[0].main,
        data.main.temp,
        data.main.humidity
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.setState({
        errorMsg: "Unable to fetch weather data. Please try again later.",
      });
    }
  };

  setIcon = (main) => {
    switch (main) {
      case "Haze":
        this.setState({ icon: "CLEAR_DAY" });
        break;
      case "Clouds":
        this.setState({ icon: "CLOUDY" });
        break;
      case "Rain":
        this.setState({ icon: "RAIN" });
        break;
      case "Snow":
        this.setState({ icon: "SNOW" });
        break;
      case "Dust":
        this.setState({ icon: "WIND" });
        break;
      case "Drizzle":
        this.setState({ icon: "SLEET" });
        break;
      case "Fog":
        this.setState({ icon: "FOG" });
        break;
      case "Smoke":
        this.setState({ icon: "FOG" });
        break;
      case "Tornado":
        this.setState({ icon: "WIND" });
        break;
      default:
        this.setState({ icon: "CLEAR_DAY" });
    }
  };

  fetchHealthRecommendation = async (
    weatherCondition,
    temperature,
    humidity
  ) => {
    const combinedText = `Weather is ${weatherCondition} with temperature ${temperature}°C. and humidity ${humidity}%. My age is ${this.state.age} weight is ${this.state.weight} kg, height is ${this.state.heightCm} cm,  bmi is ${this.state.bmi}`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `Tell me what health beneficiary steps I can take based on this condition where ${combinedText} . Give response in a single paragraph. Give response with in 200 words`,
                },
              ],
            },
          ],
        }
      );

      this.setState({
        healthRecommendation: response.data.candidates[0].content.parts[0].text,
      });
    } catch (error) {
      console.error("Error with Gemini API request:", error);
      this.setState({
        healthRecommendation:
          "Sorry - Something went wrong with the Gemini API. Please try again!",
      });
    }
  };

  render() {
    return (
      <div>
        <Background />
        <Base>
          <div className="main">
            <div className="video-container">
              <video src={banner} autoPlay loop muted></video>
            </div>
            {console.log(this.state)}
            <React.Fragment>
              {this.state.temperatureC ? (
                <div className="weather-container">
                  {/* Current Weather Card */}
                  <div className="weather-card">
                    <div className="city-info">
                      <div className="title">
                        <h2>{this.state.city}</h2>
                        <h3>{this.state.country}</h3>
                      </div>
                      <div className="mb-icon">
                        <ReactAnimatedWeather
                          icon={this.state.icon}
                          color={defaults.color}
                          size={defaults.size}
                          animate={defaults.animate}
                        />
                        <p>{this.state.main}</p>
                      </div>
                      <div>
                        <p>
                          {"Humidity: "}
                          {this.state.humidity} {"%"}
                        </p>
                      </div>
                      <div className="date-time">
                        <div className="dmy">
                          <div id="txt"></div>
                          <div className="current-time">
                            <Clock
                              format="HH:mm:ss"
                              interval={1000}
                              ticking={true}
                            />
                          </div>
                          <div className="current-date">
                            {dateBuilder(new Date())}
                          </div>
                        </div>
                        <div className="temperature">
                          <p>
                            {this.state.temperatureC}°<span>C</span> |{" "}
                            {this.state.temperatureF}°<span>F</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Health Recommendation Card */}
                  <div className="health-card">
                    <h3>Health Recommendation</h3>
                    <p>{this.state.healthRecommendation}</p>
                    <TextToSpeechButton
                      text={this.state.healthRecommendation}
                    />
                  </div>
                </div>
              ) : (
                <div className="error-message">
                  <p>{this.state.errorMsg}</p>
                </div>
              )}
            </React.Fragment>
          </div>
        </Base>
      </div>
    );
  }
}

export default Weather;