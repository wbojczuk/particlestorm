document.getElementById("startButton").onclick = ()=>{particleStorm.start();};
document.getElementById("stopButton").onclick = ()=>{particleStorm.stop();};
document.getElementById("pauseButton").onclick = ()=>{particleStorm.pause();};
document.getElementById("resumeButton").onclick = ()=>{particleStorm.resume();};

document.getElementById("xMinSpeed").value = particleStorm.minXSpeed;
document.getElementById("xMaxSpeed").value = particleStorm.maxXSpeed;
document.getElementById("yMinSpeed").value = particleStorm.minYSpeed;
document.getElementById("yMaxSpeed").value = particleStorm.maxYSpeed;
document.getElementById("minSize").value = particleStorm.minSize;
document.getElementById("maxSize").value = particleStorm.maxSize;
document.getElementById("color").value = particleStorm.particleColor;

document.getElementById("submitColor").onclick = ()=>{
    particleStorm.particleColor = document.getElementById("color").value;
};

document.getElementById("submitXSpeed").onclick = ()=>{
    particleStorm.minXSpeed = parseFloat(document.getElementById("xMinSpeed").value);
    particleStorm.maxXSpeed = parseFloat(document.getElementById("xMaxSpeed").value);

    particleStorm.stop();
    setTimeout(particleStorm.start,20)
    
};

document.getElementById("submitYSpeed").onclick = ()=>{
    particleStorm.minYSpeed = parseFloat(document.getElementById("yMinSpeed").value);
    particleStorm.maxYSpeed = parseFloat(document.getElementById("yMaxSpeed").value);

    particleStorm.stop();
    setTimeout(particleStorm.start,20)
};

document.getElementById("submitSize").onclick = ()=>{
    particleStorm.minSize = parseFloat(document.getElementById("minSize").value);
    particleStorm.maxSize = parseFloat(document.getElementById("maxSize").value);

    particleStorm.stop();
    setTimeout(particleStorm.start,20)
};