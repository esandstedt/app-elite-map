import React, { createRef } from "react";

const rgb = function(r, g, b) {
  const toHex = value => {
    var hex = Number(Math.max(0, Math.min(value, 255))).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  var red = toHex(r);
  var green = toHex(g);
  var blue = toHex(b);

  return "#" + red + green + blue;
};

export class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvas = createRef();
  }

  componentDidMount() {
    const ctx = this.canvas.current.getContext("2d");

    let minX = 1000000;
    let maxX = 0;

    let minY = 1000000;
    let maxY = 0;

    let minW = 1000000;
    let maxW = 0;

    ctx.beginPath();
    ctx.rect(0, 0, 1000, 1000);
    ctx.fillStyle = "#000";
    ctx.fill();

    this.props.sectors.forEach(sector => {
      const gridX = parseInt(sector.gridX, 10);
      const gridY = parseInt(sector.gridY, 10);

      const x = gridX + 500;
      const y = 700 - gridY;
      const w = 32 + Math.round(8 * (Math.sqrt(sector.count) - 1));

      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);

      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);

      minW = Math.min(minW, w);
      maxW = Math.max(maxW, w);

      ctx.beginPath();
      ctx.rect(x, y, 1, 1);
      ctx.fillStyle = rgb(w, w, w);

      ctx.fill();
    });

    console.log("x", { min: minX, max: maxX });
    console.log("y", { min: minY, max: maxY });
    console.log("w", { min: minW, max: maxW });
  }

  render() {
    return <canvas ref={this.canvas} width={1000} height={1000} />;
  }
}
