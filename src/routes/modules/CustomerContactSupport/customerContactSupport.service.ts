import { CustomerContactReport } from '../../../sequelize/models/CustomerContactReport';

export class CustomerContactSupportService {
  async createContactReport(data: any) {
    // Business logic for creating contact report
    // @ts-ignore
    const report = await CustomerContactReport.create(data);
    return report;
  }

  async getContactReports() {
    // Business logic for getting all contact reports
    // @ts-ignore
    const reports = await CustomerContactReport.findAll();
    return reports;
  }

  async getContactReportById(id: number) {
    // Business logic for getting contact report by ID
    // @ts-ignore
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    return report;
  }

  async updateContactReport(id: number, data: any) {
    // Business logic for updating contact report
    // @ts-ignore
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.update(data);
    return report;
  }

  async deleteContactReport(id: number) {
    // Business logic for deleting contact report
    // @ts-ignore
    const report = await CustomerContactReport.findByPk(id);
    if (!report) {
      throw new Error('Contact report not found');
    }
    await report.destroy();
    return { message: 'Contact report deleted successfully' };
  }
}
