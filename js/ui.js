console.log("ui.js loaded");

let gameOver = false;

/* =========================
   CREATE UI
========================= */

window.promptText = document.createElement("div");
promptText.style.position = "absolute";
promptText.style.top = "55%";
promptText.style.left = "50%";
promptText.style.transform = "translateX(-50%)";
promptText.style.color = "white";
promptText.style.fontSize = "30px";
promptText.style.fontFamily = "Arial";
promptText.style.textAlign = "center";
promptText.style.display = "none";
document.body.appendChild(promptText);


const weaponText = document.createElement("div");
weaponText.style.position = "absolute";
weaponText.style.top = "25%";
weaponText.style.left = "50%";
weaponText.style.transform = "translateX(-50%)";
weaponText.style.color = "yellow";
weaponText.style.fontSize = "50px";
weaponText.style.fontWeight = "bold";
weaponText.style.textAlign = "center";
weaponText.style.textShadow = "0 0 15px yellow";
weaponText.style.display = "none";
document.body.appendChild(weaponText);


const ammoText = document.createElement("div");
ammoText.style.position = "absolute";
ammoText.style.bottom = "20px";
ammoText.style.right = "20px";
ammoText.style.color = "white";
ammoText.style.fontSize = "30px";
document.body.appendChild(ammoText);


const healthText = document.createElement("div");
healthText.style.position = "absolute";
healthText.style.bottom = "60px";
healthText.style.right = "20px";
healthText.style.color = "red";
healthText.style.fontSize = "30px";
document.body.appendChild(healthText);


const pointsText = document.createElement("div");
pointsText.style.position = "absolute";
pointsText.style.bottom = "20px";
pointsText.style.left = "20px";
pointsText.style.color = "gold";
pointsText.style.fontSize = "34px";
document.body.appendChild(pointsText);


const roundText = document.createElement("div");
roundText.style.position = "absolute";
roundText.style.bottom = "65px";
roundText.style.left = "20px";
roundText.style.color = "white";
roundText.style.fontSize = "30px";
document.body.appendChild(roundText);


const gameOverText = document.createElement("div");
gameOverText.style.position = "absolute";
gameOverText.style.top = "50%";
gameOverText.style.left = "50%";
gameOverText.style.transform = "translate(-50%,-50%)";
gameOverText.style.color = "red";
gameOverText.style.fontSize = "70px";
gameOverText.style.fontWeight = "bold";
gameOverText.style.display = "none";
document.body.appendChild(gameOverText);

/* =========================
   UPDATE UI
========================= */

window.updateUI = function(){

    ammoText.innerHTML =
        weapon.ammo + " / " + weapon.maxAmmo;

    healthText.innerHTML =
        "HP: " + Math.floor(player.health);

    pointsText.innerHTML =
        points + " Points";

    roundText.innerHTML =
        "Round " + round;

    promptText.style.display = "none";

    /* Door */

    if(
        typeof door !== "undefined" &&
        door &&
        !doorOpened &&
        camera.position.distanceTo(door.position) < 4
    ){

        promptText.innerHTML =
        "Press E - Open Door ($750)";

        promptText.style.display = "block";

        return;
    }

console.log(
    "Jug Distance:",
    camera.position.distanceTo(jugMachine.position)
);

if(
    typeof jugMachine !== "undefined" &&
    jugMachine &&
    !window.hasJug &&
    doorOpened &&
    camera.position.distanceTo(jugMachine.position) < 5
){

    promptText.innerHTML =
    "Press E - Juggernog ($2500)";

    promptText.style.display = "block";

    return;
}

/* Mystery Box */

if(
    typeof mysteryBox !== "undefined" &&
    mysteryBox &&
    camera.position.distanceTo(mysteryBox.position) < 3
){

    promptText.innerHTML =
    "Press E - Mystery Box ($950)";

    promptText.style.display = "block";

    return;
}
    /* Game Over */

    if(player.health <= 0 && !gameOver){

        gameOver = true;

        gameOverText.innerHTML = "GAME OVER";
        gameOverText.style.display = "block";

        setTimeout(function(){

            location.reload();

        },2000);

    }

};

/* =========================
   WEAPON POPUP
========================= */

window.showWeaponText = function(name){

    weaponText.innerHTML =
    "YOU GOT<br>" + name;

    weaponText.style.display = "block";

    setTimeout(function(){

        weaponText.style.display = "none";

    },2500);

};