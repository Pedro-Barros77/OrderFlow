using OrderFlow.Business.Enums;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace OrderFlow.Business.Models
{
    public class Table : Entity
    {
        public string Name { get; set; }
        public decimal PaidValue { get; set; }
        public virtual List<Item> Items { get; set; }
        
    }
}
