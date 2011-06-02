Titanium.UI.setBackgroundColor('#000');

var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({
    title:'Tab 1',
    backgroundColor:'#fff'
});

var tab1 = Titanium.UI.createTab({
    //icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win1
});
tab1.badge = 1;

tabGroup.addTab(tab1);

tabGroup.open();
