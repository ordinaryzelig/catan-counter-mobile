# Include lib.
for file in ['buildable', 'arrayFilters']
  Ti.include('lib/' + file + '.js')

# Include vendor.
for file in ['underscore']
  Ti.include('vendor/' + file + '.js')

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
  'barbariansBattleOutcome',
  'defenderOfCatanCard',
]
  Ti.include('models/' + file + '.js')
