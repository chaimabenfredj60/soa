# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:7.0 as builder

WORKDIR /app

# Copy the project file
COPY BillingService.csproj .

# Restore dependencies
RUN dotnet restore

# Copy the source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:7.0

WORKDIR /app

# Copy the published application from builder stage
COPY --from=builder /app/out .

# Expose the SOAP service port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
    CMD dotnet --version || exit 1

# Run the application
ENTRYPOINT ["dotnet", "BillingService.dll"]
