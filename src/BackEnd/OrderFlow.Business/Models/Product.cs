using OrderFlow.Business.Enums;
using System;
using System.Collections.Generic;

namespace OrderFlow.Business.Models
{
    public class Product : Entity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public virtual List<Item> Items { get; set; }
        public bool IsFavorite { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }

    }
}
