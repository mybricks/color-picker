import React from "react";
import { PointerProps } from "@uiw/react-color-alpha/esm/Pointer";

const Bar = (props: PointerProps) => (
  <div
    style={{
      boxShadow: "rgb(0 0 0 / 60%) 0px 0px 2px",
      width: 4,
      top: 1,
      bottom: 1,
      left: props.left,
      borderRadius: 1,
      position: "absolute",
      backgroundColor: "#fff",
    }}
  />
);

export default Bar;
