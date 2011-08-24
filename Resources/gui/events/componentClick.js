var componentClick;
Ti.include('/gui/events/settlementClick.js');
Ti.include('/gui/events/cityClick.js');
Ti.include('/gui/events/longestRoadClick.js');
Ti.include('/gui/events/soldierClick.js');
componentClick = function(event) {
  var item;
  item = event.item;
  switch (item.componentType) {
    case 'settlement':
      return settlementClick(gui.currentPlayer);
    case 'city':
      return cityClick(gui.currentPlayer);
    case 'longest road':
      return longestRoadClick(gui.currentPlayer);
    case 'soldier':
      return soldierClick(gui.currentPlayer);
  }
};