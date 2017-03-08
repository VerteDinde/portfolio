'use strict';

// declare empty array for sorted blog posts
// blogs will be sorted from most recent (date) to most past
var posts = [];

// Model constructor, input blogPosts.js
// Output: 'x' instances of blog posts from blogPosts array
function Post(blogPosts) {
  this.title = blogPosts.title;
  this.category = blogPosts.category;
  this.author = blogPosts.author;
  this.authorUrl = blogPosts.author;
  this.publishedOn = blogPosts.publishedOn;
  this.body = blogPosts.body;
}

// function creating jQuery object and printing to the DOM
// Output: creating a new node and appending to DOM
// REMEMBER: Remove class element before returning, or you'll be exponentially creating nodes
Post.prototype.toHtml = function () {
  var $newPost = $('article.template').clone();   // clones template node
  $newPost.find('h3').text(this.title);
  $newPost.attr('data-category', this.category);
  $newPost.find('.byline address a').text(this.author);
  $newPost.find('.byline address a').attr('href', this.authorUrl)
  $newPost.find('time[pubdate]').attr('title', this.publishedOn);
  $newPost.find('time').text(' | published ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago.');
  $newPost.find('.blog-body').html(this.body);
  $newPost.removeClass('template');
  return $newPost;
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