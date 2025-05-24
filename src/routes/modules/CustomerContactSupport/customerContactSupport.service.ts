import { CustomerContactReport } from '../../../sequelize/models/CustomerContactReport';
import { UserMaster } from '../../../sequelize/models/UserMaster';
import { Application } from '../../../sequelize/models/Application';

export class CustomerContactSupportService {
  async createContactReport(data: any) {
    // Business logic for creating contact report
    const report = await CustomerContactReport.create(data);
    return report;
  }

  async getContactReports(userId?: number) {
    const where: any = {};
    
    if (userId) {
      where.created_by = userId;
      where.status = ['IN_PROGRESS', 'COMPLETED'];
    } else {
      where.status = 'OPEN';
    }

    const reports = await CustomerContactReport.findAll({
      where,
      include: [
        { model: UserMaster, as: 'creator' },
        { model: Application, as: 'application' }
      ]
    });
    return reports;
  }

  async getContactReportById(id: string) {
    // Business logic for getting contact report by ID
    const report = await CustomerContactReport.findByPk(id, {
      include: [
        { model: UserMaster, as: 'creator' },
        { model: Application, as: 'application' }
      ]
    });
    if (!report) {
      throw new Error('Contact report not found');
    }
    return report;
  }

  async updateContactReport(id: string, data: any) {
    // Business logic for updating contact report
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.update(data);
    return report;
  }

  async deleteContactReport(id: string) {
    // Business logic for deleting contact report
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.destroy();
    return { message: 'Contact report deleted successfully' };
  }

  async updateStatus(id: string, status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED') {
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.update({ status });
    return report;
  }
}
