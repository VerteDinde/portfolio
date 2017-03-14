'use strict';

// ran 'npm init'
// require express and set it to 'app'
const express = require('express');
const app = express();

// set PORT to either user environment or 3000
const PORT = process.env.PORT || 3000;
console.log(process.env);

//app.use to include all static resources - use express.static
app.use(express.static('.'));

//app.get to send the html file back to the user
app.get('*', function(request, response) {
    response.sendFile('index.html', {root: '.'});
});

//app.listen to log a console message telling me what PORT is up.
app.listen(PORT, function() {
    console.log(`Server set to ${PORT}`);
})