import { EmploymentVerificationReport } from '../../../sequelize/entities/VerfirifcationReport';

export class EmployeeVerificationReportService {
  async createVerificationReport(data: any) {
    // Business logic for creating verification report
    // @ts-ignore
    const report = await EmploymentVerificationReport.create(data);
    return report;
  }

  async getVerificationReports() {
    // Business logic for getting all verification reports
    // @ts-ignore
    const reports = await EmploymentVerificationReport.findAll();
    return reports;
  }

  async getVerificationReportById(id: number) {
    // Business logic for getting verification report by ID
    // @ts-ignore
    const report = await EmploymentVerificationReport.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
    }
    return report;
  }

  async updateVerificationReport(id: number, data: any) {
    // Business logic for updating verification report
    // @ts-ignore
    const report = await EmploymentVerificationReport.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
    }
    await report.update(data);
    return report;
  }

  async deleteVerificationReport(id: number) {
    // Business logic for deleting verification report
    // @ts-ignore
    const report = await EmploymentVerificationReport.findByPk(id);
    if (!report) {
      throw new Error('Verification report not found');
    }
    await report.destroy();
    return { message: 'Verification report deleted successfully' };
  }
}
