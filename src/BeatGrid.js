import React from "react";
import { Grid } from "@material-ui/core";

function BeatGrid(props) {
  let measures = [1, 2, 3, 4];
  let liteGrid = [
    { kick: [1,0,1,0] },
    { snare: [0,1,0,1] },
    { hh: [1,1,1,1] },
  ]

  return (
    <div className="w250">
      <Grid container spacing={0}>
        <Grid>
          <Grid item>kick</Grid>
          <Grid item>snare</Grid>
          <Grid item>hh</Grid>
        </Grid>

        {measures.map((beat) => {
          return (
            <Grid key={"beat" + beat} id={"beat" + beat} container item xs={2}>
              <Grid className={props.beat === beat ? "lite" : ""}>
                <Grid item>[]</Grid>
                <Grid item>[]</Grid>
                <Grid item>[]</Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default BeatGrid;
