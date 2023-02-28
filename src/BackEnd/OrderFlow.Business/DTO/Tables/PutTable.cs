using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;
using OrderFlow.Business.Models;

namespace OrderFlow.Business.DTO
{
    public class PutTable
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal PaidValue { get; set; }
        public virtual List<Item> Items { get; set; }
    }
}
