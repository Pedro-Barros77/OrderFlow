using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OrderFlow.Business.DTO;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System.Collections.Generic;
using System.Linq;
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
            var _products = _mapper.Map<List<GetProduct>>(Produtos);
            return CustomResponse(_products);
        }

        [HttpGet]
        public async Task<ActionResult<bool>> GetProductById([FromQuery] int productId)
        {
            var product = await _service.GetById(productId);
            return CustomResponse(product);
        }

        [HttpPost]
        public async Task<ActionResult<Product>> AddProduct([FromBody] PostProduct product)
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
        public async Task<ActionResult<Product>> UpdateProduct([FromQuery] int productID, [FromBody] PutProduct product)
        {
            var _product = _mapper.Map<Product>(product);
            if (productID != _product.Id) _responseService.DivergentId(productID, _product.Id);
            if (HasError()) return CustomResponse(_product);
            var result = await _service.UpdateProduct(_product);
            return CustomResponse(result);
            
        }
    }
}
