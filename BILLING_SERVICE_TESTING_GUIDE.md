# Billing Service (SOAP) - Testing Guide

## Service Information

| Property | Value |
|----------|-------|
| Service URL | `http://localhost:5000/ws/billing` |
| WSDL URL | `http://localhost:5000/ws/billing?wsdl` |
| Health Endpoint | `http://localhost:5000/health` |
| Port | 5000 |
| Protocol | SOAP 1.1 |
| Namespace | `http://soap.universite.com/billing` |

---

## 1. Check Service Health

### Using cURL
```bash
curl http://localhost:5000/health
```

### Expected Response
```json
{
  "status": "OK",
  "service": "billing-service"
}
```

---

## 2. Retrieve WSDL

### Using Browser
Navigate to: `http://localhost:5000/ws/billing?wsdl`

### Using cURL
```bash
curl http://localhost:5000/ws/billing?wsdl
```

### What You Should See
- XML WSDL definition
- Service name: BillingService
- 7 operations listed
- Type definitions for Invoice, Payment, BillingResponse

---

## 3. Test SOAP Operations

### 3.1 GetAllInvoices

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:GetAllInvoices/>
    </soap:Body>
</soap:Envelope>
```

#### Using cURL
```bash
curl -X POST http://localhost:5000/ws/billing \
  -H "Content-Type: application/soap+xml; charset=UTF-8" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:GetAllInvoices/>
    </soap:Body>
</soap:Envelope>'
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <BillingResponse xmlns="http://soap.universite.com/billing">
            <Invoices>
                <Id>1</Id>
                <StudentId>1</StudentId>
                <Amount>1500</Amount>
                <Status>PAID</Status>
                <DueDate>2025-12-15T00:00:00</DueDate>
                <CreatedDate>2025-11-15T00:00:00</CreatedDate>
                <Description>University fees</Description>
            </Invoices>
            <!-- ... more invoices ... -->
            <Message>Retrieved 4 invoices</Message>
            <Success>true</Success>
        </BillingResponse>
    </soap:Body>
</soap:Envelope>
```

---

### 3.2 GetInvoiceById

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:GetInvoiceById>
            <invoiceId>1</invoiceId>
        </bill:GetInvoiceById>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <Invoice xmlns="http://soap.universite.com/billing">
            <Id>1</Id>
            <StudentId>1</StudentId>
            <Amount>1500</Amount>
            <Status>PAID</Status>
            <DueDate>2025-12-15T00:00:00</DueDate>
            <CreatedDate>2025-11-15T00:00:00</CreatedDate>
            <Description>University fees</Description>
        </Invoice>
    </soap:Body>
</soap:Envelope>
```

---

### 3.3 GetStudentInvoices

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:GetStudentInvoices>
            <studentId>1</studentId>
        </bill:GetStudentInvoices>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <BillingResponse xmlns="http://soap.universite.com/billing">
            <Invoices>
                <Id>1</Id>
                <StudentId>1</StudentId>
                <Amount>1500</Amount>
                <Status>PAID</Status>
                <!-- ... -->
            </Invoices>
            <Invoices>
                <Id>3</Id>
                <StudentId>1</StudentId>
                <Amount>1200</Amount>
                <Status>OVERDUE</Status>
                <!-- ... -->
            </Invoices>
            <Message>Found 2 invoice(s) for student 1</Message>
            <Success>true</Success>
        </BillingResponse>
    </soap:Body>
</soap:Envelope>
```

---

### 3.4 GetInvoicesByStatus

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:GetInvoicesByStatus>
            <status>PENDING</status>
        </bill:GetInvoicesByStatus>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <BillingResponse xmlns="http://soap.universite.com/billing">
            <Invoices>
                <Id>2</Id>
                <StudentId>2</StudentId>
                <Amount>1500</Amount>
                <Status>PENDING</Status>
                <!-- ... -->
            </Invoices>
            <Invoices>
                <Id>4</Id>
                <StudentId>3</StudentId>
                <Amount>1500</Amount>
                <Status>PENDING</Status>
                <!-- ... -->
            </Invoices>
            <Message>Found 2 invoice(s) with status PENDING</Message>
            <Success>true</Success>
        </BillingResponse>
    </soap:Body>
</soap:Envelope>
```

---

### 3.5 CalculateTotalDue

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:CalculateTotalDue>
            <studentId>1</studentId>
        </bill:CalculateTotalDue>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <CalculateTotalDueResponse xmlns="http://soap.universite.com/billing">
            <CalculateTotalDueResult>1200</CalculateTotalDueResult>
        </CalculateTotalDueResponse>
    </soap:Body>
</soap:Envelope>
```
**Note**: Total due for student 1 is 1200 EUR (1500 from invoice 1 is PAID, 1200 from invoice 3 is OVERDUE)

---

### 3.6 CreateInvoice

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:CreateInvoice>
            <invoice>
                <StudentId>4</StudentId>
                <Amount>1800</Amount>
                <Status>PENDING</Status>
                <DueDate>2026-02-28T00:00:00</DueDate>
                <Description>Spring semester fees</Description>
            </invoice>
        </bill:CreateInvoice>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <BillingResponse xmlns="http://soap.universite.com/billing">
            <Invoices>
                <Id>5</Id>
                <StudentId>4</StudentId>
                <Amount>1800</Amount>
                <Status>PENDING</Status>
                <DueDate>2026-02-28T00:00:00</DueDate>
                <CreatedDate>2025-12-11T10:30:00</CreatedDate>
                <Description>Spring semester fees</Description>
            </Invoices>
            <Message>Invoice 5 created successfully</Message>
            <Success>true</Success>
        </BillingResponse>
    </soap:Body>
</soap:Envelope>
```

---

### 3.7 PayInvoice

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:bill="http://soap.universite.com/billing">
    <soap:Body>
        <bill:PayInvoice>
            <invoiceId>2</invoiceId>
            <payment>
                <Amount>1500</Amount>
                <Method>CREDIT_CARD</Method>
            </payment>
        </bill:PayInvoice>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <BillingResponse xmlns="http://soap.universite.com/billing">
            <Invoices>
                <Id>2</Id>
                <StudentId>2</StudentId>
                <Amount>1500</Amount>
                <Status>PAID</Status>
                <DueDate>2025-12-31T00:00:00</DueDate>
                <CreatedDate>2025-12-01T00:00:00</CreatedDate>
                <Description>University fees</Description>
            </Invoices>
            <Message>Payment processed successfully. Invoice 2 marked as PAID</Message>
            <Success>true</Success>
        </BillingResponse>
    </soap:Body>
</soap:Envelope>
```

---

## Mock Data Reference

### Sample Invoices

| ID | Student | Amount | Status | Due Date | Created |
|----|---------|--------|--------|----------|---------|
| 1 | 1 | 1500 EUR | PAID | 2025-12-15 | 2025-11-15 |
| 2 | 2 | 1500 EUR | PENDING | 2025-12-31 | 2025-12-01 |
| 3 | 1 | 1200 EUR | OVERDUE | 2025-11-30 | 2025-10-30 |
| 4 | 3 | 1500 EUR | PENDING | 2026-01-31 | 2025-12-01 |

### Sample Payments

| ID | Invoice | Amount | Method | Date |
|----|---------|--------|--------|------|
| 1 | 1 | 1500 EUR | CREDIT_CARD | 2025-12-10 |
| 2 | 3 | 600 EUR | BANK_TRANSFER | 2025-12-05 |

---

## Troubleshooting

### Service Not Starting
```bash
docker-compose logs billing-service
```

### WSDL Not Loading
- Check: `http://localhost:5000/ws/billing?wsdl`
- Verify Program.cs is correct
- Check .NET Core SDK version

### SOAP Request Fails
1. Verify XML namespace: `http://soap.universite.com/billing`
2. Check request structure matches WSDL
3. Review service logs

### Port Already in Use
```bash
# Windows
Get-NetTCPConnection -LocalPort 5000

# Find and stop the process
Get-Process | Where-Object {$_.Port -eq 5000}
```

---

## Tools for SOAP Testing

### GUI Tools
- **SoapUI** - Professional SOAP testing
- **Postman** - REST/SOAP client
- **VS Code REST Client** - Lightweight testing

### Command-Line
```bash
# Using curl
curl -X POST http://localhost:5000/ws/billing \
  -H "Content-Type: application/soap+xml" \
  -d @soap-request.xml

# Using wget
wget --post-file=soap-request.xml \
  --header="Content-Type: application/soap+xml" \
  http://localhost:5000/ws/billing
```

### .NET Client Example
```csharp
// Generate service reference from WSDL
var client = new BillingServiceClient(new BasicHttpBinding(), 
    new EndpointAddress("http://localhost:5000/ws/billing"));

// Call operation
var invoices = client.GetAllInvoices();
```

---

## Quick Test Checklist

- [ ] Service starts without errors
- [ ] Health endpoint returns 200 OK
- [ ] WSDL loads at /ws/billing?wsdl
- [ ] WSDL contains 7 operations
- [ ] GetAllInvoices returns 4 invoices
- [ ] GetInvoiceById(1) returns invoice with ID 1
- [ ] GetStudentInvoices(1) returns 2 invoices
- [ ] GetInvoicesByStatus("PENDING") returns 2 invoices
- [ ] CalculateTotalDue(1) returns 1200
- [ ] CreateInvoice creates new invoice successfully
- [ ] PayInvoice processes payment and updates status

---

All tests should complete successfully! 🎉
