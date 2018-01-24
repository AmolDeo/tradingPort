using SchoolPort.Database.Entities;
using System;

namespace SchoolPort.Database
{
    public class Attendance
    {
        public int? Id { get; set; }
        public int? UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime Date { get; set; }
        public int? AbsentType { get; set; }
        public string AbsentReason { get; set; }
        public bool Aproved { get; set; }
        public DateTime LastUpdated { get; set; }
        public string LastUpdatedBy { get; set; }
       
    }
}