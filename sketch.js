var boy,road, girl;
var boyStand, boyWalk, roadImg;
var girlStand, girlWalk;
var truck, truckImg;
var truckG;
var restart, restartImg;
var gameOver, overImg;
var car, carGroup;
var blueImg,redImg,whiteImg,darkImg;
var invisibleBlock1, invisibleBlock2;

var gameState = "PLAY";

var score = 0;

function preload(){
  boyStand = loadAnimation("blondstand.png");
  boyWalk = loadAnimation("blondwalk1.png", "blondwalk2.png");
  girlStand = loadAnimation("brownstand.png");
  girlWalk = loadAnimation("brownwalk1.png", "brownwalk2.png");
  roadImg = loadImage("road.png");
  truckImg = loadImage("truck.png");
  
  restartImg = loadImage("restart.png");
  overImg = loadImage("gameover.png");
  
  redImg = loadImage("redcar.png");
  blueImg = loadImage("bluecar.png");
  whiteImg = loadImage("whitecar.png");
  darkImg = loadImage("darkbluecar.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  road = createSprite(windowWidth/2,windowHeight/2);
  road.addImage(roadImg);
  
  
  boy = createSprite(windowWidth/2-450,windowHeight/2+470);
  boy.addAnimation("standing",boyStand);
  boy.scale = 1;
  boy.velocityY = 0;
  
  boy.addAnimation("walking", boyWalk);
  
  girl = createSprite(windowWidth/2+450,windowHeight/2+460);
  girl.addAnimation("standing", girlStand);
  girl.scale = 1;
  girl.velocityY = 0;
  
  girl.addAnimation("walking", girlWalk);
  
  truckG = new Group();
  carGroup = new Group();
  
  girl.setCollider("rectangle",0,0,160,100);
  // girl.debug = true;
  boy.setCollider("rectangle",0,-15,160,100);
  // boy.debug = true;
  
  restart = createSprite(200,340);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  // restart.depth = 2;
  
  gameOver = createSprite(200,160);
  gameOver.addImage(overImg);
  gameOver.scale = 0.2;
  // gameOver.depth = 5w
  
  invisibleBlock1 = createSprite(windowWidth/2,windowHeight/2+520,2000,10);
  // invisibleBlock1.visible = true;
  
  invisibleBlock2 = createSprite(windowWidth/2,windowHeight/2-520,2000,10);
  invisibleBlock2.visible = true;
}

function draw() {
 
  background(0);
  
  // console.log("game : " + gameOver.depth);
  
  if(gameState === "PLAY"){
    
    restart.visible = false;
    gameOver.visible = false;    
        
    if(keyDown("W")){
       boy.changeAnimation("walking", boyWalk);
       boy.velocityY = -3;
    }
    else{
      boy.changeAnimation("standing",boyStand);
      boy.velocityY = 0;
    }
    if(keyDown("S")){
       boy.changeAnimation("walking", boyWalk);
       boy.velocityY = 3;
     }

    if(keyDown("UP_ARROW")){
       girl.changeAnimation("walking", girlWalk);
       girl.velocityY = -3;
    }
    else{
      girl.changeAnimation("standing", girlStand);
      girl.velocityY = 0;
    }
    if(keyDown("DOWN_ARROW")){
       girl.changeAnimation("walking", girlWalk);
       girl.velocityY = 3;
     }
    
    if(girl.isTouching(invisibleBlock2) && boy.isTouching(invisibleBlock2)){
        boy.y = windowHeight/2+470;
        girl.y = windowHeight/2+460; 
      
      score++
    }
      
    if(truckG.isTouching(girl) || truckG.isTouching(boy) || carGroup.isTouching(boy) || carGroup.isTouching(girl)){
      gameState = "OVER";
      
      truckG.setLifetimeEach(-1);
      carGroup.setLifetimeEach(-1);
    }
        
    createTruck();
    spawnCar();
  }
  else if (gameState === "OVER"){
    truckG.setVelocityXEach(0);
    carGroup.setVelocityXEach(0);   
    
    boy.velocityY = 0;
    girl.velocityY = 0;
    girl.changeAnimation("standing", girlStand);
    boy.changeAnimation("standing", boyStand);
    
    restart.visible = true; 
    gameOver.visible = true; 
    
    if(mousePressedOver(restart)){
      reset();
    }

  }
  
  girl.collide(invisibleBlock1);
  boy.collide(invisibleBlock1);
  girl.collide(invisibleBlock2);
  boy.collide(invisibleBlock2);
  
  drawSprites();
  text("score : " + score, 180, 390);
}

function createTruck(){
  if(frameCount % 340 === 0){
  truck = createSprite(windowWidth/2+1500,windowHeight/2+200);
  truck.addImage(truckImg);
  truck.velocityX = -3;  
  truck.lifetime = 1500;  
  truck.scale = 2
  truckG.add(truck); 
  // truck.debug = true;
  truck.setCollider("rectangle",0,11,250,110);
}
}

function reset(){
  boy.x = windowWidth/2-450;
  boy.y = windowHeight/2+470;
  
  girl.x = windowWidth/2+450;
  girl.y = windowHeight/2+460; 
  
  truckG.destroyEach();
  carGroup.destroyEach();
  
  score = 0;

  gameState = "PLAY";
}

function spawnCar(){
 if (frameCount % 250 === 0){
   var car = createSprite(-100,windowHeight/2-300);
   car.velocityX = 3;
   
    //generate random cars
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: car.addImage(redImg);
              break;
      case 2: car.addImage(blueImg);
              break;
      case 3: car.addImage(whiteImg);
              break;
      case 4: car.addImage(darkImg);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    car.scale = 1.7;
    car.lifetime = 800;
   
   //add each obstacle to the group
    carGroup.add(car);
    carGroup.setColliderEach("rectangle", -10,10,180,80);
    // car.debug = true;
   

 }
}

