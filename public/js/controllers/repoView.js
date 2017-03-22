'use strict';

(function(module) {
  const repoView = {};

  // REVIEW: Private methods declared here live only within the scope of the wrapping IIFE.
  const ui = function() {
    let $repoList = $('#portfolio'); // Best practice: Cache the DOM query if it's used more than once.

    $repoList.find('#repo-list').empty();
    $repoList.show();
  };

  // DONE TODO: Remember that new Handlebars template? Let's compile it!
  // Save the result in this `render` variable.
  function render(repo) {
    var source = $('#repo-template').html();
    var template = Handlebars.compile(source);

    return template(repo);
  }

  repoView.index = function() {
    ui();
    // The jQuery `append` method lets us append an entire array of HTML elements at once:
    $('#repo-list').append(
      repos.with('name').map(render) // Want to filter by a different property other than name?
    );
  };

  module.repoView = repoView;
})(window);