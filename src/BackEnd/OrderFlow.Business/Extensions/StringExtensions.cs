using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderFlow.Business.Extensions
{
    public static class StringExtensions
    {
        public static bool IsNullOrEmpty(this string src)
        {
            return string.IsNullOrEmpty(src) || string.IsNullOrWhiteSpace(src);
        }
    }
}
