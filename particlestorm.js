/*

 Program: particlestorm.js
 Version: 1.0 
 Creator: William Bojczuk (wiliambojczuk@gmail.com)
 License: BSD
 Github: https://github.com/wbojczuk
 Website: https://williambojczuk.com
 
 */

"use strict";
const particleStorm = {

    /* METHODS
    particleStorm.
        stop(); (DESTROYS CURRENT PARTICLES AND KILLS EVENT LISTENERS)
        pause(); (PAUSES ALL CURRENT PARTICLES)
        resume(); (CAN EITHER UNPAUSE PARTICLES ARE START SCRIPT DEPENDING ON WHETHER OR NOT THE SCRIPT IS PAUSED OR RUNNING)
        start(); (SAME PROPERTIES AS resume(); )
    */

    // SETTINGS
    randomWind: true,
    // MIN/MAX PARTICLE SPEED ON THE X-AXIS
    minXSpeed: 0.1,
    maxXSpeed: 0.4,

    // MIN/MAX PARTICLE SPEED ON THE Y-AXIS
    minYSpeed: 0.2,
    maxYSpeed: 0.5,

    // MIN/MAX PARTICLE SIZE
    minSize: 0.5,
    maxSize: 1.5,

    // Z-INDEX ON PAGE
    zIndex: 5,

    // PARTICLE COLOR PASSED AS STRING
    particleColor: "rgb(57, 153, 236)",

    // STROKE COLOR, LEAVE NULL FOR NO STROKE
    strokeColor: null,

    // STROKE WIDTH (IF STROKE IS ENABLED)
    strokeWidth: 2,

    // PARTICLE AMOUNT
    amount: 50,

    // WHETHER OR NOT TO AUTOSTART THE SCRIPT
    autoStart: true,
    

    // UNSERVICABLE STUFF BELOW

    stop: ()=>{
        window.removeEventListener("resize", particleStorm.resizeHandler);
        particleStorm.state = "off";
        cancelAnimationFrame(particleStorm.renderParticles);
    },

    start: ()=>{
        if(particleStorm.state == "off"){
            particleStorm.state = "on";
            cancelAnimationFrame(particleStorm.renderParticles);
            particleStorm.setup();
        } else if(particleStorm.state == "pause"){
            particleStorm.state = "unpause";
        }
    },
    resume: ()=>{
        if(particleStorm.state == "off"){
            particleStorm.state = "on";
            cancelAnimationFrame(particleStorm.renderParticles);
            particleStorm.setup();
        } else if(particleStorm.state == "pause"){
            particleStorm.state = "unpause";
        }
    },
    pause: ()=>{
        if(particleStorm.state !== "off"){
        particleStorm.state = "pause";
        }
    },

    // EVENT HANDLERS
    resizeHandler: ()=>{document.getElementById("particleCanvas").height = window.innerHeight;document.getElementById("particleCanvas").width = window.innerWidth;},


    
    randInt: (min,max)=>{return (Math.round(Math.random() * (max-min) + min))},
    randNum: (min,max)=>{return (Math.random() * (max-min) + min)},
    state: "off",
    particles: [],
    setup: ()=>{

        if(particleStorm.randomWind){
            const xWind = particleStorm.randNum(0,0.8);
            particleStorm.maxXSpeed = xWind;
            particleStorm.minXSpeed = particleStorm.randNum(0,xWind);

            const yWind = particleStorm.randNum(0,0.8);
            particleStorm.maxYSpeed = yWind;
            particleStorm.minYSpeed = particleStorm.randNum(0,yWind);
        }

       particleStorm.particles = [];
        let canvasElem = document.createElement("canvas");
        // CREATE AND APPEND CANVAS ELEM
        if(!document.getElementById("particleCanvas")){
        canvasElem.setAttribute("style", "position:fixed;top:0;left:0;overflow:hidden;user-select:none;pointer-events:none;");
        canvasElem.height = window.innerHeight;
        canvasElem.width = window.innerWidth;
        canvasElem.setAttribute("id", "particleCanvas"); 
        canvasElem.style.zIndex = particleStorm.zIndex;
        document.getElementsByTagName("body")[0].append(canvasElem);
    }        
        
        

        window.addEventListener("resize", particleStorm.resizeHandler);
    
        // POPULATE PARTICLES
        
        for(let i=0;i<particleStorm.amount;i++){
            particleStorm.particles.push(
                {
                    xPos:  particleStorm.randInt(0,canvasElem.width),
                    yPos:  particleStorm.randInt(0,canvasElem.height),
                    yVel:  (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed):-1*(particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed)),
                    xVel:  (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed):-1*(particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed)),
                    size: particleStorm.randNum(particleStorm.minSize,particleStorm.maxSize),
                }
            );
        }
        particleStorm.renderParticles();
    },

    renderParticles: ()=>{
        const canvasElem = document.getElementById("particleCanvas");
        const canvas2D = canvasElem.getContext('2d');

        // RESET CANVAS
        canvas2D.clearRect(0, 0, canvasElem.width,
            canvasElem.height);

            // DRAW THEM
            const particleLength = particleStorm.particles.length;
            for(let i=0;i<particleLength; i++){
                canvas2D.beginPath();
                canvas2D.arc(particleStorm.particles[i].xPos, particleStorm.particles[i].yPos, particleStorm.particles[i].size,
                0, 2 * Math.PI, false);
                canvas2D.fillStyle = particleStorm.particleColor;
                if(particleStorm.strokeColor !== null){
                    canvas2D.strokeStyle = particleStorm.strokeColor;
                    canvas2D.lineWidth = particleStorm.strokeWidth;
                    canvas2D.stroke();
                }
                canvas2D.fill();

                    // RECYCLE PARTICLES 
                    if(particleStorm.particles[i].yPos < -30 || particleStorm.particles[i].yPos > canvasElem.height + 30 || particleStorm.particles[i].xPos < -30 || particleStorm.particles[i].xPos > canvasElem.width + 30){

                    // PICK TOP/RIGHT/BOTTOM/LEFT FOR RECYCLE LOCATION AKA 1/2/3/4
                    const newLoc = particleStorm.randInt(1,4);
                    switch (newLoc){
                        case 1:
                            particleStorm.particles[i].yPos = -20;
                            particleStorm.particles[i].xPos = particleStorm.randInt(0,canvasElem.width);
                            particleStorm.particles[i].yVel = particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed);
                            particleStorm.particles[i].xVel = (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed):-1*(particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed));
                            particleStorm.particles[i].size = particleStorm.randNum(particleStorm.minSize,particleStorm.maxSize);

                        break;
                        case 2:
                            particleStorm.particles[i].yPos = particleStorm.randInt(0,canvasElem.height);
                            particleStorm.particles[i].xPos = canvasElem.width + 20;
                            particleStorm.particles[i].yVel = (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed):-1*(particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed));
                            particleStorm.particles[i].xVel = -1*(particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed));
                            particleStorm.particles[i].size = particleStorm.randNum(particleStorm.minSize,particleStorm.maxSize);
                        break;
                        case 3:
                            particleStorm.particles[i].yPos = canvasElem.height + 20;
                            particleStorm.particles[i].xPos = particleStorm.randInt(0,canvasElem.width);
                            particleStorm.particles[i].yVel = -1*(particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed));
                            particleStorm.particles[i].xVel = (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed):-1*(particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed));
                            particleStorm.particles[i].size = particleStorm.randNum(particleStorm.minSize,particleStorm.maxSize);
                        break;
                        case 4:
                            particleStorm.particles[i].yPos = particleStorm.randInt(0,canvasElem.height);
                            particleStorm.particles[i].xPos = -20;
                            particleStorm.particles[i].yVel = (particleStorm.randInt(1,2) == 2)?particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed):-1*(particleStorm.randNum(particleStorm.minYSpeed,particleStorm.maxYSpeed));
                            particleStorm.particles[i].xVel = particleStorm.randNum(particleStorm.minXSpeed,particleStorm.maxXSpeed);
                            particleStorm.particles[i].size = particleStorm.randNum(particleStorm.minSize,particleStorm.maxSize);
                        break;
                    }

                    } else{
                        particleStorm.particles[i].yPos += particleStorm.particles[i].yVel;
                        particleStorm.particles[i].xPos += particleStorm.particles[i].xVel;
                    }

                
            }
            switch(particleStorm.state){
                case "on":
                    requestAnimationFrame(particleStorm.renderParticles);
                break;
                case "off":
                    canvas2D.clearRect(0, 0, canvasElem.width,
                        canvasElem.height);
                        document.getElementById("particleCanvas").remove();
                break;
                case "pause":
                        unPause();
                        function unPause(){
                            if (particleStorm.state == "unpause"){
                                particleStorm.state = "on";
                             requestAnimationFrame(particleStorm.renderParticles);
                            } else if(particleStorm.state=="off"){
                                canvas2D.clearRect(0, 0, canvasElem.width,
                                    canvasElem.height);
                                    document.getElementById("particleCanvas").remove();
                            } else {setTimeout(unPause,10);}
                        } 
                break;
            }
            
    },
};

if(particleStorm.autoStart){particleStorm.start();}
