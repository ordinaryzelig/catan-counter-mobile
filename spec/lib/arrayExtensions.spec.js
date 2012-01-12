describe('Array', function() {
  it('#remove removes an object', function() {
    var array;
    array = [1, 2, 3];
    array.remove(2);
    return expect(array).toEqual([1, 3]);
  });
  return it('#remove does not remove anything if object does not exist in array', function() {
    var array;
    array = [1, 2, 3];
    array.remove(-1);
    return expect(array).toEqual([1, 2, 3]);
  });
});