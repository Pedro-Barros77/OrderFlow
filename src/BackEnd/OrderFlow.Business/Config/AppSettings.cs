using OrderFlow.Business.Enums;
using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderFlow.Business.Config
{
    public static class AppSettings
    {
        public static string ProjectRootPath { get; set; }
        public static void SetSettings()
        {
            ProjectRootPath = new DirectoryInfo(Directory.GetCurrentDirectory()).Parent.FullName;
        }
    }
}
