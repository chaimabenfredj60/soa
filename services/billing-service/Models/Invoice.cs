using System;

namespace BillingService.Models
{
    public class Invoice
    {
        public int Id { get; set; }

        public int StudentId { get; set; }

        public decimal Amount { get; set; }

        public string Status { get; set; } // PAID, PENDING, OVERDUE

        public DateTime DueDate { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Description { get; set; }

        public Invoice()
        {
        }

        public Invoice(int id, int studentId, decimal amount, string status, DateTime dueDate, DateTime createdDate)
        {
            Id = id;
            StudentId = studentId;
            Amount = amount;
            Status = status;
            DueDate = dueDate;
            CreatedDate = createdDate;
            Description = "University fees";
        }
    }
}
