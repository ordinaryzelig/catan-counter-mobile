class Knight extends Buildable

  constructor: (atts = {}) ->
    super
    @player = atts['player']
    @level =  atts['level']
    @active = false
    @id     = atts['id']

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
    @moveGuiComponentsTo(knightToBuild)
    knightToBuild

  # Destroy knight and add equal knight to another player if possible.
  # Returns another player's knight if built.
  desertFor: (otherPlayer) ->
    otherPlayersKnight = otherPlayer.knights.notInPlay().level(@level)[0]
    if otherPlayersKnight?
      otherPlayersKnight.build()
      otherPlayersKnight.activate() if @active
    @destroy()
    @deactivate()
    otherPlayersKnight

  # If knight has button assigned, assign it to the new knight.
  # Reassign button's knightId to new knight.
  # Reassign rowId.
  moveGuiComponentsTo: (knight) ->
    if @button?
      @button.knightId = knight.id
      knight.button = @button
      @button = null
    if @row?
      knight.row = @row

  humanize: ->
    string = 'level ' + @level
    string = string + ' activated' if @active
    string = string + ' knight'
    string
