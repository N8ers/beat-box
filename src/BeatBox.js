// libraries
import React from "react";
import { Card, Button } from "@material-ui/core";

// components
import BeatGrid from "./BeatGrid";
import BpmSlider from "./BpmSlider";

class BeatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkerIsOn: false,
      bpm: 120, // beats per minute
      beat: 1,
      liteGridCopy: {},
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
      bpm: newValue,
    });
  };

  updatedGrid = (newValue) => {
    this.setState({
      liteGridCopy: newValue,
    });
  };

  blinker = () => {
    this.setState({
      blinkerIsOn: true,
    });

    let beatsPerMilliSecond = this.beatsPerMilliSecond();
    let currentlyLiteNumber = 1;

    let intervalId = setInterval(() => {
      this.setState({
        beat: currentlyLiteNumber,
      });

      if (!this.state.blinkerIsOn) {
        clearInterval(intervalId);
      }

      // if (currentlyLiteNumber - 1 > 0) {
      //   document
      //     .getElementById(currentlyLiteNumber - 1)
      //     .classList.remove("lite");
      // } else {
      //   document.getElementById(4).classList.remove("lite");
      // }

      // document.getElementById(currentlyLiteNumber).classList.add("lite");

      currentlyLiteNumber < 4
        ? (currentlyLiteNumber += 1)
        : (currentlyLiteNumber = 1);
    }, beatsPerMilliSecond);
  };

  render() {
    return (
      <div className="background">
        <div className="ungracefulSpacer"></div>
        <Card className="BeatBox">
          <div className="header">BeatBox</div>
          {/* <div className="beatNumbers">
            <span id={1}>1</span>
            <span id={2}>2</span>
            <span id={3}>3</span>
            <span id={4}>4</span>
          </div> */}
          <BeatGrid beat={this.state.beat} updatedGrid={this.updatedGrid} />
          <Button
            variant="contained"
            style={{
              borderRadius: 5,
              backgroundColor: "#aaf0d1",
              margin: "5px",
            }}
            onClick={() => this.blinker()}
          >
            Start Blinker
          </Button>
          <Button
            variant="contained"
            style={{
              borderRadius: 5,
              backgroundColor: "#f09f92",
              margin: "5px",
            }}
            onClick={() => this.turnBlinkerOff()}
          >
            Stop Blinker
          </Button>
          <BpmSlider bpm={this.state.bpm} changeBPM={this.changeBPM} />
        </Card>
      </div>
    );
  }
}

export default BeatBox;
