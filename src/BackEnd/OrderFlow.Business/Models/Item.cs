using OrderFlow.Business.Enums;
using System;


namespace OrderFlow.Business.Models
{
    public class Item : Entity
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int TableId { get; set; }
        public Table Table { get; set; }
        public int Count { get; set; }
        public decimal Discount { get; set; }
        public decimal Additional { get; set; }
        public ItemStatus Status { get; set; }
        public bool Paid { get; set; }
        public string Note { get; set; }

    }


}
