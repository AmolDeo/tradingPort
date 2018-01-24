using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SchoolPort.Models
{
    public class ClassViewModel
    {
        public int? Id { get; set; }

        [Required]
        [StringLength(72)]
        public string Name { get; set; }

        public string Division { get; set; }
    }
}