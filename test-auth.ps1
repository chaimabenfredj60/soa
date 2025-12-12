#!/usr/bin/env pwsh

# Wait function
function Wait-ForService {
    param([string]$url, [int]$maxAttempts = 30)
    
    $attempt = 0
    while ($attempt -lt $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri $url -TimeoutSec 5 -SkipCertificateCheck -Method Get -ErrorAction Stop
            if ($response.StatusCode -eq 200) {
                Write-Host "✓ Service is ready at $url" -ForegroundColor Green
                return $true
            }
        }
        catch {
            $attempt++
            if ($attempt -eq 1) {
                Write-Host "⏳ Waiting for service at $url..." -ForegroundColor Yellow
            }
            Start-Sleep -Seconds 2
        }
    }
    
    Write-Host "✗ Service failed to start at $url" -ForegroundColor Red
    return $false
}

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  TESTE DES SERVICES SOA" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Authentication Service Health
Write-Host "[Test 1] Vérification santé du service Auth..." -ForegroundColor Blue
if (Wait-ForService "http://localhost:8081/api/auth/health") {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8081/api/auth/health" -Method Get
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Test 1 échoué: $_" -ForegroundColor Red
    }
}
else {
    Write-Host "❌ Service Auth non disponible" -ForegroundColor Red
}
Write-Host ""

# Test 2: Login with valid credentials
Write-Host "[Test 2] Test d'authentification avec identifiants valides..." -ForegroundColor Blue
try {
    $loginBody = @{
        username = "admin"
        password = "password"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:8081/api/auth/login" -Method Post `
        -ContentType "application/json" `
        -Body $loginBody `
        -SkipCertificateCheck

    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $jsonResponse = $response.Content | ConvertFrom-Json
    Write-Host "Token reçu: $($jsonResponse.token.Substring(0, 50))..." -ForegroundColor Green
    Write-Host "Username: $($jsonResponse.username)" -ForegroundColor Green
    Write-Host "Role: $($jsonResponse.role)" -ForegroundColor Green
}
catch {
    Write-Host "❌ Test 2 échoué: $_" -ForegroundColor Red
}
Write-Host ""

# Test 3: Login with invalid credentials
Write-Host "[Test 3] Test d'authentification avec identifiants invalides..." -ForegroundColor Blue
try {
    $loginBody = @{
        username = "admin"
        password = "wrongpassword"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "http://localhost:8081/api/auth/login" -Method Post `
        -ContentType "application/json" `
        -Body $loginBody `
        -SkipCertificateCheck `
        -ErrorAction SilentlyContinue

    if ($response.StatusCode -eq 401) {
        Write-Host "✓ Status 401 reçu comme attendu" -ForegroundColor Green
        $jsonResponse = $response.Content | ConvertFrom-Json
        Write-Host "Error: $($jsonResponse.error)" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Statut attendu: 401, reçu: $($response.StatusCode)" -ForegroundColor Red
    }
}
catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Status 401 reçu comme attendu (Unauthorized)" -ForegroundColor Green
        $content = $_.Exception.Response.Content.ReadAsStream()
        $reader = New-Object System.IO.StreamReader($content)
        $body = $reader.ReadToEnd()
        Write-Host "Response: $body" -ForegroundColor Green
    }
    else {
        Write-Host "❌ Erreur: $_" -ForegroundColor Red
    }
}
Write-Host ""

# Test 4: Student Service
Write-Host "[Test 4] Test du service Student..." -ForegroundColor Blue
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/api/students" -Method Get
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    $jsonResponse = $response.Content | ConvertFrom-Json
    Write-Host "Étudiants: $($jsonResponse | ConvertTo-Json)" -ForegroundColor Green
}
catch {
    Write-Host "❌ Test 4 échoué: $_" -ForegroundColor Red
}
Write-Host ""

# Test 5: Course Service
Write-Host "[Test 5] Test du service Course..." -ForegroundColor Blue
if (Wait-ForService "http://localhost:8082/api/course/health") {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:8082/api/course/health" -Method Get
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Test 5 échoué: $_" -ForegroundColor Red
    }
}
else {
    Write-Host "⚠️  Service Course pas encore disponible" -ForegroundColor Yellow
}
Write-Host ""

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  FIN DES TESTS" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
