var game = document.getElementById('gameLink');
var harry = document.getElementById('harryballais');

game.addEventListener("mouseover", function() {
    // on met l'accent sur la cible de mouseover
    harry.className = "harryballaisActif"; 
});

game.addEventListener("mouseout", function(){
    harry.className = "harryballais";
});

var resume = document.getElementById('resume');

resume.addEventListener("click", () => {
    window.location.href = "win.html";
});

this.sound = new Audio();
    this.sound.src = 'https://raw.githubusercontent.com/Roadgreen/Melvin.devJS/main/song/themeharry.mp3';
    this.sound.load();
    this.sound.play()
      .then(() => {
        // Audio is playing.
      })
      .catch(error => {
        console.log(error);
      });
