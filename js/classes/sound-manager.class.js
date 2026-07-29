/**
 * Loads and plays the sound effects used by the game world.
 */
class SoundManager {
  /**
   * Creates the sound manager and loads all world sound effects.
   */
  constructor() {
    this.bottleCollectSound = new Audio("assets/audio/collectibles/bottleCollectSound.wav");
    this.coinCollectSound = new Audio("assets/audio/collectibles/collectSound.wav");
    this.bottleBreakSound = new Audio("assets/audio/throwable/bottleBreak.mp3");
    this.characterJumpSound = new Audio("assets/audio/character/characterJump.wav");
    this.characterDamageSound = new Audio("assets/audio/character/characterDamage.mp3");
  }

  /**
   * Plays a world sound effect from the beginning while respecting the mute state.
   *
   * @param {HTMLAudioElement} sound - The sound to play.
   * @returns {void}
   */
  playSound(sound) {
    sound.currentTime = 0;
    sound.muted = isMuted;
    sound.play();
  }
}
