using System.Collections.Generic;
using BillingService.Models;

namespace BillingService.Contracts
{
    public interface IBillingService
    {
        BillingResponse GetAllInvoices();

        Invoice GetInvoiceById(int invoiceId);

        BillingResponse GetStudentInvoices(int studentId);

        BillingResponse GetInvoicesByStatus(string status);

        BillingResponse CreateInvoice(Invoice invoice);

        BillingResponse PayInvoice(int invoiceId, Payment payment);

        decimal CalculateTotalDue(int studentId);
    }
}
