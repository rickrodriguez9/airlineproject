namespace RodriguezAirlinesFinal.Models {
    public class ConfirmationNum {
        public int Id { get; set; }
        public Passenger Passenger { get; set; } = null!;
        public int PayAmount { get; set; }
        public Flight? Flight { get; set; }

    }
}
