import React from "react";

import { Slider } from "@material-ui/core";

import classes from "./BeatBox.module.css";

class BeatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkerIsOn: false,
      bpm: 120, // beats per minute
    };
  }

  turnBlinkerOff = () => {
    this.setState({
      blinkerIsOn: false,
    });
  };

  beatsPerMilliSecond = () => {
    return 60000 / this.state.bpm;
  };

  changeBPM = (event, newValue) => {
    this.setState({
      bpm: newValue
    })
  };

  blinker = () => {
    this.setState({
      blinkerIsOn: true,
    });

    let beatsPerMilliSecond = this.beatsPerMilliSecond();
    let currentlyLiteNumber = 1;

    let intervalId = setInterval(() => {
      if (!this.state.blinkerIsOn) {
        clearInterval(intervalId);
      }

      if (currentlyLiteNumber - 1 > 0) {
        document
          .getElementById(currentlyLiteNumber - 1)
          .classList.remove(classes["lite"]);
      } else {
        document.getElementById(4).classList.remove(classes["lite"]);
      }

      document
        .getElementById(currentlyLiteNumber)
        .classList.add(classes["lite"]);

      currentlyLiteNumber < 4
        ? (currentlyLiteNumber += 1)
        : (currentlyLiteNumber = 1);
    }, beatsPerMilliSecond);
  };

  render() {
    return (
      <div className={classes.BeatBox}>
        <div>
          <span id={1}>1</span>
          <span id={2}>2</span>
          <span id={3}>3</span>
          <span id={4}>4</span>
        </div>
        <button onClick={() => this.blinker()}>Start Blinker</button>
        <button onClick={() => this.turnBlinkerOff()}>Stop Blinker</button>
        <div className={classes.w250}>
          <div>BPM: {this.state.bpm}</div>
          <Slider
            value={this.state.bpm}
            max={208}
            min={40}
            onChange={this.changeBPM}
            aria-labelledby="input-slider"
          />
        </div>
      </div>
    );
  }
}

export default BeatBox;
