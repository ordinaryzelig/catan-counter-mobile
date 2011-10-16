describe('Soldier', function() {
  return it('is played by a player', function() {
    var game, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    player.playSoldier();
    expect(player.soldiers.length).toEqual(1);
    return expect(game.soldiers.notInPlay().length).toEqual(13);
  });
});