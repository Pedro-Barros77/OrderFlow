using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderFlow.Business.Config;
using OrderFlow.Business.DTO;
using OrderFlow.Business.Enums;
using OrderFlow.Business.Interfaces.Repositories;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace OrderFlow.Api.Controllers
{
    [ApiController]
    [Route("api/products")]
    public class ProductsController : MainController
    {
        private readonly IMapper _mapper;
        private readonly IProductsService _service;
        public ProductsController(IMapper mapper, IResponseService responseService, IProductsService productsService) : base(responseService)
        {
            _mapper = mapper;
            _service = productsService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            return CustomResponse();
        }

        [HttpGet]
        public async Task<ActionResult<bool>> GetStatus([FromQuery] int categoryId)
        {
            return CustomResponse();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostRecord([FromBody] PostProducts product)
        {
            var _product = _mapper.Map<Product>(product);

            //var result = await _service.add(_product);
            return CustomResponse();
        }
    }
}
