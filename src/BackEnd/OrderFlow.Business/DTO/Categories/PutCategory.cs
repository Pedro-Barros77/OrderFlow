using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;

namespace OrderFlow.Business.DTO
{
    public class PutCategory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int ColorTheme { get; set; }
        public int CategoryIcon { get; set; }
    }
}
