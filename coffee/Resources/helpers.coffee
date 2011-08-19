pluralize = (str) ->
  switch str
    when 'settlement' then 'settlements'
    when 'city' then 'cities'
    else
      alert 'no pluralization for ' + str

currentPlayer = ->
  game.players[colorNav.index]
