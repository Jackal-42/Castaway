/* NOTE TO SELF
 *
 * Put the level .png on a seperate canvas with a lower
 * z-index, and then put four invisible lines
 * on each side of the player, and then test for opaque
 * pixels on the lower canvas that overlap the lines.
 * 
*/

//2300, 1600

var debugging = false;


var objects = [];
var rain = [];

areaLoaded = "titleScreen";
var canJump = false
var scrollX = 0;
var scrollY = 1300;
var scrollStopX = 2960;
var cyoteTime = 0;
var animationDelay = 0;
var playerOrientation = 1;
var paused = true;
var inventory = [];
var inventoryShown = false;

var danceChangeupTimer = NaN; 

var xTapped = false;
var xHeldPreviously = false;
var upTapped = false;
var upHeldPreviously = false;
var downTapped = false;
var downHeldPreviously = false;
var zTapped = false;
var zHeldPreviously = false;

var displayedText = "";
var displayedImage = null;
var pageOfText = 0;
var textSource = 0;
var shownText = "";
var buffer = ""

var framesElapsed = 0;

var fade = new component(0, 0, 1000, 500, "fade", null)
var fading = false
var cachedCode = "";
// var bananaGiven = false;
var clothesObtained = false;
var monkeyYeeting = false;
var monkeyID = null;
var monkeyRotation = 0;
var monkeyRotationSpeed = 0;

var playingCards = false;
var hand = [];
var enemyHand = [];
var cardsSwapped = false;

var playerCenteredYPosition = 230;
var levelHeightOffset = 0;

var bananaRequested = false;
var banantulaPhase = 0;

var rainDance = false;
var raining = false;

var opponent = null;
var fighting = false;
var opponentShaking = 0;
var playerShaking = 0;
var opponentSlash = 19;
var playerSlash = 19;

var circleSize = 750;
var circleClosing = false;
var banantulaEncounter = false;
var battleProgression = 0;
var battleOptions = [];
var selectedOption = 0;
var circlesShown = false;
var battleAccuracy = null;
var opponentHealth = 0;
var playerHealth = 100;
var opponentDisplayedHealth = 100;
var playerDisplayedHealth = 100;
var turn = "player";
var battleStatus = null;
var playerDamage = 10
var opponentDamage = 20;
var move1Difficulty = 6;
var move2Difficulty = 5;
var move3Difficulty = 1;
var charmed = false;

var skewPreventionX = 0;
var skewPreventionY = 0; 
var rescueRequested = false;
var meatGiven = false;
var monkeySatisfied = false;

var apexSnapdragonHeight = 0;

var textDelay = 1
var finalCutscene = false;
var faceReveal = null;
var gameComplete = false;
var battleMenuOpen = false;
var batonRequested = false;

var shipwrightRescueTimer = null;

var battlePosition = "island"
var battleInventory = [];
var seedPlanted = false;
var canFull = false;
var treeGrown = true;
var pearlSeen = false;

var canOpenInventory = true;




var myGameArea = {
  canvas : document.getElementById("canvas"),
  start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.frameNo = 0
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea,16.66)
    window.addEventListener('keydown', function (e) {
      myGameArea.keys = (myGameArea.keys || []);
      myGameArea.keys[e.keyCode] = true;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys[e.keyCode] = false;
    })
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

var myGameLevel = {
  canvas : document.getElementById("level"),
  start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.frameNo = 0
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

var myGameBackground = {
  canvas : document.getElementById("background"),
  start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.frameNo = 0
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}
var board = {
  canvas : document.getElementById("board"),
  start : function() {
    this.canvas.width = 1000;
    this.canvas.height = 500;
    this.frameNo = 0
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
}

// if(window.innerWidth <= 1000){
//   document.getElementsByName("canvas").position = "absolute";
//   document.getElementsByName("canvas").width = "100%";
//   document.getElementsByName("canvas").marginRight = "auto";
//   document.getElementsByName("canvas").marginLeft = "auto";
//   // document.getElementsByName("canvas").left = "1%";
//   // document.getElementsByName("canvas").right = "1%";
//   // document.getElementsByName("canvas").top = "1%";

// }else if(window.innerWidth < 2000){
//   document.getElementsByName("canvas").width = "1000px";
//   document.getElementsByName("canvas").marginRight = "auto";
//   document.getElementsByName("canvas").marginLeft = "auto";
// }else{
//   document.getElementsByName("canvas").width = "2000px";
//   document.getElementsByName("canvas").marginRight = "auto";
//   document.getElementsByName("canvas").marginLeft = "auto";
// }


function fadeToBlack() {
  fading = true
}

function fadeToClear() {
  fading = false
}

function pad(d) {
  return (d < 10) ? '0' + d.toString() : d.toString();
}

function playSound(url){
  var audio = document.createElement('audio');
  audio.style.display = "none";
  audio.src = url;
  audio.autoplay = true;
  audio.onended = function(){
    audio.remove() //Remove when played.
  };
  document.body.appendChild(audio);
}

function assignElements(name, value) {
  var _ = document.getElementsByName(name);
  var i;

  for (i = 0; i < _.length; i++) {
    _[i].innerHTML = value
  }
}

if(debugging){  
  var debugUpdateInterval = setInterval(debugUpdate, 100);
  document.getElementById("debugMenu").style.display = "block"
}

function debugUpdate(){
  assignElements("playerXpos", (player.x + scrollX).toFixed(2));
  assignElements("playerYpos", (player.y + scrollY).toFixed(2));
  assignElements("objectCount", objects.length);
  assignElements("framesElapsed", framesElapsed);
  // assignElements("displayedImage", displayedImage.src);
}

function crash(firstObj, secondObj) {
  var mytop = firstObj.y;
  var mybottom = firstObj.y + (firstObj.height);
  var othertop = secondObj.y;
  var otherbottom = secondObj.y + (secondObj.height);
  var myleft = firstObj.x;
  var myright = firstObj.x + (firstObj.width);
  var otherleft = secondObj.x;
  var otherright = secondObj.x + (secondObj.width);

  if(firstObj == player){
    var mytop = firstObj.y + scrollY;
    var mybottom = firstObj.y + (firstObj.height) + scrollY;
    var myleft = firstObj.x + scrollX;
    var myright = firstObj.x + (firstObj.width) + scrollX;
  }

  if (
  
  ((mytop <= otherbottom) && (mybottom >= otherbottom) && (myright > otherleft) && (myleft < otherright))
  ||
  ((mybottom >= othertop) && !(mytop >= othertop) && (myright > otherleft) && (myleft < otherright))
  ||
  ((myleft <= otherright) && (myright >= otherright) && (mytop < otherbottom) && (mybottom > othertop))
  ||
  ((myright >= otherleft) && !(myleft >= otherleft) && (mytop < otherbottom) && (mybottom > othertop))
  
  ) {
    return true;
  }else{
    return false;
  }
  
}

function crashLeft(firstObj, secondObj) {
  var mytop = firstObj.y;
  var mybottom = firstObj.y + (firstObj.height);
  var othertop = secondObj.y;
  var otherbottom = secondObj.y + (secondObj.height);
  var myleft = firstObj.x
  var myright = firstObj.x + (firstObj.width);
  var otherleft = secondObj.x;
  var otherright = secondObj.x + (secondObj.width);
  if(firstObj == player){
    var mytop = firstObj.y + scrollY;
    var mybottom = firstObj.y + (firstObj.height) + scrollY;
    var myleft = firstObj.x + scrollX;
    var myright = firstObj.x + (firstObj.width) + scrollX;
  }
  if ((myleft <= otherright) && (myright >= otherright) && (mytop < otherbottom) && (mybottom > othertop)) {
    return true;
  }else{
    return false;
  }
  
    
}
function crashRight(firstObj, secondObj) {
  var mytop = firstObj.y;
  var mybottom = firstObj.y + (firstObj.height);
  var othertop = secondObj.y;
  var otherbottom = secondObj.y + (secondObj.height);
  var myleft = firstObj.x;
  var myright = firstObj.x + (firstObj.width);
  var otherleft = secondObj.x;
  var otherright = secondObj.x + (secondObj.width);

  if(firstObj == player){
    var mytop = firstObj.y + scrollY;
    var mybottom = firstObj.y + (firstObj.height) + scrollY;
    var myleft = firstObj.x + scrollX;
    var myright = firstObj.x + (firstObj.width) + scrollX;
  }
  
  if ((myright >= otherleft) && !(myleft >= otherleft) && (mytop < otherbottom) && (mybottom > othertop)) {
    return true;
  }else{
    return false;
  }
    
}

function component(x, y, width, height, type, data){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.type = type;
  this.data = data;
  if(this.type == "player"){
    this.momentumX = 0;
    this.momentumY = 0;
    this.alpha = 1;
  }
  if(this.type == "fade"){
    this.lifetime = 0
    this.color = "black"
  }
  if(this.type == "snapDragon"){
    this.saveY = this.y
  }
  if(this.type == "npc"){
    this.animationFrame = 0
    this.animationDelay = this.data[1]
    this.zAlpha = 0;
  }
  if(this.type == "textDisplayZone"){
    this.zAlpha = 0;
  }
  if(this.type == "flower"){
    this.animation = "flower_open"
  }
}

function checkForGround(integer){
  return integer != 0;
}

function checkForJump(arrayName){
  var formattedArray = Array.prototype.slice.call(arrayName);
  for(var i = 0; i < formattedArray.length; i++){
    if(formattedArray[i] == 0){
      formattedArray.splice(i, 1)
      i--
    }
  }
  // console.log(formattedArray);
  if(formattedArray.length >= 24){
    return true;
  }
  return false;
}

var player = new component(0, 0, 40, 80, "player", null);

load()


// inventory.push("Compass");

try{
  if(localStorage.getItem("pearlObtained") == 'true'){
    inventory.push("Pearl")
  }
}catch{}


function updateGameArea() {
  framesElapsed++
  myGameArea.clear()
  ctx = myGameArea.context
  
  if(finalCutscene && scrollX > 1468){
    scrollX -= 0.5
  }

  if(faceReveal != null && faceReveal <= 23){
    if(framesElapsed % 10 == 0){
      objects[0].height = 120
      objects[0].data[0] = [eval("face_reveal_" + pad(faceReveal)), eval("face_reveal_" + pad(faceReveal))]
      faceReveal += 1
    }
  }
  if(faceReveal == 23){
    faceReveal = null
    areaLoaded = "ending"
    objects[0].data[2] = [[chief_face, "You could come back and visit us sometime?"],[chief_face, "We'll never forget you. Good luck on your journey!", "gameComplete = true;"],[blank, "", "paused = true; document.getElementById(\"textBoxContainer\").style.display = \"none\""]]
    pageOfText = 0;
    textSource = 0;
    displayedText = objects[0].data[2][pageOfText][1]
    displayedImage = objects[0].data[2][pageOfText][0]
  }
  if(gameComplete && displayedText == "" && !endingRendered){
    paused = true
    fadeToBlack()
  }
  if(fighting){
    ctx = myGameBackground.context;
    ctx.imageSmoothingEnabled = false;
    myGameBackground.clear()    
    if(opponent == "banantula"){
      ctx.drawImage(beach_battle, 0, 0, 1000, 500)
    }else if (opponent == "apexSnapdragon"){
      ctx.drawImage(cave_battle, 0, 0, 1000, 500)
    }else{
      ctx.drawImage(gradient, 0, 0, 1000, 500)
    }
  }else{
    myGameLevel.clear()
    myGameBackground.clear()
    ctx = myGameBackground.context;
    ctx.imageSmoothingEnabled = false;
    ctx.globalCompositeOperation = 'destination-over';
    if(terrain == funky_cave){
      ctx.drawImage(backdrop_near, scrollX * -0.5, ((scrollY + 2500) * -0.5) - 50, 2500, 2500);
      ctx.drawImage(backdrop_mid_near, scrollX * -0.25, Math.floor(((scrollY + 2000) * -0.25) + 0), 1500, 1500);
      ctx.drawImage(backdrop_mid_far, scrollX * -0.1, ((scrollY + 2000) * -0.1) - 0, 2000, 1000);
      ctx.drawImage(backdrop_far, scrollX * -0, (scrollY * -0), 1000, 500);
    }else{
      ctx.drawImage(backdrop_near, scrollX * -0.5, (scrollY * -0.5) - 50, 3750, 1500);
      ctx.drawImage(backdrop_mid_near, scrollX * -0.25, Math.floor((scrollY * -0.25) + 0), 2000, 1000);
      ctx.drawImage(backdrop_mid_far, scrollX * -0.1, (scrollY * -0.1) - 0, 2000, 1000);
      ctx.drawImage(backdrop_far, scrollX * -0, (scrollY * -0), 1000, 500);
    }
  }

  if(areaLoaded != "titleScreen"){
    zTapped = false
    
    if(myGameArea.keys && myGameArea.keys[90]){
      if(!zHeldPreviously){
        zTapped = true
      }
      zHeldPreviously = true
    }else{
      zHeldPreviously = false
    }

    xTapped = false
  
    if(myGameArea.keys && myGameArea.keys[88]){
      if(!xHeldPreviously){
        xTapped = true
      }
      xHeldPreviously = true
    }else{
      xHeldPreviously = false
    }
    if(fade.lifetime > 0){
      xTapped = false
    }
  }
  
  
  ctx = myGameArea.context;
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  if(!fighting){
    for(var i = 0; i < objects.length; i++){
      ctx.globalAlpha = 1
      if(zTapped && !paused){
        if(objects[i].type == "textDisplayZone"){
          if(crash(player, objects[i])){
            textSource = i;
            displayedText = objects[i].data[0]
          }
        }
        if(objects[i].type == "npc"){
          if(crash(player, objects[i])){
            // console.log("e")
            pageOfText = 0;
            textSource = i;
            displayedText = objects[i].data[2][pageOfText][1]
            displayedImage = objects[i].data[2][pageOfText][0]
          }
        }
      }
      if(objects[i].type == "loadZone"){
        // console.log("e")
        if(crash(player, objects[i])){
          if(!monkeyYeeting){  
            paused = true
          }
          areaLoaded = objects[i].data
          fadeToBlack()
          // console.log("e")
        }
      }
      if(objects[i].type == "image"){
        ctx.globalAlpha = 1
        ctx.drawImage(objects[i].data, objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
      }
      if(objects[i].type == "flower"){
        if(framesElapsed % 4 == 0 && !raining){
          if(player.x + scrollX > objects[i].x - 100 && player.x + scrollX < objects[i].x + 260){
            if(objects[i].animation == "flower_semi_closed"){
              objects[i].animation = "flower_closed"
            }
            if(objects[i].animation == "flower_semi_open"){
              objects[i].animation = "flower_semi_closed"
            }
            if(objects[i].animation == "flower_open"){
              objects[i].animation = "flower_semi_open"
            }
          }else{
            if(objects[i].animation == "flower_semi_open"){
              objects[i].animation = "flower_open"
            }
            if(objects[i].animation == "flower_semi_closed"){
              objects[i].animation = "flower_semi_open"
            }
            if(objects[i].animation == "flower_closed"){
              objects[i].animation = "flower_semi_closed"
            }
          }
        }
        ctx.drawImage(eval(objects[i].animation), objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
      }
      if(objects[i].type == "apexSnapdragon"){
        if(player.x + scrollX > objects[i].x - 50 && player.x + scrollX < objects[i].x + 250 && (canJump || apexSnapdragonHeight > 0) && scrollY > 1000){
          paused = true
          if(apexSnapdragonHeight < 200){
            apexSnapdragonHeight++
            textSource = 0
          }else{
            if(textSource != null && textSource != 1){  
              displayedImage = null
              if(inventory.includes("Baton")){
                pageOfText = 0
                textSource = 1
                displayedText = objects[1].data[2][pageOfText][1]
                displayedImage = objects[1].data[2][pageOfText][0]
                funky_cave_theme.pause(); monkey_battle_theme.play();
              }else{
                textSource = null
                displayedText = "It looks like a snapdragon has claimed the baton for itself..."
              }
              
            }else{
              if(displayedText == "" && textSource != 1){
                waitForFade("final_battle.play(); funky_cave_theme.pause(); fighting = true; opponent = \"apexSnapdragon\";myGameLevel.clear(); opponentHealth = 100;")
                circleClosing = true
              }
            }
          }
        }
        ctx.globalAlpha = 1
        if(inventory.includes("Baton")){
          ctx.drawImage(monkey_battle, objects[i].x - scrollX, objects[i].y - scrollY - apexSnapdragonHeight/2, objects[i].width/2, objects[i].height/2)
        }else{
          ctx.drawImage(apex_snapdragon, objects[i].x - scrollX, objects[i].y - scrollY - apexSnapdragonHeight, objects[i].width, objects[i].height)
        }
      }
      if(objects[i].type == "banantula"){
        if(player.x + scrollX > objects[i].x - 50 && player.x + scrollX < objects[i].x + 250 && bananaRequested && banantulaPhase == 0 && canJump && player.momentumX > -10){
          paused = true
          textSource = null
          displayedImage = null
          displayedText = "You gaze longingly at the bananas hanging in the tree."
          banantulaPhase = 1;
        }
        if((displayedText == "" || banantulaPhase == 7) && banantulaPhase >= 1 && !monkeySatisfied){
          if(!inventory.includes("Banana")){
            paused = true
            ctx.globalAlpha = 1
            if(framesElapsed % 4 == 0 && banantulaPhase < 7){
              banantulaPhase += 1
            }
          }
          if(!inventory.includes("Banantula")){
            ctx.drawImage(eval("banantula_" + banantulaPhase), objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
          }
        }else{
          ctx.drawImage(banantula_0, objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
        }
        if(banantulaPhase == 7 && displayedText == "" && !fading && !banantulaEncounter){
          displayedText = "That\'s no banana... That\'s a Banantula!!!"
          banantulaEncounter = true
        }
      }
      if(objects[i].type == "snapDragon"){
        var snapdragonImage = snapdragon_closed
        // console.log("e")
        if(player.x + scrollX > objects[i].x - 75 && player.x + scrollX < objects[i].x + 75){
          snapdragonImage = snapdragon_semi_open
        }
        if(player.x + scrollX > objects[i].x - 50 && player.x + scrollX < objects[i].x + 50){
          if(objects[i].y < objects[i].saveY + objects[i].data && player.y + scrollY > objects[i].y){  
            objects[i].y += 15
            snapdragonImage = snapdragon_open
          }
        }else{
          if(objects[i].y > objects[i].saveY){
            objects[i].y -= 1
          }
        }

        if(crashLeft(player, objects[i])){
          player.momentumX = 6
        }
        if(crashRight(player, objects[i])){
          player.momentumX = -6
        }
        ctx.globalAlpha = 1
        ctx.drawImage(snapdragonImage, objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
        ctx.fillStyle = "darkgreen"
        ctx.fillRect((objects[i].x + objects[i].width/2) - scrollX - 2, objects[i].saveY - scrollY, 4, objects[i].y - objects[i].saveY)
      }
      if(debugging){
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "salmon";
        ctx.fillRect(objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
      }
      if(objects[i].type == "textDisplayZone"){
        if(raining){
          rain.push(new component(Math.floor(objects[i].x + Math.random() * (objects[i].width)),Math.floor(objects[i].y + Math.random() * objects[i].height), 0, 0, "pollen", (Math.random() * 0.6) + 0.2))
        }
        if(crash(player, objects[i])){
          objects[i].zAlpha += 0.1
        }else{
          objects[i].zAlpha -= 0.1
        }
        try{
          if(objects[i].zAlpha < 0){
            objects[i].zAlpha = 0
          }
          if(objects[i].zAlpha > 1){
            objects[i].zAlpha = 1
          }
          ctx.globalAlpha = objects[i].zAlpha
          if(!paused){
            ctx.drawImage(letter_z, objects[i].x - scrollX + (objects[i].width/2) - 11, objects[i].y - scrollY - 30, 24, 24)
          }
        }catch{
          
        }
      }
      if(objects[i].type == "npc"){
        if(crash(player, objects[i])){
          objects[i].zAlpha += 0.1
        }else{
          objects[i].zAlpha -= 0.1
        }
        objects[i].animationDelay -= 1
        if(objects[i].animationDelay <= 0){
          objects[i].animationDelay = objects[i].data[1]
          objects[i].animationFrame += 1
          if(objects[i].animationFrame > objects[i].data[0].length - 1){
            objects[i].animationFrame = 0
          }
        }
        ctx.globalAlpha = 1
        if(monkeyYeeting && i == monkeyID){
          document.getElementById("textBoxContainer").style.display = "none"
          ctx.save()
          if(areaLoaded == "caveEntranceRight"){
            ctx.translate( Math.floor(objects[i].x+objects[i].width/2) - scrollX + 41, (Math.floor(objects[i].y+60 ) - scrollY));
          }else{
            ctx.translate( Math.floor(objects[i].x+objects[i].width/2) - scrollX + 200, (Math.floor(objects[i].y+60 ) - scrollY));
          }
            
          objects[i].y -= 1
          monkeyRotationSpeed += 0.002
          monkeyRotation += monkeyRotationSpeed
          ctx.rotate(monkeyRotation)
          ctx.drawImage(objects[i].data[0][objects[i].animationFrame], (objects[i].width/2)*-1, (objects[i].height/2)*-1 - 20 - monkeyRotationSpeed * 50, objects[i].width, objects[i].height)
          player.y -= 1
          ctx.restore()
          if(monkeyRotationSpeed > 0.4 && player.alpha == 0){
            paused = false
            player.alpha = 1
            if(monkeyID == 0 || areaLoaded == "funkyCave"){
              player.momentumX = -25
            }else{
              player.momentumX = 25
            }
            objects[i].data[0] = [monkey_idle_1]
            console.log("e")
          }
        }else{
          // console.log(objects[i].type)
          try{
            if(objects[i].zAlpha < 0){
              objects[i].zAlpha = 0
            }
            if(objects[i].zAlpha > 1){
              objects[i].zAlpha = 1
            }
            ctx.drawImage(objects[i].data[0][objects[i].animationFrame], objects[i].x - scrollX, objects[i].y - scrollY, objects[i].width, objects[i].height)
            ctx.globalAlpha = objects[i].zAlpha
            if(!paused){
              ctx.drawImage(letter_z, objects[i].x - scrollX + (objects[i].width/2) - 11, objects[i].y - scrollY - 30, 24, 24)
            }
          }catch{
            
          }
        }
        
      }
    }
  }

  ctx.restore();
  
  if(displayedText == ""){
    document.getElementById("cheatCodes").style.display = "none"
  }

  if(terrain == jungle_village && meatGiven && !batonRequested){
    if(scrollX > 1450){
      batonRequested = true
      pageOfText = 0;
      textSource = 0;
      displayedText = objects[0].data[2][pageOfText][1]
      displayedImage = objects[0].data[2][pageOfText][0]
    }
  }
  
  ctx = myGameLevel.context;
  ctx.imageSmoothingEnabled = false;
  if(!fighting){
    ctx.drawImage(terrain, scrollX * -1 + scrollX_stop, (scrollY * -1) + 50 + levelHeightOffset, terrainWidth, terrainHeight);
  }
  if(areaLoaded != "titleScreen"){

    
    // if(myGameArea.keys && myGameArea.keys[40]){
    //   player.y += 4
    // }
    if(player.momentumY < 8 && !(canJump) && !(paused)){
      if(!(debugging && myGameArea.keys && myGameArea.keys[38])){
        player.momentumY += 0.15
        player.momentumY /= 1.01
      }
    }
    if(myGameArea.keys && myGameArea.keys[38] && (canJump || cyoteTime >= 0) && !(paused)){
      cyoteTime = 0
      player.momentumY = document.getElementById("jumpPower").value * -1
    }
    if(myGameArea.keys && myGameArea.keys[37] && !(paused)){
      player.momentumX -= 0.2
      // player.momentumX -= 0.3
    }
    if(myGameArea.keys && myGameArea.keys[39] && !(paused)){
      player.momentumX += 0.2
      // player.momentumX += 0.3
    }
    if(debugging){
      if(player.momentumX > 10){
        player.momentumX -= 0.2
        // player.momentumX -= 1
      }
      if(player.momentumX < -10){
        player.momentumX += 0.2
        // player.momentumX += 1
      }
    }else{
      if(player.momentumX > document.getElementById("playerSpeed").value){
        player.momentumX -= 0.2
        // player.momentumX -= 1
      }
      if(player.momentumX < document.getElementById("playerSpeed").value * -1){
        player.momentumX += 0.2
        // player.momentumX += 1
      }
    }

    if(!paused){  
      player.x += player.momentumX;
      player.y += player.momentumY;
    }
    document.getElementById("prompt").style.opacity = 0
    
    
  }else{
    ctx = myGameArea.context;
    ctx.save()
    ctx.globalAlpha = 0.8;
    ctx.drawImage(castaway_logo, 120, 30, 800, 200)
    ctx.globalCompositeOperation = "source-atop"
    ctx.fillStyle = "black";
    ctx.fillRect(120, 30, 800, 200)
    ctx.globalCompositeOperation = "source-over"
    document.getElementById("prompt").style.opacity = Math.sin(framesElapsed/10) + 0.4
    ctx.drawImage(castaway_logo, 100, 20, 800, 200)
    ctx.drawImage(tutorial, 320, 220, 400, 160)
    if(myGameArea.keys && (myGameArea.keys[88] || myGameArea.keys[90])){
      areaLoaded = "beachLeft"
      inventory_open.play()
      fadeToBlack()
    }
    
  }
  
  if(areaLoaded == "jungleRight" || areaLoaded == "jungleLeft"){
    if(scrollX + 230 > 3000 && canJump){
      if(!rescueRequested){
        rescueRequested = true
        pageOfText = 0;
        textSource = 1;
        displayedText = objects[1].data[2][pageOfText][1]
        displayedImage = objects[1].data[2][pageOfText][0]
      }
      if(inventory.includes("Meat")){
        if(!meatGiven){
          textSource = null
          displayedImage = null
          displayedText = "You wave the meat in front of the snapdragon!"
          meatGiven = true
        }
        if(displayedText == ""){
          paused = true
          shipwrightRescueTimer = 0;
          // waitForFade("objects[1].y = 1580; objects[1].data[0] = [shipwright]; paused = false")
          objects[1].data[2] = [[shipwright, "Thank you so much! I'll see you at the village!"]]
          removeItem(inventory, "Meat")
        }
      }
    }
  }
  if(shipwrightRescueTimer != null){
    shipwrightRescueTimer += 1
    if(shipwrightRescueTimer < 100){
      objects[1].y -= 1
    }else if(shipwrightRescueTimer == 100){
      objects[1].data[0] = [shipwright];
    }else if(shipwrightRescueTimer < 176){
      objects[1].y += 4
    }else{
      shipwrightRescueTimer = null
      paused = false
    }
  }
  canJump = false
  if(!(paused)){  
    cyoteTime--
  }
  var upCrashAmount = 0;
  var downCrashAmount = 0;
  var leftCrashAmount = 0;
  var rightCrashAmount = 0;
  ctx = myGameLevel.context;
  while(true){
    
    var touchingGround = false

    if(ctx.getImageData(player.x, player.y, 1, 40).data.some(checkForGround)){
      player.x += 1
      touchingGround = true
      leftCrashAmount += 1  
    }
    if(ctx.getImageData(player.x + player.width, player.y, 1, 40).data.some(checkForGround)){
      player.x -= 1
      touchingGround = true
      rightCrashAmount += 1 
    }
    if(ctx.getImageData(player.x, player.y, 40, 1).data.some(checkForGround)){
      player.y += 1
      touchingGround = true
      upCrashAmount += 1
      player.momentumY = 2
    }
    
    if(checkForJump(ctx.getImageData(player.x, player.y + player.height + 1, 41, 1).data)){

      player.y -= 1
      touchingGround = true
      canJump = true
      cyoteTime = 10
      player.momentumY = 0
      downCrashAmount += 1
      if(Math.abs(player.momentumX) < 10){
        player.momentumX *= 0.95
      }
    }

    
    
    if(downCrashAmount == 1 && rightCrashAmount == 1){
      player.y -= 3
      // playerCenteredYPosition -= 3
    }
    if(downCrashAmount == 1 && leftCrashAmount == 1){
      player.y -= 3

      // playerCenteredYPosition -= 3
    }
    if(downCrashAmount > 10 || leftCrashAmount > 10 || rightCrashAmount > 10 || upCrashAmount > 10){
      if(areaLoaded != "titleScreen"){
        player.y -= 20
      }
      break;
    }
    if(touchingGround){
      // console.log("e")
      continue;
    }
    
    
    // if(downCrashAmount > leftCrashAmount && downCrashAmount > rightCrashAmount){
    //   canJump = true
    //   player.momentumY = 0
    // }
    // player.y += 1
    break;
  }

  if(terrain == jungle_village){
    myGameLevel.clear()
  }
  
  skewPreventionX = scrollX * -1
  skewPreventionY = (scrollY * -1) + 50 + levelHeightOffset
  
  if(!paused){
    if((myGameArea.keys && !myGameArea.keys[37] && !myGameArea.keys[39]) && canJump){
      player.momentumX /= 1.5
      // console.log("e")
    }
  }
  if(scrollX < scrollX_stop){
    player.x += scrollX - scrollX_stop
    scrollX = scrollX_stop
  }
  // if(scrollY > 0){
  //   player.y += scrollY
  //   scrollY = 0
  // }
  if(scrollX > scrollStopX){
    player.x += scrollX - scrollStopX
    scrollX = scrollStopX
  }
  // if(scrollY < -1000){
  //   player.y += scrollY + 1000
  //   scrollY = -1000
  // }
  if(player.x < 0 && !monkeyYeeting){
    player.x = 0
    player.momentumX = 0
  }
  if(player.x > 980){
    player.x = 980
    player.momentumX = 0
  }
  // if(player.y < 0){
  //   player.y = 0
  //   player.momentumY = 0
  // }
  // if(player.y > 480){
  //   player.y = 480
  //   player.momentumY = 0
  // }
  if(!rainDance){
    if(player.x < 480 && scrollX <= scrollStopX && scrollX != scrollX_stop){
      scrollX += player.x - 480
      player.x = 480
    }
    if(player.x > 480 && scrollX >= scrollX_stop && scrollX != scrollStopX){
      scrollX += player.x - 480
      player.x = 480
    }
  }
  if(scrollY <= 1300){  
    scrollY += player.y - Math.floor(playerCenteredYPosition)
    player.y = Math.floor(playerCenteredYPosition)
  }
  if(player.y < Math.floor(playerCenteredYPosition)){
    scrollY += player.y - Math.floor(playerCenteredYPosition)
    player.y = Math.floor(playerCenteredYPosition)
  }
  if(playerCenteredYPosition < 230){
    playerCenteredYPosition += 1
  }
  player.y = Math.floor(player.y)
  ctx = myGameArea.context;

  
  
  

  
  if(!(paused)){  
    animationDelay += 1
  }

  if(!(paused)){
    if(myGameArea.keys && myGameArea.keys[37]){
      playerOrientation = -1
    }else if(myGameArea.keys && myGameArea.keys[39]){
      playerOrientation = 1
    }
  }
  if(!fighting){
    ctx.save()
    ctx.globalAlpha = player.alpha
    ctx.translate(player.x + 20, player.y);
    ctx.scale(playerOrientation, 1);
    if(!canJump && cyoteTime <= 0){
      if(player.momentumY < -0.2){
        ctx.drawImage(castaway_jump, -40, 2, 80, 80);
      }else if(player.momentumY > 0.2){
        ctx.drawImage(castaway_fall, -40, 2, 80, 80);
      }else{
        ctx.drawImage(castaway_run, -40, 2, 80, 80);
      }
    }else if(myGameArea.keys && (myGameArea.keys[37] || myGameArea.keys[39])){
      if(animationDelay >= 5 && animationDelay <= 12){
        ctx.drawImage(castaway_stand, -40, 2, 80, 80);
      }
      if(animationDelay >= 0 && animationDelay <= 5){
        ctx.drawImage(castaway_walk, -40, 2, 80, 80);
      }
      if(animationDelay >= -5 && animationDelay <= 0){
        ctx.drawImage(castaway_run, -40, 2, 80, 80);
      }
      if(animationDelay >= -10 && animationDelay <= -5){
        ctx.drawImage(castaway_walk, -40, 2, 80, 80);
      }
    }else{
      ctx.drawImage(castaway_stand, -40, 2, 80, 80);
      animationDelay = 1
    }
    if(animationDelay >= 12){
      animationDelay = -10
    }
    ctx.restore()
  }
  ctx = myGameArea.context;
  ctx.imageSmoothingEnabled = false;
  scrollY = Math.floor(scrollY)
  
  
  ctx.fillStyle = "red"
  // ctx.fillRect(player.x, player.y, 40, 1)
  // ctx.fillRect(player.x, player.y + player.height, 40, 1)
  // ctx.fillRect(player.x, player.y, 1, 80)
  // ctx.fillRect(player.x + player.width, player.y, 1, 80)
  // clearInterval(myGameArea.interval)
  
  

  upTapped = false
  
  if(myGameArea.keys && myGameArea.keys[38]){
    if(!upHeldPreviously){
      upTapped = true
    }
    upHeldPreviously = true
  }else{
    upHeldPreviously = false
  }

  downTapped = false
  
  if(myGameArea.keys && myGameArea.keys[40]){
    if(!downHeldPreviously){
      downTapped = true
    }
    downHeldPreviously = true
  }else{
    downHeldPreviously = false
  }

  



  

  if(downTapped){
    if(inventoryShown){
      selectedItem += 1
      if(selectedItem == inventory.length){
        selectedItem = 0
      }
      document.getElementById("inventorySlots").innerHTML = ""
      for(var i = 0; i < inventory.length; i++){
        if(i == selectedItem){
          document.getElementById("inventorySlots").innerHTML += "<li>>&nbsp" + inventory[i] + "</li>";
        }else{
          document.getElementById("inventorySlots").innerHTML += "<li>&nbsp&nbsp" + inventory[i] + "</li>";
        }
        
      }
    }
  }

  if(upTapped){
    if(inventoryShown){
      selectedItem -= 1
      if(selectedItem == -1){
        selectedItem = inventory.length - 1
      }
      document.getElementById("inventorySlots").innerHTML = ""
      for(var i = 0; i < inventory.length; i++){
        if(i == selectedItem){
          document.getElementById("inventorySlots").innerHTML += "<li>>&nbsp" + inventory[i] + "</li>";
        }else{
          document.getElementById("inventorySlots").innerHTML += "<li>&nbsp&nbsp" + inventory[i] + "</li>";
        }
        
      }
    }
  }

  if(zTapped){
    if(inventoryShown){
      paused = false
      inventoryShown = false;
      document.getElementById("inventory").style.display = "none"
      useItem(selectedItem)
    }
    
  }

  // if(xTapped){
  //   console.log("e")
  // }

  if(!inventoryShown && xTapped && !paused && canOpenInventory){
    inventory_open.currentTime = 0;
    inventory_open.play()
    paused = true
    inventoryShown = true;
    document.getElementById("inventory").style.display = "block"
    xTapped = false
    document.getElementById("inventorySlots").innerHTML = ""
    selectedItem = 0
    for(var i = 0; i < inventory.length; i++){
      if(i == selectedItem){
        document.getElementById("inventorySlots").innerHTML += "<li>>&nbsp" + inventory[i] + "</li>";
      }else{
        document.getElementById("inventorySlots").innerHTML += "<li>&nbsp&nbsp" + inventory[i] + "</li>";
      }
      
    }
    
  }
  if((xTapped && (inventoryShown))){
    inventory_close.currentTime = 0;
    inventory_close.play()
    paused = false
    inventoryShown = false;
    document.getElementById("inventory").style.display = "none"
  }

  if(fade.lifetime >= 1.4){
    if(areaLoaded != null){  
      fadeToClear()
      load()
      paused = false
    }else{
      eval(cachedCode)
      cachedCode = "";
      fadeToClear()
    }
    //Insert Loading Code
  }

  if(!raining){
    danceChangeupTimer += 1
  }
  

  if(danceChangeupTimer == 324){
    objects[1].data[0] = [native_dance_00, native_dance_01, native_dance_02, native_dance_03, native_dance_04, native_dance_05, native_dance_04, native_dance_03, native_dance_02, native_dance_01, native_dance_00, native_dance_06, native_dance_07, native_dance_08, native_dance_09, native_dance_10, native_dance_09, native_dance_08, native_dance_07, native_dance_06];
    objects[2].data[0] = [native_dance_00, native_dance_06, native_dance_07, native_dance_08, native_dance_09, native_dance_10, native_dance_09, native_dance_08, native_dance_07, native_dance_06, native_dance_00, native_dance_01, native_dance_02, native_dance_03, native_dance_04, native_dance_05, native_dance_04, native_dance_03, native_dance_02, native_dance_01];
  }
  if(danceChangeupTimer == 648){
    objects[1].data[0] = [native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1, native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3];
    objects[2].data[0] = [native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3, native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1];
  }
  if(danceChangeupTimer == 1000){
    objects[1].data[0] = [native_dance_00, native_dance_01, native_dance_02, native_dance_03, native_dance_04, native_dance_05, native_dance_04, native_dance_03, native_dance_02, native_dance_01, native_dance_00, native_dance_06, native_dance_07, native_dance_08, native_dance_09, native_dance_10, native_dance_09, native_dance_08, native_dance_07, native_dance_06];
    objects[2].data[0] = [native_dance_00, native_dance_06, native_dance_07, native_dance_08, native_dance_09, native_dance_10, native_dance_09, native_dance_08, native_dance_07, native_dance_06, native_dance_00, native_dance_01, native_dance_02, native_dance_03, native_dance_04, native_dance_05, native_dance_04, native_dance_03, native_dance_02, native_dance_01];
  }
  if(danceChangeupTimer == 1400){
    objects[1].data[0] = [native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1, native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3];
    objects[2].data[0] = [native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3, native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1];
  }
  if(danceChangeupTimer == 1700){
    objects[1].data[0] = [native_bounce_0, native_bounce_0];
    objects[2].data[0] = [native_bounce_0,native_bounce_0];
    objects[0].data[0] = [chief_dance_0,chief_dance_0];
    // paused = false
    areaLoaded = null
    waitForFade("objects[0].data[2] = [[chief_dance_0, \"So, how did we do?\"],[chief_dance_0, \"Now, go and get that pollen! Once you've got it, bring it to me!\"]]; displayedText = objects[0].data[2][0][1]; displayedImage = objects[0].data[2][0][0]; raining = true; backdrop_far = jungle_BG_4_rain; for(var i = 0; i < 100; i++){rain.push(new component(Math.floor(Math.random()*1000),Math.floor(Math.random()*500), 0, 0, \"rain\", (Math.random() * 2) + 12))}; rainDance = false; player.x += 300; pageOfText = 0; textSource = 0; areaLoaded = \"jungleVillageRight\"; rain_dance.pause(); jungle_theme.play();")
    fadeToBlack()
  }

  if(displayedText != ""){
    paused = true
    if(displayedImage != null){
      if(document.getElementById("textBoxImage").innerHTML == "" || document.getElementById("textBoxImage").children[0].src != displayedImage.currentSrc){
        if(displayedImage == shipwright_stuck){
          document.getElementById("textBoxImage").innerHTML = "<img class=\"crisp\" style=\"height: 150%; margin-top: -5%;\" src=\"" + displayedImage.currentSrc + "\">"
        }else{
          document.getElementById("textBoxImage").innerHTML = "<img class=\"crisp\" style=\"height: 150%;\" src=\"" + displayedImage.currentSrc + "\">"
        }
        document.getElementById("textBox").style.left = "30%";
      }
    }else{
      document.getElementById("textBox").style.left = "11.5%";
    }
    document.getElementById("textBoxContainer").style.display = "block"
    if(buffer == ""){
      for(i = 0; i < displayedText.length; i++){
        if(displayedText.charAt(i) == " "){
          buffer += " "
        }else{
          // Invisible Unicode, not space
          buffer += " "
        }
      }
    }
    
    if(shownText != displayedText){
      if(framesElapsed % textDelay == 0){
        shownText += displayedText.charAt(shownText.length)

        // console.log(shownText)
        document.getElementById("textBox").innerHTML = shownText + buffer
        buffer = buffer.substring(1)


        text_scroll.currentTime = 0;
        text_scroll.play()
      }
      document.getElementById("zPrompt").style.opacity = 0
    }else{
      document.getElementById("zPrompt").style.opacity = Math.sin(framesElapsed/10) + 0.4
      if(zTapped){
        if(textSource == null){
          if(shownText == "That\'s no banana... That\'s a Banantula!!!"){
            waitForFade("battle_theme.play(); beach_theme.pause(); fighting = true; opponent = \"banantula\";myGameLevel.clear(); opponentHealth = 100;")
            circleClosing = true
          }
          paused = false
          console.log(paused)
          displayedImage = null;
          displayedText = ""
          if(!fighting){
            document.getElementById("textBoxContainer").style.display = "none"
            document.getElementById("textBox").innerHTML = ""
          }


          document.getElementById("textBoxImage").innerHTML = ""


          buffer = ""
          shownText = ""
        }else if(objects[textSource].type == "textDisplayZone" || objects[textSource].data[2].length - 1 != pageOfText){
          pageOfText += 1
          if(objects[textSource].type != "textDisplayZone"){
            displayedText = objects[textSource].data[2][pageOfText][1];
          }
          console.log(displayedText);
          // eval("var newText = "+ displayedText)
          // displayedImage = newText[0]
          if(objects[textSource].type != "textDisplayZone"){
            displayedImage = objects[textSource].data[2][pageOfText][0]
            if(objects[textSource].data[2][pageOfText].length == 3){
              eval(objects[textSource].data[2][pageOfText][2])
            }
          }
          if(objects[textSource].type == "textDisplayZone"){
            console.log("TextDisplayZone Finished")
            eval(objects[textSource].data[1])
            paused = false
            console.log(paused)
            displayedImage = null;
            displayedText = ""
            document.getElementById("textBoxContainer").style.display = "none"
            document.getElementById("textBox").innerHTML = ""
          }
          shownText = ""
          buffer = ""
          document.getElementById("textBox").innerHTML = ""
          // document.getElementById("textBoxImage").innerHTML = ""
        }else{
          // if(displayedText = "That\'s no banana... That's a Banantula!!!"){
          //   fadeToBlack()
          //   areaLoaded = null
          //   waitForFade("opponent = \"banantula\"; fighting = true; battle_theme.play()")
          // }
          paused = false
          console.log(paused)
          displayedImage = null;
          displayedText = ""
          if(!fighting){
            document.getElementById("textBoxContainer").style.display = "none"
            document.getElementById("textBox").innerHTML = ""
          }


          document.getElementById("textBoxImage").innerHTML = ""


          buffer = ""
          shownText = ""
        }
      }
    }
  }else{
    // document.getElementById("textBoxContainer").style.display = "none"
    // document.getElementById("textBox").innerHTML = ""


    document.getElementById("textBoxImage").innerHTML = ""


    buffer = ""
    shownText = ""
  }

  if(fading){
    if(areaLoaded == null || gameComplete){
      fade.lifetime += 0.01
    }else{ 
      fade.lifetime += 0.05
    }
    // if(fade.lifetime > 1.5) fade.lifetime = 1.5
  }else{
    if(areaLoaded == null){
      fade.lifetime -= 0.01
    }else{
      fade.lifetime -= 0.1
    }

    if(fade.lifetime < 0) fade.lifetime = 0
  }

  if(player.y > 450 && fading == false && !fighting){
    // areaLoaded = "beachLeft"
    if(areaLoaded != "ending"){
      fadeToBlack()
    }
    player.momentumX = 0
  }

  

  if(playingCards){
    if(hand.length == 0){
      for(var i = 0; i < 5; i++){
        if(i == 4){
          if(!checkForDuplicates(hand)){
            hand.push(hand[Math.floor(Math.random() * (hand.length - 2))])
          }
        }
        hand.push(Math.floor(Math.random() * 10) + 1)
        console.log("e")
      }
      if(hand.length > 5){
        hand.pop()
      }
      console.log(hand)
      enemyHand = ["back", "back", "back", "back", "back"]
    }
    
    
    var playingCardDrawX = 0;
    ctx = board.context
    ctx.imageSmoothingEnabled = false;
    for(var i = 0; i < hand.length; i++){
      ctx.drawImage(eval("playing_card_" + hand[i]), playingCardDrawX, 300, 160, 200)
      ctx.drawImage(eval("playing_card_" + enemyHand[i]), playingCardDrawX, 0, 160, 200)
      playingCardDrawX += 210
    }
  }
  if(scrollX < -1500 && !fighting){
    textDelay = 10;
  }
  ctx = myGameArea.context
  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
  if(texture != null && !fighting){
    if(terrain == beach_1){
      ctx.drawImage(texture, skewPreventionX, skewPreventionY, 4000, 2000);
      if(scrollX > 2900){
        if(inventory.includes("Banana")){
          removeItem(inventory, "Banana")
          objects[0].data[2] = [[monkey_face, "EEE AH! (A Banana? For me? Gee, Thanks!)"], [monkey_face, "", "document.getElementById(\"textBoxContainer\").style.display = \"none\"; paused = false"]]
          monkeySatisfied = true
          pageOfText = 0;
          textSource = 0;
          displayedText = objects[0].data[2][pageOfText][1]
          displayedImage = objects[0].data[2][pageOfText][0]
        }
      }
    }else{
      ctx.drawImage(texture, skewPreventionX, skewPreventionY, terrainWidth, terrainHeight);
    }
  }
  
  if(oceanShown && !fighting){
    if(areaLoaded == "ending" && terrain == blank){
      if(inventory.includes("Apex Snapdragon")){
        ctx.drawImage(apex_snapdragon, (scrollX * -1) + 700 - Math.sin(framesElapsed/20)*5, (scrollY * -1) + 1400 - Math.sin(framesElapsed/50)*15, 400, 400)
      }
      if(inventory.includes("Banantula")){
        ctx.drawImage(banantula_7, (scrollX * -1) + 1050 - Math.sin(framesElapsed/20)*5, (scrollY * -1) + 1620 - Math.sin(framesElapsed/50)*15, 200, 120)
      }
      ctx.drawImage(canoe, (scrollX * -1) + 800 - Math.sin(framesElapsed/20)*5, (scrollY * -1) + 1600 - Math.sin(framesElapsed/50)*15, 480, 160)
      document.getElementById("prompt").style.top = "10%"
      document.getElementById("prompt").innerHTML = "The End<br>Thank You For Playing!<br>Programming by Jack Larson<br>Art and Music by Evan Kulp"
      document.getElementById("prompt").style.opacity = Math.sin(framesElapsed/10) + 2
    }
    ctx.drawImage(ocean, (scrollX * -1) - 20 - Math.sin(framesElapsed/20)*10, (scrollY * -1) + 1450 - Math.sin(framesElapsed/50)*10, 4000, 400)
    ctx.drawImage(ocean, (scrollX * -1) - 20 - Math.sin(framesElapsed/20)*10 - 4000, (scrollY * -1) + 1450 - Math.sin(framesElapsed/50)*10, 4000, 400)
    
  }
  for(var i = 0; i < rain.length; i++){
    if(rain[i].type == "pollen"){
      rain[i].y -= 1
      ctx.fillStyle = "yellow"
      ctx.globalAlpha = rain[i].data
      rain[i].data -= 0.01
      ctx.fillRect(rain[i].x - scrollX, rain[i].y - scrollY, 2, 2)
      if(rain[i].data <= 0){
        removeItem(rain, rain[i])
      }
    }else{
      rain[i].y += rain[i].data
      rain[i].x += player.momentumX * -1
      rain[i].y += player.momentumY * -1
      if(rain[i].x < 0){
        rain[i].x = 1000
      }
      if(rain[i].x > 1000){
        rain[i].x = 0
      }
      if(rain[i].x < 0){
        rain[i].x = 500
      }
      if(rain[i].y > 500){
        rain[i].y = 0
      }
      ctx.fillStyle = "lightblue"
      ctx.globalAlpha = 1
      ctx.fillRect(rain[i].x, rain[i].y, 1, 15)
    }
  }
  
  // ctx.globalCompositeOperation = "source-over";
  if(rainDance){
    ctx.imageSmoothingEnabled = false
    ctx.globalAlpha = 0.8
    ctx.drawImage(spotlight, 0, 0, 1000, 500)
    ctx.globalAlpha = 1
  }

  // playerDamage = document.getElementById("damage").value;

  ctx.globalAlpha = 1
  if(fighting){
    canOpenInventory = false;
    document.getElementById("textBoxContainer").style.top = "70%";
    document.getElementById("textBoxContainer").style.bottom = "10%";
    displayedImage = null;
    textSource = null;
    document.getElementById("zPrompt").style.opacity = 0
    document.getElementById("circleCanvas").style.display = "block"
    if(circleSize == 750 && displayedText == ""){
      if(battleProgression == 4){
        if(opponent == "banantula"){
          document.getElementById("textBoxContainer").style.display = "block"
          zTapped = false
          battleOptions = ["Fight", "Insult", "Compliment", "Mock"]
          assignBattleOptions()
          battleProgression++
        }else if(opponent == "apexSnapdragon"){
          document.getElementById("textBoxContainer").style.display = "block"
          zTapped = false
          battleOptions = ["Fight", "Uproot", "Knot", "Dance"]
          assignBattleOptions()
          battleProgression++
        }else if(opponent == "monkey"){
          document.getElementById("textBoxContainer").style.display = "block"
          zTapped = false
          battleOptions = ["Fight", "Use Item", "Dig", "Swim", "Search"]
          assignBattleOptions()
          battleProgression++
        }
      }
      if(battleProgression == 3){
        if(opponent == "banantula"){
          displayedText = "The Special Moves (Compliment, Insult, Mock) will make winning a lot easier, but if you want to pull them off you will have to be very precise. Ready? Let\'s go!"
          battleProgression++
        }else{
          displayedText = "The Special Moves (Uproot, Knot, Dance) will make winning a lot easier, but if you want to pull them off you will have to be very precise. Ready? Let\'s go!"
          battleProgression++
        }
      }
      if(battleProgression == 2){
        displayedText = "See those circles? You\'ll have to press Z when the red one lines up with the purple one for the most powerful attack or defense!"
        battleProgression++
      }
      if(battleProgression == 1){
        displayedText = "When in a battle, you take turns attacking and defending."
        battleProgression++
      }
      if(battleProgression == 0){
        if(opponent == "banantula"){  
          displayedText = "A Banantula dropped down from the tree!"
          opponentDisplayedHealth = opponentHealth
          battleProgression++
        }
        if(opponent == "apexSnapdragon"){  
          displayedText = "The Apex Snapdragon will protect the baton at all costs!"
          opponentDisplayedHealth = opponentHealth
          battleProgression++
        }
        if(opponent == "monkey"){
          displayedText = "The monkey is going on the offensive!"
          opponentDisplayedHealth = opponentHealth
          battleProgression = 4
        }
      }
    }
    ctx = document.getElementById("circleCanvas").getContext("2d")
    ctx.globalCompositeOperation = "destination-over"
    ctx.clearRect(0, 0, 200, 200)
    
    if(battleProgression == 3 || circlesShown == true){
      
      ctx.beginPath();
      ctx.arc(100, 100, 25, 0, 2 * Math.PI, true);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'purple';
      ctx.stroke();
      ctx.beginPath();
      if(battleAccuracy == null){
        ctx.arc(100, 100, Math.abs(25 + Math.sin(framesElapsed/20)*25), 0, 2 * Math.PI, true);
      }else{
        ctx.arc(100, 100, Math.abs(25 + battleAccuracy), 0, 2 * Math.PI, true);
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    }
    ctx = myGameArea.context
    if(battleOptions.length > 0 && document.getElementById("textBoxContainer").style.display == "block" && battleMenuOpen){
      if(upTapped){
        selectedOption -= 1
        if(selectedOption < 0){
          selectedOption = battleOptions.length - 1
        }
        assignBattleOptions()
      }
      if(downTapped){
        selectedOption += 1
        if(selectedOption >= battleOptions.length){
          selectedOption = 0
        }
        assignBattleOptions()
      }
      if(zTapped){
        executeAction(battleOptions[selectedOption])
      }
    }
    if(battleStatus == null){
      if(battleAccuracy != null && displayedText == ""){
        if(turn == "player" && battleOptions != battleInventory){
          battleAccuracy = null
          circlesShown = false
          turn = "opponent"
          if(opponent == "banantula"){
            displayedText = "The Banantula prepares to attack you!"
          }else if(opponent == "apexSnapdragon"){
            if(!charmed){
              displayedText = "The Apex Snapdragon prepares to attack you!"
            }
          }else if(opponent == "monkey"){
            displayedText = "The monkey smirks with an air of superiority."
          }
        }else{
          battleAccuracy = null
          circlesShown = false
          turn = "player"
          document.getElementById("textBoxContainer").style.display = "block"
          assignBattleOptions()
        }
      }
    }
    if(circlesShown && displayedText == "" && battleStatus == null){
      if(zTapped){
        battleAccuracy = Math.sin(framesElapsed/20)*25
        resolveAction(battleOptions[selectedOption])
      }
    }
    if(displayedText == "" && turn == "opponent"){
      executeAction("Fight")
    }
    if(opponent == "banantula"){
      if(opponentShaking > 0){
        opponentShaking--
        ctx.drawImage(banantula_7, 800 + (Math.random()*opponentShaking)-(opponentShaking/2), 150 + (Math.random()*opponentShaking)-(opponentShaking/2) + Math.sin(framesElapsed/15)*20, 200, 120)
      }else{
        ctx.drawImage(banantula_7, 800, 150 + Math.sin(framesElapsed/15)*20, 200, 120)
      }
      if(opponentSlash < 18){
        ctx.globalAlpha = 0.8
        // console.log("slash_"+opponentSlash)
        ctx.drawImage(eval("slash"+opponentSlash), 850, 150 + Math.sin(framesElapsed/15)*20, 160, 160)
        ctx.globalAlpha = 1
        opponentSlash++
      }
    }
    if(opponent == "apexSnapdragon"){
      if(opponentShaking > 0){
        opponentShaking--
        ctx.drawImage(apex_snapdragon, 750 + (Math.random()*opponentShaking)-(opponentShaking/2), 50 + (Math.random()*opponentShaking)-(opponentShaking/2) + Math.sin(framesElapsed/15)*20, 200, 200)
      }else{
        ctx.drawImage(apex_snapdragon, 750, 50 + Math.sin(framesElapsed/15)*20, 200, 200)
      }
      if(opponentSlash < 18){
        ctx.globalAlpha = 0.8
        ctx.drawImage(eval("slash"+opponentSlash), 770, 70 + Math.sin(framesElapsed/15)*20, 160, 160)
        ctx.globalAlpha = 1
        opponentSlash++
      }
    }
    if(opponent == "monkey"){
      ctx.drawImage(monkey_battle, 750, 50 + Math.sin(framesElapsed/5)*20, 160, 160)
    }
    if(playerShaking > 0){
      playerShaking--
      ctx.drawImage(castaway_battle, 0 + (Math.random()*playerShaking) - playerShaking/2, 160  + Math.sin(framesElapsed/10) * 10 + (Math.random()*playerShaking) - playerShaking/2, 80, 80)
    }else{
      ctx.drawImage(castaway_battle, 0, 160  + Math.sin(framesElapsed/10) * 10, 80, 80)
    }
    if(playerSlash < 18){
      ctx.globalAlpha = 0.8
      // console.log("slash_"+opponentSlash)
      ctx.drawImage(eval("slash"+playerSlash), -50, 100 + Math.sin(framesElapsed/15)*20, 160, 160)
      ctx.globalAlpha = 1
      playerSlash++
    }
    if(opponentDisplayedHealth > opponentHealth){
      opponentDisplayedHealth--
    }
    if(playerDisplayedHealth > playerHealth){
      playerDisplayedHealth--
    }
    if(battleStatus != null && displayedText == ""){
      if(battleStatus == "win"){
        if(opponent == "banantula"){
          if(inventory.includes("Banantula")){
            waitForFade("fighting = false; circleClosing = false; bananaRequested = false; displayedText = \"You grab a banana off of the tree, and the Banantula accompanies you on your adventure!\"; circlesShown = false; player.y = 230; scrollX = 1000;inventory.push(\"Banana\"); battle_theme.pause(); beach_theme.play(); document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\"; canOpenInventory = true;")
          }else{
            waitForFade("fighting = false; circleClosing = false; bananaRequested = false; displayedText = \"You won the battle and grabbed a banana off of the tree!\"; circlesShown = false; player.y = 230; scrollX = 1000;inventory.push(\"Banana\");battle_theme.pause(); beach_theme.play(); document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\"; canOpenInventory = true;")
          }
        }else if(opponent == "apexSnapdragon"){
          if(inventory.includes("Apex Snapdragon")){
            waitForFade("fighting = false; circleClosing = false; displayedText = \"You befriended the Apex Snapdragon, got the baton, and climbed back to the cave entrance.\"; circlesShown = false; player.y = 230; scrollX = 100; scrollY = -1500; inventory.push(\"Baton\"); funky_cave_theme.play(); final_battle.pause();document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\"; canOpenInventory = true; apexSnapdragonHeight = 0;")
          }else{
            waitForFade("fighting = false; circleClosing = false; displayedText = \"You won the battle, got the baton, and climbed back to the cave entrance.\"; circlesShown = false; player.y = 230; scrollX = 100; scrollY = -1500; inventory.push(\"Baton\"); funky_cave_theme.play(); final_battle.pause();document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\"; canOpenInventory = true; apexSnapdragonHeight = 0;")
          }
        }else if(opponent = "monkey"){
          if(battleInventory.includes("Pearl")){
            localStorage.setItem("pearlObtained", true)
          }
          location.reload();
          clearInterval(myGameArea.interval)
        }
      }else{
        if(opponent == "banantula"){
          waitForFade("fighting = false; circleClosing = false; displayedText = \"The Banantula got the better of you...\"; circlesShown = false; player.y = 230; scrollX = 1600; player.x = 480; banantulaEncounter = false; banantulaPhase = 0; battleStatus = null; playerHealth = 100; playerDisplayedHealth = 100; opponentHealth = 100; opponentDisplayedHealth = 100; move1Difficulty = 7; move2Difficulty = 6; move3Difficulty = 1; opponentDamage = 20; playerDamage = document.getElementById(\"damage\").value;")
        }else{
          waitForFade("fighting = false; circleClosing = false; displayedText = \"The Apex Snapdragon got the better of you...\"; circlesShown = false; player.y = 230; scrollX = 1600; player.x = 480; banantulaEncounter = false; banantulaPhase = 0; battleStatus = null; playerHealth = 100; playerDisplayedHealth = 100; opponentHealth = 100; opponentDisplayedHealth = 100; move1Difficulty = 7; move2Difficulty = 6; move3Difficulty = 1; opponentDamage = 20; playerDamage = document.getElementById(\"damage\").value;")
        }
      }
      circleClosing = true
      
    }
    if(opponentHealth <= 0 && circleClosing == false && battleStatus == null){
      opponentHealth = 0
      displayedText = "You won the battle!"
      battleStatus = "win"
    }
    if(playerHealth <= 0 && circleClosing == false && battleStatus == null && opponent != "monkey"){
      playerHealth = 0
      displayedText = "You lost the battle..."
      battleStatus = "lose"
    }

    
    ctx.fillStyle = "black"
    ctx.fillRect(100, 20, 800, 8)
    ctx.fillRect(100, 300, 800, 8)
    ctx.fillStyle = "red"
    ctx.fillRect(100, 20, opponentDisplayedHealth * 8, 8)
    ctx.fillStyle = "cyan"
    ctx.fillRect(100, 300, playerDisplayedHealth * 8, 8)
    
  }
  ctx = myGameArea.context

  if(areaLoaded == "funkyCave" && !inventory.includes("Baton") && !fighting){
    // ctx = myGameArea.context
    ctx.drawImage(rain_baton, 2320 - scrollX, 1680 - scrollY, 128, 64);
  }

  if(circleClosing || circleSize < 750){
    
    ctx.globalAlpha = 1
    if(circleSize < 750 && !circleClosing){
      circleSize += 10
    }
    if(circleSize <= 0){
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 1000, 500);
      
    }
    if(circleClosing){
      if(!fighting){
        document.getElementById("textBoxContainer").style.display = "none";
      }
      circleSize -= 10
    }
    if(circleSize <= -200){
      // console.log(circleSize)
      eval(cachedCode)
      cachedCode = ""
      circleClosing = false
      circleSize = 0
      document.getElementById("circleCanvas").style.display = "none"
    }
    ctx.beginPath();
    ctx.arc(500, 250, circleSize + 500, 0, 2 * Math.PI, true);
    ctx.lineWidth = 1000;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    
  }
  for(var i = 1; i < battleOptions.length - 1; i++){
    if(eval("move" + i + "Difficulty") == 3){
      battleOptions.splice(i, 1)
      eval("move" + i + "Difficulty = 0")
    }
  }

  ctx.globalAlpha = fade.lifetime
  ctx.fillStyle = fade.color
  ctx.fillRect(fade.x, fade.y, fade.width, fade.height)
  
  ctx = myGameArea.context
  ctx.imageSmoothingEnabled = false;

  
}

function executeAction(action){
  zTapped = false
  circlesShown = true
  document.getElementById("textBoxContainer").style.display = "none"
  battleMenuOpen = false
}

function resolveAction(action){
  if(opponent == "banantula"){
    if(turn == "opponent"){
      if(opponentDamage + Math.floor((Math.abs(battleAccuracy))) <= 0 || Math.abs(battleAccuracy) <= 1){
        displayedText = "You block the Banantula\'s attack!"
      }else{
        var damageReduction = 1
        if(Math.abs(battleAccuracy) <= 6){
          damageReduction = 0.9
        }
        if(Math.abs(battleAccuracy) <= 5){
          damageReduction = 0.8
        }
        if(Math.abs(battleAccuracy) <= 4){
          damageReduction = 0.7
        }
        if(Math.abs(battleAccuracy) <= 3){
          damageReduction = 0.6
        }
        if(Math.abs(battleAccuracy) <= 2){
          damageReduction = 0.5
        }

        playerHealth -= Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction)
        playerShaking = Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction) + 8
        playerSlash = 0
        displayedText = "The Banantula bashes you, dealing " + Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction) + " damage!"
      }
    }else{
      if(action == "Fight"){
        if(Math.floor(playerDamage - (Math.abs(battleAccuracy))) <= 0){
          displayedText = "The Banantula blocks your attack!"
        }else{
          var damageMultiplier = 1
          if(Math.abs(battleAccuracy) <= 6){
            damageMultiplier = 1.2
          }
          if(Math.abs(battleAccuracy) <= 5){
            damageMultiplier = 1.5
          }
          if(Math.abs(battleAccuracy) <= 4){
            damageMultiplier = 1.8
          }
          if(Math.abs(battleAccuracy) <= 3){
            damageMultiplier = 2
          }
          if(Math.abs(battleAccuracy) <= 2){
            damageMultiplier = 2.5
          }
          opponentHealth -= Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier)
          opponentShaking = Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + 8
          opponentSlash = 0
          displayedText = "You bash the Banantula, dealing " + Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + " damage!"
        }
      }else if(action == "Insult"){
        if((Math.abs(battleAccuracy)) < move1Difficulty){
          playerDamage += 10
          move1Difficulty -= 1
          displayedText = "You told the Banantula that your grandmother could fight better than it can, and she\'s in a wheelchair. The Banantula got so mad, its defense dropped by 10!"
        }else{
          displayedText = "You told the Banantula that it was not very nice. It told you that that\'s what Banantulas do. Your insult was not very good..."
        }
      }else if(action == "Compliment"){
        if((Math.abs(battleAccuracy)) < move2Difficulty){
          opponentDamage -= 10
          move2Difficulty -= 1
          displayedText = "You told the Banantula that it is the feircest spider you\'ve ever met. It blushes with pride, and its attack drops by 10!"
        }else{
          displayedText = "You told the Banantula that it has nice manners. It frowns and says that it has been practicing its bad manners all morning. Your compliment was not very good..."
        }
      }else if(action == "Mock"){
        if((Math.abs(battleAccuracy)) < move3Difficulty){
          move3Difficulty = 3
          battleStatus = "win"
          inventory.push("Banantula")
          displayedText = "You bob your arms and legs in a Banantula-like way. You make a hissing sound with your mouth. The Banantula is so convinced, it goes up to you and gives you an eight-legged hug!"
        }else{
          displayedText = "You make a clicking sound with your tongue and scurry around. The Banantula scoffs. Your mocking was not very good..."
        }
      }
    }
  }
  if(opponent == "apexSnapdragon"){
    if(turn == "opponent"){
      if(charmed){
        displayedText = "The Apex Snapdragon sways side to side in its trance."
      }else{
        if(opponentDamage + Math.floor((Math.abs(battleAccuracy))) <= 0 || Math.abs(battleAccuracy) <= 1){
          displayedText = "You block the Apex Snapdragon\'s attack!"
        }else{
          var damageReduction = 1
          if(Math.abs(battleAccuracy) <= 6){
            damageReduction = 0.9
          }
          if(Math.abs(battleAccuracy) <= 5){
            damageReduction = 0.8
          }
          if(Math.abs(battleAccuracy) <= 4){
            damageReduction = 0.7
          }
          if(Math.abs(battleAccuracy) <= 3){
            damageReduction = 0.6
          }
          if(Math.abs(battleAccuracy) <= 2){
            damageReduction = 0.5
          }

          playerHealth -= Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction)
          playerShaking = Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction) + 8
          playerSlash = 0
          displayedText = "The Apex Snapdragon bashes you, dealing " + Math.floor((opponentDamage + Math.floor((Math.abs(battleAccuracy)))) * damageReduction) + " damage!"
        }
      }
    }else{
      if(action == "Fight"){
        if(charmed){
          var damageMultiplier = 1
          if(Math.abs(battleAccuracy) <= 6){
            damageMultiplier = 1.2
          }
          if(Math.abs(battleAccuracy) <= 5){
            damageMultiplier = 1.5
          }
          if(Math.abs(battleAccuracy) <= 4){
            damageMultiplier = 1.8
          }
          if(Math.abs(battleAccuracy) <= 3){
            damageMultiplier = 2
          }
          if(Math.abs(battleAccuracy) <= 2){
            damageMultiplier = 2.5
          }
          opponentHealth -= Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + 10
          displayedText = "You bash the Apex Snapdragon, dealing " + (Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + 10) + " damage! It snaps out of its trance!"
          battleOptions = ["Fight", "Uproot", "Knot", "Dance"]
          charmed = false
        }else{
          if(Math.floor(playerDamage - (Math.abs(battleAccuracy))) <= 0){
            displayedText = "The Apex Snapdragon blocks your attack!"
          }else{
            var damageMultiplier = 1
            if(Math.abs(battleAccuracy) <= 6){
              damageMultiplier = 1.2
            }
            if(Math.abs(battleAccuracy) <= 5){
              damageMultiplier = 1.5
            }
            if(Math.abs(battleAccuracy) <= 4){
              damageMultiplier = 1.8
            }
            if(Math.abs(battleAccuracy) <= 3){
              damageMultiplier = 2
            }
            if(Math.abs(battleAccuracy) <= 2){
              damageMultiplier = 2.5
            }
            opponentHealth -= Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier)
            opponentShaking = Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + 8
            opponentSlash = 0
            displayedText = "You bash the Apex Snapdragon, dealing " + Math.floor((Math.floor(playerDamage - (Math.abs(battleAccuracy)))) * damageMultiplier) + " damage!"
          }
        }
      }else if(action == "Uproot"){
        if((Math.abs(battleAccuracy)) < move1Difficulty){
          playerDamage += 10
          move1Difficulty -= 1
          displayedText = "You leapt the the Apex Snapdragon and began to hack at its roots. It shoves you away, but its defense drops by 10!"
        }else{
          displayedText = "You jump at the Apex Snapdragon and it knocks you aside with a vine. Your uproot was not very good..."
        }
      }else if(action == "Knot"){
        if((Math.abs(battleAccuracy)) < move2Difficulty){
          opponentDamage -= 10
          move2Difficulty -= 1
          displayedText = "You grab the Apex Snapdragon and shove it through a loop in its own vine. It gets all twisted, and its attack drops by 10!"
        }else{
          displayedText = "You tie a knot with the Apex Snapdragon's vine, but it slips loose as soon as it moves. Your knot-tying skills are knot very good..."
        }
      }else if(action == "Dance"){
        if((Math.abs(battleAccuracy)) < move3Difficulty){
          move3Difficulty = 3
          battleOptions = ["Fight", "Befriend"]
          selectedOption = 0
          displayedText = "You groove to the beat of the intense music that accompanies your battle. The Apex Snapdragon watches your every move, mesmerized. You have charmed the Apex Snapdragon!"
          charmed = true
        }else{
          displayedText = "You jump into the air, and then dab. The Apex Snapdragon chuckles and mutters \"That's so 2012\". Your dancing was not very good."
        }
      }else if(action == "Befriend"){
        battleStatus = "win"
        inventory.push("Apex Snapdragon")
        displayedText = "The Apex Snapdragon plucks itself out of the ground and hops over to you. \"Thank you for showing me what true friendship is like.\" it says."
      }
    }
  }
  if(opponent == "monkey"){
    if(turn == "opponent"){
      if(opponentDamage + Math.floor((Math.abs(battleAccuracy))) <= 0 || Math.abs(battleAccuracy) <= 1){
        var monkeyMoveOutcome = Math.random() * 3
        if(opponentDamage < 1000){
          if(monkeyMoveOutcome < 1){
            displayedText = "You leap out of the way as the money slams into the place you just were, causing a small nuclear reaction."
          }else if(monkeyMoveOutcome < 2){
            displayedText = "You dive out of the way as the money slashes the place you just were, causing a small fracture in reality."   
          }else{
            displayedText = "You duck out of the way as the monkey flies through the place you just were, causing a small seismic tremor."
          }
        }else{
          if(monkeyMoveOutcome < 1){
            displayedText = "You leap out of the way as the money slams into the place you just were, triggering a large nuclear explosion."
          }else if(monkeyMoveOutcome < 2){
            displayedText = "You dive out of the way as the money slashes the place you just were, causing several gashes to appear in reality."
          }else{
            displayedText = "You duck out of the way as the monkey flies through the place you just were, causing a tectonic fracture."
          }
        }
      }else{
        var damageReduction = 1
        if(Math.abs(battleAccuracy) <= 6){
          damageReduction = 0.9
        }
        if(Math.abs(battleAccuracy) <= 5){
          damageReduction = 0.8
        }
        if(Math.abs(battleAccuracy) <= 4){
          damageReduction = 0.7
        }
        if(Math.abs(battleAccuracy) <= 3){
          damageReduction = 0.6
        }
        if(Math.abs(battleAccuracy) <= 2){
          damageReduction = 0.5
        }

        playerHealth -= 100
        displayedText = "The monkey obliterates you, dealing 99999999999999999999999999999999999999999999999999999999999"
        circleClosing = true;
        waitForFade("document.getElementById(\"textBoxContainer\").style.display = \"none\"; displayedText = \"\"; fighting = false; monkey_battle_theme.pause(); beach_theme.play(); playerHealth = 100; playerDisplayedHealth = 100; shownText = \"\"; document.getElementById(\"textBox\").innerHTML = \"\";")
      }
    }else{
      if(action == "Fight"){
        displayedText = "You kick the monkey, which doesn't even flinch. You hear bones cruch in your foot."
      }else if(action == "Use Item"){
        if(battleInventory.length >= 1){
          battleOptions = battleInventory
          selectedOption = 0
        }else{
          displayedText = "You don't have any items!"
        }
      }else if(action == "Dig"){
        displayedText = "You dig down into the sand. If you think that you can hide from The Monkey there, you are sadly mistaken."
        battlePosition = "underground"
      }else if(action == "Swim"){
        displayedText = "You swim out into the ocean. If you think that you can hide from The Monkey there, you are sadly mistaken."
        battlePosition = "underwater"
      }else if(action == "Search"){
        if(battlePosition == "island"){
          if(!battleInventory.includes("Seed")){
            battleInventory.push("Seed")
            displayedText = "You find a seed lying on the sand. How useful!"
          }else{
            displayedText = "You desperately search for more seeds, but find nothing."
          }
        }
        if(battlePosition == "underwater"){
          if(!battleInventory.includes("Pearl")){
            battleInventory.push("Pearl")
            displayedText = "You find a pearl under the water. How useful!"
          }else{
            displayedText = "You desperately search for more pearls, but find nothing."
          }
        }
        if(battlePosition == "underground"){
          if(!battleInventory.includes("Can")){
            battleInventory.push("Can")
            displayedText = "You find a can lying in the hole. How useful!"
          }else{
            displayedText = "You desperately search for more cans, but find nothing."
          }
        }
      }else if(action == "Seed"){
        if(!seedPlanted){
          displayedText = "You plant the seed in the sand."
          battleOptions = [ 'Fight', 'Use Item', 'Dig', 'Swim', 'Search' ]
          seedPlanted = true
        }else{
          displayedText = "The seed is planted in the sand."
          battleOptions = [ 'Fight', 'Use Item', 'Dig', 'Swim', 'Search' ]
        }
      }else if(action == "Can"){
        if(!canFull){
          displayedText = "You fill the can with seawater."
          battleOptions = [ 'Fight', 'Use Item', 'Dig', 'Swim', 'Search' ]
          canFull = true
        }else{
          if(seedPlanted){
            canFull = false
            displayedText = "You water the seed with the can. In several seconds, It grows into a banana tree! The monkey climbs into the tree and starts eating all the bananas!"
            battleStatus = "win"
            monkeySatisfied = true;
          }else if(pearlSeen){
            canFull = false
            displayedText = "You wash off the pearl with the water, revealing its luster. The monkey grabs the pearl, and then runs away!"
            battleStatus = "win"
            removeItem(battleInventory, "Pearl")
            monkeySatisfied = true;
          }else{
            displayedText = "The can is full of water."
          }
          battleOptions = [ 'Fight', 'Use Item', 'Dig', 'Swim', 'Search' ]
        }
      }else if(action == "Pearl"){
        displayedText = "You show the pearl to the monkey, who frowns. It is covered in mud, and you can hardly tell it's a pearl at all!"
        pearlSeen = true;  
      }
    }
  }
}

function assignBattleOptions(){
  battleMenuOpen = true
  document.getElementById("textBox").innerHTML = ""
  for(var i = 0; i < battleOptions.length; i++){
    if(i == selectedOption){
      document.getElementById("textBox").innerHTML += ">&nbsp"
    }else{
      document.getElementById("textBox").innerHTML += "&nbsp "
    }
    document.getElementById("textBox").innerHTML += battleOptions[i] + "<br>"
  }
}



function pickCard(event){
  if(!cardsSwapped){
    mouseX = event.clientX - document.getElementById("board").offsetLeft - 30
    console.log(mouseX)
    if(playingCards){
      console.log(mouseX)
      if(event.clientY > 300){  
        if(mouseX < 169){
          hand[0] = "back"
        }
        if(mouseX < 370 && mouseX > 210){
          hand[1] = "back"
        }
        if(mouseX < 580 && mouseX > 420){
          hand[2] = "back"
        }
        if(mouseX < 790 && mouseX > 630){
          hand[3] = "back"
        }
        if(mouseX < 1000 && mouseX > 840){
          hand[4] = "back"
        }
      }
    }
  }
}

function checkForDuplicates(array) {
  return new Set(array).size !== array.length
}
const allEqual = arr => arr.every( v => v === arr[0] )

function swapCards(){
  cardsSwapped = true;
  var replacedValues = [];
  while(hand.indexOf("back") != -1){
    
    var newCard = "back";
    while(newCard == "back"){
      if(Math.random() > 0.4){
        newCard = hand[Math.floor(Math.random() * 5)]
      }else{
        newCard = Math.floor(Math.random() * 10) + 1
      }
    }
    replacedValues.push(hand.indexOf("back"))
    hand[hand.indexOf("back")] = newCard
  }
  while(allEqual( hand )){
    var randomIndex = replacedValues[Math.floor(Math.random() * replacedValues.length) + 1]
    hand.splice(randomIndex, 1, Math.floor(Math.random() * 10) + 1)
  }
}

function getOccurrence(array, value) {
  var count = 0;
  for(var i = 0; i < array.length; i++){
    if(array[i] == value){
      count++
    }
  }
  return count;
}

function showCards(){
  var winStatus = [];
  var handValue = "ERROR: NO HAND VALUE ASSIGNED";
  for(var i = 1; i <= 10; i++){
    if(getOccurrence(hand, i) > 1){
      winStatus.push(getOccurrence(hand, i))
    }
  }
  // alert(winStatus)

  if(winStatus[0] == 2){
    handValue = "Pair"
  }
  if(winStatus[0] == 3){
    handValue = "Three of a kind"
  }
  if(winStatus[0] == 4){
    handValue = "Four of a kind"
  }
  if(winStatus.length == 2 && Math.max.apply(Math, winStatus) == 3){
    handValue = "Full House"
  }
  if(winStatus.length == 2 && Math.max.apply(Math, winStatus) == 2){
    handValue = "Two pair"
  }
  if(winStatus.length == 0){
    handValue = "High Card of " + Math.max.apply(Math, hand)
  }
  displayedText = "Oh no... You got a " + handValue + "!!!!!"

  var index = 0;
  while(index < 5){
    var proposedCard = Math.floor(Math.random() * 10) + 1
    if(hand.includes(proposedCard) || enemyHand.includes(proposedCard)){
      continue;
    }
    enemyHand.splice(index, 1, proposedCard)
    index += 1
  }
  cardsSwapped = false
}

function showCardsMonkey(){
  var winStatus = [];
  var handValue = "ERROR: NO HAND VALUE ASSIGNED";
  for(var i = 1; i <= 10; i++){
    if(getOccurrence(hand, i) > 1){
      winStatus.push(getOccurrence(hand, i))
    }
  }
  // alert(winStatus)

  if(winStatus[0] == 2){
    handValue = "Pair"
  }
  if(winStatus[0] == 3){
    handValue = "Three of a kind"
  }
  if(winStatus[0] == 4){
    handValue = "Four of a kind"
  }
  if(winStatus.length == 2 && Math.max.apply(Math, winStatus) == 3){
    handValue = "Full House"
  }
  if(winStatus.length == 2 && Math.max.apply(Math, winStatus) == 2){
    handValue = "Two pair"
  }
  if(winStatus.length == 0){
    handValue = "High Card of " + Math.max.apply(Math, hand)
  }
  displayedText = "EEE EEE EE!(Well, that\'s just too bad for you. 5 of a kind, aces, just barely beats a " + handValue + ".)"

  enemyHand = [1,1,1,1,1]
  cardsSwapped = false
}

window.onload = function(){  
  myGameArea.start()
  myGameLevel.start()
  myGameBackground.start()
  board.start()
  document.getElementById("prompt").innerHTML = "Press Z or X"
}

function useItem(itemName){
  textSource = null
  displayedImage = null
  if(inventory[itemName] == "Banana"){
    displayedText = ("Bananas grow well on tropical islands, and are greatly enjoyed by most monkeys.")
  }else if(inventory[itemName] == "Banantula"){
    displayedText = ("This spider has legs that are similar to bananas and is native to this island. It seems to be very fond of you!")
  }else if(inventory[itemName] == "Meat"){
    displayedText = ("You don\'t know what kind of meat this is, but you do know that it is irresistable to snapdragons!")
  }else if(inventory[itemName] == "Compass"){
    if(scrollX > -1500){  
      displayedText = ("The compass is pointing north.")
    }else{
      displayedText = ("The compass is pointing south.")
    }
  }else if(inventory[itemName] == "Apex Snapdragon"){
    displayedText = "This Snapdragon is at the top of the food chain because it thrived underground for many years. Fortunately, you are no longer enemies!"
  }else if(inventory[itemName] == "Baton"){
    displayedText = "This FUNKY baton can call down rainstorms if used correctly, legends say."
  }else if(inventory[itemName] == "Pearl"){
    displayedText = "The Pearl glows with a soft white light..."
    document.getElementById("cheatCodes").style.display = "block"
  }else{
    displayedText = ("You don\'t have any items!")
  }
}


function removeItem(array, item){
  for(var i in array){
    if(array[i]==item){
      array.splice(i,1);
      break;
    }
  }
}

paused = false

function waitForFade(code){
  cachedCode = code
}