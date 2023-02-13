using OrderFlow.Business.Enums;
using System;

namespace OrderFlow.Business.Models
{
    public class Product : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public Icons Icon { get; set; }
    }
}
