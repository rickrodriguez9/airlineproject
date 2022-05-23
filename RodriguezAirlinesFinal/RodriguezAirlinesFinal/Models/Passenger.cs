namespace RodriguezAirlinesFinal.Models {
    public class Passenger {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Job { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Age { get; set; }
        public List<ConfirmationNum>? ConfirmationNum { get; set; }
    }
}
