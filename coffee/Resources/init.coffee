# Include files necessary for model side.
# I.e. anything required to run jasmine.

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
  'merchant',
  'metropolis',
  'player',
  'settlement',
  'soldier',
]
  Ti.include('models/' + file + '.js')
