//*
//* Hary Commande balais *//
//*

// Selection des cognards

let cognards = document.querySelectorAll("img#cognard");

// Objet harry

let harry = {
  getElement: document.getElementById("harry"),
  harryup: "harryup",
  harrydown: "harrydown",
  harrystraight: "harry",
  

  // Si la fleche bas du clavier est activé on change css

  harryFunctionKeydown: function () {
    document.addEventListener("keydown", (e) => {
      if (e.key == "ArrowDown") {
        harry.getElement.setAttribute("class", harry.harrydown);
      } else if (e.key == "ArrowUp") {
        harry.getElement.setAttribute("class", harry.harryup);
      } else {
        console.log(`${e.key}`);
      }
    });
  },

  // Si la fleche haut est activé on change css

  harryFunctionKeyUp: function () {
    document.addEventListener("keyup", (e) => {
      if (e.key == "ArrowDown") {
        harry.getElement.setAttribute("class", harry.harrystraight);
      } else if (e.key == "ArrowUp") {
        harry.getElement.setAttribute("class", harry.harrystraight);
      } else {
        console.log(`${e.key}`);
      }
    });
  },

  /**
   *
   * Collision
   *
   */

  harrytouched: function () {
    console.log("touched");
    this.harrystraight = "harrytouched";
    this.harryup = "harryuptouched";
    this.harrydown = "harrydowntouched";
    harry.getElement.className = "harrytouched";
    if(player.life != '0')player.life = player.life - 1;;
    let audio = new Audio('../song/cognard.mp3');
    audio.play();
    
    console.log(player.life);
    setTimeout(() => {
      this.harrygood();
    },5000);
   

    
  },

  harrygood: function () {
    console.log("plustoucher");
    this.harrystraight = "harry";
    this.harryup = "harryup";
    this.harrydown = "harrydown";
    harry.getElement.className = "harry";
  },

  harryCollision: function (second) {
    let xyArray = [0, 0, 0, 0, 0, 0, 0, 0];
    let interval = setInterval(() => {
      for (var i = 0; i < 8; i++) {
        let cognardPosition = cognards[i].getBoundingClientRect();
        let harryPosition = harry.getElement.getBoundingClientRect();
        let cognardsx = parseInt(cognardPosition.x);
        let cognardsy = parseInt(cognardPosition.y);
        let cognardswidth = parseInt(cognardPosition.width);
        let cognardsheight = parseInt(cognardPosition.height);
        let harryx = parseInt(harryPosition.x);
        let harryy = parseInt(harryPosition.y);
        let harrywidth = parseInt(harryPosition.width);
        let harryheight = parseInt(harryPosition.height);
        xyArray = [
          cognardsx,
          cognardsy,
          cognardswidth,
          cognardsheight,
          harryx,
          harryy,
          harrywidth,
          harryheight,
        ];

        if (
          xyArray[4] > xyArray[0] + xyArray[2] ||
          xyArray[4] + xyArray[6] < xyArray[0] ||
          xyArray[5] > xyArray[1] + xyArray[3] ||
          xyArray[5] + xyArray[7] < xyArray[1]
        ) {
          
        } else {
          clearInterval(interval);
          this.isTouched();
          
          console.log("toucher");
        
        }
      }
    }, second);
  },

  isTouched: function () {
    this.harrytouched();
    
    
    setTimeout(() => {
      this.harryCollision(150);
    }, 6000);
},
};


//*
//* Les Cognard
//*

let cognardObject = {
  //fonction randomize

  bottomRandom: function (max) {
    return Math.floor(Math.random() * max);
  },

  //function randomize min max

  minMaxRandom: function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  },
cognardLevel: 3, 
  cognardAppear: function (time) {
    setInterval(() => {
      cognardSelect = this.minMaxRandom(0, this.cognardLevel);
      cognards[cognardSelect].classList.replace("cognardInvisible", "cognard");
      cognards[cognardSelect].style.bottom = `${this.bottomRandom(1000)}px `;
    }, time);
  },
};



/**
 *
 * Comptage de point
 *
 */

let player = {
  life: 6,
  vif: 0,
  lifeID: document.getElementById("life"),
  lifeView: function(){
    setInterval(() => {
      this.lifeID.innerHTML = this.life;
    }, 500);
    },
    pointID: document.getElementById('epoint'),
    pointView: function(){
      setInterval(() => {
        this.pointID.innerHTML = this.vif;
      }, 500);
    }
};




let vifdor = {

  vifdorElement: document.getElementById('vifdor'),
  vifbottom: function(){
    setInterval(() => {
      this.vifdorElement.style.bottom = `${cognardObject.bottomRandom(100)}%`;
    },1500);
    
  },

  vifdorTouched: function(){
   
      if(harry.harrystraight == 'harrytouched' || harry.harrydown == 'harrydowntouched' || harry.harryup == 'harryuptouched') {
        setTimeout(() => {
          this.vifCollision();
        }, 5000);
      } else {
        player.vif = player.vif + 1;
        let audio = new Audio('../song/clochevif.mp3');
        audio.play();
        setTimeout(() => {
          this.vifCollision();
        }, 600);
        
      };
      
    
    

   
  },

  vifCollision: function(){
    vifInterval = setInterval(() => {
      let harryPosition = harry.getElement.getBoundingClientRect();
      let harryx = parseInt(harryPosition.x);
        let harryy = parseInt(harryPosition.y);
        let harrywidth = parseInt(harryPosition.width);
        let harryheight = parseInt(harryPosition.height);
        let vifdorPosition = this.vifdorElement.getBoundingClientRect();
        let vifdorX = parseInt(vifdorPosition.x);
        let vifdorY = parseInt(vifdorPosition.y);
        let vifdorHeight = parseInt(vifdorPosition.height);
        let vifdorWidth = parseInt(vifdorPosition.width);

        if(harryx > vifdorX + vifdorWidth ||
            harryx + harrywidth < vifdorX ||
            harryy > vifdorY + vifdorHeight ||
            harryy + harryheight < vifdorY) {

            } else {
              this.vifdorTouched();
              console.log('touchervif');
              clearInterval(vifInterval);
            }
    },300)
  },


  
 
};



let script = {

setNextLevel: function() {
  setInterval(() => {
    if(player.vif == 6) {
      window.location.href = "lvl2.html";

    } else{

    }
  },300);
},
 
  looseGame: function() {
    setInterval(() => {
      if(player.life == '0'){
        window.location.href = "loose.html";
      } else {};
      
    }, 500);
   
  },

};
vifdor.vifbottom();
  

let start = document.getElementById('aStart');
let consigne = document.getElementById('macgoconsigne');

start.addEventListener('click', () => {
  harry.harryFunctionKeydown();
  harry.harryFunctionKeyUp();
  
  // ici on gère l'interval qui vient vérifier que les cognards ne touche pas la /// div harry
  
  harry.harryCollision(150);
  
  cognardObject.cognardAppear(500);
  
  
  vifdor.vifCollision();
  player.lifeView();
  player.pointView();
  
  script.looseGame();
  script.setNextLevel()

  consigne.style.display = 'none';


});
// ici on gère les différentes class css pour le balais

