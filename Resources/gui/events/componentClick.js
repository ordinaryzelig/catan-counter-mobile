var componentClick;
componentClick = function(event) {
  var functionName, fxn, item;
  item = event.item;
  functionName = "" + item.componentType + "Click";
  fxn = events[functionName];
  return fxn.apply(this, [gui.currentPlayer]);
};