using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using RodriguezAirlinesFinal.Data;
using RodriguezAirlinesFinal.DTO;
using RodriguezAirlinesFinal.Models;

namespace RodriguezAirlinesFinal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengersController : ControllerBase
    {
    
        private readonly RAContext _context;

        public PassengersController(RAContext context)
        {
            _context = context;
        } 

        // GET: api/Passengers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Passenger>>> Getpassengers()
        {
          if (_context.passengers == null)
          {
              return NotFound();
          }
            return await _context.passengers.ToListAsync();
        }

   


        // GET: api/Passengers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Passenger>> GetPassenger(int id)
        {
          if (_context.passengers == null)
          {
              return NotFound();
          }
            var passenger = await _context.passengers.FindAsync(id);

            if (passenger == null)
            {
                return NotFound();
            }

            return passenger;
        }

        // PUT: api/Passengers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPassenger(int id, PassengerDTO passenger)
        {
            Console.WriteLine(passenger);
            Console.WriteLine(id);
            if (id != passenger.Id)
            {
                return BadRequest();
            }

            var ps = await _context.passengers.FindAsync(passenger.Id);
            if (ps != null) {
                ps.FirstName = passenger.FirstName;
                ps.LastName = passenger.LastName;
                ps.Job = passenger.Job;
                ps.Email = passenger.Email;
                ps.Age = passenger.Age;
                _context.Entry(ps).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PassengerExists(id))
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

        // POST: api/Passengers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Passenger>> PostPassenger(PassengerDTO pDTO)
        {
            var passenger = new Passenger {
                Id = pDTO.Id,
                FirstName = pDTO.FirstName,
                LastName = pDTO.LastName,
                Job = pDTO.Job,
                Email = pDTO.Email,
                Age = pDTO.Age,
            };

            _context.passengers.Add(passenger);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPassenger", new { id = pDTO.Id }, pDTO);
        }

        // DELETE: api/Passengers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePassenger(int id)
        {
            if (_context.passengers == null)
            {
                return NotFound();
            }
            var passenger = await _context.passengers.FindAsync(id);
            if (passenger == null)
            {
                return NotFound();
            }

            _context.passengers.Remove(passenger);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PassengerExists(int id)
        {
            return (_context.passengers?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
