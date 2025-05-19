import { Application } from '../../../sequelize/models/Application';
import { UserMaster } from '../../../sequelize/models/UserMaster';

export class CustomerContactSupportService {
  async createContactReport(data: any) {
    // Business logic for creating contact report
    const report = await Application.create(data);
    return report;
  }

  async getContactReports(userId?: number) {
    const where: any = {};
    
    if (userId) {
      where.accepted_by = userId;
      where.status = ['ACCEPTED', 'COMPLETED'];
    } else {
      where.status = 'OPEN';
    }

    const reports = await Application.findAll({
      where,
      include: [
        { model: UserMaster, as: 'acceptedBy' }
      ]
    });
    return reports;
  }

  async getContactReportById(id: string) {
    // Business logic for getting contact report by ID
    const report = await Application.findByPk(id, {
      include: [
        { model: UserMaster, as: 'acceptedBy' }
      ]
    });
    if (!report) {
      throw new Error('Contact report not found');
    }
    return report;
  }

  async updateContactReport(id: string, data: any) {
    // Business logic for updating contact report
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.update(data);
    return report;
  }

  async deleteContactReport(id: string) {
    // Business logic for deleting contact report
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.destroy();
    return { message: 'Contact report deleted successfully' };
  }

  async acceptContactReport(id: string, userId: number) {
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    if (report.status !== 'OPEN') {
      throw new Error('Report is not in OPEN status');
    }
    await report.update({
      status: 'ACCEPTED',
      accepted_by: userId
    });
    return report;
  }

  async completeContactReport(id: string, userId: number) {
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    if (report.status !== 'ACCEPTED' || report.accepted_by !== userId) {
      throw new Error('Report is not accepted by you');
    }
    await report.update({
      status: 'COMPLETED'
    });
    return report;
  }
}
