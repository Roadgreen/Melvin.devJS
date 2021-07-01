var game = document.getElementById('gameLink');

game.addEventListener("mouseover", function( e ) {
    // on met l'accent sur la cible de mouseover
    e.target.className = "harryballaisActif"; 
});
