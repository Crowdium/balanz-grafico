const express = require('express');
const app = express();

app.use(express.static(__dirname + '/docs/'))

app.listen(3001, function(){
    console.log('Server on port 3001');
})