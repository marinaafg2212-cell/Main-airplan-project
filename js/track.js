

/* ======================================
   CANVAS
====================================== */

const canvas =
    document.getElementById("map");

const ctx =
    canvas.getContext("2d");


let W = 0;
let H = 0;


/* ======================================
   SETTINGS
====================================== */

let zoom = 1;

let rotation = 0;

let dragging = false;

let lastX = 0;


/* ======================================
   RESIZE
====================================== */

function resize() {

    const dpr =
        Math.min(
            window.devicePixelRatio || 1,
            1.5
        );

    W = window.innerWidth;

    H = window.innerHeight;

    canvas.width =
        W * dpr;

    canvas.height =
        H * dpr;

    canvas.style.width =
        W + "px";

    canvas.style.height =
        H + "px";

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );
}


resize();


window.addEventListener(
    "resize",
    resize
);


/* ======================================
   EARTH
====================================== */

const earth =
{

    x: 0,

    y: 0,

    radius: 0

};


function updateEarth() {

    earth.x =
        W / 2;

    earth.y =
        H / 2;

    earth.radius =
        Math.min(W, H) *
        .42 *
        zoom;

}


/* ======================================
   FLIGHTS
====================================== */

const flights = [];

const AIRLINES = [

    "Horizon Air",
    "Afghan Air",
    "Sky Express",
    "Global Air",
    "Asia Airways",
    "United Air",
    "Royal Air",
    "Fly World"

];


/* ======================================
   RANDOM FLIGHTS
====================================== */

for (
    let i = 0;
    i < 200;
    i++
) {

    const flight = {

        id:
            "HZ" +
            String(i + 1)
                .padStart(3, "0"),

        airline:
            AIRLINES[
            Math.floor(
                Math.random() *
                AIRLINES.length
            )
            ],

        lat:
            -60 +
            Math.random() * 120,

        lon:
            -180 +
            Math.random() * 360,

        speed:
            700 +
            Math.random() * 220,

        altitude:
            28000 +
            Math.random() * 12000,

        direction:
            Math.random() * Math.PI * 2,

        selected: false

    };

    flights.push(flight);

}


/* ======================================
   PROJECT
====================================== */

function project(
    lon,
    lat
) {

    let longitude =
        lon + rotation;

    longitude =
        ((longitude + 180) % 360) - 180;


    const lonRad =
        longitude *
        Math.PI / 180;

    const latRad =
        lat *
        Math.PI / 180;


    const x =
        earth.radius *
        Math.cos(latRad) *
        Math.sin(lonRad);


    const y =
        earth.radius *
        Math.sin(latRad);


    const z =
        earth.radius *
        Math.cos(latRad) *
        Math.cos(lonRad);


    return {

        x:
            earth.x + x,

        y:
            earth.y - y,

        z

    };

}


/* ======================================
   DRAW BACKGROUND
====================================== */

function drawBackground() {

    const gradient =
        ctx.createRadialGradient(
            W * .45,
            H * .45,
            20,
            W * .5,
            H * .5,
            Math.max(W, H)
        );


    gradient.addColorStop(
        0,
        "#071d2b"
    );

    gradient.addColorStop(
        1,
        "#010409"
    );


    ctx.fillStyle =
        gradient;

    ctx.fillRect(
        0,
        0,
        W,
        H
    );

}


/* ======================================
   DRAW GLOBE
====================================== */

function drawGlobe() {

    updateEarth();


    /* atmosphere */

    ctx.beginPath();

    ctx.arc(
        earth.x,
        earth.y,
        earth.radius + 8,
        0,
        Math.PI * 2
    );


    ctx.fillStyle =
        "rgba(0,130,220,.08)";

    ctx.fill();


    /* earth */

    const gradient =
        ctx.createRadialGradient(
            earth.x -
            earth.radius * .3,

            earth.y -
            earth.radius * .3,

            earth.radius * .1,

            earth.x,
            earth.y,

            earth.radius
        );


    gradient.addColorStop(
        0,
        "#153b50"
    );

    gradient.addColorStop(
        .6,
        "#071a29"
    );

    gradient.addColorStop(
        1,
        "#02070d"
    );


    ctx.beginPath();

    ctx.arc(
        earth.x,
        earth.y,
        earth.radius,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /* grid */

    ctx.save();

    ctx.beginPath();

    ctx.arc(
        earth.x,
        earth.y,
        earth.radius,
        0,
        Math.PI * 2
    );

    ctx.clip();


    ctx.strokeStyle =
        "rgba(100,190,220,.12)";

    ctx.lineWidth = 1;


    for (
        let lat = -60;
        lat <= 60;
        lat += 30
    ) {

        drawLatitude(lat);

    }


    for (
        let lon = -180;
        lon < 180;
        lon += 30
    ) {

        drawLongitude(lon);

    }


    ctx.restore();

}


/* ======================================
   LATITUDE
====================================== */

function drawLatitude(lat) {

    ctx.beginPath();

    for (
        let lon = -180;
        lon <= 180;
        lon += 5
    ) {

        const p =
            project(
                lon,
                lat
            );


        if (
            p.z > 0
        ) {

            if (lon === -180) {

                ctx.moveTo(
                    p.x,
                    p.y
                );

            } else {

                ctx.lineTo(
                    p.x,
                    p.y
                );

            }

        }

    }

    ctx.stroke();

}


/* ======================================
   LONGITUDE
====================================== */

function drawLongitude(lon) {

    ctx.beginPath();

    for (
        let lat = -90;
        lat <= 90;
        lat += 5
    ) {

        const p =
            project(
                lon,
                lat
            );


        if (
            p.z > 0
        ) {

            if (lat === -90) {

                ctx.moveTo(
                    p.x,
                    p.y
                );

            } else {

                ctx.lineTo(
                    p.x,
                    p.y
                );

            }

        }

    }

    ctx.stroke();

}


/* ======================================
   DRAW FLIGHTS
====================================== */

function drawFlights() {

    for (
        let i = 0;
        i < flights.length;
        i++
    ) {

        const flight =
            flights[i];


        const p =
            project(
                flight.lon,
                flight.lat
            );


        if (
            p.z <= 0
        ) {

            continue;

        }


        /* airplane size */

        const size =
            flight.selected
                ? 8
                : 5;


        ctx.save();

        ctx.translate(
            p.x,
            p.y
        );


        ctx.rotate(
            flight.direction
        );


        /* glow */

        if (
            flight.selected
        ) {

            ctx.shadowColor =
                "#19baff";

            ctx.shadowBlur =
                15;

        }


        /* airplane */

        ctx.fillStyle =
            flight.selected
                ? "#ffffff"
                : "#55caff";


        ctx.beginPath();

        ctx.moveTo(
            size,
            0
        );

        ctx.lineTo(
            -size,
            -size / 2
        );

        ctx.lineTo(
            -size / 3,
            0
        );

        ctx.lineTo(
            -size,
            size / 2
        );

        ctx.closePath();

        ctx.fill();


        ctx.restore();

    }

}


/* ======================================
   MOVE FLIGHTS
====================================== */

function moveFlights() {

    for (
        let i = 0;
        i < flights.length;
        i++
    ) {

        const flight =
            flights[i];


        const speed =
            0.025;


        flight.lon +=
            Math.cos(
                flight.direction
            ) * speed;


        flight.lat +=
            Math.sin(
                flight.direction
            ) * speed;


        if (
            flight.lon > 180
        ) {

            flight.lon = -180;

        }


        if (
            flight.lon < -180
        ) {

            flight.lon = 180;

        }


        if (
            flight.lat > 75 ||
            flight.lat < -75
        ) {

            flight.direction *= -1;

        }

    }

}


/* ======================================
   MAIN LOOP
====================================== */

function animate() {

    drawBackground();

    drawGlobe();

    moveFlights();

    drawFlights();


    requestAnimationFrame(
        animate
    );

}


animate();


/* ======================================
   MOUSE
====================================== */

canvas.addEventListener(
    "mousedown",
    e => {

        dragging = true;

        lastX =
            e.clientX;

    }
);


window.addEventListener(
    "mouseup",
    () => {

        dragging = false;

    }
);


window.addEventListener(
    "mousemove",
    e => {

        if (!dragging)
            return;


        const difference =
            e.clientX -
            lastX;


        rotation +=
            difference * .25;


        lastX =
            e.clientX;

    }
);


/* ======================================
   TOUCH
====================================== */

canvas.addEventListener(
    "touchstart",
    e => {

        lastX =
            e.touches[0].clientX;

    },
    { passive: true }
);


canvas.addEventListener(
    "touchmove",
    e => {

        const x =
            e.touches[0].clientX;


        const difference =
            x - lastX;


        rotation +=
            difference * .25;


        lastX = x;

    },
    { passive: true }
);


/* ======================================
   ZOOM
====================================== */

document
    .getElementById("plus")
    .onclick = () => {

        zoom += .1;

        if (
            zoom > 1.5
        ) {

            zoom = 1.5;

        }

    };


document
    .getElementById("minus")
    .onclick = () => {

        zoom -= .1;

        if (
            zoom < .6
        ) {

            zoom = .6;

        }

    };


document
    .getElementById("reset")
    .onclick = () => {

        zoom = 1;

        rotation = 0;

    };


/* ======================================
   CLICK FLIGHT
====================================== */

canvas.addEventListener(
    "click",
    e => {

        const rect =
            canvas.getBoundingClientRect();


        const mouseX =
            e.clientX -
            rect.left;


        const mouseY =
            e.clientY -
            rect.top;


        let found = null;


        for (
            let i = 0;
            i < flights.length;
            i++
        ) {

            const flight =
                flights[i];


            const p =
                project(
                    flight.lon,
                    flight.lat
                );


            if (
                p.z <= 0
            ) {

                continue;

            }


            const distance =
                Math.hypot(
                    mouseX - p.x,
                    mouseY - p.y
                );


            if (
                distance < 12
            ) {

                found =
                    flight;

                break;

            }

        }


        if (found) {

            flights.forEach(
                f =>
                    f.selected = false
            );


            found.selected =
                true;


            document
                .getElementById(
                    "selected"
                )
                .style.display =
                "block";


            document
                .getElementById(
                    "flightName"
                )
                .textContent =
                "Flight " +
                found.id;


            document
                .getElementById(
                    "airline"
                )
                .textContent =
                found.airline;


            document
                .getElementById(
                    "altitude"
                )
                .textContent =
                Math.round(
                    found.altitude
                ).toLocaleString() +
                " ft";


            document
                .getElementById(
                    "speed"
                )
                .textContent =
                Math.round(
                    found.speed
                ) +
                " km/h";

        }

    });



