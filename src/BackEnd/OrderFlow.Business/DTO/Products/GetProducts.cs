﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderFlow.Business.Enums;

namespace OrderFlow.Business.DTO
{
    public class GetProducts
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageURL { get; set; }
        public Icons Icon { get; set; }
    }
}