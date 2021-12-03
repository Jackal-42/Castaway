var areaLoaded;
var backdrop_far;
var backdrop_mid_far;
var backdrop_mid_near;
var backdrop_near;
var texture = null;
var terrainWidth;
var terrainHeight = 2000;
var oceanShown = true;
var scrollX_stop = 0;
var terrainOffsetX = 0;
var endingRendered = false;

function load(){
  textDelay = 1
  monkeyID = null
  player.alpha = 1
  console.log("Loading " + areaLoaded)
  objects = []
  rain = []
  // player.momentumX = 0
  if(areaLoaded == "titleScreen"){
    beach_theme.play()
    player.alpha = 0
    monkeyYeeting = false
    monkeyRotationSpeed = 0
    monkeyRotation = 0;
    scrollX_stop = -4000;
    terrainWidth = 8000;
    
    backdrop_far = sunset;
    backdrop_mid_far = blank;
    backdrop_mid_near = blank;
    backdrop_near = blank;
    texture = null;
    terrain = blank;
    oceanShown = true;
    player.x = 500
    scrollX = 500
    
    player.y = 280
    scrollY = 1280
  }
  if(areaLoaded == "ending"){
    canOpenInventory = false;
    endingRendered = true
    player.alpha = 0
    monkeyYeeting = false
    monkeyRotationSpeed = 0
    monkeyRotation = 0;
    scrollX_stop = -4000;
    terrainWidth = 8000;
    
    backdrop_far = sunset;
    backdrop_mid_far = blank;
    backdrop_mid_near = blank;
    backdrop_near = blank;
    texture = null;
    terrain = blank;
    oceanShown = true;
    player.x = 500
    scrollX = 500
    
    player.y = 280
    scrollY = 1280
  }
  if(areaLoaded == "beachLeft" || areaLoaded == "beachRight" || areaLoaded == "easterEggIsland"){
    beach_theme.play()
    if(beach_theme.paused){
      console.log("This person is using a bad browser like a noob")
      alert("Want sound? Your browser is blocking it. Go into settings and allow auto-play for this site!")
    }
    monkey_theme.pause()
    jungle_theme.pause()
    player.alpha = 1
    monkeyYeeting = false
    monkeyRotationSpeed = 0
    monkeyRotation = 0;
    scrollX_stop = -4000;
    terrainWidth = 8000;
    
    backdrop_far = jungle_BG_4;
    backdrop_mid_far = jungle_BG_5;
    backdrop_mid_near = beach_BG_2;
    backdrop_near = beach_BG_1;
    texture = beach_texture;
    terrain = beach_1;
    oceanShown = true;
    if(areaLoaded == "beachLeft"){ 
      player.x = 500
      scrollX = 400
      // scrollX = -4000
    }else if(areaLoaded == "easterEggIsland"){  
      player.x = 500
      // scrollX = 400
      scrollX = -4000
    }else if(areaLoaded == "beachRight"){
      player.x = 850
      scrollX = 3000
    }
    player.y = 280
    scrollY = 1280
    if(player.momentumX < -5){
      scrollY -= 200
    }
    // objects.push(new component(0, 1600, 40, 80, "textDisplayZone", "Press Z to read signs. How about that?"))
    

    // 

        
    

  
    objects.push(new component(3500, 1520, 80, 80, "npc", [[monkey_idle_1, monkey_idle_2], 20, [[monkey_face, "Ooh Eee Ah! (Good Sir, would you be so kind as to give me a decadent banana?)"], [monkey_face, "", "bananaRequested = true; console.log(bananaRequested); paused = false; document.getElementById(\"textBoxContainer\").style.display = \"none\""]]]))

    objects.push(new component(1740, 1420, 200, 120, "banantula", null))
    
    // objects.push(new component(800, 1600, 80, 80, "npc", [[native_dance_00, native_dance_01, native_dance_02, native_dance_03, native_dance_04, native_dance_05, native_dance_04, native_dance_03, native_dance_02, native_dance_01, native_dance_00, native_dance_06, native_dance_07, native_dance_08, native_dance_09, native_dance_10, native_dance_09, native_dance_08, native_dance_07, native_dance_06], 3, "FUNKY DANCE"]))
    // objects.push(new component(800, 1600, 80, 80, "npc", [[native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1, native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3], 5, "I'm warming up for the rain dance!"]))
    // objects.push(new component(1000, 1300, 40, 40, "snapDragon", 200))
    
    
    objects.push(new component(3900, 1000, 40, 800, "loadZone", "jungleRight"))
    objects.push(new component(-3800, 1320, 80, 80, "npc", [[monkey_idle_1, monkey_idle_2], 8, [[monkey_sneer, "Well, Well."],[blank, "", "waitForFade(\"monkey_battle_theme.play(); beach_theme.pause();fighting = true; opponent = \\\"monkey\\\"; myGameLevel.clear(); opponentHealth = 100; textDelay = 1;\");circleClosing = true;document.getElementById(\"textBoxContainer\").style.display = \"none\"; playerDamage = -20; opponentDamage = 999; displayedImage = null; textSource = null; document.getElementById(\"textBox\").innerHTML = \"\"; battleProgression = 0; battleInventory = []; canFull = false; seedPlanted = false; battlePosition = \"island\"; areaLoaded = \"easterEggIsland\""]]]))
  }else if(areaLoaded == "beachMid"){
    backdrop_far = jungle_BG_4;
    backdrop_mid_far = jungle_BG_5;
    backdrop_mid_near = jungle_BG_3;
    backdrop_near = jungle_BG_2;
    texture = null;
    terrain = test_image;
    oceanShown = false;
    scrollX = 0;
    player.x = 0
    player.y = 270
  }else if(areaLoaded == "jungleLeft" || areaLoaded == "jungleRight"){
    beach_theme.pause()
    jungle_theme.play()
    backdrop_far = jungle_BG_4;
    backdrop_mid_far = jungle_BG_5;
    backdrop_mid_near = beach_BG_2;
    backdrop_near = jungle_BG_1;
    texture = jungle_texture;
    terrain = jungle_1;
    oceanShown = false;
    

    
    scrollX_stop = 0;
    terrainWidth = 4000;
    if(!monkeySatisfied){
      jungle_theme.pause()
      monkey_theme.play()
      objects.push(new component(150, 1550, 80, 80, "npc", [[monkey_idle_1], 20, [[monkey_face, "EEE EEE!(Kind Sir, I won\'t let you into this jungle until you give me a banana!)", "bananaRequested = true"], [monkey_face, "EEE EEE EEE!(You\'ve messed with the wrong monkey, bozo!)"],[monkey_face, "", "player.alpha = 0; objects[0].data[0] = [monkey_yeet]; objects[0].x = 20; monkeyYeeting = true; monkeyID = 0;"]]]))
      bananaRequested = true;
      player.x = 220;
      pageOfText = 0;
      textSource = 0;
      displayedText = objects[0].data[2][pageOfText][1]
      displayedImage = objects[0].data[2][pageOfText][0]
    }
    objects.push(new component(3565, 1300, 80, 120, "image", snapdragon_holding))
    if(!meatGiven){
      objects.push(new component(3565, 1375, 80, 80, "npc", [[shipwright_stuck], 60, [[shipwright_stuck, "Help! Help!"],[shipwright_stuck, "I was going to gather food, and this snapdragon just snapped me up!"],[shipwright_stuck, "Snapdragons are very fond of meat. Can you get some from the butcher and set me free?"],[shipwright_stuck, "", "objects.push(new component(3900, 1000, 40, 800, \"loadZone\", \"jungleVillage\")); paused = false; document.getElementById(\"textBoxContainer\").style.display = \"none\";"]]]))
    }
    if(areaLoaded == "jungleRight"){  
      player.x = 40
      scrollX = 0
      player.y = 230
      scrollY = 1400;
    }else{
      player.x = 850
      scrollX = 3000
      player.y = 230
      scrollY = 1360;
      objects.push(new component(3900, 1000, 40, 800, "loadZone", "jungleVillage"))
    }
    if(!monkeySatisfied){
      player.x = 220;
    }
    objects.push(new component(1000, 1450, 40, 60, "snapDragon", 250))
    objects.push(new component(2000, 550, 40, 60, "snapDragon", 280))
    objects.push(new component(427, 1452, 160, 160, "flower", null));
    objects.push(new component(2642, 192, 160, 160, "flower", null));
    objects.push(new component(3281, 1508, 160, 160, "flower", null));
    objects.push(new component(3281, 1508, 160, 160, "flower", null));
    
    
    
    if(raining){
      for(var i = 0; i < 100; i++){
        rain.push(new component(Math.floor(Math.random()*1000),Math.floor(Math.random()*500), 0, 0, "rain", (Math.random() * 2) + 12))
        backdrop_far = jungle_BG_4_rain;
      }
      objects.push(new component(3301, 1585, 120, 80, "textDisplayZone", ["You gather pollen from the flower until you have enough to cure the shipwright", "if(!inventory.includes(\"Pollen\"))inventory.push(\"Pollen\"); objects[8].y = 99999"]))
    }
    objects.push(new component(0, 1008, 20, 800, "loadZone", "beachRight"))
    
  }else if(areaLoaded == "jungleVillage" || areaLoaded == "jungleVillageRight"){
    
    monkeyYeeting = false
    
    monkey_theme.pause()
    monkey_battle_theme.pause()
    funky_cave_theme.pause()
    beach_theme.pause()
    backdrop_far = jungle_BG_4;
    backdrop_mid_far = jungle_BG_5;
    backdrop_mid_near = beach_BG_2;
    backdrop_near = jungle_BG_1;
    texture = jungle_village_texture;
    terrain = jungle_village;
    oceanShown = true;
    scrollX = 0;
    scrollY = 1300;
    player.x = 40
    levelHeightOffset = 0
    player.y = 230
    scrollX_stop = 0;
    scrollStopX = 3000
    terrainWidth = 4000;
    terrainHeight = 2000;

    if(areaLoaded == "jungleVillageRight"){
      scrollX = 3000;
      scrollY = 650;
      player.x = 900
      levelHeightOffset = 0
      player.y = 230
      scrollX_stop = 0;
      scrollStopX = 3000
      terrainWidth = 4000;
    }
    if(inventory.includes("Pollen")){
      objects.push(new component(1988, 1216, 80, 80, "npc", [[chief_1, chief_1, chief_1, chief_2, chief_3, chief_3, chief_3, chief_2], 6, [[chief_dance_0, "Got the pollen? Great!"],[chief_1, "This should get the Shipwright feeling better in no time!", "finalCutscene = true"],[shipwright_smile, "Wow, it worked! That was quick!"],[shipwright_smile, "Is there any way I could repay you?"],[shipwright_sad, "What? A... A boat?", "textDelay = 4;"],[shipwright_sad, "You... want to leave?"],[shipwright_sad, "I... I... I guess I have a canoe you... you could use... "],[shipwright_sad, "I'll... go and... get it..."],[native_bounce_0, "Have a good trip!", "textDelay = 1"],[native_bounce_0, "We'll miss you!"],[butcher_1, "I'll always remember our card game!"],[chief_1, "...", "textDelay = 20"],[chief_1, "I know that what I'm about to say is absurd..." , "textDelay = 2"],[chief_1, "But I like to think that... maybe...", "textDelay = 4"],[chief_1, "", "paused = true; objects[0].data[1] = 20; faceReveal = 0; document.getElementById(\"textBoxContainer\").style.display = \"none\";"]]]))


      objects.push(new component(1788, 1216, 80, 80, "npc", [[native_bounce_0, native_bounce_1, native_bounce_2, native_bounce_1], 8, [[native_bounce_2, "Did you get the pollen?"],[native_bounce_2, "I knew you could!"]]]))
      objects.push(new component(2188, 1216, 80, 80, "npc", [[native_bounce_0, native_bounce_1, native_bounce_2, native_bounce_1], 8, [[native_bounce_2, "Thanks for all you've done for our village."]]]))
      objects.push(new component(2088, 1216, 80, 80, "npc", [[butcher_1, butcher_2], 20, [[butcher_2, "Hey, it's you again!"],[butcher_2, "I'd love a rematch, but now is not the time!"]]]))
      objects.push(new component(1888, 1216, 80, 80, "npc", [[shipwright], 60, [[shipwright, "Oh, I don't feel very good..."],[shipwright, "Please get the pollen quickly and then talk to the chief!"]]]))
    }else{
      if(!meatGiven){
        objects.push(new component(1988, 1216, 80, 80, "npc", [[chief_1, chief_1, chief_1, chief_2, chief_3, chief_3, chief_3, chief_2], 6, [[chief_dance_0, "Greetings, and welcome to our village!"],[chief_1, "I just wish the shipwright was here to greet you..."]]]))
      }else if(meatGiven && !inventory.includes("Baton")){
        objects.push(new component(1988, 1216, 80, 80, "npc", [[chief_1, chief_1, chief_1, chief_2, chief_3, chief_3, chief_3, chief_2], 6, [[chief_1, "The Shipwright was trapped in a snapdragon? Thank goodness you found them!"],[chief_1, "Unfortunately, they don't seem to be doing so well."],[chief_1, "The snapdragon must have been slightly poisonous."],[chief_1, "Fortunately, the flowers here produce pollen that is a strong antidote."],[chief_1, "Would you mind doing us one more favor and getting some pollen?"],[chief_1, "Oh, I see. They close up when you get near."],[chief_1, "The flowers are very sensitive to sound and don't like footsteps."],[chief_1, "We\'ve found that when it's raining, the leaves don\'t crunch beneath your feet and so the flowers can\'t hear you!"],[chief_1, "Then you will be able to get some pollen."],[chief_1, "If only it were raining..."],[chief_dance_0, "I\'m only joking, of course! Haven\'t you ever heard of a rain dance?"],[native_pre_dance_3, "Oh, yeah!"],[chief_1, "Wait, wait, wait... Where's my Rain Dance Baton?"],[chief_1, "Oh No... I must have left it in the cave!"],[chief_1, "The cave is to the right. Can you please get that baton for me?"],[chief_1, "", "paused = false; document.getElementById(\"textBoxContainer\").style.display = \"none\"; batonRequested = true; objects[0].data[2] = [[chief_1, \"The cave is to the right. Please help me get my baton back!\"]];"]]]))
      }else{
        objects.push(new component(1988, 1216, 80, 80, "npc", [[chief_1, chief_1, chief_1, chief_2, chief_3, chief_3, chief_3, chief_2], 6, [[chief_dance_1, "You got my Baton? Amazing!"],[chief_dance_1, "Alright, let's do this thing!"],[native_bounce_0, "", "document.getElementById(\"textBoxContainer\").style.display = \"none\"; areaLoaded = null; fadeToBlack(); waitForFade(\"objects[0].data[0] = [chief_dance_0, chief_dance_1, chief_dance_2, chief_dance_2, chief_dance_2, chief_dance_1, chief_dance_0, chief_dance_3, chief_dance_4, chief_dance_4, chief_dance_4, chief_dance_3]; objects[1].data[0] = [native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2,native_pre_dance_2, native_pre_dance_2, native_pre_dance_1, native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3]; objects[2].data[0] = [native_pre_dance_0, native_pre_dance_3, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_4, native_pre_dance_3, native_pre_dance_0, native_pre_dance_1, native_pre_dance_2, native_pre_dance_2, native_pre_dance_2,native_pre_dance_2, native_pre_dance_2, native_pre_dance_2, native_pre_dance_1]; objects[0].data[1] = 4; objects[1].data[1] = 3; objects[2].data[1] = 3; scrollX = 1528; player.x = 100; playerOrientation = 1; rainDance = true;\"); danceChangeupTimer = 0;jungle_theme.pause(); rain_dance.play();"]]]))
        
      }


      
      // objects.push(new component(590, 1600, 80, 80, "npc", [[chief_dance_0, chief_dance_1, chief_dance_2, chief_dance_2, chief_dance_2, chief_dance_1, chief_dance_0, chief_dance_3, chief_dance_4, chief_dance_4, chief_dance_4, chief_dance_3, ], 6, [chief_dance_0, "Boogie Down!"]]))
      objects.push(new component(1788, 1216, 80, 80, "npc", [[native_bounce_0, native_bounce_1, native_bounce_2, native_bounce_1], 8, [[native_bounce_2, "Hiiii There!"],[native_bounce_2, "Welcome to our island!"]]]))
      objects.push(new component(2188, 1216, 80, 80, "npc", [[native_bounce_0, native_bounce_1, native_bounce_2, native_bounce_1], 8, [[native_bounce_2, "Hello There."]]]))

      if(meatGiven){
        objects.push(new component(3400, 978, 80, 80, "npc", [[butcher_1, butcher_2], 20, [[butcher_smile, "Thanks for playing cards with me. It was fun!"]]]))
      }else {
        objects.push(new component(3400, 978, 80, 80, "npc", [[butcher_1, butcher_2], 20, [[butcher_2, "Hello, I\'m the butcher."],[butcher_2, "You need some meat? Well, lucky for you, I messed up up an order and have some meat I don\'t know what to do with!"],[butcher_smile, "How about a bet?"],[butcher_2, "We'll play a game of five-card draw. You win, and I give you the meat. I win, and you work for me for a week without pay."],[butcher_smile, "The look on your face says it all. You're on!"],[butcher_2, "You are trying to get two, three or four of a kind."],[butcher_2, "You can then swap any cards you choose to get a better hand."],[butcher_smile, "Whoever has the best hand wins!"],[blank, "CLICK ON THE CARDS YOU WOULD LIKE TO SWAP OUT NOW. THEN PRESS Z.", "playingCards = true;document.getElementById(\"board\").style.display = \"block\"; document.getElementById(\"textBoxContainer\").style.top = \"80%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"0%\";"],[butcher_2, "Alright, here are your cards.", "swapCards()"],[butcher_smile, "Feeling Lucky?"],[butcher_surprised, "INSERT PLAYER HAND VALUE HERE", "showCards()"],[butcher_surprised, "I\'ve never lost a game of five-card draw!!!"],[butcher_2, "Well... I\'m a man of my word, so here\'s the meat.", "inventory.push(\"Meat\");playingCards = false;document.getElementById(\"board\").style.display = \"none\"; document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\";"],[blank, "", "objects[3].data[2] = [[butcher_smile, \"Thanks for playing cards with me. It was fun!\"]]; paused = false; document.getElementById(\"textBoxContainer\").style.display = \"none\""]]]))
      }
      
      if(meatGiven){
        objects.push(new component(3100, 978, 80, 80, "npc", [[shipwright], 60, [[shipwright, "Thanks again for saving me!"],[shipwright, "I don't feel so well..."]]]))
      }
    }
    if(inventory.includes("Pollen")){
      jungle_theme.pause()
      farewell.play()
    }else{
      jungle_theme.play()
      objects.push(new component(0, 1000, 20, 800, "loadZone", "jungleLeft"))
    }
    if(raining){
      for(var i = 0; i < 100; i++){
        rain.push(new component(Math.floor(Math.random()*1000),Math.floor(Math.random()*500), 0, 0, "rain", (Math.random() * 2) + 12))
        backdrop_far = jungle_BG_4_rain;
      }
    }
    if(!inventory.includes("Baton") && meatGiven){
      objects.push(new component(3960, 200, 40, 800, "loadZone", "caveEntrance"))
    }
    
  }
  else if(areaLoaded == "caveEntrance" || areaLoaded == "caveEntranceRight"){
    farewell.pause()
    jungle_theme.play()
    funky_cave_theme.pause()
    levelHeightOffset = 0
    backdrop_far = jungle_BG_4;
    backdrop_mid_far = jungle_BG_5;
    backdrop_mid_near = beach_BG_2;
    backdrop_near = jungle_BG_1;
    texture = cave_entrance_texture;
    terrain = cave_entrance;
    oceanShown = false;
    scrollX = 0;
    scrollY = 1000;
    player.x = 40
    player.y = 230
    if(areaLoaded == "caveEntranceRight"){
      player.x = 900
      scrollY = 1100
    }
    scrollX_stop = 0;
    scrollStopX = 0
    terrainWidth = 1000;
    terrainHeight = 1600;
    if(inventory.includes("Baton")){
      jungle_theme.pause()
      if(monkey_battle_theme.paused){
        monkey_theme.play()
      }
      objects.push(new component(420, 1325, 80, 80, "npc", [[monkey_idle_1], 20, [[monkey_face, "AH AH! (Kind sir, I crave another banana.)"],[monkey_face, "EEE AH! (You mean to say you don't have a banana? very well, we shall play cards!)"],[monkey_face, "EE EEE! (Here\'s your hand. Click the cards you would like to swap out and press Z when done. Remember, I am the 5-card draw master!)", "hand = []; enemyHand = []; playingCards = true;document.getElementById(\"board\").style.display = \"block\"; document.getElementById(\"textBoxContainer\").style.top = \"80%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"0%\";"],[monkey_face, "AH EE! (Alright, here are your cards.)", "swapCards()"],[monkey_face, "AH? (Feeling Lucky, Bozo?)"],[monkey_face, "INSERT PLAYER HAND VALUE HERE", "showCardsMonkey()"],[monkey_face, "AHEE!! (And you know what that means, don\'t you?)", "playingCards = false;document.getElementById(\"board\").style.display = \"none\"; document.getElementById(\"textBoxContainer\").style.top = \"60%\"; document.getElementById(\"textBoxContainer\").style.bottom = \"20%\";"],[monkey_face, "", "player.alpha = 0; objects[0].data[0] = [monkey_yeet]; monkeyYeeting = true; monkeyID = 0;"]]]))
      player.x = 500
      playerOrientation = -1
      pageOfText = 0;
      textSource = 0;
      displayedText = objects[0].data[2][pageOfText][1]
      displayedImage = objects[0].data[2][pageOfText][0]

    }
    objects.push(new component(0, 800, 20, 800, "loadZone", "jungleVillageRight"))
    objects.push(new component(960, 800, 40, 800, "loadZone", "funkyCave"))
  }else if(areaLoaded == "funkyCave"){
    beach_theme.pause()
    jungle_theme.pause()
    funky_cave_theme.play()
    levelHeightOffset = -2242
    backdrop_far = cave_background_far;
    backdrop_mid_far = cave_background_mid_far;
    backdrop_mid_near = cave_background_mid_near;
    backdrop_near = cave_background_near;
    texture = funky_cave_texture;
    terrain = funky_cave;
    oceanShown = false;
    scrollX = 0;
    scrollY = -1800
    // scrollX = 1000;
    // scrollY = 1400;
    player.x = 40
    player.y = 230
    scrollX_stop = 0;
    scrollStopX = 3000
    terrainWidth = 4000;
    terrainHeight = 4000;

    playerHealth = 100;
    opponentDisplayedHealth = 100;
    playerDisplayedHealth = 100;
    turn = "player";
    battleStatus = null;
    playerDamage = document.getElementById("damage").value / 2;
    opponentDamage = 25;
    battleProgression = 0;
    battleOptions = [];
    selectedOption = 0;
    circlesShown = false;
    battleAccuracy = null;
    move1Difficulty = 6;
    move2Difficulty = 5;
    move3Difficulty = 1;
    objects.push(new component(2250, 1700, 200, 200, "apexSnapdragon", null))

    objects.push(new component(9999, 0, 80, 80, "npc", [[monkey_idle_1], 20, [[monkey_face, "EEE AAH OOO!(You have been to this place before!)"], [monkey_face, "OOH!(Foolish Mortal! You think you can escape my anger by going back into the cave you have already explored, like a moron?)"], [monkey_face, "AH EE!(Not so! I shall cast you out of this place, and we shall play cards like real monkeys!)"], [monkey_face, "", "player.alpha = 0; objects[1].data[0] = [monkey_yeet]; objects[1].x = 2056; objects[1].y = 1656; monkeyYeeting = true; monkeyID = 1; apexSnapdragonHeight = -4200; objects.push(new component(2000, 1200, 20, 800, \"loadZone\", \"caveEntranceRight\"));"]]]))
    
    objects.push(new component(0, -2000, 20, 800, "loadZone", "caveEntranceRight"))
  }
}
