var game = document.getElementById('gameLink');
var harry = document.getElementById('harryballais');

game.addEventListener("mouseover", function() {
    // on met l'accent sur la cible de mouseover
    harry.className = "harryballaisActif"; 
});

game.addEventListener("mouseout", function(){
    harry.className = "harryballais";
});
