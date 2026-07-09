const bullets = [];

const weapon = {

ammo:12,
maxAmmo:12,

canShoot:true,

fireRate:200

};



window.addEventListener("mousedown",()=>{

shoot();

});



window.addEventListener("keydown",(e)=>{

if(e.key==="r"){

reload();

}

});




function shoot(){


if(!weapon.canShoot) return;

if(weapon.ammo<=0) return;



weapon.ammo--;



weapon.canShoot=false;



setTimeout(()=>{

weapon.canShoot=true;

},

weapon.fireRate);




const dir = new THREE.Vector3();

camera.getWorldDirection(dir);



const bullet={

mesh:new THREE.Mesh(

new THREE.SphereGeometry(

0.03

),

new THREE.MeshBasicMaterial({

color:0xffff00

})

),

velocity:dir.clone()

};



bullet.mesh.position.copy(

camera.position

);


scene.add(

bullet.mesh

);


bullets.push(bullet);

console.log("Bullet spawned!", bullets.length);

}



function reload(){

weapon.ammo = weapon.maxAmmo;

}



window.updateBullets = function(){

for(let i = bullets.length - 1; i >= 0; i--){

    const b = bullets[i];

    let hit = false;

    for(let j = zombies.length - 1; j >= 0; j--){

        const z = zombies[j];

        if(b.mesh.position.distanceTo(z.mesh.position) < 1){

            z.health -= 25;

            scene.remove(b.mesh);
            bullets.splice(i,1);

            hit = true;

            if(z.health <= 0){

                scene.remove(z.mesh);
                zombies.splice(j,1);

                console.log("Zombie killed!");

points += 100;

zombiesKilled++;

if(zombiesKilled >= zombiesToSpawn){

    round++;

    zombiesKilled = 0;

    zombiesToSpawn += 2;

    setTimeout(()=>{

        spawnRound();

    },3000);

}

if(zombiesKilled >= zombiesToSpawn){

    round++;

    zombiesKilled = 0;

    zombiesToSpawn += 2;

    setTimeout(()=>{

        spawnRound();

    },3000);

}



            }

            break;

        }

    }

    if(hit) continue;


    b.mesh.position.add(

        b.velocity.clone().multiplyScalar(0.8)

    );


    if(b.mesh.position.length() > 300){

        scene.remove(b.mesh);

        bullets.splice(i,1);

    }

}

};