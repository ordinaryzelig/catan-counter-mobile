events = {}

files = [
  'componentClick',
  'settlementClick',
  'cityClick',
  'longestRoadClick',
  'soldierClick',
  'developmentCardVictoryPointClick',
  'knightsClick',
  'knightClick',
  'knightDesertClick',
]

for file in files
  Ti.include(eventsPath("#{file}.js"))
