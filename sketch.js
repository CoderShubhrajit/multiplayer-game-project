var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allplayers;
var distance = 0;
var database;

var road,roadImg;
var player,plImg,plImg2,plImg3,plImg4,plImg5,plImg6;
var mud,mudImg;
var npc,img1,img2,img3,img4,img5,img6,img7,img8;
var npcGroup,mudGroup,quizGroup,YGroup,NGroup;
var setImg,giveQue;
var pavement1,pavement2;
var score = 0;
var lifeline = 5;
var visible;
var quiz;
var que;
var c,r1,r2,r3,e1,e2,e3,g1,g2,g3;
var destroyer;
var op1,op2;
var i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18;
var quizEnable = "yes";
var trans = 255;
var feedback1,feedback2,feedback3;

var form, player, game;

var cars, car1, car2, car3, car4;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("../images/track.jpg");
  roadImg = loadImage("images/track.png");
  feedback1 = loadImage("questions/feedback_1.png");
  feedback2 = loadImage("questions/feedback_2.png");
  feedback3 = loadImage("questions/feedback_3.png");
  mudImg = loadImage("images/mud.png");
  plImg = loadImage("imgs/vehicle1_2.png");
  plImg2 = loadImage("imgs/vehicle2_2.png");
  plImg3 = loadImage("imgs/vehicle3_2.png");
  plImg4 = loadImage("imgs/vehicle4_2.png");
  plImg5 = loadImage("imgs/vehicle5_2.jpg");
  plImg6 = loadImage("imgs/vehicle6_2.png");
  img1 = loadImage("imgs/npc1.png");
  img2 = loadImage("imgs/npc2.png");
  img3 = loadImage("imgs/npc3.png");
  img4 = loadImage("imgs/npc4.png");
  img5 = loadImage("imgs/npc5.png");
  img6 = loadImage("imgs/npc6.png");
  img7 = loadImage("imgs/npc7.png");
  img8 = loadImage("imgs/npc8.png");
  c = loadImage("questions/caution.png");
  r1 = loadImage("questions/riddle_1.png");
  r2 = loadImage("questions/riddle_2.png");
  r3 = loadImage("questions/riddle_3.png");
  e1 = loadImage("questions/math_equation_1.png");
  e2 = loadImage("questions/math_equation_2.png");
  e3 = loadImage("questions/math_equation_3.png");
  g1 = loadImage("questions/gk_1.png");
  g2 = loadImage("questions/gk_2.png");
  g3 = loadImage("questions/gk_3.png");
  i1 = loadImage("questions/op_eq_1_1.png");
  i2 = loadImage("questions/op_eq_1_2.png");
  i3 = loadImage("questions/op_eq_2_1.png");
  i4 = loadImage("questions/op_eq_2_2.png");
  i5 = loadImage("questions/op_eq_3_1.png");
  i6 = loadImage("questions/op_eq_3_2.png");
  i7 = loadImage("questions/op_gk_1_1.png");
  i8 = loadImage("questions/op_gk_1_2.png");
  i9 = loadImage("questions/op_gk_2_1.png");
  i10 = loadImage("questions/op_gk_2_2.png");
  i11 = loadImage("questions/op_gk_3_1.png");
  i12 = loadImage("questions/op_gk_3_2.png");
  i13 = loadImage("questions/op_ri_1_1.png");
  i14 = loadImage("questions/op_ri_1_2.png");
  i15 = loadImage("questions/op_ri_2_1.png");
  i16 = loadImage("questions/op_ri_2_2.png");
  i17 = loadImage("questions/op_ri_3_1.png");
  i18 = loadImage("questions/op_ri_3_2.png");
  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();

    image(roadImg,0,-displayHeight*20,displayWidth,displayHeight*210);
  camera.y = cars[index - 1].y-200;

  destroyer = createSprite(displayWidth/2,cars[index - 1].y + 100,displayWidth,20); 
  destroyer.visible = false;

  spawnQuiz();

  if(cars[index - 1].isTouching(YGroup) )
{
  score=score+25;
 destroyQuery();
}
if(cars[index - 1].isTouching(NGroup)  )
{
  score=score-20;
  
  destroyQuery();
}
  
  if(keyDown("right")){
    cars[index - 1].x = cars[index - 1].x+5;
  }

  if(keyDown("left")){
    cars[index - 1].x = cars[index - 1].x-5;
  }

  if(keyDown("up")){
    cars[index - 1].y = cars[index - 1].y-5;
    spawnMud();
    spawnNPCs();
  }

  if(keyDown("down")){
    cars[index - 1].y = cars[index - 1].y+2;
  }

  if(cars[index - 1].isTouching(mudGroup)){
    score -= 30;
    mudGroup.destroyEach();
  }

  if(score >= 100){
    cars[index - 1].addImage(plImg2);
    cars[index - 1].scale = 0.4;
  }

  if(score >= 200){
    cars[index - 1].addImage(plImg3);
    cars[index - 1].scale = 0.6;
  }

  if(score >= 300){
    cars[index - 1].addImage(plImg4);
    cars[index - 1].scale = 0.75;
  }

  if(score >= 400){
    cars[index - 1].addImage(plImg5);
    cars[index - 1].scale = 0.4;
  }

  if(score >= 500){
    cars[index - 1].addImage(plImg6);
    cars[index - 1].scale = 2.0;
    camera.y = cars[index - 1].y;
  }

  if(npcGroup.isTouching(cars[index - 1])){
    score = score - 20;
    npcGroup.destroyEach();
    lifeline -= 1;
  }

  if(npcGroup.isTouching(destroyer)){
    npcGroup.destroyEach();
    score = score + 10;
  }

  cars[index - 1].collide(pavement1);
  cars[index - 1].collide(pavement2);

  drawSprites();

  textSize(25);
  fill("White");
  text("Score : "+score,10,cars[index - 1].y - 250);
  text("Lifelines : "+lifeline,10,cars[index - 1].y - 200);

    function spawnMud(){
      if(frameCount % 600 === 0){
        mud = createSprite(random(250,displayWidth-250),cars[index - 1].y - 500);
        mud.addImage(mudImg);
        mud.scale = 0.3;
        mud.y = mud.y + 5;
        mud.depth = cars[index - 1].depth-1; 
        mudGroup.add(mud);
      }
    }
    
    function spawnNPCs(){
      if(frameCount % 200 === 0){
        npc = createSprite(random(250,displayWidth-250),cars[index - 1].y - 500);
        npc.velocityY = 3.5;
        setImg = Math.round(random(1,8));
        switch(setImg){
          case 1 : npc.addImage(img1);
          break;
          case 2 : npc.addImage(img2);
          break;
          case 3 : npc.addImage(img3);
          break;
          case 4 : npc.addImage(img4);
          break;
          case 5 : npc.addImage(img5);
          break;
          case 6 : npc.addImage(img6);
          break;
          case 7 : npc.addImage(img7);
          break;
          case 8 : npc.addImage(img8);
          break;
          default : break;
          }
          npc.scale = 0.8;
          npcGroup.add(npc);
      }
    }
    
    
    function destroyQuery(){
      que.destroy();
      op1.destroy();
      op2.destroy();
    }
    
    function spawnQuiz()
    {
    
      if(frameCount===400){
      que = createSprite(displayWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
    
            que.addImage(r1);
            op1.addImage(i13);
            op2.addImage(i14);  
    
            quizGroup.add(que);
            YGroup.add(op2);
            NGroup.add(op1);
      }
     else if (frameCount===800)
     {
            que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
          op1 = createSprite(displayWidth/2-70,camera.y-330);
          op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(r2);
            op1.addImage(i15);
            op2.addImage(i16);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===1200)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(r3);
            op1.addImage(i17);
            op2.addImage(i18);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===1600)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(e1);
            op1.addImage(i1);
            op2.addImage(i2);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===2000)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(e2);
            op1.addImage(i3);
            op2.addImage(i4);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===2400)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(e3);
            op1.addImage(i5);
            op2.addImage(i6);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===2800)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(g1);
            op1.addImage(i7);
            op2.addImage(i8);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===3200)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(g2);
            op1.addImage(i9);
            op2.addImage(i10);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      else if (frameCount===3600)
      {
        que = createSprite(displayWidth/2,camera.y-500);
          giveQue = Math.round(random(1,9));
    
      op1 = createSprite(displayWidth/2-70,camera.y-330);
      op2 = createSprite(displayWidth/2+70,camera.y-330);
            que.addImage(g3);
            op1.addImage(i11);
            op2.addImage(i12);
            quizGroup.add(que);
            YGroup.add(op1);
            NGroup.add(op2);
      }
      }
  }
  if(gameState === 2){
    game.end();
  }
}