# Include lib.
for file in ['buildable', 'playableSet']
  Ti.include('lib/' + file + '.js')

# Include models.
for file in ['city', 'game', 'largestArmy', 'longestRoad', 'player', 'settlement', 'soldier', 'developmentCardVictoryPoint']
  Ti.include('models/' + file + '.js')
