var socket = io()
var $desk = document.getElementById('desk')
var $boton = document.getElementById('ticket')
var $atender = document.getElementById('atender')
var searchParams = new URLSearchParams(window.location.search)
if(!searchParams.has('escritorio')){
    window.location='index.html'
    throw new Error ('El escritorio es necesario')
}

var escritorio = searchParams.get('escritorio')
$desk.innerHTML += " "+escritorio
$boton.addEventListener('click',function(){
    socket.emit('atenderTicket',{escritorio:escritorio},function(resp){
        if(!resp.numero){
            $atender.innerHTML = "Sin asignar"
        }else{

            $atender.innerHTML = resp.numero
        } 
    })
})