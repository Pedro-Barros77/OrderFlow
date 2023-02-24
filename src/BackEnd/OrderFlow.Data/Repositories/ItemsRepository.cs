using OrderFlow.Business.Models;
using OrderFlow.Data.Context;
using OrderFlow.Data.Repositories;
using OrderFlow.Business.Interfaces.Repositories;

namespace OrderFlow.Data.Repository
{
    public class ItemsRepository : Repository<Item>, IItemsRepository
    {
        public ItemsRepository(OrderFlowContext db) : base(db)
        {

        }
    }
}