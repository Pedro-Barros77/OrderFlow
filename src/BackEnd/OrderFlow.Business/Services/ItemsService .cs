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
    public class ItemsService : BaseService, IItemsService
    {
        private readonly IItemsRepository _repository;
        public ItemsService(IResponseService responseService, IItemsRepository repository) : base(responseService)
        {
            _repository = repository;
        }

        public async Task<Item> AddItem(Item value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Add(value);
        }


        private bool IsValid(Item value)
        {
            Regex regex = new Regex(@"^[\w\s\-à-úÀ-Ú]+$");
            if (value.Note.Length > 255) { AddError("A observação deve possuir menos de 50 caracteres!"); }
            if (value.Additional < 0) { AddError("O valor adicional não pode ser negativo!"); }
            if (value.Discount < 0) { AddError("O valor de desconto não pode ser negativo!"); }
            if (value.Count < 0) { AddError("A quantidade não pode ser negativa!"); }
            return !HasError();
        }

        public async Task<IEnumerable<Item>> GetTableItems(int tableId)
        {
            return await _repository.Get(x => x.TableId == tableId);
        }


        public async Task<IEnumerable<Item>> GetAll()
        {
            return await _repository.GetQueryable()
                .Include(x => x.Product).ThenInclude(p => p.Category)
                .ToListAsync();
        }

        public async Task<Item> GetById(int id)
        {
            return await _repository.GetQueryable().Where(x => x.Id == id).Include(x => x.Product)
                .ThenInclude(i => i.Category).FirstOrDefaultAsync();
        }

        public async Task<bool> DeleteItem(int value)
        {
            var p = await _repository.GetById(value);
            if (p == null) AddError($"Item com ID {value} não existe");
            if (HasError()) return false;
            await _repository.Remove(value);
            return !HasError();
        }

        public async Task<Item> UpdateItem(Item value)
        {
            Item result = null;
            if (!IsValid(value)) return value;

            result = await _repository.Update(value);

            return result;
        }
    }
}
