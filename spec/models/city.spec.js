describe('City', function() {
  it('is worth 2 victory points each', function() {
    var game, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.victoryPoints()).toEqual(2);
    player.buildCity();
    return expect(player.victoryPoints()).toEqual(3);
  });
  it('can be downgraded to settlement', function() {
    var game, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    player.buildCity();
    player.downgradeCity();
    expect(player.settlements.inPlay().length).toEqual(2);
    return expect(player.cities.inPlay().length).toEqual(0);
  });
  return it('is completely destroyed if no more settlements to build', function() {
    var game, idx, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    for (idx = 1; idx <= 3; idx++) {
      player.buildSettlement();
    }
    for (idx = 1; idx <= 4; idx++) {
      player.buildCity();
    }
    for (idx = 1; idx <= 4; idx++) {
      player.buildSettlement();
    }
    expect(player.destroysCityIfDowngraded()).toEqual(true);
    player.downgradeCity();
    expect(player.cities.inPlay().length).toEqual(3);
    expect(player.settlements.inPlay().length).toEqual(5);
    return expect(player.victoryPoints()).toEqual(11);
  });
});