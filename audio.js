document.getElementById("inventory").style.display = "none"
document.getElementById("debugMenu").style.display = "none"
document.getElementById("cheatCodes").style.display = "none"
document.getElementById("textBoxContainer").style.display = "none"
document.getElementById("board").style.display = "none"


var audio = [
  "text_scroll",
  "inventory_open",
  "inventory_close",
  "beach_theme",
  "jungle_theme",
  "battle_theme",
  "funky_cave_theme",
  "monkey_theme",
  "rain_dance",
  "farewell",
  "final_battle",
  "monkey_battle_theme"
]

for(var i = 0; i < audio.length; i++){
  eval("var "+audio[i]+" = document.createElement(\'audio\');"+audio[i]+".style.display = \'none\';"+audio[i]+".src = \'assets/"+audio[i]+".mp3\';")
  eval(audio[i] + ".volume = 0.5")
}

jungle_theme.loop = true
battle_theme.loop = true
final_battle.loop = true
funky_cave_theme.loop = true
monkey_theme.loop = true
monkey_battle_theme.loop = true
farewell.loop = true
beach_theme.loop = true
rain_dance.volume = 0.8
beach_theme.volume = 0.1
monkey_theme.volume = 0.4