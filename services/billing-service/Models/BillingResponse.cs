using System.Collections.Generic;

namespace BillingService.Models
{
    public class BillingResponse
    {
        public List<Invoice> Invoices { get; set; }

        public string Message { get; set; }

        public bool Success { get; set; }

        public BillingResponse()
        {
            Invoices = new List<Invoice>();
        }

        public BillingResponse(List<Invoice> invoices, string message, bool success)
        {
            Invoices = invoices ?? new List<Invoice>();
            Message = message;
            Success = success;
        }
    }
}
