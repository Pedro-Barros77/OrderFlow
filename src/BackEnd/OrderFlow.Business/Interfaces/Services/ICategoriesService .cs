using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderFlow.Business.Interfaces.Services
{
    public interface ICategoriesService
    {
        Task< IEnumerable<Category>> GetAll();
        Task<Category> AddCategory(Category value);
        Task<bool> DeleteCategory(int value);
        Task<Category> UpdateCategory(Category value);
        Task<Category> GetById(int id);
    }
}
