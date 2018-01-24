using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolPort.Database.Entities
{
    [Table("Country")]
    public partial class Country
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(72)]
        public string Name { get; set; }

        public virtual ICollection<CountryState> CountryStateList { get; set; }
        public virtual ICollection<Address> AddressList { get; set; }
    }
}
