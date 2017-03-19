'use strict';

// declare empty array for sorted blog posts
// blogs will be sorted from most recent (date) to most past
var posts = [];

// Model constructor, input blogPosts.js
// Output: 'x' instances of blog posts from blogPosts array
function Post(blogPosts) {
  this.title = blogPosts.title;
  this.publishedOn = blogPosts.publishedOn;
  this.body = blogPosts.body;
}

// function creating jQuery object and printing to the DOM; now using Handlebar.js
// Output: creating a new node and appending to DOM
Post.prototype.toHtml = function () {
  var source = $('#blog-template').html();
  var template = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)'; //template string
  var html = template(this);
  return html;
};

blogPosts.sort(function(currentO, nextO) {
  return (new Date(nextO.publishedOn)) - (new Date(currentO.publishedOn));
});

blogPosts.forEach(function(i){
  posts.push(new Post(i));
});

posts.forEach(function(post) {
  $('#blog').append(post.toHtml());  //finds #blog ID on DOM, appends posts from array
});