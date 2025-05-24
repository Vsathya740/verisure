import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './sequelize';
import routes from './routes/index';
import cors from 'cors';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Only authenticate, don't sync
sequelize.authenticate()
  .then(() => {
    console.log('### MySQL connected successfully! ###');
    app.listen(port, '0.0.0.0', () => {
      console.log('\n########################################');
      console.log(`## Server is running on port ${port} ##`);
      console.log('########################################\n');
    });
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the MySQL database:', err);
  });
