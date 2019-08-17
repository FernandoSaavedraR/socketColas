const fs = require("fs");

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    let data = require("../data/data");
    this.tickets = [];
    this.ultimosCuatro = [];
    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimosCuatro = data.ultimosCuatro;
    } else {
      this.reiniciarConteo();
    }
  }
  reiniciarConteo() {
    this.ultimo = 0;
    this.grabarArchivo();
    this.tickets = [];
    this.ultimosCuatro = [];
  }
  siguiente() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabarArchivo();
    return `Ticket ${this.ultimo}`;
  }
  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }
  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return "no hay tickets";
    }
    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();
    let atenderTicket = new Ticket(numeroTicket, escritorio);
    this.ultimosCuatro.unshift(atenderTicket) // agregar al principio
    if(this.ultimosCuatro.length>4){
        this.ultimosCuatro.splice(-1,1) //borra el ultimo elemento
    }
    
    this.grabarArchivo()
    return atenderTicket
  }
  getUltimosCuatro(){
    return this.ultimosCuatro
  }
  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimosCuatro:this.ultimosCuatro
    };
    let jsonDataString = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync("./server/data/data.json", jsonDataString);
  }
}

module.exports = {
  TicketControl
};
