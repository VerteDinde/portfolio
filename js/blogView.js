// Configure a view object to hold the functions - why are we holding the functions within an object?
var blogView = {};

//Create method to populate filters at top of page
//Input: Details from blog.js
//Output: Populated filter categories appended to DOM
blogView.populateFilters = function () {
  $('article').not('.template').each(function () {
    //author filter
    var authorName, category, optionTag;
    authorName = $(this).find('address a').text();
    optionTag = '<option value="' + authorName + '">' + authorName + '</option>';
    $('#author-filter').append(optionTag);
    //category filter
    category = $(this).attr('data-category');
    optionTag = '<option value="' + category + '">' + category + '</option>';
    if ($('#category-filter option[value="' + category + '"]').length === 0) {
      $('#category-filter').append(optionTag);
    }
  });
};

//Create event listener and handler for Author filter
//Input: Taking 'blog' and 'data-author' from the DOM
//Output: Showing only posts that have certain 'data-author' values; hiding remainder
blogView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide('fast');
      var authorName = $(this).val();
      $('article[data-author="' + authorName + '"]').fadeIn('slow');
    } else {
      $('article').not('.template').show('slow');
    }
    $('#category-filter').val('');
  });
};

//Create event listener and handler for Category filter
blogView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide('slow');
      var categoryName = $(this).val();
      $('article[data-category="' + categoryName + '"]').fadeIn('slow');
    } else {
      $('article').not('.template').show('slow');
    }
    $('#author-filter').val('');
  });
};

//Create tab effect for main nav
//Input:
//Output:
blogView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(){
    $('.tab-content').hide('fast');
    var clickedId = $(this).attr('data-content');
    $('#' + clickedId).fadeIn('slow');
  });
  $('.main-nav .tab:first').click();
};

blogView.populateFilters();
blogView.handleAuthorFilter();
blogView.handleCategoryFilter();