'use strict';

//Added click handler for hamburger menu in here
var menuAnimation = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').slideToggle('fast');
  })
}

//Configure a view object to hold the functions
var portfolioView = {};

//Method to populate filters
portfolioView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      var val = $(this).attr('data-author');
      var optionTag = `<option value="${val}">${val}</option>`;
      if (!$(`#author-filter option[value="${val}"]`).length && val) {
        $('#author-filter').append(optionTag);
      }

      val = $(this).attr('data-category');
      optionTag = `<option value="${val}">${val}</option>`;
      if (!$(`#category-filter option[value="${val}"]`).length && val) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

//Event listener and handler for Author
portfolioView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

//Event listener and handler for Category
portfolioView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

//Only show first p; Read more/Show less
portfolioView.setTeasers = function() {
  $('.portfolio-body *:nth-of-type(n+2), .blog-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2
  $('#portfolio, #blog').on('click', 'a.read-on', function(event) {
    event.preventDefault();
    $(this).parent().find('*').fadeIn('slow');
    $(this).hide();
    $('.show-less', this).show();
  });
  $('.show-less').on('click', function() {
    event.preventDefault();
    $(this).parent().find('*').find('*:nth-of-type(n+2)').fadeOut('slow');
    $(this).hide();
    $('.read-on').show();
  });
};

// Pull from object and JSON.
portfolioView.initNewProjectPage = function() {
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });
  $('#new-form').on('change', 'input, textarea', portfolioView.create);
};

portfolioView.create = function() {
  let project;
  $('#portfolio').empty();

  project = new Project({
    title: $('#portfolio-title').val(),
    author: $('#portfolio-author').val(),
    authorUrl: $('#portfolio-author-url').val(),
    category: $('#portfolio-category').val(),
    body: $('#portfolio-body').val(),
    publishedOn: $('#portfolio-published:checked').length ? new Date() : null
  });

  $('#portfolio').append(article.toHtml());
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};


portfolioView.initIndexPage = function() {
  Project.all.forEach(a => $('#repo-list').before(a.toHtml()));
  menuAnimation();
  portfolioView.populateFilters();
  portfolioView.handleCategoryFilter();
  portfolioView.handleAuthorFilter();
  portfolioView.setTeasers();
};