using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using SchoolPort.Database;
using SchoolPort.Database.Entities;
using SchoolPort.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;


namespace SchoolPort.Controllers.API
{
    public class APIAccountsController : ApiController
    {
        SCDbContext scDbContext = new SCDbContext();

        [HttpGet]
        public HttpResponseMessage Get(DataSourceLoadOptions loadOptions)
        {
            scDbContext.Database.CommandTimeout = 300;
            IQueryable<AccountModels> classViewModelList = scDbContext.AccountsList.Select(x=> new AccountModels
            {
                AccountNum = x.AccountNum,
                Amount = x.Amount,
                Available = x.Available,
                Description = x.Description,
                Fee = x.Fee,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Price = x.Price,
                Quantity = x.Quantity,
                ValuationDate = x.ValuationDate,
                Id = x.Id
            }).AsQueryable();
            return Request.CreateResponse(DataSourceLoader.Load(classViewModelList, loadOptions));
        }
    }
}
