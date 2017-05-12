var today = new Date();

// Async HTTP GET Function
var HttpClient = function() { // Thanks http://stackoverflow.com/a/22076667/1709894!
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    }

    anHttpRequest.open( "GET", aUrl, true );
    anHttpRequest.send( null );
  }
}

function getLunchInfo(lunchMenu) { // Bypassing CORS using JSONP
  var lunchSpecial = (lunchMenu.days[today.getDay() - 1].menu_items[1].food.name);

  document.getElementById('lunch-body').innerHTML = lunchSpecial;
}

function main(){
  // Aspen Stuff
  loggedOutAspen = new HttpClient();
  try {
    loggedOutAspen.get('https://mhs-aspencheck-serve.herokuapp.com', function(response) {
      var aspenInfo = JSON.parse(response);
      var block = (aspenInfo.schedule.block);
      var day = (aspenInfo.schedule.day);
      var blockOfDay = (aspenInfo.schedule.blockOfDay);

      document.getElementById('dayNumber').innerHTML = day;
      document.getElementById('blockId').innerHTML = block;
      document.getElementById('dayProgress').style = "width: " + (blockOfDay/6)*100 +"%;";
      if (block == 'Z') document.getElementById('block-panel').className += " fadeHidden";

      // Once loading is complete, render page
      document.getElementById('aspenLoadingSpinner').className += " fadeHidden";
    });
  } catch (error) {
    document.getElementById('fetchIssue').style += 'display:inherit;'
  }

  // Eww JSONP (Thanks, CORS!)
  var lunchtag = document.createElement("script");
  lunchtag.src = "https://melroseschools.nutrislice.com/menu/api/weeks/school/melrose/menu-type/lunch/" + today.getFullYear() + "/00/00/?format=json-p&callback=getLunchInfo";
  document.getElementsByTagName('head')[0].appendChild(lunchtag);
}
