using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shopping.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        public int Stock { get; set; }
    }
}
