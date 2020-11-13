import React from "react";
import SimpleSlider from "./SimpleSlider";

export default class Docs extends React.Component {
  render() {
    return (
      <div className="">
        <div className="title-bar primary">
          <span className="title">React Slick</span>
        </div>
        <div className="">
          <div className="">
            <SimpleSlider />
          </div>
        </div>
      </div>
    );
  }
}