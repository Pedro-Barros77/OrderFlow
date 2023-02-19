using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OrderFlow.Business.DTO;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System.Collections.Generic;
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
        public async Task<ActionResult<bool>> GetCategoryById([FromQuery] int categoryId)
        {
            var category = await _service.GetById(categoryId);
            return CustomResponse(category);
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
