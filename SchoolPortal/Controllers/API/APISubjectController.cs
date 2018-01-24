using DevExtreme.AspNet.Data;
using DevExtreme.AspNet.Mvc;
using Newtonsoft.Json;
using SchoolPort.Database;
using SchoolPort.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace SchoolPort.Controllers.API
{
    public class APISubjectController : ApiController
    {
        SCDbContext scDbContext = new SCDbContext();

        [HttpGet]
        public HttpResponseMessage Get(DataSourceLoadOptions loadOptions)
        {
            IQueryable<Subject> classViewModelList = scDbContext.SubjectList.AsQueryable();
            return Request.CreateResponse(DataSourceLoader.Load(classViewModelList, loadOptions));
        }

        [HttpPost]
        public HttpResponseMessage Post(FormDataCollection form)
        {
            var values = form.Get("values");

            var classViewModel = new Subject();
            JsonConvert.PopulateObject(values, classViewModel);

            Validate(classViewModel);
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Please check values!");

            scDbContext.SubjectList.Add(classViewModel);
            scDbContext.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpPut]
        public HttpResponseMessage Put(FormDataCollection form)
        {
            var key = Convert.ToInt32(form.Get("key"));
            var values = form.Get("values");

            var classModel = scDbContext.SubjectList.First(o => o.Id == key);

            JsonConvert.PopulateObject(values, classModel);
            Validate(classModel);
            if (!ModelState.IsValid)
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid data!");

            scDbContext.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpDelete]
        public void DeleteOrder(FormDataCollection form)
        {
            var key = Convert.ToInt32(form.Get("key"));
            var classObj = scDbContext.SubjectList.First(o => o.Id == key);
            if (classObj != null)
                scDbContext.SubjectList.Remove(classObj);

            scDbContext.SaveChanges();
        }
    }
}
