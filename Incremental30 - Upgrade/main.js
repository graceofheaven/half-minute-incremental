var game = {
    gold:15,
    version:0,
    total_gold:0,
    global_multi:1,
    global_exp:1,
    pause:0,
    prestige_time:0,
    timer:30,

    getIndivGPS: function(i) {
        gps = 0;
        gps = building.income[i]*building.count[i]*building.multi[i] * wife.determination_multi;
        return Math.round(gps);

    },

    getGPS: function() {
        var gps = 0;
        if (prayer.cost != Infinity && wife.level < 2) {
        for (i=0;i<building.name.length;i++) {
            gps +=building.income[i]*building.count[i]*building.multi[i] * wife.determination_multi;
        }
        return Math.round(gps*(game.global_multi)*prestige1.platinum_multi);
        }
        else if (wife.level >= 2) {
            for (i=0;i<building.name.length;i++) {
                gps +=building.income[i]*building.count[i]*building.multi[i] * wife.determination_multi* (30-game.timer);
            }
            return Math.round(gps*(game.global_multi)*prestige1.platinum_multi);
        }
    },
    getTimer: function() {
        return game.timer;

    }

}
var building = {
    name:[
        "Herb Scrounging",
        "Food Stall",
        "Oracle Tent",
        "Stable",
        "Quarry",
        "Bank",
        "Castle",
        "Temple of Time",

    ],
    image:[
        "HMH2Herb.png",
        "HMH2FoodStall.png",
        "HMH2OracleTent.png",
        "HMH2Stable.png",
        "HMH2Quarry.png",
        "HMH2Bank.png",
        "HMH2Castle.png",
        "HMH2TempleofTime.png",

    ],
    count:[
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
    ],
    multi:[
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ],
    income:[
        5,
        25,
        500,
        75000,
        3000000,
        50000000,
        10000000000,
        7777777777777,


    ],
    tempcost:[
        15,
        100,
        50000,
        1000000,
        250000000,
        50000000000,
        10000000000000,
        777777777777777777,
    ],
    cost:[
        15,
        100,
        50000,
        1000000,
        250000000,
        50000000000,
        10000000000000,
        777777777777777777,
    ],
    purchase:function(index) {
        if(game.gold >= this.cost[index]) {
            game.gold -= this.cost[index];
            this.count[index]++;
            this.cost[index] = Math.round(this.cost[index]*1.1)
            display.updateGold();
            display.updateShop();
            display.updateUpgrade();
            display.updatePrayer();
        }
    
}
}
var prayer = {
    reverse :0,
    cost:100,
    name:"Pray",
    img:"HMH2GoddessStatue.png",

    pray:function() {
        
         if (game.gold>prayer.cost) {
                game.gold-=prayer.cost
                prayer.cost*=10;
                this.reverseTime()
                display.updatePrayer()
                
         }
         else if(prayer.cost!=Infinity) {
         if(confirm("Are you sure? This will be your last prayer!") && prayer.cost != Infinity) {
            this.reverseTime();
            prayer.cost = Infinity;
            display.updatePrayer();
            display.updateGold();
            
         }
        }
        

    },
    reverseTime: function() {
        this.reverse = 1;
        if (game.timer >=30) {
            this.reverse = 0;
        }
    },
}
var upgrade = {
    name:[
        "Pricey Herb",
        "Herbal Pastry",
        "Herbal Incense",
        "Herb-fed Stallion",
        "Herbal Stimulant",
        "Herb Stimulus",
        "Herbal Convention",
        "Divine Herb",
    ],
    description:["Herb Scrounging gain multiplier from its own amount. Require at least 25 Herb",
    "Food Stall now gain multiplier from Herb Scrounging amount and its own at reduced effect. Require at least 25 Food Stall",
    "Oracle Tent now gain multiplier from all previous building tiers' amount and its own at reduced effect. Require at least 25 Oracle Tent",
    "Stable gain multiplier from all previous building tiers by their amount and its own reduced. Require at least 25 Stable",
    "Quarry does the following above. Require at least 25 Quarry",
    "Bank uses herb to mint more gold. How? Don't ask. Multiplier effect is the same as above. Require at least 25 Bank.",
    "Decree your own kingdom that run on Herb. Is it practical? Who cares? Gain multiplicative effect like before. Require at least 25 Castle",
    "Have emissary from Heavens to come down to bring you the most powerful Herb known to existence. Require at least 25 Temple of Time."
    ],
    image:[
        "HMH2PriceyHerbPouch.png",
        "HMH2Pastry.png",
        "HerbalIncenseBurner.png",
        "HerbfedStallion.png",
        "HerbStimulant.png",
        "HerbStimulus.png",
        "HerbConvention.png",
        "GoldenHerb.png",


    ],
    type: [
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",
        "building",

    ],
    cost:[
        1000,
        10000,
        150000,
        2100000,
        16600000,
        180000000,
        1e50,
        1e77,


    ],
    buildingIndex:[
        0, 
        1,
        2,
        3,
        4,
        5,
        6,
        7,

    ],
    req:[
        25,
        25,
        25,
        25,
        25,
        25,
        25,

    ],
    multi:[
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ],

    purchased:[
        false,
        false,
        false,
        false,
        false,
        false,
    ],
    purchase:function(index) {

        if (!this.purchased[index] && game.gold >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.req[index]) {
                game.gold -=this.cost[index];
                building.multi[this.buildingIndex[index]] *=this.multi[index];
                this.purchased[index] = true;
                display.updateGold();
                display.updateUpgrade();
            }

        } else if (this.type[index] == "multi" && game.total_gold >= this.req[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.req[index]) {
                game.gold -=this.cost[index];
                building.multi[this.buildingIndex[index]] *=this.multi[index];
                this.purchased[index] = true;
                display.updateGold();
                display.updateUpgrade();
            }

        }

    }


}
var wife = {
    level:0,
    willpower:0,
    determination:0,
    determination_cost:32,
    determination_multi:1,
    img:["ChildhoodFriend.png",
        "Girlfriend.png",
        "Wife.png"],
    rank:[
        "I",
        "II",
        "III",

    ],
    income:[
        3,
        25,
        150,

    ],
    name:[
        "Childhood Friend",
        "Girlfriend",
        "Wife"

    ],
    cost:[
        10000,
        1e15,
        1e100,
        Infinity

    ],
    desc:[
        "Your childhood friend, her presence alone give you the will to push forward despite the world is coming to its end.",
        "Your girlfriend, the bond between you two can only deepen further as you two progress",
        "Your wife, you become more determined to protect what's left of you two."

    ],
    effect:[
        "-Passively grant you willpower which will grant Determination by its amounts (multiply your GPS)",
        "-Willpower gain is increased the longer this prestige",
        "-GPS gain an increasingly powerful multiplier the closer timer is to 0",

    ],
    upgrade:[
        "Spend some time with her even if you have 30 second at most (10,000 gold)",
        "Propose to her even if the time you have together is short (1e15 gold)",
        "There's nowhere forward for now"
    ],
    getWPS: function() {
        var wp = 0;
        if (wife.level>=1) {
            wp= Math.round(this.income[wife.level] * Math.log10(game.prestige_time));
            } else {
                wp= this.income[wife.level] ;
    
            }
            return wp;

    },

    stronger_than_you: function() {
        wife.willpower += this.getWPS()
        if(wife.willpower>=this.determination_cost) {
            wife.determination++;
            this.determination_cost = wife.determination_cost *2;
        }
        if(wife.determination <2) {
        wife.determination_multi = 1;
        }
        else {
            wife.determination_multi = this.determination;
        }

    },
    purchase : function() {
        if(game.gold >= wife.cost[wife.level]) {
            wife.level ++;
        }
        display.updateWife();
        
    },
    effectList: function() {
        list = "";
        for (i=0;i<=wife.level;i++) {
            list += wife.effect[i];
            list +="<br>";
        }
        return list;

    }
}
var musicplayer= {
    name:["Half-Minute Hero - Desperate Strike (Extended).mp3",
    "Kuro no Kiseki II CRIMSON SiN - Boss Theme 1.mp3",
    "Rigel Theatre - Khaos.mp3",
    "Ys I Eternal - Final Battle but beat 2 and 4 are swapped.mp3"



    ],
    
}
var prestige1 = {
    platinum:0,
    platinum_multi:1,
    formula:["(x+1)<sup>2</sup>"],
    resetT1: function() {
        if (this.gain_plat() >= this.platinum && game.gold > 1e9) {
        
            if (confirm("Do you want to prestige? You'll reset everything up until this point. You keep your significant half at least")){

            this.platinum = this.gain_plat();
            this.platinum_multi = Math.pow(this.gain_plat()+1,2)
            for (i=0;i<building.name.length;i++) {
                building.count[i] = 0;
                building.multi[i] = 1;
                building.cost[i] = building.tempcost[i];
            }
            for (i=0;i<upgrade.name.length;i++) {
                upgrade.purchased[i] = false;
                upgrade.multi[i] = 1;
            }
            game.timer = 30;
            game.prestige_time = 0;
            wife.willpower = 0;
            wife.determination = 0;
            wife.determination_cost = 32;
            game.gold = 15
            prayer.cost = 100;
            display.updateMusic(0);
            


            }

        
        }
    
    },
    plat_gain: function() {
        if ( prestige1.gain_plat() - this.platinum <0 || typeof(prestige1.gain_plat()) == "undefined") {
            return 0 } 
        else {
        return prestige1.gain_plat() - this.platinum;}
        
    },
    gain_plat: function() {
        return Math.round(Math.log10((game.gold/1e9) +1));

    }
}


function k_seps(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

var display = {
    updateGold: function() {
        document.getElementById("GPS").innerHTML = k_seps(game.getGPS());
        document.getElementById("goldMined").innerHTML = "Gold: "+k_seps(game.gold);
    },
    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = ""
        for (i=0; i<building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<table class=" shopButton" onclick="building.purchase('+i+')"><tr><td id="image"><img src="ingame_pic/'+building.image[i]+'"></td><td id="nameandCost"><p>'+building.name[i]+'</p><p><span>'+k_seps(building.cost[i])+'</span> gold</p></td><td id="gps"><p>'+k_seps(game.getIndivGPS(i))+' GPS</p></td><td id="amount"><span>'+building.count[i]+'</span></td></tr></table>';
        }

    },
    updateTime:function() {
        
        document.getElementById("timer").innerHTML = game.timer.toFixed(2);
        document.getElementById("timer").style.color=rgb(((30-game.timer)/45)*255,0,0);

    },
    updatePrayer: function() {
        document.getElementById("Prayer").innerHTML = '<table class=" prayButton" onclick="prayer.pray()"><tr><td id="image"><img src="ingame_pic/'+prayer.img+'"></td><td id="nameandCost"><p>'+prayer.name+'</p><p><span>'+k_seps(prayer.cost)+'</span> gold</p></td>'
    },
    updateUpgrade: function() {
        document.getElementById("upgradeContainer").innerHTML="";
        for(i=0;i<upgrade.name.length;i++) {
            if (!upgrade.purchased[i]) {
                document.getElementById("upgradeContainer").innerHTML += '<table class=" upgradeButton" onclick="upgrade.purchase('+i+')"><tr><td id="image"><img src="ingame_pic/'+upgrade.image[i]+'"></td><td id="nameandCost"><p>'+upgrade.name[i]+'</p><p><span>'+k_seps(upgrade.cost[i])+'</span> gold</p></td><td id="desc"><p>'+upgrade.description[i]+'</p></td><td id="multi">x<span>'+k_seps(upgrade.multi[i].toFixed(2))+'</span></td></tr></table>';
            }
            else {
                document.getElementById("upgradeContainer").innerHTML += '<table class=" purchasedupgradeButton" background-color ="green" onclick="upgrade.purchase('+i+')"><tr><td id="image"><img src="ingame_pic/'+upgrade.image[i]+'"></td><td id="nameandCost"><p>'+upgrade.name[i]+'</p><p><span>'+k_seps(upgrade.cost[i])+'</span> gold</p></td><td id="desc"><p>'+upgrade.description[i]+'</p></td><td id="multi">x<span>'+k_seps(upgrade.multi[i].toFixed(2))+'</span></td></tr></table>';
            }
        }

    },
    updateWife:function() {

        document.getElementById("wifeContainer").innerHTML='<table class = "wifeContainer"><tr id="rank"><td><p> Rank '+ wife.rank[wife.level]+'</p></td></tr><tr id="image"><td><center><img src="ingame_pic/wife/'+wife.img[wife.level]+'"</td></center></tr><tr id="description"><td><p style="font-size:12px">'+wife.desc[wife.level]+'</p></td></tr><tr id="effect"><td><p style="font-size:12px">'+wife.effectList()+'</p></td></tr><tr id="determination"><td><p>You have <span style="font-size:36px">'+k_seps(wife.willpower)+'</span> willpower ('+k_seps(wife.getWPS())+' willpower/s) which convert into <span style="font-size:36px">'+k_seps(wife.determination)+'</span> Determination. Your next Determination is at <span style="font-size:36px">'+k_seps(wife.determination_cost)+'</span></p></td></tr><tr id="unlock"><td><button  onclick="wife.purchase()" class="button"> '+wife.upgrade[wife.level]+'</button></td></tr></table>'
    },
    updateMusic:function(index) {
        document.getElementById("musicPlayer").innerHTML='<audio id="musicPlayer" controls autoplay loop><source src ="bg_music/'+musicplayer.name[index]+'" type="audio/mp3"></audio><p style="font-family:Georgia"> Playing: '+musicplayer.name[index]+'</p>'

    },
    updatePrestige1:function() {
        document.getElementById("Prestige1").innerHTML= '<div id ="Prestige1"><center ><p style="font-family:Georgia">You currently have <span style="font-size:36px">'+prestige1.platinum+'</span> Platinum <img src="ingame_pic/Platinum.png" width="64" height="64"></img></p></center><center><p style="font-family:Georgia">Which currently boost GPS on the formula of <span style="font-size:36px">'+prestige1.formula[0]+'</span> by <span style="font-size:36px">'+prestige1.platinum_multi+'</span></p></center> <center><button class="prestige1button" onclick="prestige1.resetT1()">Restart the run and gain '+(prestige1.plat_gain())+' platinum </button></center> </div>'

    }
}
function countdown() {
    game.prestige_time = game.prestige_time+0.01;
    
    if(prayer.reverse == 1 && game.timer <=30) {
        game.timer = game.timer  +0.11;
        if (game.timer >=30) {
            prayer.reverse = 0;
        }
    }else {game.timer =game.timer - 0.01;}
}
function rgb(r,g,b) {
    return "rgb("+r+","+g+","+b+")";
}



function saveGame() {
    var gameSave = {
        prayer_cost: prayer.cost,
        timer:game.timer,
        gold: game.gold,
        totalGold: game.total_gold,
        version:game.version,
        buildingCount:building.count,
        buildingIncome:building.income,
        buildingCost:building.cost,
        buildingMulti:building.multi,
        global_multi:game.global_multi,
        global_exp:game.global_exp,
        upgrade_purchased:upgrade.purchased,
        wife_level:wife.level,
        wife_willpower:wife.willpower,
        wife_determination:wife.determination,
        wife_deter_cost: wife.determination_cost,
        prestige_time: game.prestige_time,
        platinum:prestige1.platinum,
        plati_multi:prestige1.platinum_multi,
    }
    localStorage.setItem("game_save",JSON.stringify(gameSave));
    console.log("saved game")
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("game_save"));
    if(localStorage.getItem("game_save")!== null) {
        if(typeof savedGame.timer!== "undefined") game.timer = savedGame.timer;
        if(typeof savedGame.prayer_cost!== "undefined") prayer.cost = savedGame.prayer_cost;
        if(typeof savedGame.gold!== "undefined") game.gold = savedGame.gold;
        if(typeof savedGame.totalGold!== "undefined") game.total_gold = savedGame.totalGold;
        if(typeof savedGame.version !== "undefined") game.goversionld = savedGame.version;

        if(typeof savedGame.buildingCount !== "undefined") {for(i=0;i<building.name.length;i++){
        {building.count[i] = savedGame.buildingCount[i];}
           };
        }

        if(typeof savedGame.buildingIncome !== "undefined") {
            for(i=0;i<building.name.length;i++){
             {building.income[i] = savedGame.buildingIncome[i];}
            };
        }
        if(typeof savedGame.buildingCost !== "undefined") {for(i=0;i<building.name.length;i++){
            {building.cost[i] = savedGame.buildingCost[i];}
               };
            }
        if(typeof savedGame.buildingMulti !== "undefined") {
            for(i=0;i<building.name.length;i++){
            {building.multi[i] = savedGame.buildingMulti[i];}
               };
            }
            if(typeof savedGame.upgrade_purchased !== "undefined") {
                for(i=0;i<upgrade.name.length;i++){
                {upgrade.purchased[i] = savedGame.upgrade_purchased[i];}
                   };
                }
        if(typeof savedGame.global_multi !== "undefined") game.global_multi = savedGame.global_multi;

        if(typeof savedGame.global_exp !== "undefined") game.global_exp = savedGame.global_exp;
        if(typeof savedGame.wife_level !== "undefined") wife.level = savedGame.wife_level;
        if(typeof savedGame.wife_willpower !== "undefined") wife.willpower = savedGame.wife_willpower;
        if(typeof savedGame.wife_determination !== "undefined") wife.determination = savedGame.wife_determination;
        if(typeof savedGame.wife_deter_cost !== "undefined") wife.determination_cost= savedGame.wife_deter_cost;
        if(typeof savedGame.prestige_time !== "undefined") game.prestige_time = savedGame.prestige_time;
        if(typeof savedGame.platinum !== "undefined") prestige1.platinum = savedGame.platinum;
        if(typeof savedGame.plati_multi !== "undefined") prestige1.platinum_multi= savedGame.plati_multi;
        
        

    }
}
window.onload = function() {
    loadGame();
    display.updateGold();
    display.updateShop();
    display.updateUpgrade()
    display.updatePrayer();
    display.updateWife();
    display.updateMusic(0);
    display.updatePrestige1()
    document.getElementById("defaultFirst").click();


    
}
function value(b,index) {
    return b[index];
 }
setInterval(function() {
    display.updateGold();
    display.updatePrayer();

}, 10000);
function reset() {
    var gameSave = {};
            localStorage.setItem("game_save",JSON.stringify(gameSave));
            
}
function wipeSave() {
    if(confirm("Do you want to wipe your save?")) {
        if(confirm("You won't get your progress back! Do you wish to continue?")) {
            var gameSave = {};
            localStorage.setItem("game_save",JSON.stringify(gameSave));
            window.location.reload();
            }
    }

}

document.addEventListener("keydown",function(event){
   if( event.ctrlKey && event.code==83) { //ctrl + s
    event.preventDefault();
    saveGame();
   }
}) 
setInterval (function(){
    game.gold += game.getGPS();
    game.total_gold += game.getGPS();
    wife.stronger_than_you();
    display.updateGold();
    display.updateShop();
    display.updateUpgrade()
    display.updateWife();
    display.updatePrestige1();
    

    document.title = k_seps(game.gold) + " gold - Half-Minute Incremental"

    
},1000);
setInterval(function() {
    totalcount=0;
    
    for (i =0;i<upgrade.name.length;i++) {
        totalcount +=building.count[i]*(i+1);
        if(totalcount == 0 || totalcount == 1) {
            upgrade.multi[i] = 1;
        } else {
        upgrade.multi[i]=Math.log2(totalcount);
        }
    }

},100)
if(game.pause !=1) {
const gametick = setInterval( function() {
    if(game.timer!=0) {
    display.updateTime();
    if (game.pause !=1) {
    countdown();}
    } 
    if (game.timer <= 0) {;
        var gameSave = {};
    localStorage.setItem("game_save",JSON.stringify(gameSave))
    window.location.reload();
    }
},10);
}
setInterval (function () { //save game
    saveGame(); 
},30000);

setInterval(function(){// for some reason, for loop and set Interval just brick the entire thing
            for (i=0;i<upgrade.name.length;i++) {
                if(upgrade.purchased[i]==true) {
                building.multi[i] = upgrade.multi[i];
                }
            }
            

            
    
}

,100)



