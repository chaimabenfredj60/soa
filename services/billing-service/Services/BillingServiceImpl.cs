using System;
using System.Collections.Generic;
using System.Linq;
using BillingService.Contracts;
using BillingService.Models;

namespace BillingService.Services
{
    public class BillingServiceImpl : IBillingService
    {
        private static List<Invoice> invoices = new List<Invoice>
        {
            new Invoice(1, 1, 1500m, "PAID", new DateTime(2025, 12, 15), new DateTime(2025, 11, 15)),
            new Invoice(2, 2, 1500m, "PENDING", new DateTime(2025, 12, 31), new DateTime(2025, 12, 01)),
            new Invoice(3, 1, 1200m, "OVERDUE", new DateTime(2025, 11, 30), new DateTime(2025, 10, 30)),
            new Invoice(4, 3, 1500m, "PENDING", new DateTime(2026, 01, 31), new DateTime(2025, 12, 01))
        };

        private static List<Payment> payments = new List<Payment>
        {
            new Payment(1, 1, 1500m, new DateTime(2025, 12, 10), "CREDIT_CARD"),
            new Payment(2, 3, 600m, new DateTime(2025, 12, 05), "BANK_TRANSFER")
        };

        public BillingResponse GetAllInvoices()
        {
            return new BillingResponse(
                invoices,
                $"Retrieved {invoices.Count} invoices",
                true
            );
        }

        public Invoice GetInvoiceById(int invoiceId)
        {
            var invoice = invoices.FirstOrDefault(i => i.Id == invoiceId);
            return invoice;
        }

        public BillingResponse GetStudentInvoices(int studentId)
        {
            var studentInvoices = invoices.Where(i => i.StudentId == studentId).ToList();
            return new BillingResponse(
                studentInvoices,
                $"Found {studentInvoices.Count} invoice(s) for student {studentId}",
                studentInvoices.Count > 0
            );
        }

        public BillingResponse GetInvoicesByStatus(string status)
        {
            var statusInvoices = invoices.Where(i => i.Status.Equals(status, StringComparison.OrdinalIgnoreCase)).ToList();
            return new BillingResponse(
                statusInvoices,
                $"Found {statusInvoices.Count} invoice(s) with status {status}",
                statusInvoices.Count > 0
            );
        }

        public BillingResponse CreateInvoice(Invoice invoice)
        {
            try
            {
                invoice.Id = invoices.Count > 0 ? invoices.Max(i => i.Id) + 1 : 1;
                invoice.CreatedDate = DateTime.Now;
                invoices.Add(invoice);

                return new BillingResponse(
                    new List<Invoice> { invoice },
                    $"Invoice {invoice.Id} created successfully",
                    true
                );
            }
            catch (Exception ex)
            {
                return new BillingResponse(
                    new List<Invoice>(),
                    $"Error creating invoice: {ex.Message}",
                    false
                );
            }
        }

        public BillingResponse PayInvoice(int invoiceId, Payment payment)
        {
            try
            {
                var invoice = invoices.FirstOrDefault(i => i.Id == invoiceId);
                if (invoice == null)
                {
                    return new BillingResponse(
                        new List<Invoice>(),
                        $"Invoice {invoiceId} not found",
                        false
                    );
                }

                if (payment.Amount != invoice.Amount)
                {
                    return new BillingResponse(
                        new List<Invoice>(),
                        $"Payment amount {payment.Amount} does not match invoice amount {invoice.Amount}",
                        false
                    );
                }

                payment.Id = payments.Count > 0 ? payments.Max(p => p.Id) + 1 : 1;
                payment.InvoiceId = invoiceId;
                payment.PaymentDate = DateTime.Now;
                payments.Add(payment);

                invoice.Status = "PAID";

                return new BillingResponse(
                    new List<Invoice> { invoice },
                    $"Payment processed successfully. Invoice {invoiceId} marked as PAID",
                    true
                );
            }
            catch (Exception ex)
            {
                return new BillingResponse(
                    new List<Invoice>(),
                    $"Error processing payment: {ex.Message}",
                    false
                );
            }
        }

        public decimal CalculateTotalDue(int studentId)
        {
            var studentInvoices = invoices.Where(i => i.StudentId == studentId && i.Status != "PAID").ToList();
            return studentInvoices.Sum(i => i.Amount);
        }
    }
}
