var audio = new Audio('/../song/harrymomentum.mp3');
audio.play();



this.sound = new Audio();
this.sound.src = '/../song/harrymomentum.mp3';
this.sound.load();
this.sound.play()
  .then(() => {
    // Audio is playing.
  })
  .catch(error => {
    console.log(error);
  });