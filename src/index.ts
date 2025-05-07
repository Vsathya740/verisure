import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './sequelize';
import routes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

sequelize.sync({ alter: true }).then(() => {
  console.log('### MySQL connected successfully! ###');
  app.listen(port, () => {
    console.log('\n########################################');
    console.log(`## Server is running on port ${port} ##`);
    console.log('########################################\n');
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
