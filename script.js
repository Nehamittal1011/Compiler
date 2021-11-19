//listener on compile button
var compile = document.getElementById("compile");
compile.addEventListener("click", compileCode);
var time;

//function to Compile
//on compile, a post request is sent to server, with langID and code.
var lang = document.getElementById("lang");
var code = document.getElementById("code");


function compileCode(){
  //create a request
  var request = new XMLHttpRequest();
  //open request
  request.open("POST","https://codequotient.com/api/executeCode");
  request.setRequestHeader("Content-Type", "application/JSON");
  //event listener on request to get the response
  request.addEventListener("load", getResponse);
  //send the request
  request.send(JSON.stringify({code:code.value, langId:lang.value }));
}

//function to getResponse
// In response you 'll get an object with key error or codeId( your code submission ID to fetch result)
var output = document.getElementById("output");
var responseReceived;
function getResponse(response){
  //get response
   responseReceived = JSON.parse(response.target.responseText);

  //if it is error
  if(responseReceived.error)
  console.log("Error");

  //if it is codeId upon successful submission
  // This id is used for fetch the result after interval of time
  else
  time =  setTimeout(fetchOutput, 5000);
}



function fetchOutput(){
  //You need to send a get request with codeId to fetch the result. In result of this request you get an object.
  var result = new XMLHttpRequest();
  result.open("GET", "https://codequotient.com/api/codeResult/" + responseReceived.codeId);
  result.setRequestHeader("Content-Type", "application/JSON");
  result.addEventListener("load", showOutput);
  result.send();
}

//function to show output in console
function showOutput(response){
  responseReceived = JSON.parse(response.target.responseText);
  responseReceived = JSON.parse(responseReceived.data);

  if(responseReceived.errors)
  output.value = responseReceived.errors;
  else
  output.value = responseReceived.output;
}
