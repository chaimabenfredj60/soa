# Système d'Information Universitaire - Architecture SOA

## 📋 Vue d'ensemble
Projet universitaire implementant une architecture Service-Oriented (SOA) avec une interface frontend moderne en React et des services backend diversifiés.

## 🏗️ Architecture

### Services Backend

| Service | Type | Technologie | Port | Fonction |
|---------|------|-------------|------|----------|
| **API Gateway** | REST | Spring Cloud | 8080 | Routage et agrégation des services |
| **Auth Service** | REST | Spring Boot | 8081 | Authentification et JWT |
| **Student Service** | REST | Node.js/Express | 3000 | CRUD Étudiants |
| **Course Service** | SOAP | Java/JAX-WS | 8082 | Gestion des cours |
| **Grade Service** | REST | Python/FastAPI | 8000 | Gestion des notes |
| **Billing Service** | SOAP | .NET Core | 5000 | Gestion facturation |

### Frontend
- **Technology**: React.js
- **Port**: 3001
- **Features**: Login, Dashboard, Student Management, Grades, Billing, Admin Panel

## 📁 Structure du Projet

```
projet-soa-universite/
├── frontend/                 # Application React
├── services/
│   ├── auth-service/        # Spring Boot REST
│   ├── student-service/     # Node.js/Express REST
│   ├── course-service/      # Java/JAX-WS SOAP
│   ├── grade-service/       # Python/FastAPI REST
│   ├── billing-service/     # .NET Core SOAP
│   └── api-gateway/         # Spring Cloud
├── docker/                  # Docker & Docker Compose
├── documentation/           # Cahier des charges, specs
└── presentations/           # Soutenance & démo
```

## 🚀 Démarrage Rapide

### Prérequis
- Docker & Docker Compose
- Node.js 18+
- Java 17+
- Python 3.10+
- .NET Core 6+

### Installation

```bash
# Frontend
cd frontend
npm install
npm start

# Services (avec Docker)
cd docker
docker-compose up -d
```

## 📚 Documentation
- [Cahier des Charges](documentation/cahier-des-charges.md)
- [Spécifications Techniques](documentation/specifications-techniques.md)
- [Manuel d'Utilisation](documentation/manuel-utilisation.md)

## 🔐 Sécurité
- JWT pour l'authentification
- HTTPS/TLS pour les communications
- Gestion des accès par rôles (RBAC)

## 👥 Compétences Techniques Acquises
- ✅ Architecture SOA (3 points)
- ✅ Services web RESTful et SOAP (5 points)
- ✅ Sécurité des services (bonus)
- ✅ Interopérabilité entre systèmes (2 points)
- ✅ Déploiement et conteneurisation (2 points)

## 📝 Licence
Projet universitaire 2025
