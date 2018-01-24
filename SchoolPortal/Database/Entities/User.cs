using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SchoolPort.Models;

namespace SchoolPort.Database.Entities
{    
    public class User
    {
        public int Id { get; set; }
        public string ApplicationUserId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public int Gender { get; set; }
        public string BloodGroup { get; set; }
        public string Email { get; set; }         
        public int? RoleId { get; set; }                
        public DateTime? JoiningDate { get; set; }
        public string MotherName { get; set; }
        public string FatherContactNumber { get; set; }
        public string MotherContactNumber { get; set; }
        public string FatherPlaceOfWork { get; set; }
        public string MotherPlaceOfWork { get; set; }
        public int? Active { get; set; }        
        public int? AddressId { get; set; }
        public virtual Address Address { get; set; }        
        public DateTime? LastUpdatedDate { get; set; }
        public string LastUpdatedBy { get; set; }
        public DateTime? LastLogin { get; set; }
    }
}