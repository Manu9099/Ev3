$(document).ready(function() {
    // URL base del API
    const baseUrl = 'http://localhost:8080/api/usuario'
  
    // Registro
    $('#registerForm').submit(function(event) {
      event.preventDefault();
  
      const nombres = $('#registerNombres').val();
      const apellidos = $('#registerApellidos').val();
      const correo = $('#registerCorreo').val();
      const password = $('#registerPassword').val();
  
      $.ajax({
        type: 'POST',
        url: `${baseUrl}/register`,
        contentType: 'application/json',
        data: JSON.stringify({ nombres, apellidos, correo, password }),
        success: function(response) {
          $('#message').text(response.message);
          console.log("Registrado con exito")
        },
        error: function(error) {
          $('#message').text(error.responseJSON.error);
        }
      });
    });
});