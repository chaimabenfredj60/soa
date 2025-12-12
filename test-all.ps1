# Script de test automatisé - Système Universitaire SOA
# Exécution: powershell -ExecutionPolicy Bypass -File test-all.ps1

Write-Host "╔════════════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║       🧪 TESTEUR AUTOMATIQUE - Système Universitaire SOA          ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Configuration
$FRONTEND_URL = "http://localhost:3001"
$STUDENT_URL = "http://localhost:3000/api/students"
$GRADE_URL = "http://localhost:8000/api/grades"
$AUTH_EMAIL = "admin@universite.com"
$AUTH_PASSWORD = "password123"

$results = @()

Write-Host "⏱️  Démarrage des tests..." -ForegroundColor Yellow
Write-Host ""

# Test 1: Authentification
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "[TEST 1/5] 🔐 AUTHENTIFICATION - Login" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Endpoint: POST $FRONTEND_URL/api/auth/login" -ForegroundColor Cyan
Write-Host "Email: $AUTH_EMAIL" -ForegroundColor Cyan
Write-Host ""

try {
    $body = @{
        email = $AUTH_EMAIL
        password = $AUTH_PASSWORD
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$FRONTEND_URL/api/auth/login" `
        -Method POST `
        -ContentType 'application/json' `
        -Body $body `
        -ErrorAction Stop

    Write-Host "✓ Succès (200)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Réponse:" -ForegroundColor Yellow
    Write-Host ($content | ConvertTo-Json -Depth 5) -ForegroundColor White
    $results += @{Test = 1; Status = "✓"; Name = "Authentification"; Message = "Login réussi" }
} catch {
    Write-Host "✗ Erreur: $_" -ForegroundColor Red
    $results += @{Test = 1; Status = "✗"; Name = "Authentification"; Message = $_.Exception.Message }
}

Write-Host ""
Write-Host ""

# Test 2: Récupérer tous les étudiants
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "[TEST 2/5] 👥 SERVICE ÉTUDIANTS - Récupérer tous" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Endpoint: GET $STUDENT_URL" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri $STUDENT_URL `
        -Method GET `
        -ErrorAction Stop

    Write-Host "✓ Succès (200)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Nombre d'étudiants: $($content.Count)" -ForegroundColor Yellow
    Write-Host "Réponse:" -ForegroundColor Yellow
    Write-Host ($content | ConvertTo-Json -Depth 5) -ForegroundColor White
    $results += @{Test = 2; Status = "✓"; Name = "Récupérer étudiants"; Message = "Succès" }
} catch {
    Write-Host "✗ Erreur: $_" -ForegroundColor Red
    $results += @{Test = 2; Status = "✗"; Name = "Récupérer étudiants"; Message = $_.Exception.Message }
}

Write-Host ""
Write-Host ""

# Test 3: Créer un étudiant
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "[TEST 3/5] ➕ SERVICE ÉTUDIANTS - Créer un nouvel étudiant" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Endpoint: POST $STUDENT_URL" -ForegroundColor Cyan
Write-Host ""

try {
    $newStudent = @{
        name = "Nouvel Étudiant Test"
        email = "nouveau@example.com"
        matricule = "TEST$(Get-Random -Minimum 100 -Maximum 999)"
        programme = "Informatique"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri $STUDENT_URL `
        -Method POST `
        -ContentType 'application/json' `
        -Body $newStudent `
        -ErrorAction Stop

    Write-Host "✓ Succès (201)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Étudiant créé:" -ForegroundColor Yellow
    Write-Host ($content | ConvertTo-Json -Depth 5) -ForegroundColor White
    $results += @{Test = 3; Status = "✓"; Name = "Créer étudiant"; Message = "Étudiant créé avec succès" }
} catch {
    Write-Host "✗ Erreur: $_" -ForegroundColor Red
    $results += @{Test = 3; Status = "✗"; Name = "Créer étudiant"; Message = $_.Exception.Message }
}

Write-Host ""
Write-Host ""

# Test 4: Récupérer les notes
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "[TEST 4/5] 📊 SERVICE NOTES - Récupérer les notes (Étudiant 1)" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "Endpoint: GET $GRADE_URL/student/1" -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "$GRADE_URL/student/1" `
        -Method GET `
        -ErrorAction Stop

    Write-Host "✓ Succès (200)" -ForegroundColor Green
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Notes récupérées:" -ForegroundColor Yellow
    Write-Host ($content | ConvertTo-Json -Depth 5) -ForegroundColor White
    $results += @{Test = 4; Status = "✓"; Name = "Récupérer notes"; Message = "Notes trouvées" }
} catch {
    Write-Host "✗ Erreur: $_" -ForegroundColor Red
    $results += @{Test = 4; Status = "✗"; Name = "Récupérer notes"; Message = $_.Exception.Message }
}

Write-Host ""
Write-Host ""

# Test 5: Health Check
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "[TEST 5/5] ⚙️  VÉRIFICATION SERVICES - Health Check" -ForegroundColor Green
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""

$healthChecks = @(
    @{Name = "Grade Service"; URL = "$GRADE_URL/health"; Icon = "📊" }
    @{Name = "Student Service"; URL = $STUDENT_URL; Icon = "👥" }
)

$healthStatus = "✓"
foreach ($check in $healthChecks) {
    try {
        $response = Invoke-WebRequest -Uri $check.URL `
            -Method GET `
            -ErrorAction Stop

        Write-Host "$($check.Icon) $($check.Name): Actif ✓" -ForegroundColor Green
    } catch {
        Write-Host "$($check.Icon) $($check.Name): Inactif ✗" -ForegroundColor Red
        $healthStatus = "⚠"
    }
}

Write-Host ""
$results += @{Test = 5; Status = $healthStatus; Name = "Health Check"; Message = "Services vérifiés" }

# Résumé Final
Write-Host ""
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📊 RÉSUMÉ DES TESTS" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

$successCount = ($results | Where-Object { $_.Status -eq "✓" }).Count
$failureCount = ($results | Where-Object { $_.Status -eq "✗" }).Count

foreach ($result in $results) {
    $color = if ($result.Status -eq "✓") { "Green" } else { "Red" }
    Write-Host "$($result.Status) Test $($result.Test): $($result.Name) - $($result.Message)" -ForegroundColor $color
}

Write-Host ""
Write-Host "────────────────────────────────────────────────────────────────────" -ForegroundColor Cyan
Write-Host "Résultats: $successCount réussi(s), $failureCount échoué(s)" -ForegroundColor Cyan
Write-Host ""

if ($failureCount -eq 0) {
    Write-Host "✅ TOUS LES TESTS SONT PASSÉS AVEC SUCCÈS !" -ForegroundColor Green
} else {
    Write-Host "⚠️  Certains tests ont échoué. Vérifiez les services." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 Pour plus de tests interactifs, ouvrez:" -ForegroundColor Cyan
Write-Host "   file:///c:/Users/Pc-Asus/Desktop/soa/projet-soa-universite/test-api.html" -ForegroundColor Yellow
Write-Host ""

Read-Host "Appuyez sur Entrée pour terminer"
