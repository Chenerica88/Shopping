using Microsoft.EntityFrameworkCore;
using Shopping.Data;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// 設定日誌追踪
builder.Logging.ClearProviders(); // 移除所有默認的日誌提供者
builder.Logging.AddConsole(); // 添加控制台日誌
builder.Logging.AddDebug(); // 添加 debug 日誌

// 配置服務
builder.Services.AddDbContext<ShoppingDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// 添加授權服務
builder.Services.AddAuthorization(); // 添加授權服務來解決授權相關的錯誤
builder.Services.AddControllers(); // 添加控制器支持

var app = builder.Build();

// 配置 HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAllOrigins");

// 使用身份驗證和授權中介軟體
app.UseAuthorization();

app.MapControllers(); // 配置控制器路由

// 檢查資料庫連接
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ShoppingDbContext>();
    try
    {
        if (dbContext.Database.CanConnect())
        {
            Console.WriteLine("Database connection successful.");
        }
        else
        {
            Console.WriteLine("Database connection failed: Cannot connect to the database.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Database connection failed: {ex.Message}");
    }
}

app.Run();
