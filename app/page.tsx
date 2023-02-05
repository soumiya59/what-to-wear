"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";

export default function App() {
  const [lat, setLat] = useState({});
  const [long, setLong] = useState({});
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&APPID=15414d5fa969db8c68f73428d0e8dd8a`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])

  const getClothingMsg = () => {
    if (data.main.temp_min <5 && data.main.temp_max>10) {
      return <span>a thick jumper</span>;
    } else if (data.temp_min>20 && data.main.temp_max>20) {
      return <span>shorts</span>;
    } else if (data.temp_min <20 && data.main.temp_max>20) {
      return <span>shorts and a jumper</span>;
    } else {
      return <span>something not too thin and not too thick</span>;
    }
  };
  return (
    <div className="container mx-auto">
      <div className="mt-3 mx-auto flex justify-center font-bold text-3xl" style={{ width: '60vw' }}>
        {data.main ? (
          <div className="text-center">
              <Image
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="weather status icon" width={300} height={300} />
              <div className="">
                 City Name: {data.name}
                <p>Temprature: {data.main.temp} &deg;C</p>
                <p>Sunrise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p>Sunset: {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
                <p>Description: {data.weather[0].main}</p>
                <p>Humidity: {data.main.humidity} %</p>
                <p>Day: {moment().format('dddd')}</p>
                <p>Date: {moment().format('LL')}</p>
                <p> wear {getClothingMsg()} </p>
              </div>
          </div>
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );

}