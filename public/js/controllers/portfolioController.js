'use strict';

(function(module) {
    const portfolioController = {}
    portfolioController.render = function() {
        $('.tab-content').hide();
        $('#portfolio').fadeIn();
    }
    module.portfolioController = portfolioController;
})(window);

(function(module) {
    const aboutController = {}
    aboutController.render = function() {
        $('.tab-content').hide();
        $('#about').fadeIn();
    }
    module.aboutController = aboutController;
})(window);

(function(module) {
    const blogController = {}
    blogController.render = function() {
        $('.tab-content').hide();
        $('#blog').fadeIn();
    }
    module.blogController = blogController;
})(window);

(function(module) {
    const speakerController = {}
    speakerController.render = function() {
        $('.tab-content').hide();
        $('#speaking').fadeIn();
    }
    module.speakerController = speakerController;
})(window);

(function(module) {
    const contactController = {};
    contactController.render = function() {
        $('.tab-content').hide();
        $('#contact').fadeIn();
    }
    module.contactController = contactController;
})(window);

// Initialize all functions
page('/', portfolioController.render);
page('/about', aboutController.render);
page('/blog', blogController.render);
page('/speaking', speakerController.render);
page('/contact', contactController.render);

// Activate page.js
page();