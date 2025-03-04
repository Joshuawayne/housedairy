const express = require('express');
const cowRoutes = require('./routes/cowRoutes');
const breedingRoutes = require('./routes/breedingRoutes');
const milkRoutes = require('./routes/milkRoutes');
const app = express();

app.use(express.json());
app.use('/cow', cowRoutes);
app.use('/breeding', breedingRoutes);
app.use('/milk', milkRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));