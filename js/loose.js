var audio = new Audio('/../song/harrymomentum.mp3');
audio.play();



this.sound = new Audio();
this.sound.src = 'https://raw.githubusercontent.com/Roadgreen/Melvin.devJS/main/img/harrymomentum.mp3';
this.sound.load();
this.sound.play()
  .then(() => {
    // Audio is playing.
  })
  .catch(error => {
    console.log(error);
  });