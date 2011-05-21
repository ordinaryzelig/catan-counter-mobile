beforeEach(function() {
  return this.addMatchers({
    toBePlaying: function(expectedSong) {
      this.player = this.actual;
      return this.player.currentlyPlayingSong === expectedSong && this.player.isPlaying;
    }
  });
});