# Include lib.
for file in ['buildable', 'arrayFilters', 'arrayExtensions']
  Ti.include('lib/' + file + '.js')

# Include vendor.
for file in ['underscore']
  Ti.include('vendor/' + file + '.js')

# Include expansions.
for file in ['citiesAndKnights']
  Ti.include('models/expansions/' + file + '.js')

# Include models.
for file in [
  'barbarians',
  'barbariansBattleOutcome',
  'catanDefense',
  'city',
  'defenderOfCatanCard',
  'developmentCardVictoryPoint',
  'game',
  'gameSettings',
  'knight',
  'largestArmy',
  'longestRoad',
  'metropolis',
  'player',
  'settlement',
  'soldier',
]
  Ti.include('models/' + file + '.js')
