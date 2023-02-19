using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderFlow.Business.Models
{
    public class Category : Entity
    {
        public string Title { get; set; }
        public int ColorTheme { get; set; }
        public int CategoryIcon { get; set; }
        public virtual List<Product> Products { get; set; }
    }
}
