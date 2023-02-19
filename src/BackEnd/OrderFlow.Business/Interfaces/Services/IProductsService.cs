using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderFlow.Business.Interfaces.Services
{
    public interface IProductsService
    {
        Task< IEnumerable<Product>> GetAll();
        Task<Product> AddProduct(Product value);
        Task<bool> DeleteProduct(int value);
        Task<Product> UpdateProduct(Product value);
        Task<Product> GetById(int id);
    }
}
