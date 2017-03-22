'use strict';

(function (module) {
  const repos = {};

  repos.all = [];

  repos.requestRepos = function (callback) {
    $.ajax('https://api.github.com/users/vertedinde/repos', {
      method: 'GET',
      headers: {
        Authorization: `token ${token}`
      }
    })
      .then(res => {
        repos.all = res
          .filter(r => !r.fork)
          .map(repo => {
            return {
              url: repo.url,
              description: repo.description,
              language: repo.language,
              created: repo.created_at,
              updated: repo.updated_at,
              name: repo.name,
              watchers_count: repo.watchers_count
            }
          });
        console.log(repos.all);
        callback();
      }).catch(err => console.error);
  }

  // REVIEW: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = attr => repos.all.filter(repo => repo[attr]);

  module.repos = repos;
})(window);