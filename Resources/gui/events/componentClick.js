var componentClick, componentType, events, _i, _len, _ref;
events = {};
_ref = ['settlement', 'city', 'longestRoad', 'soldier', 'developmentCardVictoryPoint'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  componentType = _ref[_i];
  Ti.include(eventsPath("" + componentType + "Click.js"));
}
componentClick = function(event) {
  var functionName, fxn, item;
  item = event.item;
  functionName = "" + item.componentType + "Click";
  fxn = events[functionName];
  return fxn.apply(this, [gui.currentPlayer]);
};