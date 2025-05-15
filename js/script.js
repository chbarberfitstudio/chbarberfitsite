window.addEventListener("load", () => {
  const loader = document.getElementById("initial-loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500); // transición suave opcional
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Formulario
  const form = document.getElementById("registroForm");
  const fechaInput = document.getElementById("fecha");

  // Estilo al campo de fecha si cambia
  fechaInput.addEventListener("change", function () {
    this.classList.add("filled");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const fecha = document.getElementById("fecha").value;
    const servicio = document.getElementById("servicio").value;

    if (!nombre || !telefono || !fecha || !servicio) {
      Swal.fire("Oops...", "Por favor completa todos los campos.", "warning");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "¡Gracias por ser quien eres!",
      text: "Un Cliente BarberFit 💈",
      confirmButtonText: "💎 Continuar",
    });

    form.reset();
  });
});

const formspreeEndpoint = 'https://formspree.io/f/abcxyzde'; // Reemplaza con tu endpoint real

  document.getElementById('btnSugerencia').addEventListener('click', () => {
    Swal.fire({
      title: '¿Tienes una sugerencia?',
      input: 'textarea',
      inputPlaceholder: 'Escríbela aquí...',
      inputAttributes: {
        'aria-label': 'Escribe tu sugerencia aquí'
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#00c292',
      preConfirm: (texto) => {
        if (!texto) {
          Swal.showValidationMessage('Por favor escribe algo');
          return false;
        }

        // Enviar la sugerencia a Formspree con fetch
        return fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: texto })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al enviar la sugerencia');
          }
        })
        .catch(() => {
          Swal.showValidationMessage('Ocurrió un error al enviar. Intenta de nuevo.');
          return false;
        });
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '¡Gracias!',
          text: 'Tu sugerencia fue enviada con éxito 💡',
          confirmButtonColor: '#00c292'
        });
      }
    });
  });