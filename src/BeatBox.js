import React from "react";

import classes from "./BeatBox.module.css";

class BeatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blinkerIsOn: false,
    };
  }

  turnBlinkerOff = () => {
    this.setState({
      blinkerIsOn: false,
    });
  };

  blinker = () => {
    this.setState({
      blinkerIsOn: true,
    });

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
    }, 500);
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
      </div>
    );
  }
}

export default BeatBox;
