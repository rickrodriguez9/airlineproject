using RodriguezAirlinesFinal.Models;
using Microsoft.EntityFrameworkCore;

namespace RodriguezAirlinesFinal.Data {
    public class RAContext : DbContext {
        public RAContext() { }

        public RAContext(DbContextOptions<RAContext> options) : base(options) { }

        public DbSet<Passenger> passengers { get; set; } = null!;
        public DbSet<Flight> flights { get; set; } = null!;
        public DbSet<ConfirmationNum> confirmationNums { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<ConfirmationNum>()
                .HasOne(f => f.Flight)
                .WithMany();

            modelBuilder.Entity<Passenger>()
                .HasMany(c => c.ConfirmationNum);

            modelBuilder.Entity<Flight>()
                .HasMany(c => c.PassengerList);
        }
    }
}
