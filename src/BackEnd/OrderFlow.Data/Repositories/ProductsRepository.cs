using OrderFlow.Business.Models;
using OrderFlow.Data.Context;
using OrderFlow.Data.Repositories;
using OrderFlow.Business.Interfaces.Repositories;

namespace OrderFlow.Data.Repository
{
    public class ProductsRepository : Repository<Product>, IProductsRepository
    {
        public ProductsRepository(OrderFlowContext db) : base(db)
        {

        }
    }
}