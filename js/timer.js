var currentblock= 0;
function getEndBlock(){
  function normalDay(today){
    var deadline = new Date();
    if(((today.getHours() === 7) && (today.getMinutes() >= 45)) || ((today.getHours() === 8) && (today.getMinutes() < 47))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 45 , 0, 0);
      currentblock = 1;
    }
    else if(((today.getHours() === 8) && (today.getMinutes() >= 47)) || ((today.getHours() ===9) && (today.getMinutes() < 47))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 47 , 0, 0);
      currentblock = 2;
    }
    else if(((today.getHours() === 9 ) && (today.getMinutes() >= 47)) || ((today.getHours() === 10) && (today.getMinutes() < 47))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 47 , 0, 0);
      currentblock = 3;
    }
    else if(((today.getHours() === 10 ) && (today.getMinutes() >= 47)) || ((today.getHours() === 11) && (today.getMinutes() < 18))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 18 , 0, 0);
      currentblock = 4;
      // 5 and 6 will be here when we add lunches
    }
    else if(((today.getHours() === 11 ) && (today.getMinutes() >= 18) && (today.getMinutes() < 49))) {
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 49 , 0, 0);
      currentblock = 5;
    }
    else if(((today.getHours() === 11 ) && (today.getMinutes() >= 49)) || ((today.getHours() === 12) && (today.getMinutes() < 11))) {
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 11 , 0, 0);
      currentblock = 6;
    }
    else if(((today.getHours() === 12 ) && (today.getMinutes() >= 11)) || ((today.getHours() === 13) && (today.getMinutes() < 11))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 11 , 0, 0);
      currentblock = 7;
    }
    else if(((today.getHours() === 13 ) && (today.getMinutes() >= 11)) || ((today.getHours() === 14) && (today.getMinutes() < 11))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 11 , 0, 0);
      currentblock = 8;
    }
    else if(((today.getHours()===14)&&(today.getMinutes()>11))||((today.getHours()>14))){
      deadline = new Date(today.getFullYear(), today.getMonth(), (today.getDate()+1), 7, 45, 0, 0);
      currentblock = 9;
    }
    /*
     else {
     var deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 11 , 0, 0);
     }
     */

    return deadline;
  }

  function advisoryDay(today){
    var deadline = new Date();
    if(((today.getHours() === 7) && (today.getMinutes() >= 45)) || ((today.getHours() === 8) && (today.getMinutes() < 45))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 45 , 0, 0);
      currentblock = 1;
    }
    else if(((today.getHours() === 8) && (today.getMinutes() >= 45)) || ((today.getHours() ===9) && (today.getMinutes() < 40))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 40 , 0, 0);
      currentblock = 2;
    }
    else if(((today.getHours() === 9 ) && (today.getMinutes() >= 40)) || ((today.getHours() === 10) && (today.getMinutes() < 32))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 32 , 0, 0);
      currentblock = 3;
    }
    else if(((today.getHours() === 10 ) && (today.getMinutes() >= 32)) || ((today.getHours() === 10) && (today.getMinutes() < 57))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 57 , 0, 0);
      currentblock = 4;
      // 5 and 6 will be here when we add lunches
    }
    else if(((today.getHours() === 10 ) && (today.getMinutes() >= 57)) || ((today.getHours() === 11) && (today.getMinutes() < 27))) {
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 27 , 0, 0);
      currentblock = 5;
    }
    else if(((today.getHours() === 11 ) && (today.getMinutes() >= 27)) || ((today.getHours() === 11) && (today.getMinutes() < 49))) {
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 49 , 0, 0);
      currentblock = 6;
    }
    else if(((today.getHours() === 11) && (today.getMinutes() >= 49)) || ((today.getHours() === 12) && (today.getMinutes() < 47))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 47 , 0, 0);
      currentblock = 7;
    }
    else if(((today.getHours() === 12 ) && (today.getMinutes() >= 47)) || ((today.getHours() === 13) && (today.getMinutes() < 17))){
      deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 17 , 0, 0);
      currentblock = 0;
    }
    else if(((today.getHours()===13)&&(today.getMinutes()>=17))||(((today.getHours()>14)) && (today.getMinutes() < 11))){
      deadline = new Date(today.getFullYear(), today.getMonth(), (today.getDate()), 14, 11, 0, 0);
      currentblock = 8;
    }
    else if(((today.getHours()===14)&&(today.getMinutes()>11))||((today.getHours()>=14))){
      deadline = new Date(today.getFullYear(), today.getMonth(), (today.getDate()+1), 7, 45, 0, 0);
      currentblock = 9;
    }
    return deadline;
  }

  var currentDay = new Date();
  var endBlock = new Date();
  if(currentDay.getDay()===2){
    endBlock = advisoryDay(currentDay);
  }else{
    endBlock = normalDay(currentDay);
  }
  return endBlock;
}

function updateEndBlock(){
  var t = getEndBlock() - new Date();
  var Lseconds = Math.floor((t / 1000) % 60);
  var Lminutes = Math.floor((t / 1000 / 60) % 60);
  var Lhours = Math.floor((t / (1000 * 60 * 60)) % 24);
  //var Ldays = Math.floor(t / (1000 * 60 * 60 * 24));
  var Blocks=[
    ["Advisory", "A Block", "B Block", "C Block", "First Lunch (D Block)", "Second Lunch (D Block)", "Third Lunch (D Block)", "E Block", "F Block"],
    ["Advisory", "A Block", "D Block", "B Block", "First Lunch (F Block)", "Second Lunch (F Block)", "Third Lunch (F Block)", "G Block", "E Block"],
    ["Advisory", "A Block", "B Block", "C Block", "First Lunch (E Block)", "Second Lunch (E Block)", "Third Lunch (E Block)", "D Block", "G Block"],
    ["Advisory", "A Block", "C Block", "D Block", "First Lunch (G Block)", "Second Lunch (G Block)", "Third Lunch (G Block)", "E Block", "F Block"],
    ["Advisory", "A Block", "B Block", "C Block", "First Lunch (F Block)", "Second Lunch (F Block)", "Third Lunch (F Block)", "G Block", "D Block"],
    ["Advisory", "A Block", "C Block", "B Block", "First Lunch (G Block)", "Second Lunch (G Block)", "Third Lunch (G Block)", "F Block", "E Block"],
    ["Advisory", "B Block", "C Block", "D Block", "First Lunch (E Block)", "Second Lunch (E Block)", "Third Lunch (E Block)", "F Block", "G Block"],
  ];

  document.getElementById("blockTime").innerHTML = Lhours + "h " + Lminutes + "m " + Lseconds + "s ";

  if (day === 0){
    document.getElementById("blockTime").innerHTML = "School Out";
    document.getElementById("endOfTimeTitle").innerHTML = "No School";
  }
  else if (currentblock === 9){
    document.getElementById("endOfTimeTitle").innerHTML = "Start of School";
  }
  else if (currentblock == 4 || currentblock == 5){
    document.getElementById("endOfTimeTitle").innerHTML = Blocks[day-1][currentblock+1] + " starts in"; //#Aidan'sFault
  }//sorry
  else{
    document.getElementById("endOfTimeTitle").innerHTML = Blocks[day-1][currentblock] + " ends in";
  }
}
