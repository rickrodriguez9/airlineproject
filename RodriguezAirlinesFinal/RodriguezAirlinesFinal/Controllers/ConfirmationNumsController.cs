using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RodriguezAirlinesFinal.Data;
using RodriguezAirlinesFinal.DTO;
using RodriguezAirlinesFinal.Models;

namespace RodriguezAirlinesFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfirmationNumsController : ControllerBase
    {
        private readonly RAContext _context;

        public ConfirmationNumsController(RAContext context)
        {
            _context = context;
        }

        // GET: api/ConfirmationNums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConfirmationNum>>> GetconfirmationNums()
        {
          if (_context.confirmationNums == null)
          {
              return NotFound();
          }
            return await _context.confirmationNums.ToListAsync();
        }



        // GET: api/ConfirmationNums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConfirmationNum>> GetConfirmationNum(int id)
        {
          if (_context.confirmationNums == null)
          {
              return NotFound();
          }
            var confirmationNum = await _context.confirmationNums.FindAsync(id);

            if (confirmationNum == null)
            {
                return NotFound();
            }

            return confirmationNum;
        }

        // PUT: api/ConfirmationNums/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConfirmationNum(int id, ConfirmationNumsDTO confirmationNum)
        {
            Console.WriteLine(confirmationNum);
            Console.WriteLine(id);
            if (id != confirmationNum.Id)
            {
                return BadRequest();
            }
            var cn = await _context.confirmationNums.FindAsync(confirmationNum.Id);
            if (cn != null) {
                cn.PayAmount = confirmationNum.PayAmount;
                _context.Entry(cn).State = EntityState.Modified;
            }
           

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConfirmationNumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ConfirmationNums
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ConfirmationNum>> PostConfirmationNum(ConfirmationNumsDTO cDTO)
        {
            var confirmationNum = new ConfirmationNum {
                Id = cDTO.Id,
                PayAmount = cDTO.PayAmount,
                
            };

            _context.confirmationNums.Add(confirmationNum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConfirmationNum", new { id = cDTO.Id }, cDTO);
        }

        // DELETE: api/ConfirmationNums/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConfirmationNum(int id)
        {
            if (_context.confirmationNums == null)
            {
                return NotFound();
            }
            var confirmationNum = await _context.confirmationNums.FindAsync(id);
            if (confirmationNum == null)
            {
                return NotFound();
            }

            _context.confirmationNums.Remove(confirmationNum);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConfirmationNumExists(int id)
        {
            return (_context.confirmationNums?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
