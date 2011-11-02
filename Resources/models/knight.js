var Knight;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Knight = (function() {
  __extends(Knight, Buildable);
  function Knight(atts) {
    if (atts == null) {
      atts = {};
    }
    Knight.__super__.constructor.apply(this, arguments);
    this.player = atts['player'];
    this.level = atts['level'];
    this.active = false;
    this.id = atts['id'];
  }
  Knight.prototype.activate = function() {
    return this.active = true;
  };
  Knight.prototype.deactivate = function() {
    return this.active = false;
  };
  Knight.prototype.promote = function() {
    var knightToBuild, nextLevel;
    if (this.level === 3) {
      throw 'level 3 knight cannot be promoted';
    }
    nextLevel = this.level + 1;
    knightToBuild = this.player.knights.notInPlay().level(nextLevel)[0];
    if (knightToBuild == null) {
      throw "no level " + nextLevel + " knights available";
    }
    this.destroy();
    knightToBuild.build();
    if (this.active) {
      knightToBuild.activate();
      this.deactivate();
    }
    this.moveGuiComponentsTo(knightToBuild);
    return knightToBuild;
  };
  Knight.prototype.desertFor = function(otherPlayer) {
    var otherPlayersKnight;
    otherPlayersKnight = otherPlayer.knights.notInPlay().level(this.level)[0];
    if (otherPlayersKnight != null) {
      otherPlayersKnight.build();
      if (this.active) {
        otherPlayersKnight.activate();
      }
    }
    this.destroy();
    this.deactivate();
    return otherPlayersKnight;
  };
  Knight.prototype.moveGuiComponentsTo = function(knight) {
    if (this.button != null) {
      this.button.knightId = knight.id;
      knight.button = this.button;
      this.button = null;
    }
    if (this.row != null) {
      return knight.row = this.row;
    }
  };
  Knight.prototype.humanize = function() {
    var string;
    string = 'level ' + this.level;
    if (this.active) {
      string = string + ' activated';
    }
    string = string + ' knight';
    return string;
  };
  return Knight;
})();