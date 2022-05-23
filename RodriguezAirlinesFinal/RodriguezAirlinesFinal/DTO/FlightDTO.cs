namespace RodriguezAirlinesFinal.DTO {
    public class FlightDTO {
        public int Id { get; set; }
        public int PlaneId { get; set; }
        //Depart Date and Time
        public DateTime DepartDT { get; set; }
        //Arrival Date and Time
        public DateTime ArriveDT { get; set; }
        //Depart Airport
        public string DepartAP { get; set; } = string.Empty;
        //Arrival Airport
        public string ArriveAP { get; set; } = string.Empty;
        public int PassengerLimt { get; set; }
    }
}
