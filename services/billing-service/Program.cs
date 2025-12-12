using BillingService.Contracts;
using BillingService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Add services
builder.Services.AddScoped<IBillingService, BillingServiceImpl>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Health check endpoint
app.MapGet("/health", () => Results.Json(new { status = "OK", service = "billing-service" }));

// Root endpoint
app.MapGet("/", () => Results.Text("Billing Service (REST API)\nPort: 5000", "text/plain"));

app.UseAuthorization();
app.MapControllers();

app.Run();

