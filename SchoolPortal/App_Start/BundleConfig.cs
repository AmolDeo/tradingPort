
using System.Web;
using System.Web.Optimization;

namespace SchoolPort.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            bundles.Add(new StyleBundle("~/Content/loginstyle").Include(
                "~/Content/bootstrap.css",
                "~/Content/Login.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryglobal").Include(
                "~/Scripts/globalize.js",
                "~/Scripts/jszip.js",
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/clientportalbasic").Include(
                "~/Scripts/jquery.are-you-sure.js",
                "~/Scripts/jquery-ui-1.11.4.js",
                "~/Scripts/ays-beforeunload-shim.js",
                "~/Scripts/ATWebViews/ATIndexView.js",
                "~/Scripts/ATWebViews/HelperMethods.js",
                "~/Scripts/ATWebViews/PopupMessage.js",
                "~/Scripts/jquery.cookie.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/devextreme-all", @"//cdn3.devexpress.com/jslib/17.1.3/js/dx.all.js")
                .Include("~/Scripts/dx.all.js"));

            bundles.Add(new ScriptBundle("~/bundles/raphaeljs", @"//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js")
                .Include("~/Scripts/raphael-min.js"));

            bundles.Add(new ScriptBundle("~/bundles/devextremeaspnet").Include(
                "~/Scripts/aspnet/dx.aspnet.data.js",
                "~/Scripts/dx.aspnet.mvc.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/dashboard").Include(
                "~/Views/CPDashboard/Script/CPDashboard.js"
                ));

            bundles.Add(new StyleBundle("~/bundles/maincss").Include(
                "~/Content/bootstrap.css",
                "~/Content/font-awesome.css",
                "~/Assets/css/ionicons.min.css",
                "~/Assets/css/AdminLTE.css",
                "~/Assets/css/skins/_all-skins.css",
                "~/Assets/plugins/iCheck/flat/blue.css",             
                "~/Views/Shared/CSS/FrameworkStyles.css"
                ));

            bundles.Add(new ScriptBundle("~/bundles/analyticsbootstrapjs").Include(
                "~/Scripts/analytics.js",
                "~/Scripts/bootstrap.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/thirdpartyjs").Include(
                "~/Assets/plugins/slimScroll/jquery.slimscroll.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/appjs").Include(
                "~/Assets/js/app.js",
                "~/Assets/js/demo.js"
                ));

        }
    }
}