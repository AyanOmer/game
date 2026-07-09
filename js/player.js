console.log("PLAYER.JS STARTED");

/* =========================
   PLAYER
========================= */

const player = {

    speed: 0.12,
    sprint: 0.22,

    yaw: 0,
    pitch: 0,

    health: 100,
    maxHealth: 100

};

/* =========================
   JUGGERNOG
========================= */

/* =========================
   BUY JUGGERNOG
========================= */

/* =========================
   BUY JUGGERNOG
========================= */

window.addEventListener("keydown", function(e){

    if(e.key.toLowerCase() !== "e") return;

    console.log("Trying to buy Juggernog...");

    console.log("doorOpened:", doorOpened);
    console.log("jugMachine:", jugMachine);
    console.log("points:", points);

    if(window.hasJug){
        console.log("Already have Juggernog");
        return;
    }

    if(!doorOpened){
        console.log("Door not opened");
        return;
    }

    if(!jugMachine){
        console.log("No Juggernog machine");
        return;
    }

    const distance = camera.position.distanceTo(jugMachine.position);
    console.log("Distance:", distance);

    if(distance > 3){
        console.log("Too far away");
        return;
    }

    if(points < 2500){
        console.log("Need 2500 points");
        return;
    }

    points -= 2500;

    window.hasJug = true;

    player.maxHealth = 250;
    player.health = 250;

    console.log("Juggernog Purchased!");

});



/* =========================
   MOVEMENT
========================= */

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

let running = false;

/* =========================
   POINTER LOCK
========================= */

document.body.addEventListener("click", function(){

    document.body.requestPointerLock();

});

/* =========================
   LOOK
========================= */

document.addEventListener("mousemove", function(e){

    if(document.pointerLockElement !== document.body) return;

    player.yaw -= e.movementX * 0.002;
    player.pitch -= e.movementY * 0.002;

    player.pitch = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, player.pitch)
    );

    camera.rotation.order = "YXZ";

    camera.rotation.y = player.yaw;
    camera.rotation.x = player.pitch;

});

/* =========================
   INPUT
========================= */

window.addEventListener("keydown", function(e){

    switch(e.key.toLowerCase()){

        case "w":
            moveForward = true;
            break;

        case "s":
            moveBackward = true;
            break;

        case "a":
            moveLeft = true;
            break;

        case "d":
            moveRight = true;
            break;

    }

    if(e.key === "Shift"){
        running = true;
    }

});

window.addEventListener("keyup", function(e){

    switch(e.key.toLowerCase()){

        case "w":
            moveForward = false;
            break;

        case "s":
            moveBackward = false;
            break;

        case "a":
            moveLeft = false;
            break;

        case "d":
            moveRight = false;
            break;

    }

    if(e.key === "Shift"){
        running = false;
    }

});

/* =========================
   UPDATE PLAYER
========================= */

window.updatePlayer = function(){

    let speed = running ?
        player.sprint :
        player.speed;

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);

    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(
        new THREE.Vector3(0,1,0),
        forward
    );
    right.normalize();

    let movement = new THREE.Vector3();

    if(moveForward){
        movement.add(
            forward.clone().multiplyScalar(speed)
        );
    }

    if(moveBackward){
        movement.add(
            forward.clone().multiplyScalar(-speed)
        );
    }

    if(moveLeft){
        movement.add(
            right.clone().multiplyScalar(speed)
        );
    }

    if(moveRight){
        movement.add(
            right.clone().multiplyScalar(-speed)
        );
    }

    if(movement.lengthSq() === 0) return;

    const nextPosition = camera.position.clone().add(movement);

    if(
        typeof playerCanMoveTo === "function" &&
        !playerCanMoveTo(nextPosition)
    ){
        return;
    }

    camera.position.copy(nextPosition);

};

/* =========================
   RESET KEYS
========================= */

window.addEventListener("blur", function(){

    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    running = false;

});

document.addEventListener("pointerlockchange", function(){

    if(document.pointerLockElement !== document.body){

        moveForward = false;
        moveBackward = false;
        moveLeft = false;
        moveRight = false;
        running = false;

    }

});


console.log("PLAYER.JS FINISHED");
console.log(typeof updatePlayer);
