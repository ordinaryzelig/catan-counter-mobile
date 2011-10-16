# Include lib.
for file in ['buildable', 'playableSet']
  Ti.include('lib/' + file + '.js')

# Include expansions.
for file in ['citiesAndKnights']
  Ti.include('models/expansions/' + file + '.js')

# Include models.
for file in [
  'city',
  'game',
  'largestArmy',
  'longestRoad',
  'player',
  'settlement',
  'soldier',
  'developmentCardVictoryPoint',
  'gameSettings',
]
  Ti.include('models/' + file + '.js')
