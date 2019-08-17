
const $Button_ticket = document.getElementById('ticket')
const $lbl_ticket = document.getElementById('lblNuevoTicket')
var socket = io()
socket.on('connect',function(){
    console.log('Conectado al servidor');
})
socket.on('disconnect',function(){
    console.log('Conexión perdida');
})
socket.on('EstadoActual',function(resp){
    $lbl_ticket.innerHTML = resp.actual
})
$Button_ticket.addEventListener('click',function(){
    socket.emit('siguienteTicket',null,function(siguienteTicket){
       $lbl_ticket.innerHTML = siguienteTicket
    })
})