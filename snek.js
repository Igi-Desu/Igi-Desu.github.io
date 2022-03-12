let lastframetime =0
let snekspeed=10 //how many tiles does snake travel per second
const snekfragments= [{x: 10, y: 10}]
const applepos= {x: 5, y: 5}
const board = document.getElementById("board")
let direction = {x: 0, y: 1}
let appleeaten = false
let prevdir = {x: 0, y: 0}
function main(currenttime){
    window.requestAnimationFrame(main)
    const howlong=(currenttime-lastframetime)/1000
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
//powierkszanie weza - jesli zje jablko ustaw bool jakis na true i przy nastepnym update po zmianie pozycji wszystkich segmentow
//pushnij do tablicy nowy na pozycji ostatniego segmentu przed zmiana
function checkifgameover(){
if(snekfragments[0].x==0||snekfragments[0].x==21||snekfragments[0].y==0||snekfragments[0].y==21){
    throw "gameover"
}
for(var i = 1; i<snekfragments.length; i++){
    if(comparepos(snekfragments[0],snekfragments[i]))throw "gameover"
}
}

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
    prevdir.x=direction.x
    prevdir.y=direction.y
    var lastsegpos={x: snekfragments[snekfragments.length-1].x, y: snekfragments[snekfragments.length-1].y}
    for(var i =snekfragments.length-1; i>=1; i--){
        snekfragments[i].x=snekfragments[i-1].x
        snekfragments[i].y=snekfragments[i-1].y
        
    }
    if(appleeaten){
         snekfragments.push(lastsegpos)
       appleeaten=false
    }
    snekfragments[0].x+=direction.x
    snekfragments[0].y+=direction.y
}

function checkifappleeaten(){
    let bool = false;
    if(comparepos(snekfragments[0],applepos)){
        console.log("Zjadlem japko")
        appleeaten=true;
        //snekfragments.push(snekfragments[snekfragments.length-1].x,snek)
        while(true){
            bool=false;
            applepos.x=Math.floor(Math.random()*19)+1
            applepos.y=Math.floor(Math.random()*19)+1
            snekfragments.forEach(element => {
                if(comparepos(element,applepos)){
                    bool=true;
                }
            });
            if(!bool)break;
            
        }
        console.log(applepos)
    }
}

function comparepos(pos1, pos2){
    return (pos1.x===pos2.x&&pos1.y===pos2.y)
}


window.requestAnimationFrame(main)
window.addEventListener("keydown", key =>{
    
    switch(key.key)
    {
        case 'ArrowUp':
        direction.x=0
        direction.y=-1
        break;
        case 'ArrowDown':
        direction.x=0
        direction.y=1
        break;
        case 'ArrowLeft':
            direction.x=-1
            direction.y=0
        break;
        case 'ArrowRight':
            direction.x=1
            direction.y=0
        break;
    }
    let check = {x: prevdir.x+direction.x, y: prevdir.y+direction.y}
  //  console.log(check)
    if(check.x===0 && check.y ===0)
    {
     direction.x=prevdir.x
     direction.y=prevdir.y
    }
})