import React from "react";

import classes from "./BeatBox.module.css";

class BeatBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  blinker = () => {
    let currentlyLiteNumber = 1;
    setInterval(() => {
      if (currentlyLiteNumber - 1 > 0) {
        document
          .getElementById(currentlyLiteNumber - 1)
          .classList.remove("lite");
      } else {
        document.getElementById(4).classList.remove("lite");
      }

      document.getElementById(currentlyLiteNumber).classList.add("lite");

      currentlyLiteNumber < 4
        ? (currentlyLiteNumber += 1)
        : (currentlyLiteNumber = 1);
    }, 500);
  }

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
      </div>
    );
  }
}

export default BeatBox;
