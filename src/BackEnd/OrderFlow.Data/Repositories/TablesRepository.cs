using OrderFlow.Business.Models;
using OrderFlow.Data.Context;
using OrderFlow.Data.Repositories;
using OrderFlow.Business.Interfaces.Repositories;

namespace OrderFlow.Data.Repository
{
    public class TablesRepository : Repository<Table>, ITablesRepository
    {
        public TablesRepository(OrderFlowContext db) : base(db)
        {

        }
    }
}