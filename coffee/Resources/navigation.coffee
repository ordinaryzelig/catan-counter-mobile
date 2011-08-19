# Create tab group (black bar at bottom and title bar at top).

navigation = Titanium.UI.createTabGroup()

window = Titanium.UI.createWindow()
tab = Titanium.UI.createTab({
  window: window,
  icon:   Titanium.UI.iPhone.SystemIcon.BOOKMARKS
})

navigation.addTab(tab)
navigation.open()
