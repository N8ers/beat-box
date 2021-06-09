// libraries
import React from "react";
import { Card, Button } from "@material-ui/core";
import { PlayArrow, Stop } from "@material-ui/icons";

// components
import BeatGrid from "./BeatGrid";
import BpmSlider from "./BpmSlider";

// other
import kickSample from "./samples/kickSample.mp3";
import snareSample from "./samples/snareSample.mp3";
import hhSample from "./samples/highHatSample.mp3";

class BeatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkerIsOn: false,
      bpm: 120, // beats per minute
      beat: 1,
      liteGridCopy: {
        // this will be the current default
        // if user changes grid, it will update here also
        kick: [1, 0, 1, 0],
        snare: [0, 1, 0, 1],
        hh: [1, 1, 1, 1],
      },
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

      let { kick, snare, hh } = this.state.liteGridCopy;

      if (kick && kick[this.state.beat - 1]) {
        new Audio(kickSample).play();
      }

      if (snare && snare[this.state.beat - 1]) {
        new Audio(snareSample).play();
      }

      if (hh && hh[this.state.beat - 1]) {
        new Audio(hhSample).play();
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
            <PlayArrow />
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
            <Stop />
          </Button>
          <BpmSlider bpm={this.state.bpm} changeBPM={this.changeBPM} />
        </Card>
      </div>
    );
  }
}

export default BeatBox;
