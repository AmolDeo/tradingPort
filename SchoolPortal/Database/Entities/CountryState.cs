using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolPort.Database.Entities 
{
    [Table("CountryState")]
    public partial class CountryState
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int CountryId { get; set; }
        public virtual Country Country{ get; set; }

        [StringLength(10)]
        public string Code { get; set; }

        [Required]
        [StringLength(72)]
        public string Name { get; set; }

        public virtual ICollection<Address> AddressList { get; set; }
    }
}
