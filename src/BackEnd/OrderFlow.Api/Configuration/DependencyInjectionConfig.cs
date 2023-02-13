using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using OrderFlow.Business.Interfaces;
using OrderFlow.Business.Interfaces.Repositories;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Services;
using OrderFlow.Data.Repository;

namespace OrderFlow.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            #region Services
            services.AddScoped<IResponseService, ResponseService>();
            services.AddScoped<IProductsService, ProductsService>();
            #endregion

            #region Repositories
            services.AddScoped<IProductsRepository, ProductsRepository>();
            #endregion

            return services;
        }
    }
}