import React from "react";
import { Slider } from "@material-ui/core";

function BpmSlider(props) {
  return (
    <div className="w250">
      <div>BPM: {props.bpm}</div>
      <Slider
        value={props.bpm}
        max={208}
        min={40}
        onChange={props.changeBPM}
        aria-labelledby="input-slider"
      />
    </div>
  );
}

export default BpmSlider;
