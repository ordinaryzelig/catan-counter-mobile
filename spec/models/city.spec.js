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
  return it('can be downgraded to settlement', function() {
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
});