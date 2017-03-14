'use strict';

//Declare array for sorted portfolio projects (default sorting)
//Create model constructor for portfolioData
//Create prototype function, using Handlebars.js
//Write sort function to put data in chronological order
//Function to push posts to array
//Function append posts to DOM

//Create model constructor for portfolioData
function Project(portfolioData) {
  this.title = portfolioData.title;
  this.category = portfolioData.category;
  this.author = portfolioData.author;
  this.authorUrl = portfolioData.authorUrl;
  this.publishedOn = portfolioData.publishedOn;
  this.body = portfolioData.body;
}

//Declare array for sorted portfolio projects (default sorting)
Project.all = [];

//Create prototype function, using Handlebars.js
Project.prototype.toHtml = function () {
  var source = $('#portfolio-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)'; //ternery operator
  var html = template(this);
  return html;
};

//Function append posts to DOM
Project.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(i) {
    Project.all.push(new Project(i));
  })
};

Project.fetchAll = function() {
  if (localStorage.rawData) {
    var parsedData = JSON.parse(localStorage.rawData);
    Project.loadAll(parsedData);
    portfolioView.initIndexPage();
  } else {
    $.ajax({
      url: 'data/portfolio-data.json',
      method: 'GET',
      success: function(data) {
        var rawDataJSON = JSON.stringify(data)
        localStorage.setItem('rawData', rawDataJSON);
        Project.fetchAll();
      }, 
      error: function(err) {
        console.log('in error handler', err);
      }
    });
  }
}