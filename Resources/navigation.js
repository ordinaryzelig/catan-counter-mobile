var navigation, tab, window;
navigation = Titanium.UI.createTabGroup();
window = Titanium.UI.createWindow()
tab = Titanium.UI.createTab({
  window: window,
  icon: Titanium.UI.iPhone.SystemIcon.BOOKMARKS
});
navigation.addTab(tab);
navigation.open();
