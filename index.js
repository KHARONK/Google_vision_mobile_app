const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const route = require('./routes/route');
require('./dbConfig/dbConnect');

app.use(cors());
app.use(express.json());
app.use('/api', route);
app.listen(PORT, () => console.log(`server running on port ${PORT}`));