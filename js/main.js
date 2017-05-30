var today = new Date();

// Async HTTP GET Function
var HttpClient = function () { // Thanks http://stackoverflow.com/a/22076667/1709894!
  this.get = function (aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function () {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    }

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
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

function main() {
  // Eww JSONP (Thanks, CORS!)
  var lunchtag = document.createElement("script");
  lunchtag.src = "https://melroseschools.nutrislice.com/menu/api/weeks/school/melrose/menu-type/lunch/" + today.getFullYear() + "/00/00/?format=json-p&callback=getLunchInfo";
  document.getElementsByTagName('head')[0].appendChild(lunchtag);

  // Aspen Stuff
  loggedOutAspen = new HttpClient();
  try {
    loggedOutAspen.get('https://mhs-aspencheck-serve.herokuapp.com', function (response) {
      var lastUpdated, block, blockSchedule, day, events, isHalfDay;
      try {
        var aspenInfo = JSON.parse(response);
      }catch(err) {
        var aspenInfo = {schedule: null, calendar: null};
        //Do something... maybe. Up to you Colan
      }
      typeof aspenInfo.asOf === "undefined" ? lastUpdated = new Date() : lastUpdated = new Date(aspenInfo.asOf * 1000);
      typeof aspenInfo.schedule.block === "undefined" ? block = "Z" : block = aspenInfo.schedule.block;
      typeof aspenInfo.schedule.blockSchedule === "undefined" ? blockSchedule = [] : blockSchedule = aspenInfo.schedule.blockSchedule;
      typeof aspenInfo.schedule.day === "undefined" ? day = 0 : day = aspenInfo.schedule.day;
      typeof aspenInfo.calendar.events === "undefined" ? events = [] : events = aspenInfo.calendar.events;
      typeof aspenInfo.calendar.isHalfDay === "undefined" ? isHalfDay = false : isHalfDay = aspenInfo.calendar.isHalfDay;

      clock(isHalfDay);

      document.getElementById('dayNumber').innerHTML = day;
      document.getElementById('blockId').innerHTML = block;
      if (block == 'Z') document.getElementById('block-panel').className += " fadeHidden";
      document.getElementById('lastUpdated').innerHTML = (lastUpdated.getMonth() + 1) + "/" + (lastUpdated.getDate()) + " " + (lastUpdated.getHours()) + ":" + (lastUpdated.getMinutes()) + ":" + (lastUpdated.getSeconds());

      if (events.length > 0) {
        document.getElementById('events-list').innerHTML = "";
        events.forEach(function (eventTitle) {
          var event = document.createElement('li');
          event.innerHTML = eventTitle;
          document.getElementById('events-list').appendChild(event);
        });
      }

      if (blockSchedule.length > 0) {
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

function clock(isHalfDay) {
  // Thanks to http://stackoverflow.com/a/36524883/1709894 and https://www.w3schools.com/howto/howto_js_countdown.asp
  const startTime = (new Date()).setHours(7, 45, 0, 0);
  var countDownDate = new Date();
  var time = +countDownDate;

  if (isHalfDay) {
    countDownDate.setHours(12, 11, 10, 0);
  } else {
    countDownDate.setHours(14, 11, 10, 0);
  }
  if (countDownDate < time) {
    countDownDate.setDate(countDownDate.getDate() + 1);
  }

// Update the count down every 1 second
  var timer = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var fullDay = countDownDate - startTime;
    var percentThroughDay = Math.floor(((now-startTime)/fullDay)*100);
    if(percentThroughDay > 100 || (now%(1000*60*60*24) > countDownDate%(1000*60*60*24))) percentThroughDay = 100;

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    document.getElementById('dayProgress').setAttribute('style', 'width: ' + percentThroughDay + '%;');
    document.getElementById('dayProgress').innerHTML = percentThroughDay + '%';

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer").innerHTML = "EXPIRED";
    }
  }, 1000);
}
