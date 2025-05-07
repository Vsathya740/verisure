import { ApplicationRegistration } from '../../../sequelize/models/ApplicationRegistration';

export class ApplicationRegistrationService {
  async createApplication(data: any) {
    // Business logic for creating application
    // @ts-ignore
    const application = await ApplicationRegistration.create(data);
    return application;
  }

  async getApplications() {
    // Business logic for getting applications
    // @ts-ignore
    const applications = await ApplicationRegistration.findAll();
    return applications;
  }

  async getApplicationById(id: number) {
    // Business logic for getting application by ID
    // @ts-ignore
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  async updateApplication(id: number, data: any) {
    // Business logic for updating application
    // @ts-ignore
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.update(data);
    return application;
  }

  async deleteApplication(id: number) {
    // Business logic for deleting application
    // @ts-ignore
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.destroy();
    return { message: 'Application deleted successfully' };
  }
}

