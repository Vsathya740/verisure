import { Application } from '../../../sequelize/models/Application';
import { UserMaster } from '../../../sequelize/models/UserMaster';

export class EmployeeVerificationReportService {
  async createVerificationReport(data: any) {
    // Business logic for creating verification report
    const report = await Application.create(data);
    return report;
  }

  async getVerificationReports(userId?: number) {
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

  async getVerificationReportById(id: string) {
    // Business logic for getting verification report by ID
    const report = await Application.findByPk(id, {
      include: [
        { model: UserMaster, as: 'acceptedBy' }
      ]
    });
    if (!report) {
      throw new Error('Verification report not found');
    }
    return report;
  }

  async updateVerificationReport(id: string, data: any) {
    // Business logic for updating verification report
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
    }
    await report.update(data);
    return report;
  }

  async deleteVerificationReport(id: string) {
    // Business logic for deleting verification report
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
    }
    await report.destroy();
    return { message: 'Verification report deleted successfully' };
  }

  async acceptVerificationReport(id: string, userId: number) {
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
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

  async completeVerificationReport(id: string, userId: number) {
    const report = await Application.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
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
