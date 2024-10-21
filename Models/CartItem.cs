using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shopping.Models
{
    public class CartItem
    {
        [Key] // 主鍵標註
        public int Id { get; set; }

        [ForeignKey("Product")] // 外鍵標註，對應到 Product 表
        public int ProductId { get; set; }

        public Product? Product { get; set; } // 與產品的關聯，設置為可為 null 或使用 `required` 修飾符

        [Required] // 確保數量欄位是必填的
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
        public int Quantity { get; set; }

        [NotMapped] // 可選屬性：計算項目總價，不存入資料庫
        public decimal TotalPrice => Quantity * (Product?.Price ?? 0);
    }
}
