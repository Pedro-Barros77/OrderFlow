using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderFlow.Business.Interfaces.Services
{
    public interface ITablesService
    {
        Task< IEnumerable<Table>> GetAll();
        Task<Table> AddTable(Table value);
        Task<bool> DeleteTable(int value);
        Task<Table> UpdateTable(Table value);
        Task<Table> GetById(int id);
    }
}
