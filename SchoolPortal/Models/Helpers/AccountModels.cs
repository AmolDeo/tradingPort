﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolPort.Models.Helpers
{
    public class AccountModels
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string AccountNum { get; set; }

        public string Description { get; set; }

        public DateTime ValuationDate { get; set; }

        public double? Amount { get; set; }

        public double? Fee { get; set; }

        public double? Quantity { get; set; }

        public double? Price { get; set; }

        public Boolean? Available { get; set; }
    }
}