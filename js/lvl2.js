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

  // Si Harry touché changement de css
  harrytouched: function () {
    console.log("touched");
    this.harrystraight = "harrytouched";
    this.harryup = "harryuptouched";
    this.harrydown = "harrydowntouched";
    harry.getElement.className = "harrytouched";
    if (player.life != "0") player.life = player.life - 1;
    this.sound = new Audio();
    this.sound.src = 'https://raw.githubusercontent.com/Roadgreen/Melvin.devJS/main/song/cognard.mp3';
    this.sound.load();
    this.sound.play()
      .then(() => {
        // Audio is playing.
      })
      .catch(error => {
        console.log(error);
      });

    console.log(player.life);
    // ici on retarde le moment ou harry revient à son état initial
    setTimeout(() => {
      this.harrygood();
    }, 5000);
  },

  // ici harry revient à son état initial
  harrygood: function () {
    console.log("plustoucher");
    this.harrystraight = "harry";
    this.harryup = "harryup";
    this.harrydown = "harrydown";
    harry.getElement.className = "harry";
  },

  // ici on s'occupe de la collision en regardant toutes les (second) si harry touche un cognards

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
          // on arrête l'interval le temps d'animer harry
          clearInterval(interval);
          this.isTouched();

          console.log("toucher");
        }
      }
    }, second);
  },

  // si harry est touché on relance la collision dans 6 secondes
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
  //cognards level
  cognardLevel: 5,

  //function d'apparition aléatoire des cognards
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
  lifeView: function () {
    setInterval(() => {
      this.lifeID.innerHTML = this.life;
    }, 500);
  },
  pointID: document.getElementById("epoint"),
  pointView: function () {
    setInterval(() => {
      this.pointID.innerHTML = this.vif;
    }, 500);
  },
};

//
// VIF DOR
//

let vifdor = {
  vifdorElement: document.getElementById("vifdor"),
  vifbottom: function () {
    setInterval(() => {
      this.vifdorElement.style.bottom = `${cognardObject.bottomRandom(100)}%`;
    }, 1500);
  },

  // fonction des vif d'or touché - Si harry touché, ne peut prendre de point
  vifdorTouched: function () {
    if (
      harry.harrystraight == "harrytouched" ||
      harry.harrydown == "harrydowntouched" ||
      harry.harryup == "harryuptouched"
    ) {
      setTimeout(() => {
        this.vifCollision();
      }, 5000);
    } else {
      player.vif = player.vif + 1;

      this.sound = new Audio();
this.sound.src = 'https://raw.githubusercontent.com/Roadgreen/Melvin.devJS/main/song/clochevif.mp3';
this.sound.load();
this.sound.play()
  .then(() => {
    // Audio is playing.
  })
  .catch(error => {
    console.log(error);
  });
      
      setTimeout(() => {
        this.vifCollision();
      }, 600);
    }
  },

  // toutes les 300 milliseconde on vérifie si vif d'or touché

  vifCollision: function () {
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

      if (
        harryx > vifdorX + vifdorWidth ||
        harryx + harrywidth < vifdorX ||
        harryy > vifdorY + vifdorHeight ||
        harryy + harryheight < vifdorY
      ) {
      } else {
        this.vifdorTouched();
        console.log("touchervif");
        clearInterval(vifInterval);
      }
    }, 300);
  },
};

//gestion des niveau et de la fin de partie
let script = {
  setNextLevel: function () {
    setInterval(() => {
      if (player.vif == 6) {
        window.location.href = "win.html";
      } else {
      }
    }, 300);
  },

  looseGame: function () {
    setInterval(() => {
      if (player.life == "0") {
        window.location.href = "loose.html";
      } else {
      }
    }, 500);
  },
};

setTimeout(() => {
//** Déclaration des function */
vifdor.vifbottom();

harry.harryFunctionKeydown();
harry.harryFunctionKeyUp();

// ici on gère l'interval qui vient vérifier que les cognards ne touche pas la /// div harry

harry.harryCollision(150);

cognardObject.cognardAppear(500);

vifdor.vifCollision();
player.lifeView();
player.pointView();

script.looseGame();
script.setNextLevel();
},2000);


