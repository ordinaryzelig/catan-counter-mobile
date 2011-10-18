Array.prototype.inPlay = function() {
  return this.filter(function(object) {
    return object.inPlay;
  });
};
Array.prototype.notInPlay = function() {
  return this.filter(function(object) {
    return !object.inPlay;
  });
};
Array.prototype.level = function(level) {
  return this.filter(function(knight) {
    return knight.level === level;
  });
};
Array.prototype.active = function() {
  return this.filter(function(knight) {
    return knight.active;
  });
};
Array.prototype.inactive = function() {
  return this.filter(function(knight) {
    return !knight.active;
  });
};