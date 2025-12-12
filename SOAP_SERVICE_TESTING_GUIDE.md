# Course SOAP Service - Testing Guide

## Service Information

| Property | Value |
|----------|-------|
| Service URL | `http://localhost:8083/ws/courses` |
| WSDL URL | `http://localhost:8083/ws/courses?wsdl` |
| Health Endpoint | `http://localhost:8083/actuator/health` |
| Port | 8083 |
| Protocol | SOAP 1.1 |
| Namespace | `http://soap.universite.com/course` |

---

## 1. Check Service Health

### Using cURL
```bash
curl http://localhost:8083/actuator/health
```

### Expected Response
```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP"
    }
  }
}
```

---

## 2. Retrieve WSDL

### Using Browser
Navigate to: `http://localhost:8083/ws/courses?wsdl`

### Using cURL
```bash
curl http://localhost:8083/ws/courses?wsdl
```

### What You Should See
- XML WSDL definition
- Service name: CourseService
- Port name: CourseServicePort
- 6 operations listed
- Type definitions for all request/response classes

---

## 3. Test SOAP Operations

### 3.1 GetCourses (Get All Courses)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCoursesRequest/>
    </soap:Body>
</soap:Envelope>
```

#### Using cURL
```bash
curl -X POST http://localhost:8083/ws/courses \
  -H "Content-Type: application/soap+xml; charset=UTF-8" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCoursesRequest/>
    </soap:Body>
</soap:Envelope>'
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <soap:Body>
            <CourseResponse xmlns="http://soap.universite.com/course">
                <courses>
                    <id>1</id>
                    <code>SOA101</code>
                    <title>Architecture SOA</title>
                    <description>Introduction à l'Architecture Orientée Services</description>
                    <credits>3</credits>
                    <professor>Dr. Bennani</professor>
                    <room>Salle 101</room>
                    <schedule>Lundi 09:00-11:00</schedule>
                </courses>
                <courses>
                    <id>2</id>
                    <code>WEB101</code>
                    <title>Développement Web</title>
                    <description>Web Services REST et SOAP</description>
                    <credits>3</credits>
                    <professor>Dr. Hassan</professor>
                    <room>Salle 102</room>
                    <schedule>Mercredi 14:00-16:00</schedule>
                </courses>
                <!-- ... more courses ... -->
                <message>Successfully retrieved 5 courses</message>
                <success>true</success>
            </CourseResponse>
        </soap:Body>
    </soap:Envelope>
```

### 3.2 GetCourseById (Get Specific Course)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCourseByIdRequest>
            <id>1</id>
        </ws:GetCourseByIdRequest>
    </soap:Body>
</soap:Envelope>
```

#### Using cURL
```bash
curl -X POST http://localhost:8083/ws/courses \
  -H "Content-Type: application/soap+xml; charset=UTF-8" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCourseByIdRequest>
            <id>1</id>
        </ws:GetCourseByIdRequest>
    </soap:Body>
</soap:Envelope>'
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <Course xmlns="http://soap.universite.com/course">
            <id>1</id>
            <code>SOA101</code>
            <title>Architecture SOA</title>
            <description>Introduction à l'Architecture Orientée Services</description>
            <credits>3</credits>
            <professor>Dr. Bennani</professor>
            <room>Salle 101</room>
            <schedule>Lundi 09:00-11:00</schedule>
        </Course>
    </soap:Body>
</soap:Envelope>
```

### 3.3 SearchCourses (Full-Text Search)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:SearchCoursesRequest>
            <query>Java</query>
        </ws:SearchCoursesRequest>
    </soap:Body>
</soap:Envelope>
```

#### Using cURL
```bash
curl -X POST http://localhost:8083/ws/courses \
  -H "Content-Type: application/soap+xml; charset=UTF-8" \
  -d '<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:SearchCoursesRequest>
            <query>Java</query>
        </ws:SearchCoursesRequest>
    </soap:Body>
</soap:Envelope>'
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <CourseResponse xmlns="http://soap.universite.com/course">
            <courses>
                <id>4</id>
                <code>JAVA101</code>
                <title>Programmation Java</title>
                <description>Java OOP et Spring Framework</description>
                <credits>4</credits>
                <professor>Dr. Mohamed</professor>
                <room>Salle 104</room>
                <schedule>Mardi 09:00-11:00</schedule>
            </courses>
            <message>Found 1 matching course(s)</message>
            <success>true</success>
        </CourseResponse>
    </soap:Body>
</soap:Envelope>
```

### 3.4 GetCourseTimetable (Get Schedule)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCourseTimetableRequest>
            <courseId>1</courseId>
        </ws:GetCourseTimetableRequest>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <TimetableResponse xmlns="http://soap.universite.com/course">
            <timetable>
                <courseId>1</courseId>
                <dayOfWeek>Lundi</dayOfWeek>
                <startTime>09:00</startTime>
                <endTime>11:00</endTime>
                <room>Salle 101</room>
                <professor>Dr. Bennani</professor>
                <capacity>30</capacity>
            </timetable>
            <timetable>
                <courseId>1</courseId>
                <dayOfWeek>Mercredi</dayOfWeek>
                <startTime>09:00</startTime>
                <endTime>11:00</endTime>
                <room>Salle 101</room>
                <professor>Dr. Bennani</professor>
                <capacity>30</capacity>
            </timetable>
            <message>Found 2 schedule(s)</message>
            <success>true</success>
        </TimetableResponse>
    </soap:Body>
</soap:Envelope>
```

### 3.5 GetTeachersForCourse (Get Instructors)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetTeachersForCourseRequest>
            <courseId>1</courseId>
        </ws:GetTeachersForCourseRequest>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <TeacherResponse xmlns="http://soap.universite.com/course">
            <teacher>Dr. Bennani</teacher>
            <message>Teacher: Dr. Bennani</message>
            <success>true</success>
        </TeacherResponse>
    </soap:Body>
</soap:Envelope>
```

### 3.6 GetCoursesByCode (Filter by Code)

#### SOAP Request
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
               xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCoursesByCodeRequest>
            <code>SOA</code>
        </ws:GetCoursesByCodeRequest>
    </soap:Body>
</soap:Envelope>
```

#### Expected Response
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <CourseResponse xmlns="http://soap.universite.com/course">
            <courses>
                <id>1</id>
                <code>SOA101</code>
                <title>Architecture SOA</title>
                <description>Introduction à l'Architecture Orientée Services</description>
                <credits>3</credits>
                <professor>Dr. Bennani</professor>
                <room>Salle 101</room>
                <schedule>Lundi 09:00-11:00</schedule>
            </courses>
            <message>Found 1 course(s)</message>
            <success>true</success>
        </CourseResponse>
    </soap:Body>
</soap:Envelope>
```

---

## 4. Mock Data Reference

### Available Courses

| ID | Code | Title | Credits | Professor |
|----|------|-------|---------|-----------|
| 1 | SOA101 | Architecture SOA | 3 | Dr. Bennani |
| 2 | WEB101 | Développement Web | 3 | Dr. Hassan |
| 3 | DB101 | Bases de données | 4 | Dr. Ahmed |
| 4 | JAVA101 | Programmation Java | 4 | Dr. Mohamed |
| 5 | CLOUD101 | Cloud Computing | 3 | Dr. Fatima |

### Available Schedules
- Course 1: Lundi 09:00-11:00, Mercredi 09:00-11:00 (Capacity: 30)
- Course 2: Mercredi 14:00-16:00, Vendredi 14:00-16:00 (Capacity: 25)
- Course 3: Vendredi 10:00-12:00, Mardi 10:00-12:00 (Capacity: 35)

---

## 5. Troubleshooting

### Service Not Starting
```bash
docker-compose logs course-soap-service
```

### WSDL Not Generated
- Check: `http://localhost:8083/ws/courses?wsdl`
- Verify SoapConfig.java is loaded
- Check logs for SOAP configuration errors

### SOAP Request Fails
1. Verify XML namespace: `http://soap.universite.com/course`
2. Check request/response structure matches WSDL
3. Review logs at: `http://localhost:8083/actuator/health`

### Port Already in Use
```bash
# Windows
Get-Process | Where-Object {$_.Port -eq 8083}

# Linux
lsof -i :8083

# Change port in application.yml
server:
  port: 8083
```

---

## 6. Tools for SOAP Testing

### GUI Tools
- **SoapUI** - Full-featured SOAP testing tool
- **Postman** - REST/SOAP API testing
- **VS Code REST Client** - REST Client extension

### Command-Line Tools
```bash
# Using curl
curl -X POST http://localhost:8083/ws/courses \
  -H "Content-Type: application/soap+xml" \
  -d @soap-request.xml

# Using wget
wget --post-file=soap-request.xml \
  --header="Content-Type: application/soap+xml" \
  http://localhost:8083/ws/courses
```

### Java Client Example
```java
import javax.xml.soap.*;
import javax.xml.transform.Source;
import java.net.URL;

// Create SOAP connection
SOAPConnectionFactory factory = SOAPConnectionFactory.newInstance();
SOAPConnection connection = factory.createConnection();

// Call SOAP service
URL endpoint = new URL("http://localhost:8083/ws/courses");
SOAPMessage response = connection.call(soapRequest, endpoint);

// Process response
connection.close();
```

---

## 7. Quick Start Test Script

### PowerShell Test Script
```powershell
# Test Health
$health = Invoke-WebRequest -Uri "http://localhost:8083/actuator/health"
Write-Host "Health Status: $($health.StatusCode)"

# Test WSDL
$wsdl = Invoke-WebRequest -Uri "http://localhost:8083/ws/courses?wsdl"
Write-Host "WSDL Status: $($wsdl.StatusCode)"
Write-Host "WSDL Content Length: $($wsdl.Content.Length) bytes"

# Test GetCourses
$soap = @"
<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ws="http://soap.universite.com/course">
    <soap:Body>
        <ws:GetCoursesRequest/>
    </soap:Body>
</soap:Envelope>
"@

$response = Invoke-WebRequest -Uri "http://localhost:8083/ws/courses" `
  -Method POST `
  -ContentType "application/soap+xml; charset=UTF-8" `
  -Body $soap

Write-Host "GetCourses Status: $($response.StatusCode)"
Write-Host "Response Content Length: $($response.Content.Length) bytes"
```

---

## 8. Validation Checklist

- [ ] Service starts without errors
- [ ] Health endpoint returns UP status
- [ ] WSDL loads at /ws/courses?wsdl
- [ ] WSDL contains 6 operations
- [ ] GetCourses returns 5 courses
- [ ] GetCourseById(1) returns SOA101 course
- [ ] SearchCourses("Java") returns 1 result
- [ ] GetCourseTimetable(1) returns 2 schedules
- [ ] GetTeachersForCourse(1) returns Dr. Bennani
- [ ] GetCoursesByCode("SOA") returns 1 result

---

**All tests should complete successfully!** 🎉
