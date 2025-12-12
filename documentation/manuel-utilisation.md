# Manuel d'Utilisation

## Installation et Démarrage

### Prérequis
- Docker & Docker Compose
- Node.js 18+ (pour développement local)
- Java 17+ (pour développement)
- Python 3.10+ (pour développement)
- Git

### 1. Cloner le projet
```bash
git clone <repository-url>
cd projet-soa-universite
```

### 2. Démarrer avec Docker Compose

```bash
cd docker
docker-compose up -d
```

#### Services actifs:
- Frontend: http://localhost:3001
- API Gateway: http://localhost:8080
- Auth Service: http://localhost:8081
- Student Service: http://localhost:3000
- Course Service: http://localhost:8082
- Grade Service: http://localhost:8000
- Billing Service: http://localhost:5000

### 3. Utilisateurs de test

#### Administrateur
- Email: `admin@universite.com`
- Mot de passe: `password123`
- Rôle: ADMIN

#### Étudiant
- Email: `student@universite.com`
- Mot de passe: `password123`
- Rôle: STUDENT

#### Enseignant
- Email: `teacher@universite.com`
- Mot de passe: `password123`
- Rôle: TEACHER

## Navigation dans l'Interface

### Dashboard
Affiche:
- Nombre total d'étudiants
- Nombre de cours
- Moyenne générale
- Factures en attente

Graphiques:
- Évolution des moyennes
- Répartition des notes

### Gestion des Étudiants
Fonctionnalités:
- ➕ Ajouter un nouvel étudiant
- ✏️ Modifier un étudiant existant
- 🗑️ Supprimer un étudiant
- Recherche par nom/email
- Export en CSV (optionnel)

### Cours
Affiche:
- Liste des cours disponibles
- Enseignant responsable
- Nombre de crédits
- Nombre d'étudiants inscrits

### Notes
Affiche:
- Relevé de notes de l'étudiant
- Moyenne générale pondérée
- Crédits par cours

### Facturation
Affiche:
- État des paiements
- Montants
- Dates de factures

Actions:
- 💳 Effectuer un paiement
- 📥 Télécharger les factures

### Administration (Admin only)
Accès à:
- Gestion complète des utilisateurs
- Configuration système
- Rapports et statistiques
- Logs d'audit

## API REST

### Authentification
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "User Name",
    "email": "user@example.com",
    "role": "STUDENT"
  }
}
```

### Étudiants
```bash
# Récupérer tous les étudiants
GET /api/students
Authorization: Bearer <token>

# Récupérer un étudiant par ID
GET /api/students/{id}
Authorization: Bearer <token>

# Créer un nouvel étudiant
POST /api/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ahmed Bennani",
  "email": "ahmed@example.com",
  "matricule": "STU001",
  "programme": "Informatique"
}

# Modifier un étudiant
PUT /api/students/{id}
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Ahmed Bennani Updated",
  ...
}

# Supprimer un étudiant
DELETE /api/students/{id}
Authorization: Bearer <token>
```

### Notes
```bash
# Récupérer les notes d'un étudiant
GET /api/grades/student/{studentId}
Authorization: Bearer <token>

# Moyenne d'un étudiant
GET /api/grades/average/{studentId}
Authorization: Bearer <token>

# Ajouter une note
POST /api/grades
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentId": 1,
  "courseId": 1,
  "grade": 16,
  "credits": 3
}
```

## Dépannage

### Le service ne démarre pas
```bash
# Vérifier les logs
docker-compose logs <service-name>

# Redémarrer un service
docker-compose restart <service-name>

# Reconstruire une image
docker-compose build --no-cache <service-name>
```

### Problèmes de connexion
1. Vérifier que l'API Gateway est accessible: http://localhost:8080/health
2. Vérifier les credentials (email/password)
3. Vérifier le token JWT dans les headers

### Base de données
```bash
# Accéder à PostgreSQL
docker exec -it postgres psql -U postgres

# Lister les databases
\l

# Se connecter à la DB
\c soa_db

# Voir les tables
\dt
```

## Développement Local

### Frontend
```bash
cd frontend
npm install
npm start
```

### Auth Service
```bash
cd services/auth-service
mvn spring-boot:run
```

### Student Service
```bash
cd services/student-service
npm install
npm start
```

### Grade Service
```bash
cd services/grade-service
pip install -r requirements.txt
python main.py
```

## Arrêter les services

```bash
# Arrêter tous les conteneurs
docker-compose down

# Arrêter et supprimer les volumes
docker-compose down -v

# Arrêter un service spécifique
docker-compose stop <service-name>
```

## Support et Aide

Pour plus d'informations:
- Consulter la documentation technique: `documentation/specifications-techniques.md`
- Cahier des charges: `documentation/cahier-des-charges.md`
- Logs des services: `docker-compose logs`
