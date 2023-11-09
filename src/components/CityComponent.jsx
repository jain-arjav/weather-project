import styled from "styled-components";
import React, { useState, useEffect } from "react";

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;
  border: black solid 1px;
  border-radius: 2px;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: Montserrat;
    font-weight: bold;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: Montserrat;
    font-weight: bold;
  }
`;
const ChooseCityLabel = styled.span`
  color: black;
  margin: 10px auto;
  font-size: 18px;
  font-weight: bold;
`;
const WelcomeWeatherLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 40px auto;
`;
const CityComponent = (props) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://countriesnow.space/api/v0.1/countries`
        );
        const data = await response.json();

        if (!data.error) {
          setCountries(data.data);
        } else {
          console.error("Error fetching countries:", data.msg);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchData();
  }, []);
  const { updateCountry, fetchWeather } = props;

  return (
    <>
      <WelcomeWeatherLogo src={"/react-weather-app/icons/perfect-day.svg"} />
      <ChooseCityLabel>Find Weather of your country</ChooseCityLabel>

      <SearchBox onSubmit={fetchWeather}>
        <input
          onChange={(e) => updateCountry(e.target.value)}
          placeholder="country"
        />
        <button type={"submit"}>Search</button>
      </SearchBox>
    </>
  );
};
export default CityComponent;
