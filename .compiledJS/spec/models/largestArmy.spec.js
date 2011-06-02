describe('LargestArmy', function() {
  return it('awarded to first player to play 3 soldiers', function() {
    var game, i, player;
    game = new Game();
    game.setup({
      numPlayers: 1
    });
    player = game.players[0];
    expect(player.hasLargestArmy()).toEqual(false);
    for (i = 1; i <= 3; i++) {
      player.playSoldier();
    }
    expect(player.hasLargestArmy()).toEqual(true);
    return expect(player.victoryPoints()).toEqual(4);
  });
});