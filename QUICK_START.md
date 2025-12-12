# 🎯 Accès aux Services SOA - Guide Rapide

## Services actifs et testés ✅

### 1. Frontend React
- **URL**: http://localhost:3001
- **Status**: ✅ 200 OK
- **Fonctionnalités**:
  - Dashboard étudiant
  - Gestion des cours
  - Visualisation des notes
  - Facturation
  - Administration

### 2. Auth Service (Authentification JWT)
- **Base URL**: http://localhost:8081
- **Status**: ✅ 200 OK

#### Endpoints:
```bash
# Health check
GET http://localhost:8081/health
Response: {"status":"OK","service":"auth-service"}

# Login
POST http://localhost:8081/login
Body: {"username":"admin","password":"password"}
Response: {"token":"...", "username":"admin", "role":"ROLE_ADMIN", ...}

# Vérifier token
POST http://localhost:8081/verify
Body: {"token":"<jwt-token>"}

# Enregistrer utilisateur
POST http://localhost:8081/register
Body: {"username":"newuser","password":"pass","email":"user@test.com","role":"ROLE_STUDENT"}
```

#### Utilisateurs de test:
| Username | Password | Role |
|----------|----------|------|
| admin | password | ROLE_ADMIN |
| student1 | password | ROLE_STUDENT |
| professor1 | password | ROLE_PROFESSOR |

### 3. Student Service (Gestion étudiants)
- **Base URL**: http://localhost:3000
- **Status**: ✅ 200 OK

#### Endpoints:
```bash
# Tous les étudiants
GET http://localhost:3000/api/students
Response: [{"id":1,"name":"Ahmed Bennani","email":"ahmed@email.com",...}]

# Un étudiant
GET http://localhost:3000/api/students/:id

# Créer étudiant
POST http://localhost:3000/api/students
Body: {"name":"John Doe","email":"john@test.com","matricule":"STU123"}

# Modifier étudiant
PUT http://localhost:3000/api/students/:id
Body: {...}

# Supprimer étudiant
DELETE http://localhost:3000/api/students/:id
```

### 4. Grade Service (Notes et calculs)
- **Base URL**: http://localhost:8000
- **Status**: ✅ 200 OK

#### Endpoints:
```bash
# Health check
GET http://localhost:8000/api/grades/health
Response: {"status":"OK","service":"grade-service"}

# Notes d'un étudiant
GET http://localhost:8000/api/grades/student/:student_id
Response: {"student_id":1,"grades":[{"course":"Math","grade":16,...}]}

# Note spécifique
GET http://localhost:8000/api/grades/:grade_id
Response: {"id":1,"student_id":1,"course":"Math","grade":16,...}

# Ajouter une note
POST http://localhost:8000/api/grades
Body: {"student_id":1,"course":"Math","grade":16,"credits":3}

# Moyenne de l'étudiant
GET http://localhost:8000/api/grades/average/:student_id
Response: {"student_id":1,"average":15.5}
```

### 5. PostgreSQL Database
- **Host**: localhost
- **Port**: 5432
- **User**: postgres
- **Password**: postgres
- **Database**: soa_db
- **Status**: ✅ Healthy

#### Tables disponibles:
- `users` - Utilisateurs du système
- `courses` - Catalogues de cours
- `grades` (si initialisée)

## 🔐 Authentification JWT

### Exemple complet de flux d'authentification:

```powershell
# 1. Se connecter
$login = @{username="admin"; password="password"} | ConvertTo-Json
$auth = Invoke-WebRequest -Uri "http://localhost:8081/login" `
  -Method Post -ContentType "application/json" -Body $login
$token = ($auth.Content | ConvertFrom-Json).token

# 2. Utiliser le token pour accéder aux ressources protégées
$headers = @{"Authorization" = "Bearer $token"}
$response = Invoke-WebRequest -Uri "http://localhost:8000/api/grades/student/1" `
  -Method Get -Headers $headers
```

## 📊 Données de test disponibles

### Étudiants
- ID 1: Ahmed Bennani (ahmed@email.com)
- ID 2: Fatima Hassan (fatima@email.com)

### Cours (à initialiser)
- SOA101: Architecture SOA (3 crédits)
- WEB101: Développement Web (3 crédits)
- DB101: Bases de données (3 crédits)

### Notes d'exemple
- Étudiant 1: Architecture SOA (16/20), Web Avancé (14/20)

## 🚀 Commandes docker utiles

```bash
# Voir tous les conteneurs
docker-compose ps

# Voir les logs d'un service
docker-compose logs auth-service
docker-compose logs -f student-service  # en temps réel

# Redémarrer un service
docker-compose restart auth-service

# Arrêter tous les services
docker-compose down

# Relancer tous les services
docker-compose up -d

# Nettoyer complètement
docker-compose down -v
docker system prune -a
```

## 🔧 Services en cours de déploiement

### Course Service (Java/Spring Boot)
- **Port attendu**: 8082
- **Status**: En compilation...
- **Endpoint attendu**: `GET /api/course/courses`

### API Gateway (Spring Cloud)
- **Port attendu**: 8080
- **Status**: En préparation
- **Fonction**: Router central vers tous les services

### Billing Service (.NET Core)
- **Port attendu**: 5000
- **Status**: Non encore lancé

## 📋 Configuration Docker

### Volumes
- `docker_postgres_data` - Données PostgreSQL (persistant)

### Network
- `docker_soa-network` - Réseau privé Docker (bridge)

### Variables d'environnement
- `JWT_SECRET` - Clé JWT (configurable)
- `POSTGRES_USER` - postgres
- `POSTGRES_PASSWORD` - postgres
- `POSTGRES_DB` - soa_db

## ✅ Checklist de vérification

- [x] Frontend React actif
- [x] Auth Service actif
- [x] Student Service actif
- [x] Grade Service actif
- [x] PostgreSQL actif
- [x] JWT fonctionnel
- [x] Authentification testée
- [x] Communication inter-services possible
- [ ] Course Service actif
- [ ] API Gateway actif
- [ ] Billing Service actif

---

**Dernière mise à jour**: 11 décembre 2025  
**Services actifs**: 5/8 (62.5%)  
**Status global**: ✅ Opérationnel
