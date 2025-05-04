import { VerifierObservations } from '../../../sequelize/entities/VerifierObservations';

export class VerifierObservationsService {
  async createObservation(data: any) {
    // Business logic for creating observation
    // @ts-ignore
    const observation = await VerifierObservations.create(data);
    return observation;
  }

  async getObservations() {
    // Business logic for getting all observations
    // @ts-ignore
    const observations = await VerifierObservations.findAll();
    return observations;
  }

  async getObservationById(id: number) {
    // Business logic for getting observation by ID
    // @ts-ignore
    const observation = await VerifierObservations.findByPk(id);
    if (!observation) {
      throw new Error('Observation not found');
    }
    return observation;
  }

  async updateObservation(id: number, data: any) {
    // Business logic for updating observation
    // @ts-ignore
    const observation = await VerifierObservations.findByPk(id);
    if (!observation) {
      throw new Error('Observation not found');
    }
    await observation.update(data);
    return observation;
  }

  async deleteObservation(id: number) {
    // Business logic for deleting observation
    // @ts-ignore
    const observation = await VerifierObservations.findByPk(id);
    if (!observation) {
      throw new Error('Observation not found');
    }
    await observation.destroy();
    return { message: 'Observation deleted successfully' };
  }
}
