using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;
using OrderFlow.Business.Models;

namespace OrderFlow.Business.DTO
{
    public class GetCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ColorTheme { get; set; }
        public int CategoryIcon { get; set; }
    }
}
