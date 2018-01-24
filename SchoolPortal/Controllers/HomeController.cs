using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SchoolPort.Models;
using SchoolPort.Database;

namespace SchoolPort.Controllers
{    
    public class HomeController : Controller
    {
        public ActionResult Index()
        {            
            return View();
        }
        
        public ActionResult GridViewPartialView() 
        {
            return View();
        }    
    }
}
