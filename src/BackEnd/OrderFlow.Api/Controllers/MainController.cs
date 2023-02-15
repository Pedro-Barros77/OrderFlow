using Microsoft.AspNetCore.Mvc;
using OrderFlow.Business.Interfaces.Services;
using System.Linq;
using System.Security.Claims;

namespace OrderFlow.Api.Controllers
{
    public abstract class MainController : ControllerBase
    {
        protected readonly IResponseService _responseService;

        protected MainController(IResponseService responseService)
        {
            _responseService = responseService;
        }

        protected bool HasError()
        {
            return _responseService.HasError();
        }

        protected ActionResult CustomResponse(object result = null, string customMessage = null)
        {
            if (!HasError())
            {
                return Ok(new
                {
                    Success = true,
                    Data = result,
                    CustomMessage = customMessage ?? ""
                });
            }

            return BadRequest(new
            {
                Success = false,
                Errors = _responseService.GetErrors().Select(n => n)
            });
        }

        protected void AddError(string error)
        {
            _responseService.AddError(error);
        }

        protected void ClearErrors()
        {
            _responseService.ClearErrors();
        }
    }
}
