# Soldiers are knights in the base game.
# Named them Soldier to keep from clashing with Knights in Cities and Knights expansion.

class Soldier extends Buildable

  constructor: (atts = {}) ->
    super
    @game = atts['game']
    @player = null
