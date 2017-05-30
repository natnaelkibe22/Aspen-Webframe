var today = new Date();

// Async HTTP GET Function
var HttpClient = function() { // Thanks http://stackoverflow.com/a/22076667/1709894!
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState === 4 && anHttpRequest.status === 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send( null );
  }
}

function getLunchInfo(lunchMenu) { // Bypassing CORS using JSONP
  try {
    var lunchSpecial = (lunchMenu.days[today.getDay() - 1].menu_items[1].food.name);

    document.getElementById('lunch-body').innerHTML = lunchSpecial;
  } catch (error){
    document.getElementById('lunch-body').innerHTML = "No Lunch Served";
  }
}

function clock(isHalfDay){
  // Thanks to http://stackoverflow.com/a/36524883/1709894 and https://www.w3schools.com/howto/howto_js_countdown.asp
  var countDownDate = new Date();
  var time =+ countDownDate;

  if (isHalfDay){
    countDownDate.setHours(12,11,10,0);
  } else {
    countDownDate.setHours(14,11,10,0);
  }
  if (countDownDate < time) {
    countDownDate.setDate(countDownDate.getDate() + 1);
  }

// Update the count down every 1 second
var timer = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    document.getElementById("timer").innerHTML = "EXPIRED";
  }
}, 1000);
}

function main(){
  // Eww JSONP (Thanks, CORS!)
  var lunchtag = document.createElement("script");
  lunchtag.src = "https://melroseschools.nutrislice.com/menu/api/weeks/school/melrose/menu-type/lunch/" + today.getFullYear() + "/00/00/?format=json-p&callback=getLunchInfo";
  document.getElementsByTagName('head')[0].appendChild(lunchtag);

  // Aspen Stuff
  var loggedOutAspen = new HttpClient();
  try {
    loggedOutAspen.get('https://mhs-aspencheck-serve.herokuapp.com', function(response) {
      var aspenInfo = JSON.parse(response);
      var lastUpdated = new Date(aspenInfo.asOf*1000);
      var block = (aspenInfo.schedule.block);
      var blockSchedule = (aspenInfo.schedule.blockSchedule);
      var day = (aspenInfo.schedule.day);
      var blockOfDay = (aspenInfo.schedule.blockOfDay);
      var classInSession = (aspenInfo.schedule.isClassInSession);

      var events = (aspenInfo.calendar.events);
      var isHalfDay = (aspenInfo.calendar.isHalfDay);

      var percentComplete = (blockOfDay/6)*100;

      clock(isHalfDay);

      document.getElementById('dayNumber').innerHTML = day;
      document.getElementById('blockId').innerHTML = block;
      document.getElementById('dayProgress').setAttribute('style', 'width: ' + percentComplete + '%;');
      document.getElementById('dayProgress').innerHTML = Math.round(percentComplete) + '%';
      if (classInSession) { document.getElementById('dayProgress').setAttribute('class', 'progress-bar progress-bar-striped progress-bar-danger active'); }
      if (block === 'Z') { document.getElementById('block-panel').className += " fadeHidden"; }
      document.getElementById('lastUpdated').innerHTML = (lastUpdated.getMonth() + 1) + "/" + (lastUpdated.getDate()) + " " + (lastUpdated.getHours()) + ":" + (lastUpdated.getMinutes()) + ":" + (lastUpdated.getSeconds());

      if (events.length > 0){
        document.getElementById('events-list').innerHTML = "";
        events.forEach(function(eventTitle){
          var event = document.createElement('li');
          event.innerHTML = eventTitle;
          document.getElementById('events-list').appendChild(event);
        });
      }

      if (blockSchedule.length > 0){
        document.getElementById('schedule-body').innerHTML = blockSchedule;
      } else {
        document.getElementById('schedule-panel').className += " fadeHidden";
      }

      // Once loading is complete, render page
      document.getElementById('aspenLoadingSpinner').className += " fadeHidden";
    });
  } catch (error) {
    document.getElementById('fetchIssue').setAttribute('style', 'display:inherit;');
    clock(false);
  }
}
