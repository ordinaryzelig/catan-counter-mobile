describe('City', function() {
  return it('is worth 2 victory points each', function() {
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
});