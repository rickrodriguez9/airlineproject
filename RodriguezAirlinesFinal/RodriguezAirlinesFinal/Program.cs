using Microsoft.EntityFrameworkCore;

using RodriguezAirlinesFinal.Data;

var builder = WebApplication.CreateBuilder(args);
var corsPolicy = "Cors";

builder.Services.AddCors(options => {
    options.AddPolicy(name: corsPolicy,
        policy => {
            policy.AllowAnyOrigin();
            policy.AllowAnyMethod();
            policy.AllowAnyHeader();
        });
});

ConfigurationManager configuration = builder.Configuration;
IWebHostEnvironment environment = builder.Environment;
// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.PropertyNamingPolicy = null;
    options.JsonSerializerOptions.WriteIndented = true;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});
builder.Services.AddLogging();
builder.Services.AddDbContext<RAContext>(options =>
    options.UseSqlServer(configuration.GetConnectionString("RAContext")));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

/*
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    RAInitializer.Inilialize(services);

*/
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment()) {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseCors(corsPolicy);

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
