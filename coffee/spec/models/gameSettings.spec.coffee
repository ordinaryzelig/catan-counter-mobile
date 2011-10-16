describe 'GameSettings', ->

  it 'stores which expansions to use', ->
    settings = new GameSettings({expansions: [CitiesAndKnights]})
    expect(CitiesAndKnights in settings.expansions).toEqual(true)
