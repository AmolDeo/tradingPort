using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using SchoolPort.Database;
using SchoolPort.Models;
using SchoolPort.Models.ControllerHelper;
using SchoolPort.Models.Helpers;
using System;
using System.Collections.Generic;
using Microsoft.Owin.Security;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace SchoolPort.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (returnUrl == "/Account/LogOff")
            {
                returnUrl = "/";
            }
            HttpCookie hc;
            hc = Request.Cookies.Get("ActiveTenant");
            if (hc != null)
                Request.Cookies.Remove("ActiveTenant");

            if (Request.Cookies[FormsAuthentication.FormsCookieName] != null)
            {
                HttpCookie cookie = Request.Cookies[FormsAuthentication.FormsCookieName];

                JavaScriptSerializer js = new JavaScriptSerializer();
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(cookie.Value);

                LoginViewModel model = js.Deserialize<LoginViewModel>(ticket.UserData);              
                var signInResult =  UserSessionData.SignInManager.PasswordSignInAsync(model.Email, model.Password, (bool)model.RememberMe, shouldLockout: false).Result;

                if (signInResult == SignInStatus.Success)
                {
                    var user = UserSessionData.UserManager.FindByNameAsync(model.Email).Result;
                    return OnLogin(model, user);
                }
            }

            ViewBag.ReturnUrl = returnUrl;           
            return View("CPLogin");
        }
        private ActionResult OnLogin(LoginViewModel model, ApplicationUser user)
        {
            SCActionResult result = null;
            if (user.DefaultPassword)
            {
                string token = UserSessionData.UserManager.GeneratePasswordResetTokenAsync(user.Id).Result;

                result = SCActionResult.GetResult(true);
                token = HttpUtility.UrlEncode(token);
                result.Redirect = string.Format(@"/Account/ResetPassword?userId={0}&code={1}&userEmail={2}", user.Id, token, user.Email);
                return Json(result, JsonRequestBehavior.AllowGet);
            }

            string returnUrl = Url.Action("Index", "TenantAdmin");

            result = SCActionResult.GetResult(true);
            result.Redirect = string.IsNullOrEmpty(returnUrl) ? "/" : returnUrl;            
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            HttpCookie hc = Request.Cookies.Get("ActiveTenant");
            if (hc != null)
                Request.Cookies.Remove("ActiveTenant");

            if (Request.Cookies[FormsAuthentication.FormsCookieName] != null)
            {
                HttpCookie cookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                cookie.Expires = DateTime.Now.AddDays(-1);
                Response.Cookies.Add(cookie);
            }
            return RedirectToAction("Login", "Account");
        }

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }
    }

    
}