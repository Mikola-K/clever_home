import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

function App() {
  const [humidityState, setHumidity] = useState([])
  const [temperatureState, setTemperature] = useState([])
  const [clockState, setClockState] = useState("")

  useEffect (() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000)
    const interval = setInterval(() => {
    fetch()
      }, 10000)
      return () => clearInterval(interval)
  }, []);

  function fetch() {
    axios.get("http://localhost:3036/temperature").then((res) => {
        setTemperature(res.data)
        console.log(res.data);
    })
    axios.get("http://localhost:3036/humidity").then((res) => {
            setHumidity(res.data)
            console.log(res.data);
        })
  }

  function startMotor() {
    axios.get("http://localhost:3036/getOnMotor").then((response) => {
      console.log(response);
    });
  }
  function turnOffMotor() {
    axios.get("http://localhost:3036/getOffMotor").then((response) => {
      console.log(response);
    });
  }
  function startLed() {
    axios.get("http://localhost:3036/getOnLed").then((response) => {
      console.log(response);
    });
  }
  function turnOffLed() {
    axios.get("http://localhost:3036/getOffLed").then((response) => {
      console.log(response);
    });
  }
  function startLamp() {
    axios.get("http://localhost:3036/getOnLamp").then((response) => {
      console.log(response);
    });
  }
  function turnOffLamp() {
    axios.get("http://localhost:3036/getOffLamp").then((response) => {
      console.log(response);
    });
  }
  function startHumidifier() {
    axios.get("http://localhost:3036/getOnHumidifier").then((response) => {
      console.log(response);
    });
  }
  function turnOffHumidifier() {
    axios.get("http://localhost:3036/getOffHumidifier").then((response) => {
      console.log(response);
    });
  }
  function startRadiator() {
    axios.get("http://localhost:3036/getOnRadiator").then((response) => {
      console.log(response);
    });
  }
  function turnOffRadiator() {
    axios.get("http://localhost:3036/getOffRadiator").then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="app">
      <Header />
      <div className='buttons_to_click'>
        <div className='btn_click' >
          <h3>Motor</h3>
          <button className='btn btn-outline-success' onClick={startMotor}>start Motor</button>
          <button className='btn btn-outline-danger' onClick={turnOffMotor}>Turn of Motor</button>
        </div>
        <div className='btn_click' >
          <h3>Led</h3>
          <button className='btn btn-outline-success' onClick={startLed}>start Led</button>
          <button className='btn btn-outline-danger' onClick={turnOffLed}>Turn of Led</button>
        </div>
        <div className='btn_click' >
          <h3>Lamp</h3>
          <button className='btn btn-outline-success' onClick={startLamp}>start Lamp</button>
          <button className='btn btn-outline-danger' onClick={turnOffLamp}>Turn of Lamp</button>
        </div>
        <div className='btn_click' >
          <h3>Humidifier</h3>
          <button className='btn btn-outline-success' onClick={startHumidifier}>start Humidifier</button>
          <button className='btn btn-outline-danger' onClick={turnOffHumidifier}>Turn of humidifier</button>
        </div>
        <div className='btn_click' >
          <h3>Radiator</h3>
          <button className='btn btn-outline-success' onClick={startRadiator}>start Radiator</button>
          <button className='btn btn-outline-danger' onClick={turnOffRadiator}>Turn of Radiator</button>
        </div>
      </div>
      <div className='display_clock'>
        <div className='clock'>
          {clockState}
            <div className='clock_value'>
              {temperatureState[temperatureState.length - 1]?.value} C°
              <hr/>
              {humidityState[humidityState.length - 1]?.value} %
            </div>
        </div>
      </div>
     
    </div>
  );
}

export default App;
