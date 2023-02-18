using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;

namespace OrderFlow.Business.DTO
{
    public class PostProduct
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public Icons Icon { get; set; }
        public int CategoryId { get; set; }
    }
}
