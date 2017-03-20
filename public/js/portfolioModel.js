'use strict';

//Declare array for sorted portfolio projects (default sorting)
//Create model constructor for portfolioData
//Create prototype function, using Handlebars.js
//Write sort function to put data in chronological order
//Function to push posts to array
//Function append posts to DOM

//Create model constructor for portfolioData
function Project(data) {
  Object.keys(opts).forEach(ele => this[ele] = data[ele]);
}

//Declare array for sorted portfolio projects (default sorting)
Project.all = [];

//Create prototype function, using Handlebars.js
Project.prototype.toHtml = function () {
  var source = $('#portfolio-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)'; //ternery operator
  this.body = marked(this.body);
  return template(this);
};

// Function append posts to DOM
Project.loadAll = rawData => {
  rawData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));

  Project.all = rawData.map(ele => new Project(ele));
};

// Fetches initial database contents from postgres and populates index.html
Project.fetchAll = callback => {
  $.get(`ajax-data`)
  .then(
    results => {
      Project.loadAll(results);
      callback();
    }
  ).catch(console.error);
}

// Deletes the entire table
Project.truncateTable = callback => {
  $.ajax({
    url: '/portfolio',
    method: 'DELETE'
  })
  .then(console.log)
  .then(callback);
};

// Allows insertion of a new project
Project.prototype.insertRecord = function(callback) {
  $.post('/portfolio', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
  .then(console.log)
  .then(callback);
};

// Deletes one project
Project.prototype.deleteRecord = function(callback) {
  $.ajax({
    url: `/portfolio/${this.article_id}`,
    method: 'DELETE'
  })
  .then(console.log)
  .then(callback);
};

// Updates a project
Project.prototype.updateRecord = function(callback) {
  $.ajax({
    url: `/portfolio/${this.article_id}`,
    method: 'PUT',
    data: {
      author: this.author,
      authorUrl: this.authorUrl,
      body: this.body,
      category: this.category,
      publishedOn: this.publishedOn,
      title: this.title,
      author_id: this.author_id
    }
  })
  .then(console.log)
  .then(callback);
};
