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
  it('assigned with id', function() {
    var ids, knight, _i, _len, _ref;
    ids = [];
    _ref = this.player.knights;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      knight = _ref[_i];
      ids.push(knight.id);
    }
    return expect(ids).toEqual([1, 2, 3, 4, 5, 6]);
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
  it('#promote passes button to new knight and reassign button.knightId', function() {
    var button, knight, newKnight;
    knight = this.player.buildKnight();
    button = {
      knightId: knight.id
    };
    knight.button = button;
    newKnight = knight.promote();
    expect(newKnight.button).toEqual(button);
    expect(knight.button).toBeNull();
    return expect(button.knightId).toEqual(newKnight.id);
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
  it('#desertFor returns undefined if another player cannot build equal knight', function() {
    var knight, player2, player2Knight, times;
    knight = this.player.buildKnight();
    player2 = this.game.players[1];
    for (times = 1; times <= 2; times++) {
      player2.buildKnight();
    }
    player2Knight = knight.desertFor(player2);
    return expect(player2Knight).toBeUndefined();
  });
  return it('#canBePromoted returns true if there are knights of level + 1 not in play', function() {
    var idx, knight, knight2;
    for (idx = 1; idx <= 2; idx++) {
      this.player.buildKnight().promote();
    }
    knight = this.player.buildKnight();
    expect(knight.canBePromoted()).toEqual(false);
    knight2 = this.player.knights.level(2)[0];
    return expect(knight2.canBePromoted()).toEqual(true);
  });
});