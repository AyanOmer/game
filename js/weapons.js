console.log("weapons.js loaded");

const hitmarker = document.getElementById("hitmarker");

/* =========================
   CURRENT WEAPON
========================= */

const weapon = {
    name: "M1911",
    ammo: 12,
    maxAmmo: 12,
    damage: 25,
    fireRate: 200,
    canShoot: true
};

/* =========================
   CHANGE WEAPON
========================= */

window.setWeapon = function(newWeapon){

    weapon.name = newWeapon.name;
    weapon.damage = newWeapon.damage;
    weapon.ammo = newWeapon.ammo;
    weapon.maxAmmo = newWeapon.maxAmmo;
    weapon.fireRate = newWeapon.fireRate;

    if(typeof showWeaponText === "function"){
        showWeaponText(newWeapon.name);
    }

};

/* =========================
   INPUT
========================= */

window.addEventListener("mousedown", shoot);

window.addEventListener("keydown", function(e){

    if(e.key.toLowerCase() === "r"){
        reload();
    }

});

/* =========================
   SHOOT
========================= */

function shoot(){

    if(!weapon.canShoot) return;
    if(weapon.ammo <= 0) return;

    weapon.canShoot = false;
    weapon.ammo--;

    /* Gun flash */

    if(gun && gun.material && gun.material.emissive){

        gun.material.emissive.setHex(0xffaa00);

        setTimeout(function(){

            if(gun && gun.material){
                gun.material.emissive.setHex(0x000000);
            }

        },40);

    }

    setTimeout(function(){

        weapon.canShoot = true;

    },weapon.fireRate);

    /* Raycast */

    const raycaster = new THREE.Raycaster();

    raycaster.setFromCamera(
        new THREE.Vector2(0,0),
        camera
    );

    const zombieGroups = zombies.map(z => z.mesh);

    // IMPORTANT: true = check children (head, arms, legs, torso)
    const hits = raycaster.intersectObjects(zombieGroups,true);

    if(hits.length === 0) return;

    const hitPart = hits[0].object;

    console.log(hitPart.name, hitPart.parent);

    for(let i = zombies.length - 1; i >= 0; i--){

        const zombie = zombies[i];

        if(hitPart.parent !== zombie.mesh) continue;

        zombie.health -= weapon.damage;

        if(hitmarker){

            hitmarker.style.display = "block";

            setTimeout(function(){

                hitmarker.style.display = "none";

            },50);

        }

        if(zombie.health <= 0){

            scene.remove(zombie.mesh);

            zombies.splice(i,1);

            points += 100;

            zombiesKilled++;

            console.log("Zombie killed!");

            if(zombiesKilled >= zombiesToSpawn){

                round++;

                zombiesKilled = 0;

                zombiesToSpawn += 2;

                if(typeof roundBanner !== "undefined"){

                    roundBanner.innerHTML = "ROUND " + round;

                    roundBanner.style.display = "block";

                    setTimeout(function(){

                        roundBanner.style.display = "none";

                    },2000);

                }

                setTimeout(function(){

                    spawnRound();

                },3000);

            }

        }

        break;

    }

}

/* =========================
   RELOAD
========================= */

function reload(){

    weapon.ammo = weapon.maxAmmo;

}