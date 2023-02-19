using Microsoft.EntityFrameworkCore;
using OrderFlow.Business.Interfaces.Repositories;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OrderFlow.Business.Services
{
    public class CategoriesService : BaseService, ICategoriesService
    {
        private readonly ICategoriesRepository _repository;
        public CategoriesService(IResponseService responseService, ICategoriesRepository repository) : base(responseService)
        {
            _repository = repository;
        }

        public async Task<Category> AddCategory(Category value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Add(value);
            
        }

        
        private bool IsValid(Category value)
        {
            Regex regex = new Regex(@"^[\w\s\-à-úÀ-Ú]+$");
            if (value.Title.Length > 50) { AddError("ERRO(Titulo deve ser menor que 50 caracteres) "); }
            if (!regex.IsMatch(value.Title)) { AddError("ERRO(Não é possível adicionar caracteres especiais ao Titulo) "); }
            if (value.ColorTheme < 0) { AddError("ERRO(O valor deve ser maior que zero "); }
            if (value.CategoryIcon < 0) { AddError("ERRO(O valor deve ser maior que zero "); }
            return !HasError();
        }

        


        public async Task< IEnumerable<Category>> GetAll()
        {
            return await _repository.GetAll();   
        }

        public async Task<Category> GetById(int id)
        {
            return await _repository.GetById(id);
        }

        public async Task <bool> DeleteCategory(int value)
        {
            var p = await _repository.GetById(value);
            if (p == null) AddError($"Categoria com ID {value} não existe");
            if (HasError()) return false;
            await _repository.Remove(value);
            return !HasError();
        }

        public async Task<Category> UpdateCategory(Category value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Update(value);
        }
    }
}
