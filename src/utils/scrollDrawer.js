export const scrollDrawer = (length, svg, start, end) => {
  var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);

  var draw = length * mapRange(scrollpercent, start, end, 0, 1);
  
  // Reverse the drawing (when scrolling upwards)
  svg.style.strokeDashoffset = length - draw > 0 ? length - draw : 0;
}

// Maps n from the range (fromStart->fromEnd) to the range (toStart->toEnd).
function mapRange(n, fromStart, fromEnd, toStart, toEnd) {
  const out = toStart + (n - fromStart) * ((toEnd - toStart) / (fromEnd - fromStart));
  // Exclude any values outside to toStart->toEnd range
  return Math.min(toEnd, Math.max(toStart, out));
}