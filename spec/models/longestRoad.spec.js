describe('LongestRoad', function() {
  return it('is worth 2 victory points', function() {
    var game, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    game.awardLongestRoadTo(player);
    expect(player.hasLongestRoad()).toEqual(true);
    return expect(player.victoryPoints()).toEqual(4);
  });
});