using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolPort.Models.ControllerHelper
{
    public class SCActionResult
    {
        public bool Success { get; set; }
        public string ErrorTitle { get; set; }
        public string ErrorMessage { get; set; }
        public string Data { get; set; }
        public string Redirect { get; set; }

        public static SCActionResult GetResult(bool success, string errMsg = "", string errTitle = "", string data = null)
        {
            SCActionResult opResult = new SCActionResult();
            opResult.Success = success;
            opResult.ErrorMessage = errMsg;
            opResult.ErrorTitle = errTitle;
            opResult.Data = data;
            return opResult;
        }

        public static SCActionResult GetResult(string redirect)
        {
            SCActionResult opResult = new SCActionResult();
            opResult.Redirect = redirect;
            return opResult;
        }
    }
}