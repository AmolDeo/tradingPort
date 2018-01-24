using SchoolPort.Database;
using SchoolPort.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SchoolPort.Controllers.API
{
    public class APIDataController : ApiController
    {
        public HttpResponseMessage Post([FromBody]IEnumerable<Accounts> transactions)
        {           
            try
            {
                SCDbContext dbContext = new SCDbContext();
                foreach (Accounts account in transactions)
                    dbContext.AccountsList.Add(account);

                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.ExpectationFailed);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}

