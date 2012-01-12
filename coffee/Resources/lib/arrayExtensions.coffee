Array.prototype.remove = (obj) ->
  idx = @.indexOf(obj)
  if idx != -1
    @splice(idx, 1)
  else
    null
