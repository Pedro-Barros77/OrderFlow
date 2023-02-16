using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
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
            var Produtos = await _service.GetAll();
            return CustomResponse(Produtos);
        }

        [HttpGet]
        public async Task<ActionResult<bool>> GetProducts([FromQuery] int categoryId)
        {
            return CustomResponse();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromBody] PostProducts product)
        {
            var _product = _mapper.Map<Product>(product);
            var p = await _service.AddProduct(_product);
            return CustomResponse(p);
        }

        [HttpDelete]
        public async Task<ActionResult<Product>> DeleteProduct([FromQuery] int productID)
        {
            
            var result = await _service.DeleteProduct(productID);
            return CustomResponse(result);

        }

        [HttpPut]
        public async Task<ActionResult<Product>> UpdateProduct([FromQuery] int productID, [FromBody] Product product)
        {
            if (productID != product.Id) _responseService.DivergentId(productID, product.Id);
            if (HasError()) return CustomResponse(product);
            var result = await _service.UpdateProduct(product);
            return CustomResponse(result);
            
        }
    }
}
