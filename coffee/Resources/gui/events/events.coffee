events = {}

files = [
  'barbariansAttackClick',
  'cityClick',
  'componentClick',
  'developmentCardVictoryPointClick',
  'knightClick',
  'knightDesertClick',
  'knightsClick',
  'longestRoadClick',
  'settlementClick',
  'soldierClick',
]

for file in files
  Ti.include(eventsPath("#{file}.js"))
