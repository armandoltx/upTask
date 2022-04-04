import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar) {
  btnEliminar.addEventListener('click', (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;

    Swal.fire({
      title: 'Deseas borrar este proyecto?',
      text: "EL proyecto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo.',
      cancelButtonText: 'No, Cancelar.'
    }).then((result) => {
      if (result.value) {
        // enviar peticion a traves de axios
        // location.origin ==> 'http://localhost:3000' try in the console it gets you el origin.
        const url = `${location.origin}/proyectos/${urlProyecto}`;
        // console.log(`url => ${url}`);
        axios.delete(url, { params: {urlProyecto} })
          .then(function (respuesta) { // respuesta viene de la linea 129 del controlador de proyectos.
            // console.log(respuesta);
            Swal.fire(
              'Proyecto Eliminado!',
              respuesta.data,
              'success'
            );
            // Redireccionar al inicio
            setTimeout(() => {
              window.location.href = '/'
            }, 3000)
          })
          .catch(() => {
            // si por algun casual no se pudo borrar, pq se perdio la conexion o lo q sea.
            Swal.fire({
              type: 'error',
              title: 'Hubo un error.',
              text: 'No se pudo eliminar el proyecto.'
            })
          })
      }
    })
  });
}
export default btnEliminar;