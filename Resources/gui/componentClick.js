var componentClick;
Ti.include('/gui/settlementClick.js');
Ti.include('/gui/cityClick.js');
componentClick = function(event) {
  var item;
  item = event.item;
  switch (item.componentType) {
    case 'settlement':
      return settlementClick(gui.currentPlayer);
    case 'city':
      return cityClick(gui.currentPlayer);
  }
};