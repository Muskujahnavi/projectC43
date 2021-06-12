var backImage,backgr;
var player, player_running;
var ground,ground_img;
var gameOverImg,bananaImg;
var stoneImg, gameOver;
var banana,obstacle;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;
var FoodGroup,obstaclesGroup;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  gameOverImg = loadImage("gameOver.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);

  //making groups for bananas and obstacles
    obstaclesGroup = createGroup();
    FoodGroup = createGroup();  

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  // gameOver = createSprite(400,150);
  // gameOver.addImage(gameOverImg);
  // gameOver.scale = 0.5;
  
}

function draw() { 
  background(0);  

  drawSprites();

  textSize(20);
  text("Score:"+score,650,50);

  if(gameState===PLAY) {
    //gameOver.visible = false; 

    if(backgr.x<100){
      backgr.x=backgr.width/2;

    }
   
   
    
    if(player.isTouching(FoodGroup)){
        FoodGroup.destroyEach();
        score = score +2;
        player.scale+=0.01;
        
      }

      if(keyDown("space")){
        player.velocityY=-12;      
      }
      player.velocityY=player.velocityY+0.8;
      player.collide(ground);
      Foods();
      obstacles();

      if(obstaclesGroup.isTouching(player)){
        gameState = END;
      }
    }
        else if(gameState===END){
          //gameOver.visible = true;
        player.visible =false;
        backgr.velocityX = 0;
        obstaclesGroup.setVelocityXEach();
        FoodGroup.setVelocityXEach();
        textSize(30);
        text("GAME OVER",300,200);
        }
        
        // obstaclesGroup.setLifetimeEach(-1);
        // FoodGroup.setLifetimeEach(-1);
     
    
 
}

function Foods(){
  if(frameCount % 80===0){
   banana = createSprite(600,300,40,10);         
   banana.y = random(120,200);
   banana.addImage(bananaImg);   
   banana.scale = 0.05;
   banana.velocityX=-4;
   banana.lifetime = 300;
   player.depth=banana.depth+1;
   FoodGroup.add(banana);
   }
} 
function obstacles(){
if(frameCount % 300===0)
{
  obstacle = createSprite(800,350,10,40);
  obstacle.addImage(stoneImg);
  obstacle.velocityX =-(4+2*score/100);
  obstacle.scale = 0.3; 
  obstacle.lifetime = 300;
  obstaclesGroup.add(obstacle);
} 
} 