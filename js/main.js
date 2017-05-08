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

function main(){
loggedOutAspen = new HttpClient();
loggedOutAspen.get('https://mhs-aspencheck-serve.herokuapp.com', function(response) {
  var aspenInfo = JSON.parse(response);
  var block = (aspenInfo.block);
  var day = (aspenInfo.day);

  document.getElementById('dayNumber').innerHTML = day;
  if (block != 'Z'){
  	document.getElementById('blockId').innerHTML = block;
  } else {
	document.getElementsById('block').className = " fadeHidden";
}

  // Once loading is complete, render page
  document.getElementById('load').className += " fadeHidden";
  alert("ehllo");
});
}
