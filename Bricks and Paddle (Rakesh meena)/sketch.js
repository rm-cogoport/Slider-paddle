//Ball properties.....
let ball_x,ball_y,ball_dx,ball_dy,ball_radius;

//paddle properties....
let paddle_x,paddle_y,paddle_width_paddle_height,paddle_dx;

//brick properties......
let brick_width, brick_height,brick_x,brick_y;

//scores and lives 
let scores,lives;

//grid........
let grid=[];

//boolean variable......
let b;

function setup() {
  createCanvas(400, 400);
  paddle_x = (width/2)-80/2;
  paddle_y = height-20;
  paddle_height = 15;
  paddle_width=80;
  paddle_dx=3;
  
  ball_radius=20;
  ball_x = width/2;
  ball_y = paddle_y-(ball_radius/2);
  ball_dx=1.8;
  ball_dy=1.8;
  
  brick_width = 72;
  brick_height = 30;
  scores=0;
  lives=3;
  b = true;
  
  for(var i=0;i<=4;i++){
    let row =[];
    for(var j=0; j<=4 ; j++){
      row.push({x : (i*80) + 4, y : (j*35) + 35 ,w: 72 ,h: 30,v:true });
    }
    grid.push(row);
  } 
}

function draw () {
  background("rgb(43,37,37)");
  
  ball_x-=ball_dx;
  ball_y-=ball_dy;
  
  if(keyIsDown(RIGHT_ARROW)){
    paddle_x+=paddle_dx;
  }
  if(keyIsDown(LEFT_ARROW)){
    paddle_x-=paddle_dx;
  }
  
  
  fill("rgb(98,98,178)");
  circle(ball_x,ball_y,20);
  fill("rgb(97,97,143)");
  rect(paddle_x,paddle_y,paddle_width,paddle_height);
  
  //Canvas left and right sections....
  if(ball_x + (ball_radius/2)>width || ball_x - (ball_radius/2)<0){
    ball_dx = - ball_dx;  
  }
  
  //Canvas bottom section.....
  if(ball_y + (ball_radius/2)>=height){
    ball_dy = -ball_dy
    if(lives!==0){
      lives = lives - 1;
    }
    if(lives===0){
      ball_dx = 0;
      ball_dy = 0;
      ball_y = height - ball_radius/2;
      fill("rgb(229,229,240)")
      text("GAME OVER",(width/2)-50,(height/2+20))
    }
  }
  
  //Canvas top section....
   if(ball_y-ball_radius/2<0){
     ball_dy=-ball_dy;
  }
  
  //Ball hits on paddle
  if(ball_y + (ball_radius/2)>paddle_y && ball_x+(ball_radius/2) > paddle_x && ball_x-(ball_radius/2) < paddle_x + paddle_width){
     if(b==true){
       ball_dy=-ball_dy
       b = false;
     }
}
  else{
    b = true;
  }
  
  //Paddle left boundary condition.......
  if(paddle_x < 0){
    paddle_x=0;
  }
  //paddle right boundary condition.......
  if(paddle_x + paddle_width >width){
    paddle_x = width - paddle_width;
  }
  
  for(var i=0;i<=4;i++){
    for(var j=0;j<=4;j++){
      fill("firebrick")
      rect(grid[i][j].x,grid[i][j].y,grid[i][j].w,grid[i][j].h);
      
      if(ball_x-(ball_radius/2) < grid[i][j].x + grid[i][j].w &&
        ball_y > grid[i][j].y && ball_y <grid[i][j].y + grid[i][j].h && ball_x + (ball_radius/2) > grid[i][j].x){
        ball_dx = -ball_dx;
        scores++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
      
       if(ball_y-(ball_radius/2) < grid[i][j].y + grid[i][j].h &&
        ball_x > grid[i][j].x && ball_x <grid[i][j].x + grid[i][j].w && ball_y + (ball_radius/2) > grid[i][j].y){
        ball_dy = -ball_dy;
        scores++;
        grid[i][j].h=0;
        grid[i][j].w=0;
      }
      
    }
  }
  
  
  //Adding socres and lives.........
  fill("rgb(138,78,78)")
  text(`Score : ${scores}`, width-100, 20);
    text(`Lives : ${lives}`, 50, 20);
  
  if(scores === (grid.length*grid[0].length) ){
    ball_dx=0;
    ball_dy=0;
    fill("rgb(229,229,240)")
    text(`CONGRATULATION! YOU WON`, (width/2)-103,(height/2));
  }
   
}