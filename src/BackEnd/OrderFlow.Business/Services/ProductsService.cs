using Microsoft.EntityFrameworkCore;
using OrderFlow.Business.Interfaces.Repositories;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderFlow.Business.Services
{
    public class ProductsService : BaseService, IProductsService
    {
        private readonly IProductsRepository _repository;
        public ProductsService(IResponseService responseService, IProductsRepository repository) : base(responseService)
        {
            _repository = repository;
        }
    }
}
