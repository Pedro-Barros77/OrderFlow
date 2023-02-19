using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;
using OrderFlow.Business.Models;

namespace OrderFlow.Business.DTO
{
    public class GetProduct
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public bool IsFavorite { get; set; }
        public GetCategory Category { get; set; }
        public int CategoryId { get; set; }
    }
}
