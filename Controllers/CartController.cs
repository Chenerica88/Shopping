using Microsoft.AspNetCore.Mvc;
using Shopping.Data;
using Shopping.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shopping.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ShoppingDbContext _context;

        public CartController(ShoppingDbContext context)
        {
            _context = context;
        }

        // 獲取購物車所有項目
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartItem>>> GetCartItems()
        {
            return await _context.CartItems.Include(c => c.Product).ToListAsync();
        }

        // 添加到購物車
        [HttpPost]
        public async Task<ActionResult<CartItem>> AddToCart([FromBody] CartItem cartItem)
        {
            var product = await _context.Products.FindAsync(cartItem.ProductId);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            if (product.Stock < cartItem.Quantity)
            {
                return BadRequest("Insufficient stock.");
            }

            var existingItem = await _context.CartItems.FirstOrDefaultAsync(ci => ci.ProductId == cartItem.ProductId);
            if (existingItem != null)
            {
                if (existingItem.Quantity + cartItem.Quantity > product.Stock)
                {
                    return BadRequest("Adding the specified quantity exceeds available stock.");
                }
                existingItem.Quantity += cartItem.Quantity;
            }
            else
            {
                _context.CartItems.Add(cartItem);
            }

            await _context.SaveChangesAsync();
            return Ok(cartItem);
        }

        // 從購物車中移除項目
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFromCart(int id)
        {
            var cartItem = await _context.CartItems.FindAsync(id);
            if (cartItem == null)
            {
                return NotFound();
            }

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
