using OrderFlow.Business.Models;
using OrderFlow.Data.Context;
using OrderFlow.Data.Repositories;
using OrderFlow.Business.Interfaces.Repositories;

namespace OrderFlow.Data.Repository
{
    public class CategoriesRepository : Repository<Category>, ICategoriesRepository
    {
        public CategoriesRepository(OrderFlowContext db) : base(db)
        {

        }
    }
}