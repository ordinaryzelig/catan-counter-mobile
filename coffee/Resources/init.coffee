# Include lib.
for file in ['buildable', 'arrayFilters']
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
  'knight',
  'barbarians',
  'catanDefense',
]
  Ti.include('models/' + file + '.js')
