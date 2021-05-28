const calculateChildPosition = function calculateChildPosition({
  parent,
  child,
}) {
  // center the child window relative to the parent window
  return {
    left: (parent.width / 2) - (child.width / 2) + parent.left,
    top: (parent.height / 2) - (child.height / 2) + parent.top,
  };
};

const windowOpen = function windowOpen(url) {
  const child = {
    width: 800,
    height: 600,
  };

  const childPosition = calculateChildPosition({
    parent: {
      width: window.outerWidth,
      height: window.outerHeight,
      left: window.screenLeft,
      top: window.screenTop,
    },
    child,
  });

  const features = [
    'toolbar=no',
    'location=no',
    'directories=no',
    'status=no',
    'menubar=no',
    'scrollbars=no',
    'resizable=no',
    'copyhistory=no',
    `width=${child.width}`,
    `height=${child.height}`,
    `left=${childPosition.left}`,
    `top=${childPosition.top}`,
  ];
  return window.open(url, 'eID Easy', features.join(', '));
};

export default windowOpen;
export { calculateChildPosition };
