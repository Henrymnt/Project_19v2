var runner, dog, runnerImg, dogImg, runner2Img;
var bg, bgImg
var rock, rockImg, rockGroup
var barrier, barrierGroup
var invisibleGround
var gamestate = "START";
var score = 0

function preload(){
runnerImg = loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png")
dogImg = loadAnimation("dog1.png","dog2.png","dog3.png","dog4.png","dog5.png","dog6.png","dog7.png","dog8.png")
bgImg = loadImage("City_NOCOPY.jpg")
rockImg = loadImage("Rock_NOCOPY.png")
runnerStopImg = loadImage("run4.png")
}
function setup() {
createCanvas(500,500)

bg = createSprite(250,250)
bg.x=bg.width/2+150
bg.addAnimation("bg",bgImg)
bg.scale=1.5
bg.depth=0
bg.velocityX=-4

runner = createSprite(200,400) 
runner.addAnimation("runner",runnerImg)
runner.scale=0.25
runner.depth=5
runner.debug = true
runner.setCollider("rectangle",0,0,250,400)

dog = createSprite(75,420) 
dog.addAnimation("dog",dogImg)
dog.scale=0.25
dog.depth=5

invisibleGround = createSprite(200,460,700,2)
invisibleGround.visible = false

rockGroup=createGroup();
barrierGroup=createGroup();


}


function draw() {

runner.velocityY = runner.velocityY + 0.5  
dog.velocityY = dog.velocityY + 0.5   
    
runner.collide(invisibleGround) 
dog.collide(invisibleGround)  

if(gamestate == "END"){
    bg.destroy();
    dog.destroy()
    runner.destroy()
    rockGroup.destroyEach();
    barrierGroup.destroyEach();
    background(0)
    textSize(20)
    text("You Lose",200,250)
}


if(gamestate == "PLAY"){

    runner.visible=true
        dog.visible=true

    bg.velocityX=-4

    if (bg.x < 0){
        bg.x = bg.width/2;
        }
    if(keyDown("space")&&runner.y>390){
        runner.velocityY=-12
    }
    if(dog.isTouching(rockGroup)){
        dog.velocityY=-14
    }
    if(frameCount%120==0){
        spawnRocks();
    }
    if(runner.collide(barrierGroup)){
            gamestate = "END"  
        }
    score=score+frameCount/12
    text(score,100,100)
        
}


    drawSprites();

    fill("gray");
    textSize(20)
    text("Score: "+ Math.round(score),50,50)

    if(gamestate == "START"){
        bg.velocityX=0
        fill("black")
        runner.visible=false
        dog.visible=false
      text("Press space bar to start",150,100) 
        if(keyDown("space")){
        gamestate="PLAY"
        }    
    }
}
function spawnRocks(){
    rock = createSprite(random(520,700),430)
    rock.addImage("rock",rockImg)
    rock.velocityX=-4
    rock.scale=0.2
    rock.depth=runner.depth-1
    rock.depth=dog.depth-1
    rock.lifetime=300
    rockGroup.add(rock)
    barrier = createSprite(rock.x,rock.y,20,20)
    barrier.velocityX=-4
    barrier.lifetime=300
    barrierGroup.add(barrier)
    barrier.visible = false
    barrier.debug = true
}
