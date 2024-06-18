$(document).ready(function() {
  // URL base del API
  const baseUrl = 'http://localhost:8080/api/usuario'; // Asegúrate de cambiarlo si es necesario

  // Login de usuario
  $('#loginForm').submit(function(event) {
      event.preventDefault();

      const correo = $('#loginCorreo').val();
      const password = $('#loginPassword').val();

      $.ajax({
          type: 'POST',
          url: `${baseUrl}/login`,
          contentType: 'application/json',
          data: JSON.stringify({ correo, password }),
          success: function(response) {
              $('#loginMessage').text(response.message);

              console.log("Login exitoso");

              // Mostrar mensaje de bienvenida y correo del usuario
              $('#welcomeMessage').removeClass('d-none');
              $('#userName').text(`Bienvenido, ${response.correo}`);

              // Redirigir después de mostrar el mensaje
              setTimeout(function() {
                  window.location.href = '/bienvenida.html';
              }, 2000); // Redirigir después de 2 segundos

              $('#loginForm').addClass('d-none');
              $('#message').empty();
          },
          error: function(error) {
              $('#loginMessage').text(error.responseJSON.error);
          }
      });
  });
});
