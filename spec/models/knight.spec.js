describe('Knight', function() {
  beforeEach(function() {
    var settings;
    settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    this.game = new Game({
      numPlayers: 2,
      settings: settings
    });
    return this.player = this.game.players[0];
  });
  it('can be built', function() {
    expect(this.player.knights.inPlay().length).toEqual(0);
    this.player.buildKnight();
    return expect(this.player.knights.inPlay().length).toEqual(1);
  });
  it('can be activated', function() {
    var knight;
    knight = this.player.buildKnight();
    expect(knight.active).toEqual(false);
    knight.activate();
    return expect(knight.active).toEqual(true);
  });
  it('can be deactivated', function() {
    var knight;
    knight = this.player.buildKnight();
    knight.activate();
    knight.deactivate();
    return expect(knight.active).toEqual(false);
  });
  it('can be promoted', function() {
    var knight;
    knight = this.player.buildKnight();
    knight.activate();
    knight.promote();
    expect(this.player.knights.inPlay().level(1).length).toEqual(0);
    return expect(this.player.knights.inPlay().level(2).active().length).toEqual(1);
  });
  it('#promote throws error if attempted on level 3 knight', function() {
    var knight, level;
    knight = this.player.buildKnight();
    for (level = 2; level <= 3; level++) {
      knight = knight.promote();
    }
    expect(knight.level).toEqual(3);
    return expect(function() {
      return knight.promote();
    }).toThrow('level 3 knight cannot be promoted');
  });
  it('#promote throws error if no available knights to build', function() {
    var idx, knight;
    for (idx = 1; idx <= 2; idx++) {
      this.player.buildKnight().promote();
    }
    knight = this.player.buildKnight();
    return expect(function() {
      return knight.promote();
    }).toThrow('no level 2 knights available');
  });
  it('#desertFor destroys knight for 1 player, adds equal knight to other player', function() {
    var knight, player2, player2Knight;
    knight = this.player.buildKnight().promote();
    knight.activate();
    player2 = this.game.players[1];
    player2Knight = knight.desertFor(player2);
    expect(knight.active).toEqual(false);
    expect(knight.inPlay).toEqual(false);
    expect(player2Knight.player).toEqual(player2);
    expect(player2Knight.level).toEqual(2);
    return expect(player2Knight.active).toEqual(true);
  });
  return it('#desertFor returns undefined if another player cannot build equal knight', function() {
    var knight, player2, player2Knight, times;
    knight = this.player.buildKnight();
    player2 = this.game.players[1];
    for (times = 1; times <= 2; times++) {
      player2.buildKnight();
    }
    player2Knight = knight.desertFor(player2);
    return expect(player2Knight).toBeUndefined();
  });
});