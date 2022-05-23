using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RodriguezAirlinesFinal.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "flights",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaneId = table.Column<int>(type: "int", nullable: false),
                    DepartDT = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ArriveDT = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartAP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ArriveAP = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PassengerLimt = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flights", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Passengers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Job = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passengers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "confirmationNums",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PassengerId = table.Column<int>(type: "int", nullable: false),
                    PayAmount = table.Column<int>(type: "int", nullable: false),
                    FlightId = table.Column<int>(type: "int", nullable: true),
                    FlightId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_confirmationNums", x => x.Id);
                    table.ForeignKey(
                        name: "FK_confirmationNums_flights_FlightId",
                        column: x => x.FlightId,
                        principalTable: "flights",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_confirmationNums_flights_FlightId1",
                        column: x => x.FlightId1,
                        principalTable: "flights",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_confirmationNums_Passengers_PassengerId",
                        column: x => x.PassengerId,
                        principalTable: "Passengers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_confirmationNums_FlightId",
                table: "confirmationNums",
                column: "FlightId");

            migrationBuilder.CreateIndex(
                name: "IX_confirmationNums_FlightId1",
                table: "confirmationNums",
                column: "FlightId1");

            migrationBuilder.CreateIndex(
                name: "IX_confirmationNums_PassengerId",
                table: "confirmationNums",
                column: "PassengerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "confirmationNums");

            migrationBuilder.DropTable(
                name: "flights");

            migrationBuilder.DropTable(
                name: "Passengers");
        }
    }
}
