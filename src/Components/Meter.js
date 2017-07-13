import React from 'react';


var Meter = function (props) {
  var {
    percent = Math.random(),         // a number between 0 and 1, inclusive
    width = 65,         // the overall width
    height = 20,         // the overall height
    rounded = true,      // if true, use rounded corners
    color = "#0078bc",   // the fill color
    animate = false,     // if true, animate when the percent changes
    label = null         // a label to describe the contents (for accessibility)
  } = props;

  var r = rounded ? Math.ceil(height / 2) : 0;
  var w = percent ? Math.max(height, width * Math.min(percent, 1)) : 0;
  var style = animate ? { "transition": "width 500ms, fill 250ms" } : null;

  return (
    <svg width={width} height={height} aria-label={label} >
      <rect width={width} height={height} fill="#ccc" rx={r} ry={r} data-tooltip={label}/>
      <rect width={w} height={height} fill={color} rx={r} ry={r} style={style} data-tooltip={label}/>
    </svg>
  );
};

export default Meter