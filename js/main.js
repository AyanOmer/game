console.log("main.js loaded");

/* ==========================================
   GLOBALS
========================================== */

let scene;
let camera;
let renderer;

let floor;
let gun;

let door;
let doorOpened = false;

let jugMachine;

/* ==========================================
   INITIALIZE
========================================== */

function init(){

    document.getElementById("loading").style.display = "none";

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x111111);

    scene.fog = new THREE.Fog(
        0x111111,
        15,
        70
    );

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(
        0,
        2,
        5
    );

    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    renderer.shadowMap.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );

createLights();

createFloor();

createGun();

createSpawnRoom();

createSecondRoom();

createThirdRoom();   // <-- ADD THIS LINE

createStairs();

window.addEventListener("resize", onResize);

}



/* ==========================================
   LIGHTS
========================================== */

function createLights(){

    const ambient = new THREE.AmbientLight(
        0xffffff,
        0.25
    );

    scene.add(ambient);

    const moon = new THREE.DirectionalLight(
        0xffffff,
        0.7
    );

    moon.position.set(
        12,
        20,
        12
    );

    moon.castShadow = true;

    scene.add(moon);

}

/* ==========================================
   FLOOR
========================================== */

function createFloor(){

    const material = new THREE.MeshStandardMaterial({
        color:0x333333
    });

    function addFloor(x,z,w,d){

        const floor = new THREE.Mesh(

            new THREE.PlaneGeometry(w,d),

            material

        );

        floor.rotation.x = -Math.PI/2;

        floor.position.set(
            x,
            0,
            z
        );

        floor.receiveShadow = true;

        scene.add(floor);

    }

    /* ==================================
       SPAWN ROOM
    ================================== */

    addFloor(
        0,
        0,
        20,
        20
    );

    /* ==================================
       ROOM 2
    ================================== */

    addFloor(
        0,
        20,
        20,
        20
    );

    /* ==================================
       ROOM 3 (LEFT OF HOLE)
    ================================== */

    addFloor(
        18,
        0,
        16,
        40
    );

    /* ROOM 3 (RIGHT OF HOLE) */

    addFloor(
        42,
        0,
        16,
        40
    );


    /* ROOM 3 (TOP OF HOLE) */

addFloor(
    30,
    -14,
    8,
    12
);

    /* ROOM 3 (BOTTOM OF HOLE) */

    addFloor(
        30,
        14,
        8,
        12
    );

}

/* ==========================================
   GUN
========================================== */

function createGun(){

    gun = new THREE.Mesh(

        new THREE.BoxGeometry(
            0.3,
            0.2,
            1
        ),

        new THREE.MeshStandardMaterial({

            color:0x222222,
            emissive:0x000000

        })

    );

    gun.position.set(
        0.4,
        -0.4,
        -1
    );

    camera.add(gun);

}

/* ==========================================
   WALL HELPER
========================================== */

function makeWall(x,y,z,w,h,d){

    const wall = new THREE.Mesh(

        new THREE.BoxGeometry(
            w,
            h,
            d
        ),

        new THREE.MeshStandardMaterial({

            color:0x555555

        })

    );

    wall.position.set(
        x,
        y,
        z
    );

    wall.castShadow = true;
    wall.receiveShadow = true;

    scene.add(wall);

    if(typeof addCollider === "function"){

        addCollider(wall);

    }

    return wall;

}

/* ==========================================
   SPAWN ROOM
========================================== */

function createSpawnRoom(){

    makeWall(
        0,2,-10,
        20,4,1
    );

    makeWall(
        -10,2,0,
        1,4,20
    );
    
    /* Right Wall (Top) */

makeWall(
    10,
    2,
    -7,
    1,
    4,
    6
);

/* Right Wall (Bottom) */

makeWall(
    10,
    2,
    7,
    1,
    4,
    6
);


    makeWall(
        -7,2,10,
        6,4,1
    );

    makeWall(
        7,2,10,
        6,4,1
    );

}

/* ==========================================
   ROOM 2
========================================== */

function createSecondRoom(){

    /* ---------- Door ---------- */

door = new THREE.Mesh(

    new THREE.BoxGeometry(
        8,
        4,
        0.5
    ),

    new THREE.MeshStandardMaterial({
        color:0x663300
    })

);

    door.position.set(
        0,
        2,
        10
    );

    scene.add(door);

    if(typeof addCollider === "function"){

        addCollider(door);

    }

    /* ---------- Back Wall ---------- */

    makeWall(
        0,
        2,
        30,
        20,
        4,
        1
    );

    /* ---------- Left Wall ---------- */

    makeWall(
        -10,
        2,
        20,
        1,
        4,
        20
    );

    /* ---------- Right Wall ---------- */

    makeWall(
        10,
        2,
        20,
        1,
        4,
        20
    );

    /* ---------- Floor ---------- */

    const room2Floor = new THREE.Mesh(

        new THREE.PlaneGeometry(
            20,
            20
        ),

        new THREE.MeshStandardMaterial({

            color:0x222222

        })

    );

    room2Floor.rotation.x = -Math.PI/2;

    room2Floor.position.set(
        0,
        0.01,
        20
    );

    room2Floor.receiveShadow = true;

    scene.add(room2Floor);

    /* ---------- Juggernog ---------- */

    jugMachine = new THREE.Mesh(

        new THREE.BoxGeometry(
            2,
            3,
            2
        ),

        new THREE.MeshStandardMaterial({

            color:0xaa0000

        })

    );

    jugMachine.position.set(
        5,
        1.5,
        22
    );

    scene.add(jugMachine);

}


/* ==========================================
   ROOM 3
========================================== */

function createThirdRoom(){

    /* ---------- Floor ---------- */


    /* ---------- Left Wall ---------- */

/* Left Wall (top) */

makeWall(
    10,
    2,
    -15,
    1,
    4,
    10
);

/* Left Wall (bottom) */

makeWall(
    10,
    2,
    15,
    1,
    4,
    10
);

    /* ---------- Right Wall ---------- */

    makeWall(
        50,
        2,
        0,
        1,
        4,
        40
    );

    /* ---------- Back Wall ---------- */

    makeWall(
        30,
        2,
        -20,
        40,
        4,
        1
    );

    /* ---------- Front Wall ---------- */

    makeWall(
        30,
        2,
        20,
        40,
        4,
        1
    );

    /* =====================================
       CENTER TRAINING BLOCK
    ===================================== */

/* ===========================
   STAIR PIT
=========================== */



const wallMat = new THREE.MeshStandardMaterial({
    color:0x444444
});

const floorMat = new THREE.MeshStandardMaterial({
    color:0x222222
});

/* Bottom */

const bottom = new THREE.Mesh(

    new THREE.BoxGeometry(8,0.3,8),

    floorMat

);

bottom.position.set(
    30,
    -5,
    0
);

scene.add(bottom);

if(typeof addCollider === "function"){
    addCollider(bottom);
}

/* Left Wall */

const left = new THREE.Mesh(

    new THREE.BoxGeometry(0.3,6,8),

    wallMat

);

left.position.set(26,-3,0);

scene.add(left);

if(typeof addCollider === "function"){
    addCollider(left);
}

const right = left.clone();

right.position.set(34,-3,0);

scene.add(right);

if(typeof addCollider === "function"){
    addCollider(right);
}


/* ==========================
   PIT RAILINGS
========================== */

const railMat = new THREE.MeshStandardMaterial({
    color:0x888888
});

function makeRail(x,y,z,w,h,d){

    const rail = new THREE.Mesh(

        new THREE.BoxGeometry(w,h,d),

        railMat

    );

    rail.position.set(x,y,z);

    scene.add(rail);

}

/* LEFT */

makeRail(
    26,
    1,
    0,
    0.2,
    1,
    8
);

/* RIGHT */

makeRail(
    34,
    1,
    0,
    0.2,
    1,
    8
);

/* BACK */

makeRail(
    30,
    1,
    -4,
    8,
    1,
    0.2
);

}



/* ==========================================
   STAIRWELL
========================================== */


function createStairs(){

    const stepMaterial = new THREE.MeshStandardMaterial({
        color:0x555555
    });

    const stairWidth = 8;
    const stepDepth = 0.8;
    const stepHeight = 0.3;
    const steps = 10;

    for(let i = 0; i < steps; i++){

        const step = new THREE.Mesh(

            new THREE.BoxGeometry(
                stairWidth,
                stepHeight,
                stepDepth
            ),

            stepMaterial

        );

        step.position.set(

    30,
-0.15 - (i * stepHeight),
3 + (i * stepDepth)

);

        step.castShadow = true;
        step.receiveShadow = true;

        scene.add(step);

    }

const landing = new THREE.Mesh(

    new THREE.BoxGeometry(
        9,
        0.4,
        4
    ),

    new THREE.MeshStandardMaterial({
        color:0x555555
    })

);

landing.position.set(
    30,
    -3.15,
    11
);

scene.add(landing);

const stairRamp = new THREE.Mesh(

    new THREE.BoxGeometry(
        8,
        0.5,
        10
    ),

    new THREE.MeshStandardMaterial({
        visible:false
    })

);

stairRamp.position.set(
    30,
    -2.1,
    7
);

stairRamp.rotation.x = -Math.atan(3 / 8);

scene.add(stairRamp);

if(typeof addCollider === "function"){
    addCollider(stairRamp);
}

}

/* ==========================================
   WINDOW RESIZE
========================================== */

function onResize(){

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

}

/* ==========================================
   BUY DOOR
========================================== */

window.addEventListener("keydown", function(e){

    if(e.key.toLowerCase() !== "e") return;

    if(!door) return;

    if(doorOpened) return;

    if(camera.position.distanceTo(door.position) > 4) return;

    if(points < 750){

        console.log("Need 750 points");

        return;

    }

    points -= 750;

    doorOpened = true;

    scene.remove(door);

    if(typeof removeCollider === "function"){

        removeCollider(door);

    }

    console.log("Door Opened");

});

/* ==========================================
   GAME LOOP
========================================== */

function animate(){

    requestAnimationFrame(animate);

    if(typeof updatePlayer === "function"){
        updatePlayer();
    }

    if(typeof updateZombies === "function"){
        updateZombies();
    }

    if(typeof updatePickups === "function"){
        updatePickups();
    }

    if(typeof updateWallBuy === "function"){
        updateWallBuy();
    }

    if(typeof updateUI === "function"){
        updateUI();
    }

    renderer.render(
        scene,
        camera
    );

}

/* ==========================================
   START GAME
========================================== */

window.startGame = function(){

    init();

    if(typeof spawnRound === "function"){
        spawnRound();
    }

    if(typeof initMysteryBox === "function"){
        initMysteryBox();
    }

    if(typeof initWallBuy === "function"){
        initWallBuy();
    }

    animate();

};

console.log("main.js finished");