﻿using System;
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
    public class FlightsController : ControllerBase
    {
        private readonly RAContext _context;

        public FlightsController(RAContext context)
        {
            _context = context;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> Getflights()
        {
          if (_context.flights == null)
          {
              return NotFound();
          }
            return await _context.flights.ToListAsync();
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
          if (_context.flights == null)
          {
              return NotFound();
          }
            var flight = await _context.flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, FlightDTO flight)
        {
            Console.WriteLine(flight);
            Console.WriteLine(id);
            if (id != flight.Id)
            {
                return BadRequest();
            }
            var fl = await _context.flights.FindAsync(flight.Id);
            if (fl != null) {
                
                fl.ArriveAP = flight.ArriveAP;
                fl.ArriveDT = flight.ArriveDT;
                fl.DepartAP = flight.DepartAP;
                fl.DepartDT = flight.DepartDT;
                fl.PassengerLimt = flight.PassengerLimt;
                fl.PlaneId = flight.PlaneId;
                _context.Entry(fl).State = EntityState.Modified;
            } 
           

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
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

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(FlightDTO fDTO)
        {
            var flight = new Flight {
                Id = fDTO.Id,
                PlaneId = fDTO.PlaneId,
                DepartDT = fDTO.DepartDT,
                ArriveDT = fDTO.ArriveDT,
                ArriveAP = fDTO.ArriveAP,
                DepartAP = fDTO.DepartAP,
                PassengerLimt = fDTO.PassengerLimt,
            };

            _context.flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = fDTO.Id }, fDTO);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            if (_context.flights == null)
            {
                return NotFound();
            }
            var flight = await _context.flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool FlightExists(int id)
        {
            return (_context.flights?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
