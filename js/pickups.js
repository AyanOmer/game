console.log("pickups.js loaded");

/* =========================
   POWERUPS
========================= */

const pickups = [];

/* =========================
   SPAWN PICKUP
========================= */

window.spawnPickup = function(type, position){

    let color = 0xffffff;

    switch(type){

        case "maxammo":
            color = 0x00ff00;
            break;

        case "doublepoints":
            color = 0xffff00;
            break;

        case "instakill":
            color = 0xff0000;
            break;

        case "nuke":
            color = 0x00ffff;
            break;

    }

    const mesh = new THREE.Mesh(

        new THREE.BoxGeometry(1,1,1),

        new THREE.MeshStandardMaterial({

            color:color,
            emissive:color,
            emissiveIntensity:0.4

        })

    );

    mesh.position.copy(position);

    scene.add(mesh);

    pickups.push({

        type:type,
        mesh:mesh

    });

};

/* =========================
   UPDATE PICKUPS
========================= */

window.updatePickups = function(){

    for(let i = pickups.length - 1; i >= 0; i--){

        const pickup = pickups[i];

        pickup.mesh.rotation.y += 0.03;

        if(camera.position.distanceTo(pickup.mesh.position) > 2)
            continue;

        switch(pickup.type){

            case "maxammo":

                weapon.ammo = weapon.maxAmmo;

                break;

            case "doublepoints":

                console.log("Double Points!");

                break;

            case "instakill":

                console.log("Insta Kill!");

                break;

            case "nuke":

                for(const zombie of zombies){

                    scene.remove(zombie.mesh);

                }

                zombies.length = 0;

                break;

        }

        scene.remove(pickup.mesh);

        pickups.splice(i,1);

    }

};