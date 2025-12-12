using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BillingService.Contracts;
using BillingService.Models;

namespace BillingService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BillingController : ControllerBase
    {
        private readonly IBillingService _billingService;

        public BillingController(IBillingService billingService)
        {
            _billingService = billingService;
        }

        /// <summary>
        /// Get all invoices
        /// </summary>
        [HttpGet("invoices")]
        public IActionResult GetAllInvoices()
        {
            try
            {
                var result = _billingService.GetAllInvoices();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Get invoice by ID
        /// </summary>
        [HttpGet("invoices/{invoiceId}")]
        public IActionResult GetInvoiceById(int invoiceId)
        {
            try
            {
                var result = _billingService.GetInvoiceById(invoiceId);
                if (result == null)
                    return NotFound(new { error = $"Invoice {invoiceId} not found" });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Get invoices for a student
        /// </summary>
        [HttpGet("students/{studentId}/invoices")]
        public IActionResult GetStudentInvoices(int studentId)
        {
            try
            {
                var result = _billingService.GetStudentInvoices(studentId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Get invoices by status
        /// </summary>
        [HttpGet("invoices/status/{status}")]
        public IActionResult GetInvoicesByStatus(string status)
        {
            try
            {
                var result = _billingService.GetInvoicesByStatus(status);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Create a new invoice
        /// </summary>
        [HttpPost("invoices")]
        public IActionResult CreateInvoice([FromBody] Invoice invoice)
        {
            try
            {
                if (invoice == null)
                    return BadRequest(new { error = "Invoice cannot be null" });

                var result = _billingService.CreateInvoice(invoice);
                return CreatedAtAction(nameof(GetInvoiceById), new { invoiceId = invoice.Id }, result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Process payment for an invoice
        /// </summary>
        [HttpPost("invoices/{invoiceId}/pay")]
        public IActionResult PayInvoice(int invoiceId, [FromBody] Payment payment)
        {
            try
            {
                if (payment == null)
                    return BadRequest(new { error = "Payment cannot be null" });

                var result = _billingService.PayInvoice(invoiceId, payment);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        /// <summary>
        /// Calculate total due for a student
        /// </summary>
        [HttpGet("students/{studentId}/total-due")]
        public IActionResult CalculateTotalDue(int studentId)
        {
            try
            {
                var totalDue = _billingService.CalculateTotalDue(studentId);
                return Ok(new { studentId = studentId, totalDue = totalDue });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
