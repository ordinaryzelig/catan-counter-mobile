# Array subclass that contains playable elements.
# Provides extra methods to filter.

class PlayableSet extends Array

  inPlay: ->
    @.filter (object)-> object.inPlay

  notInPlay: ->
    @.filter (object)-> !object.inPlay
