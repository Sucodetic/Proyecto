let ventas = [];

$botonGuardarVenta = document.getElementById("guardarVenta");
$botonGuardarVenta.addEventListener("click", agregarVentas);

$botonEditarVenta = document.getElementById("editarVenta");
$botonEditarVenta.addEventListener("click", actualizarVenta);

function actualizarVenta() {
  let id = document.getElementById("idProductoEditar").value;
  let descripcion = document.getElementById("descripcionEditar").value;
  let precio = document.getElementById("valorUnitarioEditar").value;
  let estado = document.getElementById("estadoEditar").value;

  ventas.map((el) => {
    if (el.id == id) {
      el.descripcion = descripcion;
      el.precio = precio;
      el.estado = estado;
    }
  });

  document.getElementById("formularioRegistrar").style.display = "block";
  document.getElementById("formularioEditar").style.display = "none";

  cargarVentas();
  limpiarCampos();
}

function agregarVentas() {
  let $tbody = document.getElementById("leerVentas");
  let id = document.getElementById("idProducto").value;
  let descripcion = document.getElementById("descripcionProducto").value;
  let precio = document.getElementById("valorUnitario").value;
  let estado = document.getElementById("estadoProducto").value;

  if (validarCampos(id, descripcion, precio)) {
    if (!validarIdVenta(id)) {
      venta = {
        id,
        descripcion,
        precio,
        estado,
      };

      ventas.push(venta);

      $tbody.innerHTML += `<tr>
      <td>${venta.id}</td>
      <td>${venta.descripcion}</td>
      <td>${venta.precio}</td>
      <td>${venta.estado}</td>
      <td><button>Borrar</button></td>
      <td><button onclick="editarVenta(${venta.id})">Editar</button></td>
  </tr>`;

      limpiarCampos();
    } else {
      msg = "El id ingresado ya existe en la base de datos.";
      mostrarError(msg);
    }
  } else {
    alert("Todos los campos deben ser diligenciados");
  }
}

function buscarVentaPorId(id) {
  let venta = {};
  ventas.forEach((el) => {
    if (el.id == id) {
      venta = el;
    }
  });

  return venta;
}

function cancelarFiltrado() {
  cargarVentas();
  $botonCancelarFiltro.style.display = "none";
}

function cargarVentas() {
  let $tbody = document.getElementById("leerVentas");

  $tbody.innerHTML = "";

  ventas.forEach((venta) => {
    $tbody.innerHTML += `<tr>
    <td>${venta.id}</td>
    <td>${venta.descripcion}</td>
    <td>${venta.precio}</td>
    <td>${venta.estado}</td>
    <td><button>Borrar</button></td>
    <td><button onclick="editarVenta(${venta.id})">Editar</button></td>
</tr>`;
  });
}

cargarVentas();

function editarVenta(id) {
  document.getElementById("formularioRegistrar").style.display = "none";
  document.getElementById("formularioEditar").style.display = "block";

  let $inputId = document.getElementById("idProductoEditar");
  let $inputDescripcion = document.getElementById("descripcionEditar");
  let $inputValoUnitario = document.getElementById("valorUnitarioEditar");
  let $selectEstado = document.getElementById("estadoEditar");

  try {
    let venta = buscarVentaPorId(id);

    $inputId.value = venta.id;
    $inputDescripcion.value = venta.descripcion;
    $inputValoUnitario.value = venta.precio;
    $selectEstado.value = venta.estado;
  } catch (err) {
    alert("Ocurrió el siguiente error: ", err);
  }
}

function limpiarCampos() {
  let id = (document.getElementById("idProducto").value = "");
  let descripcion = (document.getElementById("descripcionProducto").value = "");
  let precio = (document.getElementById("valorUnitario").value = "");
}

function mostrarError(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${msg}`,
  });
}

function validarCampos(id, descripcion, precio) {
  if (id !== "" && descripcion !== "" && precio !== "") {
    return true;
  } else {
    return false;
  }
}

function validarIdVenta(id) {
  let bandera = false;

  ventas.forEach((venta) => {
    if (venta.id == id) {
      bandera = true;
    }
  });

  return bandera;
}
