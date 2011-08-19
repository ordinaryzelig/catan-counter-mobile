pluralize = (str) ->
  switch str
    when 'settlement' then 'settlements'
    when 'city' then 'cities'
    else
      alert 'no pluralization for ' + str

flexSpace = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE})

currentPlayer = ->
  game.players[colorNav.index]
