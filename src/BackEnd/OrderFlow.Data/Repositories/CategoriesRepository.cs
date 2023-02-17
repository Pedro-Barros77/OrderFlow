using OrderFlow.Business.Models;
using OrderFlow.Data.Context;
using OrderFlow.Data.Repositories;
using OrderFlow.Business.Interfaces.Repositories;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using OrderFlow.Business.Enums;
using Microsoft.EntityFrameworkCore;

namespace OrderFlow.Data.Repository
{
    public class CategoriesRepository : Repository<Category>, ICategoriesRepository
    {
        public CategoriesRepository(OrderFlowContext db) : base(db)
        {

        }
    }
}