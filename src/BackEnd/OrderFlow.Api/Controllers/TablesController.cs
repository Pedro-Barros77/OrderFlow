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
    [Route("api/tables")]
    public class TablesController : MainController
    {
        private readonly IMapper _mapper;
        private readonly ITablesService _service;
        public TablesController(IMapper mapper, IResponseService responseService, ITablesService tablesService) : base(responseService)
        {
            _mapper = mapper;
            _service = tablesService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<Table>>> GetAll()
        {
            var Mesas = await _service.GetAll();
            return CustomResponse(Mesas);
        }

        [HttpGet]
        public async Task<ActionResult<bool>> GetTableById([FromQuery] int tableId)
        {
            var table = await _service.GetById(tableId);
            return CustomResponse(table);
        }

        [HttpPost]
        public async Task<ActionResult<Table>> AddPTable([FromBody] PostTable table)
        {
            var _table = _mapper.Map<Table>(table);
            var p = await _service.AddTable(_table);
            return CustomResponse(p);
        }

        [HttpDelete]
        public async Task<ActionResult<Table>> DeleteTable([FromQuery] int tableId)
        {
            
            var result = await _service.DeleteTable(tableId);
            return CustomResponse(result);

        }

        [HttpPut]
        public async Task<ActionResult<Table>> UpdateTable([FromQuery] int tableId, [FromBody] Table table)
        {
            if (tableId != table.Id) _responseService.DivergentId(tableId, table.Id);
            if (HasError()) return CustomResponse(table);
            var result = await _service.UpdateTable(table);
            return CustomResponse(result);
            
        }
    }
}
