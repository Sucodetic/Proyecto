let usuarios = [];

let usuario1 = {
  Id: 1,
  Nombre: "Yorely Páez",
  Documento: 10239293,
  Correo: "yorely@gmail.com",
  Rol: "Vendedor",
  Estado: "Autorizado",
};

let usuario2 = {
  Id: 2,
  Nombre: "Sebastián Contreras",
  Documento: 102132,
  Correo: "sebastian@gmail.com",
  Rol: "Administrador",
  Estado: "Autorizado",
};

let usuario3 = {
  Id: 3,
  Nombre: "Daniela Calderon",
  Documento: 1054365493,
  Correo: "Daniela@gmail.com",
  Rol: "Vendedor",
  Estado: "No autorizado",
};

let usuario4 = {
  Id: 4,
  Nombre: "Jhonathan Pérez",
  Documento: 102213232,
  Correo: "jhonathan@gmail.com",
  Rol: "Administrador",
  Estado: "Autorizado",
};

usuarios.push(usuario1, usuario2, usuario3, usuario4);

$tablaUsuarios = document.getElementById("leerUsuarios");

function buscarusuarioPorId(id) {
  let usu = {};
  usuarios.forEach((usuario) => {
    if (usuario.Id === id) {
      usu = usuario;
    }
  });

  return usu;
}

function cargarUsuarios() {
  $tablaUsuarios.innerHTML = "";
  usuarios.forEach((usuario) => {
    $tablaUsuarios.innerHTML += `<tr>
    <td>${usuario.Id}</td>
    <td>${usuario.Nombre}</td>
    <td>${usuario.Documento}</td>
    <td>${usuario.Correo}</td>
    <td>${usuario.Rol}</td>
    <td>${usuario.Estado}</td>
    <td><button>Borrar</button></td>
    <td><button onclick="editarUsuario(${usuario.Id})">Editar</button></td>
</tr>`;
  });
}

cargarUsuarios();

function editarUsuario(id) {
  let identificador = id;

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Editar usuario",
      icon: "warning",
      html: ` <div class="form-group">
    <h4>Rol</h4>
    <select class="form-control" id="rol">
      <option>Administrador</option>
      <option>Vendedor</option>
    </select>
  </div>
  <div class="form-group">
  <h4>Estado</h4>
    <select class="form-control" id="estadoUsaurio">
      <option>Pendiente</option>
      <option>Autorizado</option>
      <option>No Autorizado</option>
    </select>
  </div>`,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonText: "Editar",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        let usuario = buscarusuarioPorId(identificador);
        usuario.Rol = document.getElementById("rol").value;
        usuario.Estado = document.getElementById("estadoUsaurio").value;
        cargarUsuarios();
        swalWithBootstrapButtons.fire("Usuario editado exitosamente");
      }
    });
}
