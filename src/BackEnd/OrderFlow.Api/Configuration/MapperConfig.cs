using AutoMapper;
using OrderFlow.Business.DTO;
using OrderFlow.Business.Models;

namespace OrderFlow.Api.Configuration
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Product, PostProduct>().ReverseMap();
            CreateMap<Product, GetProduct>().ReverseMap();
            CreateMap<Product, PutProduct>().ReverseMap();

            CreateMap<Category, GetCategory>().ReverseMap();
            CreateMap<Category, PostCategory>().ReverseMap();
            CreateMap<Category, PutCategory>().ReverseMap();

            CreateMap<Table, GetTable>().ReverseMap();
            CreateMap<Table, PostTable>().ReverseMap();
            CreateMap<Table, PutTable>().ReverseMap();



            //CreateMap<Esquerda, Direita>()
            //    .ForMember(direita => direita.Propriedade, opcoes => opcoes.MapFrom(esquerda => esquerda.Propriedade));
        }
    }
}
