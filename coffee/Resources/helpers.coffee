pluralize = (str) ->
  switch str
    when 'settlement' then 'settlements'
    when 'city' then 'cities'

flexSpace = Titanium.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE})
