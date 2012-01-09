gui.showNewGameWindow = function(allowCancel) {
  var buttonHeight, buttonOffset, buttonWidth, buttonsView, cancelButton, createGameButton, expansion, expansions, expansionsTable, fontOptions, label, newGameWindow, onOffSwitch, row, table, _i, _len, _ref;
  if (allowCancel == null) {
    allowCancel = true;
  }
  fontOptions = {
    fontSize: 16,
    fontWeight: 'bold'
  };
  expansions = [];
  expansionsTable = Ti.UI.createTableViewSection({
    headerTitle: 'Choose expansions'
  });
  _ref = Game.EXPANSIONS;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    expansion = _ref[_i];
    row = Ti.UI.createTableViewRow();
    label = Ti.UI.createLabel({
      text: expansion.name,
      left: 10,
      font: fontOptions
    });
    row.add(label);
    onOffSwitch = Ti.UI.createSwitch({
      value: false,
      right: 10
    });
    onOffSwitch.addEventListener('change', function(event) {
      if (event.value) {
        return expansions.push(expansion);
      } else {
        return expansions.splice(expansions.indexOf(expansion), 1);
      }
    });
    row.add(onOffSwitch);
    row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
    expansionsTable.add(row);
  }
  expansionsTable.expansions = function() {
    var onOffSwitch, _j, _len2, _ref2;
    expansions = [];
    _ref2 = this.switches;
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      onOffSwitch = _ref2[_j];
      if (onOffSwitch.value) {
        expansions.push(onOffSwitch.expansion);
      }
    }
    return expansions;
  };
  buttonsView = Ti.UI.createView({
    height: 80
  });
  buttonHeight = 40;
  buttonWidth = 140;
  buttonOffset = 15;
  if (allowCancel) {
    cancelButton = Ti.UI.createButton({
      title: 'Cancel',
      height: buttonHeight,
      width: buttonWidth,
      font: fontOptions,
      left: buttonOffset
    });
    cancelButton.addEventListener('click', function() {
      return newGameWindow.close();
    });
    buttonsView.add(cancelButton);
  }
  createGameButton = Ti.UI.createButton({
    title: 'Create game',
    height: buttonHeight,
    width: buttonWidth,
    font: fontOptions
  });
  if (allowCancel) {
    createGameButton.right = buttonOffset;
  }
  createGameButton.addEventListener('click', function() {
    var settings;
    settings = new GameSettings({
      expansions: expansions
    });
    gui.createNewGame(settings);
    return newGameWindow.close();
  });
  buttonsView.add(createGameButton);
  expansionsTable.footerView = buttonsView;
  table = Ti.UI.createTableView({
    data: [expansionsTable],
    scrollabel: false,
    style: Ti.UI.iPhone.TableViewStyle.GROUPED
  });
  newGameWindow = Ti.UI.createWindow({
    title: 'New game'
  });
  newGameWindow.add(table);
  return newGameWindow.open({
    modal: true,
    modalStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL,
    modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_COVER_VERTICAL
  });
};