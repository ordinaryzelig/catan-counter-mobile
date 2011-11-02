var badge, basicAlert, confirmationAlert, createKnightButton, createKnightRow, dashboardItem, eventsPath, guiPath, illegalActionAlert, imagesPath, knightImagePath, pluralize, reorderByColor, tabsPath, viewsPath;
pluralize = function(str, num) {
  var newStr;
  if (num == null) {
    num = null;
  }
  newStr = (function() {
    switch (str) {
      case 'city':
        return 'cities';
      default:
        return str + 's';
    }
  })();
  if (num != null) {
    if (num === 1) {
      return "" + num + " " + str;
    } else {
      return "" + num + " " + newStr;
    }
  } else {
    return newStr;
  }
};
badge = function(text, options) {
  var attr, labelOpts, value;
  if (options == null) {
    options = {};
  }
  labelOpts = {
    text: text,
    textAlign: 'center',
    height: 25,
    width: 25,
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12.5
  };
  for (attr in options) {
    value = options[attr];
    labelOpts[attr] = value;
  }
  return Ti.UI.createLabel(labelOpts);
};
dashboardItem = function(atts) {
  var item;
  item = Ti.UI.createDashboardItem({
    image: atts['image'],
    canDelete: false
  });
  item.componentType = atts['componentType'];
  item.badge = atts['badge'];
  return item;
};
reorderByColor = function(colors, coloredObjects) {
  var color, object, reordered, _i, _j, _len, _len2;
  reordered = [];
  for (_i = 0, _len = colors.length; _i < _len; _i++) {
    color = colors[_i];
    for (_j = 0, _len2 = coloredObjects.length; _j < _len2; _j++) {
      object = coloredObjects[_j];
      if (object.playerColor === color) {
        reordered.push(object);
      }
    }
  }
  return reordered;
};
guiPath = function(path) {
  return "/gui/" + path;
};
viewsPath = function(path) {
  return guiPath("views/" + path);
};
eventsPath = function(path) {
  return guiPath("events/" + path);
};
imagesPath = function(path) {
  return "/images/" + path;
};
tabsPath = function(path) {
  return imagesPath("tabs/" + path);
};
knightImagePath = function(knight) {
  var path;
  path = 'knights/' + knight.player.color + '_' + knight.level;
  if (knight.active) {
    path = path + '_activated';
  }
  path = path + '.png';
  return imagesPath(path);
};
basicAlert = function(title, message) {
  return Ti.UI.createAlertDialog({
    title: title,
    message: message
  }).show();
};
illegalActionAlert = function(message) {
  return basicAlert("You can't do that", message);
};
confirmationAlert = function(title, message) {
  return Ti.UI.createAlertDialog({
    title: title,
    message: message,
    buttonNames: ['OK', 'Cancel'],
    cancel: 1
  });
};
createKnightButton = function(knight) {
  return Ti.UI.createButton({
    backgroundImage: knightImagePath(knight),
    playerColor: knight.player.color,
    knightId: knight.id,
    height: 60,
    width: 60
  });
};
createKnightRow = function(knight) {
  var knightButton, row;
  row = Ti.UI.createTableViewRow({
    backgroundColor: 'transparent',
    height: 60
  });
  knightButton = createKnightButton(knight);
  knightButton.addEventListener('click', function(event) {
    var button, player;
    button = event.source;
    player = game.playersByColor[button.playerColor];
    knight = player.knights.findById(button.knightId);
    return events.knightClick(knight);
  });
  knight.button = knightButton;
  knight.row = row;
  row.add(knightButton);
  return row;
};