using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SchoolPort.Database.Entities
{
    public class SchoolEvent
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [StringLength(72)]
        public string Name { get; set; }

        public string Description { get; set; }

        public int EventType { get; set; }

        public DateTime? Date { get; set; }

        public int? ClassId { get; set; }
        public virtual Class Class { get; set; }
    }
}