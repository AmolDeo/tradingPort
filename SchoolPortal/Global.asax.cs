using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using SchoolPort.App_Start;
using SchoolPort.Database;

namespace SchoolPort
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            ModelBinders.Binders.DefaultBinder = new DevExpress.Web.Mvc.DevExpressEditorsBinder();
            DevExtremeBundleConfig.RegisterBundles(BundleTable.Bundles);

          

            DevExpress.Web.ASPxWebControl.CallbackError += Application_Error;
        }

        protected virtual void Application_AcquireRequestState()
        {
            try
            {
                SCDbContext scDbContext = new SCDbContext();
                if (HttpContext.Current.IsDebuggingEnabled)
                    scDbContext.Database.Log = message => Trace.WriteLine(message);

            }
            catch (Exception Ex)
            {
            }
        }

        protected void Application_Error(object sender, EventArgs e) 
        {
            Exception exception = System.Web.HttpContext.Current.Server.GetLastError();
            //TODO: Handle Exception
        }
    }
}