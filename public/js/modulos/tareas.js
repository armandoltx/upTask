import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if(tareas) {
  // cambiar color del icono dependiendo si esta completa la tarea
  tareas.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-check-circle')) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      // console.log(idTarea);

      // request hacia "/tareas/:id"
      const url = `${location.origin}/tareas/${idTarea}`
      // console.log(url);
      axios.patch(url, { idTarea })
        .then(function(respuesta) {
          // console.log(respuesta);
          if(respuesta.status === 200) {
            icono.classList.toggle('completo');
            actualizarAvance();
          }
        })
    }

    // borrar la tarea
    if(e.target.classList.contains('fa-trash')) {
      const icono = e.target;
      const tareaHTML = icono.parentElement.parentElement;
      // console.log(tareaHTML);
      const idTarea = tareaHTML.dataset.tarea;
      // console.log(idTarea);
      Swal.fire({
        title: 'Deseas borrar esta Tarea?',
        text: "La tarea eliminada no se puede recuperar",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borralo.',
        cancelButtonText: 'No, Cancelar.'
      }).then((result) => {
        if (result.value) {
          // console.log('eliminando');
          // enviar peticion a traves de axios
          // location.origin ==> 'http://localhost:3000' try in the console it gets you el origin.
          const url = `${location.origin}/tareas/${idTarea}`;
          // console.log(`url => ${url}`);
          axios.delete(url, { params: { idTarea }})
            .then(function (respuesta) {
              // console.log(respuesta);
              if(respuesta.status === 200) {
                // eliminar el nodo
                tareaHTML.parentElement.removeChild(tareaHTML);
                Swal.fire(
                  'Tarea Eliminada!',
                  respuesta.data,
                  'success'
                );

                actualizarAvance();
              }
            })
          }
      })

    }
  });
}

export default tareas;