"use client"
import Image from 'next/image'
import Link from "next/link"
import { Inter } from '@next/font/google'
import styles from './page.module.css'

import React, { useState,useEffect } from "react";

export default function App(this: any) {
  
  const [lat, setLat] = useState({});
  const [long, setLong] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    const url_env = process.env.REACT_APP_API_URL;
    const key_env = process.env.REACT_APP_API_KEY;

    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      await fetch(`${url_env}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${key_env}`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log(result);
      });
    }
    fetchData();
  }, [lat,long])
  
  return (
    <div className="App">
    {process.env.REACT_APP_API_URL}
    </div>
  );
}