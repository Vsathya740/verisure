import { ApplicationRegistration } from '../../../sequelize/entities/ApplicationRegistration';

export class ApplicationRegistrationService {
  async createApplication(data: any) {
    // Business logic for creating application
    const application = await ApplicationRegistration.create(data);
    return application;
  }

  async getApplications() {
    // Business logic for getting all applications
    const applications = await ApplicationRegistration.findAll();
    return applications;
  }

  async getApplicationById(id: number) {
    // Business logic for getting application by ID
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  async updateApplication(id: number, data: any) {
    // Business logic for updating application
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.update(data);
    return application;
  }

  async deleteApplication(id: number) {
    // Business logic for deleting application
    const application = await ApplicationRegistration.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.destroy();
    return { message: 'Application deleted successfully' };
  }
} 