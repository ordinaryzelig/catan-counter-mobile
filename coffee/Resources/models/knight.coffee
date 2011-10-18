class Knight extends Buildable

  constructor: (atts = {}) ->
    super
    @player = atts['player']
    @level =  atts['level']
    @active = false

  activate: ->
    @active = true

  deactivate: ->
    @active = false

  # Get next level knight not in play and build it.
  # Retain activeness.
  # Return promoted knight.
  promote: ->
    throw 'level 3 knight cannot be promoted' if @level == 3
    nextLevel = @level + 1
    knightToBuild = @player.knights.notInPlay().level(nextLevel)[0]
    throw "no level #{nextLevel} knights available" unless knightToBuild?
    @destroy()
    knightToBuild.build()
    if @active
      knightToBuild.activate()
      @deactivate()
    knightToBuild

  # Destroy knight and add equal knight to another player if possible.
  # Returns another player's knight if built.
  desertFor: (anotherPlayer) ->
    anotherPlayersKnight = anotherPlayer.knights.notInPlay().level(@level)[0]
    if anotherPlayersKnight?
      anotherPlayersKnight.build()
      anotherPlayersKnight.activate() if @active
    @destroy()
    @deactivate()
    anotherPlayersKnight
