using Microsoft.AspNet.Identity.Owin;
using SchoolPort.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolPort.Models.Helpers
{
    public class UserSessionData
    {
        [ThreadStatic]
        public static string _currentUser;

        [ThreadStatic]
        private static ApplicationUserManager _userManager;

        [ThreadStatic]
        private static SCDbContext _dbContext;

        [ThreadStatic]
        private static ApplicationSignInManager _signInManager;

        [ThreadStatic]
        private static ApplicationRoleManager _roleManager;

        public static string DBContextKey { get; set; }

        public static string CurrentUser
        {
            get
            {
                if (_currentUser != null)
                    return _currentUser;

                if (HttpContext.Current == null || HttpContext.Current.User == null)
                    return string.Empty;

                return HttpContext.Current.User.Identity.Name;
            }
            set { _currentUser = value; }
        }

        public static SCDbContext DBContext
        {
            get
            {
                if (_dbContext != null)
                    return _dbContext;

                return HttpContext.Current.Items[ConstantHelper.APPLICATION_DBCONTEXT] as SCDbContext;
            }
            set { _dbContext = value; }
        }

        public static ApplicationUserManager UserManager
        {
            get
            {
                if (_userManager != null)
                    return _userManager;

                return HttpContext.Current.GetOwinContext().Get<ApplicationUserManager>();
            }
            set { _userManager = value; }
        }

        public static ApplicationSignInManager SignInManager
        {
            get
            {
                if (_signInManager != null)
                    return _signInManager;

                return HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            set { _signInManager = value; }
        }

        public static ApplicationRoleManager RoleManager
        {
            get
            {
                if (_roleManager != null)
                    return _roleManager;

                return HttpContext.Current.GetOwinContext().Get<ApplicationRoleManager>();
            }
            set { _roleManager = value; }
        }
    }
}