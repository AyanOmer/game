console.log("wallbuy.js loaded");

/* =========================
   WALL BUY SYSTEM
========================= */

const wallBuys = [];

/* =========================
   AVAILABLE WALL WEAPONS
========================= */

const wallWeaponData = {

    M1911: {
        damage: 25,
        ammo: 12,
        maxAmmo: 12,
        fireRate: 200
    },

    MP5: {
        damage: 18,
        ammo: 30,
        maxAmmo: 30,
        fireRate: 100
    },

    AK47: {
        damage: 35,
        ammo: 30,
        maxAmmo: 30,
        fireRate: 120
    },

    RPK: {
        damage: 45,
        ammo: 100,
        maxAmmo: 100,
        fireRate: 80
    }

};

/* =========================
   CREATE WALL BUY
========================= */

window.createWallBuy = function(
    weaponName,
    cost,
    x,
    y,
    z
){

    const board = new THREE.Mesh(

        new THREE.BoxGeometry(1.5,1.5,0.2),

        new THREE.MeshStandardMaterial({

            color:0x444444,
            emissive:0x111111

        })

    );

    board.position.set(x,y,z);

    scene.add(board);

    wallBuys.push({

        mesh:board,
        weapon:weaponName,
        cost:cost

    });

};

/* =========================
   DEFAULT WALL BUYS
========================= */

window.initWallBuy = function(){

    createWallBuy(

        "MP5",
        1000,
        -8,
        1.5,
        -7

    );

    createWallBuy(

        "AK47",
        1400,
        8,
        1.5,
        18

    );

};

/* =========================
   UPDATE
========================= */

window.updateWallBuy = function(){

    if(typeof promptText === "undefined")
        return;

    for(const buy of wallBuys){

        const distance =
        camera.position.distanceTo(
            buy.mesh.position
        );

        if(distance > 2.5)
            continue;

        promptText.innerHTML =
        "Press E - " +
        buy.weapon +
        "<br>$" +
        buy.cost;

        promptText.style.display =
        "block";

        return;

    }

};

/* =========================
   BUY WEAPON
========================= */

window.addEventListener("keydown",function(e){

    if(e.key.toLowerCase() !== "e")
        return;

    for(const buy of wallBuys){

        const distance =
        camera.position.distanceTo(
            buy.mesh.position
        );

        if(distance > 2.5)
            continue;

        if(points < buy.cost){

            console.log("Not enough points");

            return;

        }

        points -= buy.cost;

        const gunData =
        wallWeaponData[buy.weapon];

        weapon.damage =
        gunData.damage;

        weapon.ammo =
        gunData.ammo;

        weapon.maxAmmo =
        gunData.maxAmmo;

        weapon.fireRate =
        gunData.fireRate;

        if(typeof showWeaponText === "function"){

            showWeaponText(
                buy.weapon
            );

        }

        console.log(
            "Purchased",
            buy.weapon
        );

        return;

    }

});