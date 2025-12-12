# Spécifications Techniques

## Architecture SOA - Vue d'ensemble

### 1. Architecture Générale

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                         │
│                    Port: 3001                               │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────────┐
│            API Gateway (Spring Cloud)                       │
│            Port: 8080 - Routage & Agrégation              │
└────────────┬──────────────┬──────────────┬──────────────────┘
             │              │              │
    ┌────────▼──┐  ┌────────▼──┐ ┌───────▼──┐
    │Auth Service│  │Student Svc│ │Course Svc │
    │Spring Boot │  │Node.js    │ │Java/SOAP  │
    │Port: 8081  │  │Port: 3000 │ │Port: 8082 │
    └────────────┘  └───────────┘ └───────────┘
    
    ┌────────────┐  ┌───────────┐
    │Grade Service│  │Billing Svc │
    │Python/FA   │  │.NET Core   │
    │Port: 8000  │  │Port: 5000  │
    └────────────┘  └───────────┘
```

### 2. Composants Principaux

#### 2.1 Frontend
- **Framework**: React 18
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI (MUI)
- **HTTP Client**: Axios
- **Port**: 3001

**Fonctionnalités**:
- Authentication avec JWT
- Dashboard personnalisé
- Gestion CRUD des ressources
- Graphiques et statistiques
- Responsive Design

#### 2.2 API Gateway
- **Framework**: Spring Cloud Gateway
- **Port**: 8080
- **Responsabilités**:
  - Routage des requêtes
  - Load balancing
  - Circuit breaking
  - Logging centralisé

#### 2.3 Services Backend

##### Auth Service
- **Type**: REST
- **Framework**: Spring Boot
- **Port**: 8081
- **Base de données**: PostgreSQL
- **Responsabilités**:
  - Authentification utilisateur
  - Génération JWT
  - Gestion des rôles
  - Token refresh

##### Student Service
- **Type**: REST
- **Framework**: Node.js/Express
- **Port**: 3000
- **Base de données**: MongoDB
- **Responsabilités**:
  - CRUD des étudiants
  - Recherche et filtrage
  - Import/Export

##### Course Service
- **Type**: SOAP (JAX-WS)
- **Framework**: Java Spring Boot
- **Port**: 8082
- **Base de données**: PostgreSQL
- **Responsabilités**:
  - Gestion des cours
  - Emploi du temps
  - Attribution aux enseignants

##### Grade Service
- **Type**: REST
- **Framework**: Python/FastAPI
- **Port**: 8000
- **Base de données**: PostgreSQL
- **Responsabilités**:
  - Saisie des notes
  - Calcul des moyennes
  - Relevés de notes

##### Billing Service
- **Type**: SOAP
- **Framework**: .NET Core
- **Port**: 5000
- **Base de données**: SQL Server
- **Responsabilités**:
  - Génération des factures
  - Suivi des paiements
  - Frais universitaires

### 3. Flux d'Authentification

```
1. Utilisateur envoie credentials (email, password)
   ↓
2. Auth Service valide les credentials
   ↓
3. Génération JWT
   ↓
4. Stockage du token en localStorage (Frontend)
   ↓
5. Token inclus dans les headers pour les requêtes suivantes
```

### 4. Flux de Communication

```
Frontend Request:
  ↓
API Gateway (Port 8080)
  ↓
Service spécifique
  ↓
Base de données
  ↓
Response
```

## Sécurité

### JWT Implementation
```yaml
Header: Authorization: Bearer <token>
Expiration: 24 heures
Secret: Défini via variable d'environnement JWT_SECRET
```

### Endpoints Protégés
- Toutes les routes sauf `/login`
- Validation du token obligatoire
- Vérification des rôles si nécessaire

## Déploiement Docker

### Services Containerisés
- Frontend (Node.js serve)
- API Gateway
- Auth Service
- Student Service
- Grade Service
- Course Service
- Billing Service

### Réseaux Docker
- **Réseau**: soa-network
- **Type**: bridge
- Communication inter-conteneurs par service name

### Volumes
- Base de données persistante
- Logs centralisés

## Performance

### Critères
- Temps de réponse: < 500ms
- Concurrence: Support de 1000+ utilisateurs
- Disponibilité: 99.5%

### Optimisations
- Caching des réponses
- Pagination des listes
- Compression des données
- CDN pour assets statiques

## Intégration Continue

### Build & Test
- GitHub Actions
- Tests unitaires
- Tests d'intégration
- Linting et formatage

### Déploiement
- Build Docker automatique
- Push vers registre
- Déploiement orchestré
