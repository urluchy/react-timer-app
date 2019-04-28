import React, { Component } from 'react';
import './App.css';

import Time from './components/Time';
import Actions from './components/Actions';
import Laps from './components/Laps';

class App extends Component {
  constructor() {
    super();

    this.state = {
      time: 0,
      formattedTime: "00:00:00",
      timerState: "stopped",
      laps: [],
      lap: 0
    }

    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.lap = this.lap.bind(this);
    

  }

  startTimer () {
    this.timer = setInterval(() => {
      this.setState({
        time: this.state.time + 1,
        formattedTime: this.formatTime(this.state.time + 1),
        timerState: "running" 
      });

    }, 1000); 

    console.log("Timer has started...");

  }
  
  pauseTimer () {
    clearInterval(this.timer);
    this.setState({
      timerState: 'paused'
    });
  }

  stopTimer () {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      formattedTime: "00:00:00",
      timerState: "stopped"
    });

    console.log("Timer has stopped.");
  }

  lap () {
    let laps = this.state.laps;
    laps.push(this.state.time);
    this.setState({
      lap: this.state.time,
      laps: laps
    });
    console.log("Lapped, ", this.state.lap );
  }

  formatTime (secs) {
    let date = new Date(null);
    date.setSeconds(secs); 
    let formattedTime = date.toISOString().substr(11, 8);

    return formattedTime;
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
           <h3>Timer<span>app</span></h3>
        </header>
        <Time time={this.state.formattedTime} />
        <Actions 
          timerState={this.state.timerState} 
          startTimer={this.startTimer}
          pauseTimer={this.pauseTimer}
          stopTimer={this.stopTimer}
          lap={this.lap}
        />
        <Laps laps={this.state.laps} formatTime={this.formatTime}  />
      </div>
    )
  }
}

export default App;
