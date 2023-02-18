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
using OrderFlow.Business.Services;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace OrderFlow.Api.Controllers
{
    [ApiController]
    [Route("api/categories")]
    public class CategoriesController : MainController
    {
        private readonly IMapper _mapper;
        private readonly ICategoriesService _service;
        public CategoriesController(IMapper mapper, IResponseService responseService, ICategoriesService categoriesService) : base(responseService)
        {
            _mapper = mapper;
            _service = categoriesService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Category>>> GetAll()
        {
            var Categories = await _service.GetAll();
            var _categories = _mapper.Map<List<GetCategory>>(Categories);
            return CustomResponse(_categories);
        }

        [HttpGet]
        public async Task<ActionResult<bool>> GetCategories([FromQuery] int categoryId)
        {
            return CustomResponse();
        }

        [HttpPost]
        public async Task<ActionResult<Category>> AddCategory([FromBody] PostCategory category)
        {   
            var _category = _mapper.Map<Category>(category);
            var p = await _service.AddCategory(_category);
            return CustomResponse(p);
        }

        [HttpDelete]
        public async Task<ActionResult<Category>> DeleteCategory([FromQuery] int categoryID)
        {
            
            var result = await _service.DeleteCategory(categoryID);
            return CustomResponse(result);

        }

        [HttpPut]
        public async Task<ActionResult<Category>> UpdateCategory([FromQuery] int categoryID, [FromBody] PutCategory category)
        {
            var _category = _mapper.Map<Category>(category);
            if (categoryID != _category.Id) _responseService.DivergentId(categoryID, _category.Id);
            if (HasError()) return CustomResponse(_category);
            var result = await _service.UpdateCategory(_category);
            return CustomResponse(result);
            
        }
    }
}
