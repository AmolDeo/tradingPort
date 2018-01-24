using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SchoolPort.Models
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Email")]
        [EmailAddress]
        [DisplayFormat(NullDisplayText = "Email")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [DisplayFormat(NullDisplayText = "Password")]
        public string Password { get; set; }

        bool rememberMe = false;
        [Display(Name = "Keep me signed in")]
        public bool RememberMe
        {
            get { return rememberMe; }
            set { rememberMe = value; }
        }

        public string LoginMessage { get; set; }
    }
}