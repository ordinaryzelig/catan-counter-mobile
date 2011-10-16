var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
describe('GameSettings', function() {
  return it('stores which expansions to use', function() {
    var settings;
    settings = new GameSettings({
      expansions: [CitiesAndKnights]
    });
    return expect(__indexOf.call(settings.expansions, CitiesAndKnights) >= 0).toEqual(true);
  });
});