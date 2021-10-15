const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const connection = require('./configs/db');
const PORT = process.env.PORT || 5000;
const swaggerDoc = YAML.load('./docs/swagger.yaml');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', require('./routes/photo.route'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

connection();

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))