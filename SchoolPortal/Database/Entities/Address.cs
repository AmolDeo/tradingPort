using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolPort.Database.Entities
{
    [Table("Address")]
    public partial class Address
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(72)]
        public string AddressName { get; set; }

        [StringLength(80)]
        public string Street1 { get; set; }

        [StringLength(80)]
        public string Street2 { get; set; }

        [StringLength(80)]
        public string City { get; set; }

        public int? StateId { get; set; }
        public virtual CountryState State { get; set; }

        public int? CountryId { get; set; }
        public virtual Country Country { get; set; }

        [StringLength(11)]
        public string Zip { get; set; }

        [StringLength(128)]
        public string Email { get; set; }
    }
}
