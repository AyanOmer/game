console.log("collisions.js loaded");

/* =========================
   COLLIDERS
========================= */

const colliders = [];

/* =========================
   ADD COLLIDER
========================= */

window.addCollider = function(mesh){

    if(!mesh) return;

    colliders.push(mesh);

};

/* =========================
   REMOVE COLLIDER
========================= */

window.removeCollider = function(mesh){

    const index = colliders.indexOf(mesh);

    if(index !== -1){

        colliders.splice(index,1);

    }

};

/* =========================
   PLAYER COLLISION
========================= */

window.playerCanMoveTo = function(position){

    const playerRadius = 0.45;

    for(const mesh of colliders){

        if(!mesh || !mesh.parent) continue;

        /* Ignore invisible colliders (ramps, triggers, etc.) */

        if(
            mesh.material &&
            mesh.material.visible === false
        ){
            continue;
        }

        const box = new THREE.Box3().setFromObject(mesh);

        box.expandByScalar(playerRadius);

        /* Ignore very flat objects (stairs/floors) */

        const size = new THREE.Vector3();
        box.getSize(size);

        if(size.y < 0.75){
            continue;
        }

        if(box.containsPoint(position)){
            return false;
        }

    }

    return true;

};

/* =========================
   ZOMBIE COLLISION
========================= */

window.zombieCanMoveTo = function(position){

    const zombieRadius = 0.45;

    for(const mesh of colliders){

        if(!mesh || !mesh.parent) continue;

        if(
            mesh.material &&
            mesh.material.visible === false
        ){
            continue;
        }

        const box = new THREE.Box3().setFromObject(mesh);

        box.expandByScalar(zombieRadius);

        const size = new THREE.Vector3();
        box.getSize(size);

        if(size.y < 0.75){
            continue;
        }

        if(box.containsPoint(position)){
            return false;
        }

    }

    return true;

};

/* =========================
   UPDATE
========================= */

window.updateColliders = function(){

};