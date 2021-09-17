const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/adinkra', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log('connected to database...'))
    .catch(error => console.log(error));