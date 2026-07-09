console.log("zombies.js loaded");

/* =========================
   ZOMBIE SYSTEM
========================= */

const zombies = [];

let points = 500;
let round = 1;
let zombiesToSpawn = 5;
let zombiesKilled = 0;

/* =========================
   CREATE ZOMBIE
========================= */

window.spawnZombie = function () {

    const zombie = {

        health: 100,
        walkTime: Math.random() * Math.PI * 2

    };

    const group = new THREE.Group();

    /* BODY */

    const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0x355c35
    });

    const pantsMaterial = new THREE.MeshStandardMaterial({
        color: 0x444444
    });

    const headMaterial = new THREE.MeshStandardMaterial({
        color: 0x88aa66
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
        color: 0xff0000,
        emissive: 0xaa0000
    });

    /* TORSO */

    zombie.torso = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1.3, 0.6),
        bodyMaterial
    );

    zombie.torso.position.y = 2.2;
    group.add(zombie.torso);

    /* HEAD */

    zombie.head = new THREE.Mesh(
        new THREE.BoxGeometry(0.8,0.8,0.8),
        headMaterial
    );

    zombie.head.position.y = 3.3;
    group.add(zombie.head);

    /* EYES */

    const leftEye = new THREE.Mesh(
        new THREE.BoxGeometry(0.1,0.1,0.1),
        eyeMaterial
    );

    leftEye.position.set(-0.15,3.35,0.42);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(
        new THREE.BoxGeometry(0.1,0.1,0.1),
        eyeMaterial
    );

    rightEye.position.set(0.15,3.35,0.42);
    group.add(rightEye);

    /* LEFT ARM */

    zombie.leftArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.3,1.2,0.3),
        bodyMaterial
    );

    zombie.leftArm.position.set(-0.7,2.15,0);

    group.add(zombie.leftArm);

    /* RIGHT ARM */

    zombie.rightArm = new THREE.Mesh(
        new THREE.BoxGeometry(0.3,1.2,0.3),
        bodyMaterial
    );

    zombie.rightArm.position.set(0.7,2.15,0);

    group.add(zombie.rightArm);

    /* LEFT LEG */

    zombie.leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.35,1.2,0.35),
        pantsMaterial
    );

    zombie.leftLeg.position.set(-0.22,0.6,0);

    group.add(zombie.leftLeg);

    /* RIGHT LEG */

    zombie.rightLeg = new THREE.Mesh(
        new THREE.BoxGeometry(0.35,1.2,0.35),
        pantsMaterial
    );

    zombie.rightLeg.position.set(0.22,0.6,0);

    group.add(zombie.rightLeg);

    /* RANDOM SPAWN */

 const spawns = [

    new THREE.Vector3(0, 0, 28),
    new THREE.Vector3(-8, 0, 22),
    new THREE.Vector3(8, 0, 22),
    new THREE.Vector3(0, 0, 18)

];

const spawn = spawns[
    Math.floor(Math.random() * spawns.length)
];

group.position.copy(spawn);

    zombie.mesh = group;

    scene.add(group);

    zombies.push(zombie);

};

/* =========================
   SPAWN ROUND
========================= */

window.spawnRound = function () {

    for (let i = 0; i < zombiesToSpawn; i++) {

        setTimeout(() => {

            spawnZombie();

        }, i * 1000);

    }

};

/* =========================
   UPDATE
========================= */

window.updateZombies = function () {

    for (const zombie of zombies) {

        zombie.walkTime += 0.12;

        /* WALK ANIMATION */

        zombie.leftArm.rotation.x =
            Math.sin(zombie.walkTime) * 0.7;

        zombie.rightArm.rotation.x =
            -Math.sin(zombie.walkTime) * 0.7;

        zombie.leftLeg.rotation.x =
            -Math.sin(zombie.walkTime) * 0.6;

        zombie.rightLeg.rotation.x =
            Math.sin(zombie.walkTime) * 0.6;

  /* MOVE */

const dir = new THREE.Vector3();

dir.subVectors(
    camera.position,
    zombie.mesh.position
);

dir.y = 0;

const distance = dir.length();

dir.normalize();

const nextPosition = zombie.mesh.position.clone().add(
    dir.clone().multiplyScalar(0.025)
);

let canMove = true;

if(typeof playerCanMoveTo === "function"){

    canMove = playerCanMoveTo(nextPosition);

}

if(canMove){

    zombie.mesh.position.copy(nextPosition);

}

        /* FACE PLAYER */

        zombie.mesh.lookAt(

            camera.position.x,

            zombie.mesh.position.y,

            camera.position.z

        );

        /* ATTACK */

        if (distance < 1.4) {

            player.health -= 0.03;

        }

    }

};