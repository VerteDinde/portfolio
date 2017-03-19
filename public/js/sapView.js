'use strict';

//Configure a view object to hold the functions - still don't know why we're doing that
//Method to populate filters
//Event listener and handler for Author
//Event listener and handler for Category
//Event listener and handler for Main Nav tab showing and hiding
//Only show first p

//Added click handler for hamburger menu in here
var menuAnimation = function() {
  $('.icon-menu').on('click', function() {
    $('.main-nav ul').slideToggle('fast');
  })
}

//Configure a view object to hold the functions - still don't know why we're doing that
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

//Event listener and handler for Main Nav tab showing and hiding
portfolioView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
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

// NEW: Mon, March 13. Pull from object and JSON.
portfolioView.initNewArticlePage = function() {
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
  //what is pre code?
  $('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
};


portfolioView.initIndexPage = function() {
  Project.all.forEach(function(a) {
    $('#portfolio').append(a.toHtml())
  });
};

$(document).ready(function() {
  menuAnimation();
});
  portfolioView.populateFilters();
  portfolioView.handleCategoryFilter();
  portfolioView.handleAuthorFilter();
  portfolioView.handleMainNav();
  portfolioView.setTeasers();