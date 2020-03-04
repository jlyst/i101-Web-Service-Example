var express = require('express');
var csv=require('csvtojson');

var csvFilePath='simpleMoviesList.csv';
var myArray = [];
csv().fromFile(csvFilePath).then((jsonObj)=>{
    myArray = jsonObj;
});

var app = express();

app.get('/', (req, res) => {
  res.send(myArray)
});

app.get('/top-five', (req, res) => {
  myArray.sort(function(a,b){
    if (Number(b.avg_vote) > Number(a.avg_vote))
      return 1;
    else if (Number(b.avg_vote) < Number(a.avg_vote))
      return -1;
    else
      return 0;
  })
  res.send(myArray.slice(0,5))
});

app.get('/get-year/:year', (req, res) => {
  var filteredList = [];
  myArray.forEach(function (item) {
  if (item.year == req.params.year)
    filteredList.push(item);
});
  res.send(filteredList)
});

app.listen(3000, () => {
  console.log('server started');
});
