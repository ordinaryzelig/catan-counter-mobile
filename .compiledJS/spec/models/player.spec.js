describe('Player', function() {
  beforeEach(function() {
    return this.addMatchers({
      toAllBelongToPlayer: function(player) {
        var object, _i, _len, _ref;
        _ref = this.actual;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          object = _ref[_i];
          if (object.player !== player) {
            return false;
          }
        }
        return true;
      }
    });
  });
  it('#setup creates settlements and cities', function() {
    var player;
    player = new Player();
    player.setup();
    expect(player.settlements.length).toEqual(5);
    expect(player.settlements).toAllBelongToPlayer(player);
    expect(player.cities.length).toEqual(4);
    return expect(player.cities).toAllBelongToPlayer(player);
  });
  return it('starts with 2 settlements built', function() {
    var player;
    player = new Player();
    player.setup();
    return expect(player.settlements.inPlay().length).toEqual(2);
  });
});