import { Application } from '../../../sequelize/models/Application';
import { UserMaster } from '../../../sequelize/models/UserMaster';

export class ApplicationRegistrationService {
  async createApplication(data: any) {
    // Business logic for creating application
    const application = await Application.create(data);
    return application;
  }

  async getApplications(userId?: number) {
    const where: any = {};
    
    if (userId) {
      where.accepted_by = userId;
      where.status = ['ACCEPTED', 'COMPLETED'];
    } else {
      where.status = 'OPEN';
    }

    const applications = await Application.findAll({
      where,
      include: [
        { model: UserMaster, as: 'acceptedBy' }
      ]
    });
    return applications;
  }

  async getApplicationById(id: string) {
    // Business logic for getting application by ID
    const application = await Application.findByPk(id, {
      include: [
        { model: UserMaster, as: 'acceptedBy' }
      ]
    });
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  async updateApplication(id: string, data: any) {
    // Business logic for updating application
    const application = await Application.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.update(data);
    return application;
  }

  async deleteApplication(id: string) {
    // Business logic for deleting application
    const application = await Application.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    await application.destroy();
    return { message: 'Application deleted successfully' };
  }

  async acceptApplication(id: string, userId: number) {
    const application = await Application.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    if (application.status !== 'OPEN') {
      throw new Error('Application is not in OPEN status');
    }
    await application.update({
      status: 'ACCEPTED',
      accepted_by: userId
    });
    return application;
  }

  async completeApplication(id: string, userId: number) {
    const application = await Application.findByPk(id);
    if (!application) {
      throw new Error('Application not found');
    }
    if (application.status !== 'ACCEPTED' || application.accepted_by !== userId) {
      throw new Error('Application is not accepted by you');
    }
    await application.update({
      status: 'COMPLETED'
    });
    return application;
  }
}

