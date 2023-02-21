using Microsoft.EntityFrameworkCore;
using OrderFlow.Business.DTO;
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
    public class TablesService : BaseService, ITablesService
    {
        private readonly ITablesRepository _repository;
        public TablesService(IResponseService responseService, ITablesRepository repository) : base(responseService)
        {
            _repository = repository;
        }

        public async Task<Table> AddTable(Table value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Add(value);
        }

        
        private bool IsValid(Table value)
        {
            Regex regex = new Regex(@"^[\w\s\-à-úÀ-Ú]+$");
            if (value.Name.Length > 50) { AddError("ERRO(Nome deve ser menor que 50 caracteres) "); }
            if (!regex.IsMatch(value.Name)) { AddError("ERRO(Não é possível adicionar caracteres especiais ao Titulo) "); }         
            if (value.PaidValue < 0 ) { AddError("ERRO(Preço não pode ser valor negativo) "); }
            return !HasError();
        }

        


        public async Task< IEnumerable<Table>> GetAll()
        {
            return await _repository.GetQueryable()
                .Include(x => x.Items).ThenInclude(i => i.Product)
                .ToListAsync();
        }

        public async Task<Table> GetById(int id)
        {
            return await _repository.GetQueryable().Where(x => x.Id == id).Include(x => x.Items)
                .ThenInclude(i => i.Product).FirstOrDefaultAsync();
        }

        public async Task <bool> DeleteTable(int value)
        {
            var p = await _repository.GetById(value);
            if (p == null) AddError($"Mesa com ID {value} não existe");
            if (HasError()) return false;
            await _repository.Remove(value);
            return !HasError();
        }

        public async Task<Table> UpdateTable(Table value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Update(value);
        }
    }
}
