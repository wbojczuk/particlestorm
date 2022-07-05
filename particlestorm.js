"use strict";
const particleStorm = {

    // SETTINGS

    minXSpeed: 0.4,
    maxXSpeed: 0.1,

    minYSpeed: 0.5,
    maxYSpeed: 0.2,

    minSize: 0.5,
    maxSize: 1.5,

    zIndex: 5,

    particleColor: "rgba(0,0,0,0.5)",

    strokeColor: null,

    strokeWidth: 2,

    amount:50,

    autoStart:true,
    

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
        particleStorm.state = "pause";
    },

    // EVENT HANDLERS
    resizeHandler: ()=>{document.getElementById("particleCanvas").height = window.innerHeight;document.getElementById("particleCanvas").width = window.innerWidth;},


    
    randInt: (min,max)=>{return (Math.round(Math.random() * (max-min) + min))},
    randNum: (min,max)=>{return (Math.random() * (max-min) + min)},
    state: "off",
    particles: [],
    setup: ()=>{
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
    
        // populate particles
        
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
            let particleLength = particleStorm.particles.length;
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

                    //    pick top/right/bottom/left aka 1/2/3/4
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

if(particleStorm.autoStart){particleStorm.state="on";particleStorm.setup();}
