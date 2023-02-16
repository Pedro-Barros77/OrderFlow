﻿using Microsoft.EntityFrameworkCore;
using OrderFlow.Business.Interfaces.Repositories;
using OrderFlow.Business.Interfaces.Services;
using OrderFlow.Business.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace OrderFlow.Business.Services
{
    public class ProductsService : BaseService, IProductsService
    {
        private readonly IProductsRepository _repository;
        public ProductsService(IResponseService responseService, IProductsRepository repository) : base(responseService)
        {
            _repository = repository;
        }

        public async Task<Product> AddProduct(Product value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Add(value);
            
        }

        
        private bool IsValid(Product value)
        {
            Regex regex = new Regex(@"^[\w\s\-à-úÀ-Ú]+$");
            if (value.Title.Length > 50) { AddError("ERRO(Titulo deve ser menor que 50 caracteres) "); }
            if (!regex.IsMatch(value.Title)) { AddError("ERRO(Não é possível adicionar caracteres especiais ao Titulo) "); }
            if (value.Description.Length > 255) { AddError("ERRO(Descrição deve ser menor que 255 caracteres) "); }
            if (value.ImageURL.Length > 255) { AddError("ERRO(Imagem deve ser menor que 255 caracteres) "); }
            if (value.Price < 0 ) { AddError("ERRO(Preço não pode ser valor negativo) "); }
            return !HasError();
        }

        


        public async Task< IEnumerable<Product>> GetAll()
        {
            return await _repository.GetAll();
            
        }

        public async Task <bool> DeleteProduct(int value)
        {
            var p = await _repository.GetById(value);
            if (p == null) AddError($"Produto com ID {value} não existe");
            if (HasError()) return false;
            await _repository.Remove(value);
            return !HasError();
        }

        public async Task<Product> UpdateProduct(Product value)
        {
            if (!IsValid(value)) return value;
            return await _repository.Update(value);
        }
    }
}
