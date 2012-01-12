describe 'Array', ->

  it '#remove removes an object', ->
    array = [1, 2, 3]
    array.remove(2)
    expect(array).toEqual([1, 3])

  it '#remove does not remove anything if object does not exist in array', ->
    array = [1, 2, 3]
    array.remove(-1)
    expect(array).toEqual([1, 2, 3])
