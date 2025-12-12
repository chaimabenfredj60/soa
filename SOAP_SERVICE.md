# Service SOAP - Course Service

## ✅ SOAP Web Service Implémenté

### Service Details
- **URL:** http://localhost:8083
- **WSDL:** http://localhost:8083/?wsdl
- **Port:** 8083
- **Framework:** Spyne (Python)
- **Protocol:** SOAP 1.1

---

## 📋 Operations Disponibles

### 1. GetCourses
Récupère tous les cours

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:get_courses/>
    </soap-env:Body>
</soap-env:Envelope>
```

**Response:**
```xml
<?xml version='1.0' encoding='UTF-8'?>
<soap-env:Envelope xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/">
  <soap-env:Body>
    <ns0:get_coursesResponse xmlns:ns0="soa.universite.soap.course">
      <ns0:get_coursesResult>
        <ns0:Course>
          <ns0:id>1</ns0:id>
          <ns0:code>SOA101</ns0:code>
          <ns0:title>Architecture SOA</ns0:title>
          <ns0:description>Introduction à SOA</ns0:description>
          <ns0:credits>3</ns0:credits>
        </ns0:Course>
        <ns0:Course>
          <ns0:id>2</ns0:id>
          <ns0:code>WEB101</ns0:code>
          <ns0:title>Développement Web</ns0:title>
          <ns0:description>Web Services REST</ns0:description>
          <ns0:credits>3</ns0:credits>
        </ns0:Course>
        <ns0:Course>
          <ns0:id>3</ns0:id>
          <ns0:code>DB101</ns0:code>
          <ns0:title>Bases de données</ns0:title>
          <ns0:description>SQL and NoSQL</ns0:description>
          <ns0:credits>3</ns0:credits>
        </ns0:Course>
      </ns0:get_coursesResult>
    </ns0:get_coursesResponse>
  </soap-env:Body>
</soap-env:Envelope>
```

---

### 2. GetCourse (by ID)
Récupère un cours par son ID

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:get_course>
            <ns0:course_id>1</ns0:course_id>
        </ns0:get_course>
    </soap-env:Body>
</soap-env:Envelope>
```

---

### 3. CreateCourse
Crée un nouveau cours

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:create_course>
            <ns0:code>SOAP101</ns0:code>
            <ns0:title>Web Services SOAP</ns0:title>
            <ns0:description>Learning SOAP</ns0:description>
            <ns0:credits>4</ns0:credits>
        </ns0:create_course>
    </soap-env:Body>
</soap-env:Envelope>
```

---

### 4. UpdateCourse
Met à jour un cours existant

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:update_course>
            <ns0:course_id>1</ns0:course_id>
            <ns0:code>SOA101-UPDATED</ns0:code>
            <ns0:title>Advanced SOA Architecture</ns0:title>
            <ns0:description>Advanced topics</ns0:description>
            <ns0:credits>4</ns0:credits>
        </ns0:update_course>
    </soap-env:Body>
</soap-env:Envelope>
```

---

### 5. DeleteCourse
Supprime un cours

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:delete_course>
            <ns0:course_id>4</ns0:course_id>
        </ns0:delete_course>
    </soap-env:Body>
</soap-env:Envelope>
```

---

### 6. HealthCheck
Vérifie la santé du service

**Request:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<soap-env:Envelope 
    xmlns:soap-env="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ns0="soa.universite.soap.course">
    <soap-env:Body>
        <ns0:health_check/>
    </soap-env:Body>
</soap-env:Envelope>
```

---

## 🧪 Test avec Postman

### Paramètres Postman:
1. **URL:** `http://localhost:8083`
2. **Method:** POST
3. **Headers:**
   - Content-Type: `text/xml`
   - SOAPAction: (laisser vide)
4. **Body:** Copier un des exemples XML ci-dessus

---

## 🔄 Comparaison REST vs SOAP

| Aspect | REST (Port 8082) | SOAP (Port 8083) |
|--------|------------------|-----------------|
| Protocol | HTTP/JSON | SOAP/XML |
| Format | JSON | XML |
| Endpoint | /api/courses | /?wsdl |
| CRUD | Standard HTTP verbs | XML RPC |
| Caching | Easy (HTTP cache) | Difficile |
| Overhead | Léger | Lourd |
| Type | Moderne | Traditionnel |

---

## 📊 Architecture Complète

```
┌─────────────────────────────────┐
│     Frontend React (3001)       │
└─────────────────────────────────┘
              ↓
┌─────────────────────────────────┐
│   API Gateway (9090)            │
│   Route via HTTP/JSON           │
└─────────────────────────────────┘
         ↓            ↓
    REST API       SOAP API
    (8082)         (8083)
    Courses        Courses
    JSON/HTTP      XML/SOAP
```

---

## ✅ Status

- **REST API Courses:** http://localhost:8082 ✅
- **SOAP API Courses:** http://localhost:8083 ✅
- **WSDL:** http://localhost:8083/?wsdl ✅

**Tous les services web sont maintenant opérationnels!** 🚀

---

## 📝 Notes

- SOAP fournit une alternative traditionnelle mais robuste aux APIs REST
- Utile pour l'interopérabilité entre systèmes hérités
- Fortement typé grâce au WSDL
- Parfait pour démontrer la polyvalence de l'architecture SOA

