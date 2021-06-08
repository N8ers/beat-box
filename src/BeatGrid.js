import React from "react";
import { Grid } from "@material-ui/core";

class BeatGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      measures: [1, 2, 3, 4],
      liteGrid: {
        kick: [1, 0, 1, 0],
        snare: [0, 1, 0, 1],
        hh: [1, 1, 1, 1],
      },
    };
  }

  toggleLite = (beat, kitPiece) => {
    let newGrid = this.state.liteGrid;
    let newValue = newGrid[kitPiece][beat - 1] === 0 ? 1 : 0;
    newGrid[kitPiece][beat - 1] = newValue;

    this.setState({
      liteGrid: newGrid,
    });

    this.updateGridState();
  };

  updateGridState = () => {
    this.props.updatedGrid(this.state.liteGrid);
  };

  render() {
    return (
      <div className="w250">
        <Grid container spacing={0}>
          <Grid>
            <Grid item>kick</Grid>
            <Grid item>snare</Grid>
            <Grid item>hh</Grid>
          </Grid>

          {this.state.measures.map((beat) => {
            return (
              <Grid
                key={"beat" + beat}
                id={"beat" + beat}
                container
                item
                xs={2}
              >
                <Grid className={this.props.beat === beat ? "lite" : ""}>
                  <Grid
                    item
                    onClick={() => this.toggleLite(beat, "kick")}
                    className={
                      this.state.liteGrid["kick"][beat - 1] === 1
                        ? "selected-box"
                        : ""
                    }
                  >
                    <div className="box"></div>
                  </Grid>
                  <Grid
                    item
                    onClick={() => this.toggleLite(beat, "snare")}
                    className={
                      this.state.liteGrid["snare"][beat - 1] === 1
                        ? "selected-box"
                        : ""
                    }
                  >
                    <div className="box"></div>
                  </Grid>
                  <Grid
                    item
                    onClick={() => this.toggleLite(beat, "hh")}
                    className={
                      this.state.liteGrid["hh"][beat - 1] === 1
                        ? "selected-box"
                        : ""
                    }
                  >
                    <div className="box"></div>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default BeatGrid;
