
var canvas = document.getElementById("SolarSystemSim");
var ctx = canvas.getContext("2d");

var ScreenSize = 1000; // size of canvas, used for scaling planet distances and sizes

//mouse coordinates variables
let MouseX = 0;
let MouseY = 0;

var rect = canvas.getBoundingClientRect();

// variables for time and simulation control
var time = Date.now() * 0.005; // orbit speed
var simulate = true;
var tick = Date.now();

canvas.addEventListener("mousemove", function(event) { // tracks mouse movements
    rect = canvas.getBoundingClientRect();
    MouseX = event.clientX - rect.left;
    MouseY = event.clientY - rect.top;
});

function DrawPlanet(distance, size, orbitTime, color, name){ /// function used to draw each planet
    //calc x + y positions
    var x = ScreenSize / 2 + distance * Math.cos(time / orbitTime);
    var y = ScreenSize / 2 + distance * Math.sin(time / orbitTime);

    // draw circle
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(name, x + size + 5, y);
}

//function to draw earth + its moon
function DrawEarthMoon(distance, size, orbitTime, color, name)
{
    // same as draw planet func
    var x = ScreenSize / 2 + distance * Math.cos(time / orbitTime);
    var y = ScreenSize / 2 + distance * Math.sin(time / orbitTime);

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(name, x + size + 5, y);

    //---------------------------------------------

    // draw the moon
    var moonX = x + 15 * Math.cos(time / 0.07); // moon dist and speed
    var moonY = y + 15 * Math.sin(time / 0.07);

    ctx.beginPath();
    ctx.arc(moonX, moonY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = "gray";
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Moon", moonX + 5, moonY);
    
}


function drawSolarSystem(){

    simulate = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //  the sun
    ctx.beginPath();
    ctx.arc(ScreenSize / 2, ScreenSize / 2, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();

    //draw planet function calls
    DrawPlanet(70, 6, 0.24, "yellow", "Mercury");  //Mercury
    DrawPlanet(74, 7, 0.61, "orange", "Venus"); //Venus
    DrawEarthMoon(98, 8, 1, "blue", "Earth"); //Earth
    DrawPlanet(115, 6, 1.88, "red", "Mars"); //Mars
    DrawPlanet(135, 9, 11.8, "brown", "Jupiter"); //Jupiter
    DrawPlanet(174, 8, 29.4, "orange", "Saturn"); //Saturn
    DrawPlanet(303, 7, 84, "lightblue", "Uranus"); //Uranus
    DrawPlanet(400, 6, 165, "blue", "Neptune"); //Neptune

    // if mouse is hovering over a planet, dont step the simulation
    if (simulate){
        tick += 1; // tick the simulation
        time = tick * 0.005; // orbit speed
    }
}

// function to loop the simulation
function animate() {
    drawSolarSystem();
    requestAnimationFrame(animate);
}

animate();