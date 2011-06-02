class Buildable

  constructor: ->
    @inPlay = false

  build: ->
    @inPlay = true

  destroy: ->
    @inPlay = false
