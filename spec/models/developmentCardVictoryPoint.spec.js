describe('DevelopmentCardVictoryPoint', function() {
  it('is worth 1 victory point each', function() {
    var game, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    player.showDevelopmentCardVictoryPoints(2);
    expect(player.developmentCardVictoryPoints.length).toEqual(2);
    return expect(player.victoryPoints()).toEqual(4);
  });
  return it('#build assigns player and is marked as inPlay', function() {
    var card, game, player;
    game = new Game({
      numPlayers: 1
    });
    player = game.players[0];
    player.showDevelopmentCardVictoryPoints(1);
    card = player.developmentCardVictoryPoints[0];
    expect(card.inPlay).toEqual(true);
    return expect(card.player).toEqual(player);
  });
});