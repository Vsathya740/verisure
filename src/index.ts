import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './sequelize';
import routes from './routes/index';
import { VerifierObservations } from './sequelize/entities/VerifierObservations';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', routes);

sequelize.addModels([VerifierObservations]);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err: Error) => {
  console.error('Unable to connect to the database:', err);
});
