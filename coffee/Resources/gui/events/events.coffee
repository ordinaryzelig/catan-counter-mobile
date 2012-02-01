events = {}

files = [
  'barbariansAttackClick',
  'cityClick',
  'componentClick',
  'defenderOfCatanCardClick',
  'developmentCardVictoryPointClick',
  'knightClick',
  'knightDesertClick',
  'knightsClick',
  'longestRoadClick',
  'merchantClick',
  'metropolisClick',
  'metropolisesClick',
  'settlementClick',
  'soldierClick',
]

for file in files
  Ti.include(eventsPath("#{file}.js"))
