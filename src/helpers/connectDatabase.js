const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/project1901')
.catch(() => process.exit(1));
