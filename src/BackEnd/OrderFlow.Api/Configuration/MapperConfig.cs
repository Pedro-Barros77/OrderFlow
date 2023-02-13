using AutoMapper;
using OrderFlow.Business.DTO;
using OrderFlow.Business.Models;

namespace OrderFlow.Api.Configuration
{
    public class MapperConfig : Profile
    {
        public MapperConfig()
        {
            CreateMap<Product, PostProducts>();
            CreateMap<PostProducts, Product>();
            CreateMap<Product, GetProducts>();

            //CreateMap<Esquerda, Direita>()
            //    .ForMember(direita => direita.Propriedade, opcoes => opcoes.MapFrom(esquerda => esquerda.Propriedade));
        }
    }
}
