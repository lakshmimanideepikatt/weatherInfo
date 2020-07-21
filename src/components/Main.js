import React, {useState} from 'react'
import Header from "./Header"
import axios from "axios"
import Content from "./Content"
import WeatherSearch from "./WeatherSearch"
import WeatherData from "./WeatherData"
import Context from "../Context"
import Error from "./Error"
const Main=()=>{
    const [weather,setWeather]=useState()
    const [city,setCity]=useState()
    const [error,setError]=useState()
    const api_call=async e=>{
        e.preventDefault()
        const location=e.target.elements.location.value
        if(!location) return setError("Please enter the name of the city") ,setWeather(null)
        const API_KEY="4a2cb7377d2227f5484d03a917e9c27f"
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
       const request= axios.get(url)
       const response=await request
       setWeather(response.data.main)
       setCity(response.data.name)
       setError(null)
    }
    weather&&console.log(weather)
    return(
        <div className="main">
            <Header/>
            <Content>
                <Context.Provider value={{api_call,weather,city}}>
                <WeatherSearch />
               {weather&& <WeatherData />}
               {!weather&&<Error error={error}/>}
                </Context.Provider>
                
            </Content>
        </div>
    )
}
export default Main