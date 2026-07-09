console.log("mysterybox.js loaded");

/* =========================
   WEAPONS
========================= */

const weaponsList = [

{
    name:"M1911",
    damage:25,
    ammo:12,
    maxAmmo:12,
    fireRate:200
},

{
    name:"MP5",
    damage:18,
    ammo:30,
    maxAmmo:30,
    fireRate:100
},

{
    name:"AK47",
    damage:35,
    ammo:30,
    maxAmmo:30,
    fireRate:120
},

{
    name:"RPK",
    damage:45,
    ammo:100,
    maxAmmo:100,
    fireRate:80
},

{
    name:"Ray Gun",
    damage:100,
    ammo:20,
    maxAmmo:20,
    fireRate:300
}

];

/* =========================
   MYSTERY BOX
========================= */

let mysteryBox = null;

window.initMysteryBox = function(){

    mysteryBox = new THREE.Mesh(

        new THREE.BoxGeometry(2,2,2),

        new THREE.MeshStandardMaterial({

            color:0x8b4513

        })

    );

    mysteryBox.position.set(

        0,
        1,
        0

    );

    mysteryBox.castShadow = true;
    mysteryBox.receiveShadow = true;

    scene.add(mysteryBox);

};

/* =========================
   BUY WEAPON
========================= */

window.addEventListener("keydown",function(e){

    if(e.key.toLowerCase()!=="e") return;

    if(!mysteryBox) return;

    const distance = camera.position.distanceTo(

        mysteryBox.position

    );

    if(distance>3) return;

    if(points<950){

        console.log("Not enough points");

        return;

    }

    points-=950;

    const selected = weaponsList[
        Math.floor(Math.random()*weaponsList.length)
    ];

    setWeapon(selected);

    console.log("Mystery Box:",selected.name);

});