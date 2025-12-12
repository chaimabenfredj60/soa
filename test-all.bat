@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║        🧪 TESTEUR AUTOMATIQUE - Système Universitaire SOA        ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.

REM Configuration
set "FRONTEND_URL=http://localhost:3001"
set "STUDENT_URL=http://localhost:3000/api/students"
set "GRADE_URL=http://localhost:8000/api/grades"
set "AUTH_EMAIL=admin@universite.com"
set "AUTH_PASSWORD=password123"

echo [%date% %time%] ⏱️  Démarrage des tests...
echo.

REM Test 1: Authentification (Login)
echo ════════════════════════════════════════════════════════════════════
echo [TEST 1/5] 🔐 AUTHENTIFICATION - Login
echo ════════════════════════════════════════════════════════════════════
echo Endpoint: POST %FRONTEND_URL%/api/auth/login
echo Email: %AUTH_EMAIL%
echo.

powershell -Command ^
  "$response = Invoke-WebRequest -Uri '%FRONTEND_URL%/api/auth/login' -Method POST -ContentType 'application/json' -Body '{\"email\":\"%AUTH_EMAIL%\",\"password\":\"%AUTH_PASSWORD%\"}' -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 200) { ^
    Write-Host '✓ Succès (200)' -ForegroundColor Green; ^
    $content = ConvertFrom-Json $response.Content; ^
    Write-Host 'Réponse:'; ^
    Write-Host ($content | ConvertTo-Json -Depth 5); ^
    $env:TOKEN = $content.token; ^
  } else { ^
    Write-Host '✗ Erreur' -ForegroundColor Red; ^
  }"

echo.
echo.

REM Test 2: Récupérer tous les étudiants
echo ════════════════════════════════════════════════════════════════════
echo [TEST 2/5] 👥 SERVICE ÉTUDIANTS - Récupérer tous
echo ════════════════════════════════════════════════════════════════════
echo Endpoint: GET %STUDENT_URL%
echo.

powershell -Command ^
  "$response = Invoke-WebRequest -Uri '%STUDENT_URL%' -Method GET -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 200) { ^
    Write-Host '✓ Succès (200)' -ForegroundColor Green; ^
    $content = ConvertFrom-Json $response.Content; ^
    Write-Host 'Nombre d''étudiants trouvés:' $content.Count; ^
    Write-Host 'Premiers résultats:'; ^
    Write-Host ($content | ConvertTo-Json -Depth 5); ^
  } else { ^
    Write-Host '✗ Erreur' -ForegroundColor Red; ^
  }"

echo.
echo.

REM Test 3: Créer un étudiant
echo ════════════════════════════════════════════════════════════════════
echo [TEST 3/5] ➕ SERVICE ÉTUDIANTS - Créer un nouvel étudiant
echo ════════════════════════════════════════════════════════════════════
echo Endpoint: POST %STUDENT_URL%
echo.

powershell -Command ^
  "$newStudent = @{ ^
    name = 'Test Étudiant'; ^
    email = 'test@example.com'; ^
    matricule = 'TEST001'; ^
    programme = 'Informatique' ^
  } | ConvertTo-Json; ^
  $response = Invoke-WebRequest -Uri '%STUDENT_URL%' -Method POST -ContentType 'application/json' -Body $newStudent -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 201 -or $response.StatusCode -eq 200) { ^
    Write-Host '✓ Succès (201/200)' -ForegroundColor Green; ^
    $content = ConvertFrom-Json $response.Content; ^
    Write-Host 'Étudiant créé:'; ^
    Write-Host ($content | ConvertTo-Json -Depth 5); ^
  } else { ^
    Write-Host '✗ Erreur' -ForegroundColor Red; ^
    Write-Host $response.StatusCode; ^
  }"

echo.
echo.

REM Test 4: Récupérer les notes d'un étudiant
echo ════════════════════════════════════════════════════════════════════
echo [TEST 4/5] 📊 SERVICE NOTES - Récupérer les notes (Étudiant 1)
echo ════════════════════════════════════════════════════════════════════
echo Endpoint: GET %GRADE_URL%/student/1
echo.

powershell -Command ^
  "$response = Invoke-WebRequest -Uri '%GRADE_URL%/student/1' -Method GET -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 200) { ^
    Write-Host '✓ Succès (200)' -ForegroundColor Green; ^
    $content = ConvertFrom-Json $response.Content; ^
    Write-Host 'Notes récupérées:'; ^
    Write-Host ($content | ConvertTo-Json -Depth 5); ^
  } else { ^
    Write-Host '✗ Erreur' -ForegroundColor Red; ^
  }"

echo.
echo.

REM Test 5: Vérifier la santé du service (Health Check)
echo ════════════════════════════════════════════════════════════════════
echo [TEST 5/5] ⚙️  VÉRIFICATION SERVICES - Health Check
echo ════════════════════════════════════════════════════════════════════
echo.

echo Vérification Service Notes (Grade Service)...
powershell -Command ^
  "$response = Invoke-WebRequest -Uri '%GRADE_URL%/health' -Method GET -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 200) { ^
    Write-Host '✓ Grade Service: Actif' -ForegroundColor Green; ^
    $content = ConvertFrom-Json $response.Content; ^
    Write-Host ($content | ConvertTo-Json -Depth 5); ^
  } else { ^
    Write-Host '✗ Grade Service: Inactif' -ForegroundColor Red; ^
  }"

echo.
echo Vérification Service Étudiants (Student Service)...
powershell -Command ^
  "$response = Invoke-WebRequest -Uri '%STUDENT_URL%' -Method GET -ErrorAction SilentlyContinue; ^
  if ($response.StatusCode -eq 200) { ^
    Write-Host '✓ Student Service: Actif' -ForegroundColor Green; ^
  } else { ^
    Write-Host '✗ Student Service: Inactif' -ForegroundColor Red; ^
  }"

echo.
echo.

REM Résumé
echo ════════════════════════════════════════════════════════════════════
echo 📊 RÉSUMÉ DES TESTS
echo ════════════════════════════════════════════════════════════════════
echo.
echo ✓ Test 1: Authentification - Complété
echo ✓ Test 2: Récupérer étudiants - Complété
echo ✓ Test 3: Créer étudiant - Complété
echo ✓ Test 4: Récupérer notes - Complété
echo ✓ Test 5: Health Check - Complété
echo.
echo [%date% %time%] ✅ Tous les tests sont terminés !
echo.
echo 📚 Pour plus de tests, ouvrez:
echo    file:///c:/Users/Pc-Asus/Desktop/soa/projet-soa-universite/test-api.html
echo.
pause
