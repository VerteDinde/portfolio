'use strict';

//Declare array for sorted portfolio projects (default sorting)
//Create model constructor for portfolioData
//Create prototype function, using Handlebars.js
//Write sort function to put data in chronological order
//Function to push posts to array
//Function append posts to DOM

//Declare array for sorted portfolio projects (default sorting)
var projects = [];

//Create model constructor for portfolioData
function Project(portfolioData) {
  this.title = portfolioData.title;
  this.category = portfolioData.category;
  this.author = portfolioData.author;
  this.authorUrl = portfolioData.authorUrl;
  this.publishedOn = portfolioData.publishedOn;
  this.body = portfolioData.body;
}

//Create prototype function, using Handlebars.js
Project.prototype.toHtml = function () {
  var source = $('#portfolio-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)'; //ternery operator
  var html = template(this);
  return html;
};

//Write sort function to put data in chronological order
portfolioData.sort(function(current, next) {
  return (new Date(next.publishedOn)) - (new Date(current.publishedOn));
});

//Function to push posts to array
portfolioData.forEach(function(i) {
  projects.push(new Project(i));
});

//Function append posts to DOM
projects.forEach(function(project) {
  $('#portfolio').append(project.toHtml());
});