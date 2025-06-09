import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';

function App() {

  const[city,setcity]=useState('');
  const[weather,setweather]=useState(null);
  const[error,seterror]=useState('');
  const[darkmode,setdarkmode]=useState(false);


  useEffect(() => {
    document.body.className = darkmode ? 'dark' : '';  }, [darkmode]);


  const fetchweather=async()=>{
    if(!city) return;

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
       const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


      try{
        const res=await fetch(url);
        const data=await res.json();
      
      if(data.cod===200){
        setweather(data);
        seterror('');
      } else{
        setweather(null);
        seterror(data.message);
      }
  } catch(err){
    seterror("falied");
  }

  }
  return (
       <div className="App">
      <button className="toggle-btn" onClick={() => setdarkmode(!darkmode)}>
        {darkmode ? '🌞 ' : '🌙'}
      </button>

     <h1>🌦️ weather app</h1>
     <input type='text' placeholder='enter city' value={city} onChange={(e)=>setcity(e.target.value)}/>
     <button onClick={fetchweather}>getweather</button>


 {error && <p style={{ color: 'red' }}>{error}</p>}


      {weather && (

     <div className='weather-info'>
      <img
    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
    alt="Weather Icon"
    style={{ width: '120px', height: '100px' }}
  />

       <h2>{weather.name},{weather.sys.country}</h2>
                    <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
     </div>
      )}
    </div>
  );
}

export default App;
