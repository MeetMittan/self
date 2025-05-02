"use strict"


const canvas = document.querySelector("#canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas.style.background = "aqua";
const context = canvas.getContext("2d");
canvas.style.backgroundImage = "url('images/bac.png')";
canvas.style.backgroundSize = "cover";
//PLAYER CREATION CLASS

let offset = 0;

let gravity = 0.5;


class player {
    constructor() {
        this.position = { x: 100, y: 100 };
        this.velocity = { x: 0, y: 1 };
        this.width = 40;
        this.height = 40;

    }
    draw() {






        context.fillStyle = "red";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {


        if ((this.position.y + this.height + this.velocity.y) >= canvas.height + 60) {
            this.velocity.y = 0;
            alert("game over");
            window.location.reload();
        }
        else
            this.velocity.y += gravity;



        for (let i = 0; i < platformsArray.length; i++) {
            if ((this.position.x + this.velocity.x + this.width >= platformsArray[i].position.x - 6)
                && (this.position.x + this.velocity.x <= (platformsArray[i].position.x + platformsArray[i].width))
                && ((this.position.y + this.height + this.velocity.y) >= platformsArray[i].position.y)
                && (this.position.y + this.velocity.y <= (platformsArray[i].position.y + 10)))
                this.velocity.y = 0;

        

        if ((this.position.x + this.width >= platformsArray[i].position.x) &&
            (this.position.x <= platformsArray[i].position.x + platformsArray[i].width) &&
            (this.position.y + this.height + this.velocity.y >= platformsArray[i].position.y) &&
            (this.position.y + this.velocity.y + this.height <= platformsArray[i].position.y + platformsArray[i].height)) 
            this.velocity.x = 0;
            }
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.draw();
    
            
    

    }}





class platforms {
    constructor(x, y, width, height,image) {
        this.position = { x: x, y: y };
        this.width = width;
        this.height = height;
        this.image=image;
    }

    draw() {
         let platformsimg = new Image();
        //  platformsimg.src = "images/platform.png";
        // context.drawImage(platformsimg, this.position.x, this.position.y, this.width, this.height);
       // context.fillStyle = "blue";
        context.drawImage( this.image,0,0,this.image.width,this.image.height,this.position.x, this.position.y, this.width, this.height);
    }
}




class hillsImg {

    constructor(x, y) {
        this.position = { x: 0, y: 0};

    }

    draw() {
        let hillsimg = new Image();
        hillsimg.src = "images/hills.png";
        context.drawImage(hillsimg, this.position.x, this.position.y);
    }
}


const hills = new hillsImg();



let platformsArray = [];
let first=new Image();
let second=new Image();
first.src="images/platform.png";
second.src="images/platformSmallTall.png";
let platform = new platforms(0,500, 600, 150, first);
let platform1 = new platforms(platform.width-4,500,600,150, first);
let platform2 = new platforms(platform.width*2+80, 450, 300,second.width, second);
let platform3 = new platforms(platform.width*3-80,500,600,150, first);

platformsArray.push(platform);
platformsArray.push(platform1);
platformsArray.push(platform2);
platformsArray.push(platform3);

let players = new player();

function gameAnimation() {
    requestAnimationFrame(gameAnimation);
    context.clearRect(0, 0, canvas.width, canvas.height);
   
hills.draw();
    //players.draw();
    for (let i = 0; i < platformsArray.length; i++) {
        platformsArray[i].draw();
    }
    players.update();
    players.draw();
    

}
gameAnimation();

addEventListener("keydown", function (e) {
    if (e.key == "ArrowRight") {

        players.velocity.x = 5;
        if (players.position.x + players.width > 400) {
            moveOffset(-5);
           
            if(players.position.x+players.width>=450){
               players.velocity.x=0;
            
        }
        }



    } else if (e.key === "ArrowLeft") {

        
            players.velocity.x = -5;
        
        if (players.position.x + players.width <= 600) {
            moveOffset(5);
            

        }
    }
    if (e.key === "ArrowUp") {
        // if (players.position.y + players.height > canvas.height - 10)
        players.velocity.y = -14;


    }

});

addEventListener("keyup", function (e) {
    if (e.key == "ArrowRight") {
        players.velocity.x = 0;


    } if (e.key == "ArrowLeft") {
        players.velocity.x = 0;


    }
    if (e.key == "ArrowUp") {
        players.velocity.x = 0;


    }
})
    ;

function moveOffset(x) {
    offset = x;
hills.position.x += x;
    for (let i = 0; i < platformsArray.length; i++) { platformsArray[i].position.x += x; }
}

