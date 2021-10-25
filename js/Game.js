class Game 
{
  constructor(){}

  getState()
  {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){gameState = data.val();})
  }

  update(state)
  {
    database.ref('/').update({gameState: state});
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    //Add car1 image
    car1.addImage("car1",carImg1)
    car2 = createSprite(300,200);
   //Add car1 image
    car2.addImage("car2",carImg2)
    car3 = createSprite(500,200);
    //Add car1 image
    car3.addImage("car3",carImg3)
    car4 = createSprite(700,200);
    //Add car1 image
    car4.addImage("car4",carImg4)
    cars = [car1, car2, car3, car4];
  }

  play()
  {
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined)
    {
      background(rgb(198,135,103));
      //Add track image
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      var index = 0;

     //change the value of x position to align the cars properly on the track and the screen
      var x = 330;

      var y;

      for(var plr in allPlayers)
      {
        
        index = index + 1 ;


        x = x + 260 ;
        
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index)
        {
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null)
    {
      player.distance +=10;
      //Write code to check the distance when UP Arrow key is pressed
     console.log(player.distance);
      player.update();
    }
    //Write if condition to change the gamestate to 2 (END) when player reaches to  finish line
    if(player.distance>5200){
      gameState = 2;
    }
    drawSprites();
  }
  //Declare end function to display Game End in the console.
  end(){
    console.log("game end")
  }
}
