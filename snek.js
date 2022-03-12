
let lastframetime =0

let snekspeed=10 //how many tiles does snake travel per second

const snekfragments= [{x: 10, y: 10}]//table of x and y positions of snake body

const applepos= {x: 5, y: 5}

const board = document.getElementById("board")

let direction = {x: 0, y: 1}

let appleeaten = false

let prevdir = {x: 0, y: 0}

function main(currenttime){
    window.requestAnimationFrame(main)
    const howlong=(currenttime-lastframetime)/1000
    //check if there should be a update - time since last update is bigger than supposed time
    if(howlong<1/snekspeed)return
    lastframetime=currenttime
    draw()
    try{
        checkifgameover()
        }
        catch{
            window.location.reload()
        }
    update()
    checkifappleeaten()
}
//check if snake head touched borders or it's body
function checkifgameover(){
if(snekfragments[0].x==0||snekfragments[0].x==21||snekfragments[0].y==0||snekfragments[0].y==21){
    throw "gameover"
}
for(var i = 1; i<snekfragments.length; i++){
    if(comparevectors(snekfragments[0],snekfragments[i]))throw "gameover"
}
}
//draw all the elements in corresponding grid fragment
function draw(){
    
    board.innerHTML=''
const japko =document.createElement('div')
japko.style.gridRowStart =applepos.y
japko.style.gridColumnStart =applepos.x
japko.classList.add('apple')
board.appendChild(japko)
snekfragments.forEach(segment=>{
    const element=document.createElement('div')
    element.style.gridRowStart=segment.y
    element.style.gridColumnStart=segment.x
    element.classList.add('snake')
    board.appendChild(element)
})

}
function update(){
    //used in keylistener
    prevdir.x=direction.x
    prevdir.y=direction.y
    var lastsegpos={x: snekfragments[snekfragments.length-1].x, y: snekfragments[snekfragments.length-1].y}
    for(var i =snekfragments.length-1; i>=1; i--){
        //change every n'th snake fragment pos to be n-1 pos so snake will be moving
        snekfragments[i].x=snekfragments[i-1].x
        snekfragments[i].y=snekfragments[i-1].y
        
    }
    //if applewaseaten create new segment on last segment position
    if(appleeaten){
         snekfragments.push(lastsegpos)
       appleeaten=false
    }
    //move head 
    snekfragments[0].x+=direction.x
    snekfragments[0].y+=direction.y
}

function checkifappleeaten(){
    let goodposition = false;
    //if snake head pos is on apple pos that means he is going to eat it
    if(comparevectors(snekfragments[0],applepos)){
        appleeaten=true;
        //spawning new apple but in a way it doesn't spawn on snake body
        while(true){
            goodposition=true;
            applepos.x=Math.floor(Math.random()*19)+1
            applepos.y=Math.floor(Math.random()*19)+1
            snekfragments.forEach(element => {
                if(comparevectors(element,applepos)){
                    goodposition=false;
                }
            });
            if(goodposition)break;
            
        }
    }
}
//simple functioo to compare to vectors  
function comparevectors(pos1, pos2){
    return (pos1.x===pos2.x&&pos1.y===pos2.y)
}


window.requestAnimationFrame(main)
//check for keypresses and then change direction snake shall be going
window.addEventListener("keydown", key =>{
    
    switch(key.key)
    {
        case 'ArrowUp':
            direction.x=0
            direction.y=-1
        break;
        case 'w':
            direction.x=0
            direction.y=-1
        break;
        case 'ArrowDown':
            direction.x=0
            direction.y=1
        break;
        case 's':
            direction.x=0
            direction.y=1
        break;
        case 'ArrowLeft':
            direction.x=-1
            direction.y=0
        break;
        case 'a':
            direction.x=-1
            direction.y=0
        break;
        case 'ArrowRight':
            direction.x=1
            direction.y=0
        break;
        case 'd':
            direction.x=1
            direction.y=0
        break;
    }
    let check = {x: prevdir.x+direction.x, y: prevdir.y+direction.y}
    //check is just sum of two vectors the direction snake was going in last update func and direction 
    //players wants snake to go if the vector is 0 that means the vectors face the opposite way since they never will
    //be equal 0,0, if so don't change the player direction
    //I don't want snake to move backwards it will just be game over immediatly
    if(check.x===0 && check.y ===0)
    {
     direction.x=prevdir.x
     direction.y=prevdir.y
    }
})