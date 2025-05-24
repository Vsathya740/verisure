import { ResidenceVerification } from '../../../sequelize/models/ResidenceVerification';
import { Application } from '../../../sequelize/models/Application';
import { UserMaster } from '../../../sequelize/models/UserMaster';
import { EmployerVerification } from '../../../sequelize/models/EmployerVerification';
import { TelephoneVerification } from '../../../sequelize/models/TelephoneVerification';


export class ApplicationRegistrationService {
  async createApplication(data: any) {
    console.log(data);
    try{
    const application = await Application.create(data);
    const residence_verification = await ResidenceVerification.create({
      applicationId: application.id,
      residence_coordinates: data.residence_verification.coordinates,
      residence_address: data.residence_verification.address,
      residence_status: data.residence_verification.residence_verification_status
    });
    const employer_verification = await EmployerVerification.create({
      applicationId: application.id,
      employer_coordinates: data.employer_verification.coordinates,
      employer_address: data.employer_verification.address,
      status: data.employer_verification.employer_verification_status
    });
    const telephonic_verification = await TelephoneVerification.create({
      applicationId: application.id,
      status: data.telephonic_verification.telephonic_verification_status
    });
    const response = {
      "status": true,
      "data": {
        "application": application,
        "residence_verification": {
          "coordinates": residence_verification.residence_coordinates,
          "address": residence_verification.residence_address,
          "residence_verification_status": residence_verification.status
        },
        "employer_verification": {
          "coordinates": employer_verification.employer_coordinates,
          "address": employer_verification.employer_address,
          "employer_verification_status": employer_verification.status
        },
        "telephonic_verification": {
          "telephonic_verification_status": telephonic_verification.status
        }
      }
    }
    return response;
  } catch (error) {
    console.log(error);
    return {
      "status": false,
      "message": "Error in creating application"
    }
  }
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
    const data ={
      "status": true,
      "data": application
    }
    return data;
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
    const data ={
      "status": true,
      "data": application
    }
    return data;
  }
}

