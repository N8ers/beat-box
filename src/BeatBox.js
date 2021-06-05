// libraries
import React from "react";
import * as Tone from "tone";
import { Card, Button } from "@material-ui/core";
import { PlayArrow, Stop } from '@material-ui/icons';

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

      const synthKick = new Tone.Synth().toDestination();
      const synthSnare = new Tone.Synth().toDestination();
      const synthHH = new Tone.Synth().toDestination();
      const now = Tone.now();

      let { kick, snare, hh } = this.state.liteGridCopy;

      if (kick && kick[this.state.beat - 1]) {
        synthKick.triggerAttack("C4", now);
        synthKick.triggerRelease(now + 1);
      }
      if (snare && snare[this.state.beat - 1]) {
        synthSnare.triggerAttack("E4", now);
        synthSnare.triggerRelease(now + 1);
      }
      if (hh && hh[this.state.beat - 1]) {
        synthHH.triggerAttack("G4", now);
        synthHH.triggerRelease(now + 1);
        const player = new Tone.Player(
          "https://tonejs.github.io/audio/berklee/gong_1.mp3"
        ).toDestination();
        Tone.loaded().then(() => {
          player.start();
        });
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
