var socket = io();

var $ticket1 = document.getElementById("lblTicket1");
var $ticket2 = document.getElementById("lblTicket2");
var $ticket3 = document.getElementById("lblTicket3");
var $ticket4 = document.getElementById("lblTicket4");

var $desktop1 = document.getElementById("lblEscritorio1");
var $desktop2 = document.getElementById("lblEscritorio2");
var $desktop3 = document.getElementById("lblEscritorio3");
var $desktop4 = document.getElementById("lblEscritorio4");

var lblTickets = [$ticket1, $ticket2, $ticket3, $ticket4];
var lblEscritorios = [$desktop1, $desktop2, $desktop3, $desktop4];
socket.on("EstadoActual", function(data) {
  console.log(data);
  actualizarHTML(data.ultimosCuatro)
 
});
socket.on('ultimosCuatro',function(data){
    
    var audio = new Audio('audio/new-ticket.mp3')
    audio.play()
    actualizarHTML(data.ultimosCuatro)

})
function actualizarHTML(ultimosCuatro){
    for(var iterable in ultimosCuatro){
        lblTickets[iterable].innerHTML = 'Ticket '+ ultimosCuatro[iterable].numero
        lblEscritorios[iterable].innerHTML = 'Escritorio '+ultimosCuatro[iterable].escritorio

    }
}