# Extend Array so that we can quickly filter objects.

# Buildable objects.

Array::inPlay = ->
  @.filter (object)-> object.inPlay

Array::notInPlay = ->
  @.filter (object)-> !object.inPlay

# Knights.

Array::level = (level) ->
  @.filter (knight) -> knight.level == level

Array::active = ->
  @.filter (knight) -> knight.active

Array::inactive = ->
  @.filter (knight) -> !knight.active
