import {upgrade} from "main.js";
if(upgrade.purchased[0]==true) {

setInterval(function() {
    upgrade.multi[0] = building.count[0];
},100)
}
if(upgrade.purchased[1]==true) {
setInterval(function() {


    upgrade.multi[1] = building.count[0]*Math.floor(Math.pow(building.count[1]+1,0.5))

},100)
}
export {upgrade};