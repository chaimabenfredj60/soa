using System;

namespace BillingService.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public int InvoiceId { get; set; }

        public decimal Amount { get; set; }

        public DateTime PaymentDate { get; set; }

        public string Method { get; set; } // CREDIT_CARD, BANK_TRANSFER, CASH

        public string TransactionId { get; set; }

        public Payment()
        {
        }

        public Payment(int id, int invoiceId, decimal amount, DateTime paymentDate, string method)
        {
            Id = id;
            InvoiceId = invoiceId;
            Amount = amount;
            PaymentDate = paymentDate;
            Method = method;
            TransactionId = $"TXN-{id}-{DateTime.UtcNow.Ticks}";
        }
    }
}
