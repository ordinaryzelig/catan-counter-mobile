pluralize = (str) ->
  switch str
    when 'settlement' then 'settlements'
    when 'city' then 'cities'
    else
      alert 'no pluralization for ' + str

currentPlayer = ->
  game.players[colorNav.index]

# Custom badge.
badge = (text, options = {}) ->
  labelOpts = {
    text: text,
    textAlign: 'center',
    height: 25,
    width: 25,
    color: 'white',
    backgroundColor: 'red',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 12.5,
    shadowColor: 'black',
  }
  for attr, value of options
    labelOpts[attr] = value
  Ti.UI.createLabel(labelOpts)
