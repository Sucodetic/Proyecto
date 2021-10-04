let ventas = [];

$botonGuardarVenta = document.getElementById("guardarVenta");
$botonGuardarVenta.addEventListener("click", agregarVentas);

$botonEditarVenta = document.getElementById("editarventa");
$botonEditarVenta.addEventListener("click", actualizarVenta);

$botonBuscarFiltro = document.getElementById("btnBuscar");
$botonBuscarFiltro.addEventListener("click", filtrar);

$botonCancelarFiltro = document.getElementById("btnCancelar");
$botonCancelarFiltro.addEventListener("click", cancelarFiltrado);

function actualizarVenta() {
  let id = document.getElementById("idEditar").value;
  let idCliente = document.getElementById("idClienteEditar").value;
  let name = document.getElementById("nameEditar").value;
  let date = document.getElementById("dateEditar").value;
  let detalle = document.getElementById("detalleEditar").value;
  let valor = document.getElementById("valorEditar").value;
  let estado = document.getElementById("estadoEditar").value;

  ventas.map((el) => {
    if (el.id == id) {
      if (idCliente != "" && name != "" && date != "" && detalle != "" && valor != "" && estado != "") {
        el.detalle = detalle;
        el.date = date;
        el.idCliente = idCliente;
        el.name = name;
        el.valor = valor;
        el.estado = estado;

        document.getElementById("formularioRegistrar").style.display = "block";
        document.getElementById("formularioEditar").style.display = "none";

        cargarVentas();
        limpiarCampos();
        confirmarActualizacionVenta();
      } else {
        alert("Todos los campos debern ser diligenciados");
      }
    }
  });
}

function agregarVentas() {
  let $tbody = document.getElementById("ReadVentas");
  let id = document.getElementById("id").value;
  let idCliente = document.getElementById("idCliente").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let detalle = document.getElementById("detalle").value;
  let valor = document.getElementById("valor").value;
  let estado = document.getElementById("estado").value;

  if (validarCampos(id, idCliente, name, date, detalle, valor)) {
    if (!validarIdVenta(id)) {
      venta = {
        id,
        idCliente,
        name,
        date,
        detalle,
        valor,
        estado,
      };

      ventas.push(venta);
      confirmarRegistroVenta(name, detalle, valor, estado);

      $tbody.innerHTML += `<tr>
      <td>${venta.id}</td>
      <td>${venta.idCliente}</td>
      <td>${venta.name}</td>
      <td>${venta.date}</td>
      <td>${venta.detalle}</td>
      <td>${venta.valor}</td>
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
  let $tbody = document.getElementById("ReadVentas");

  $tbody.innerHTML = "";

  ventas.forEach((venta) => {
    $tbody.innerHTML += `<tr>
    <td>${venta.id}</td>
    <td>${venta.idCliente}</td>
    <td>${venta.name}</td>
    <td>${venta.date}</td>
    <td>${venta.detalle}</td>
    <td>${venta.valor}</td>
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

  let $inputId = document.getElementById("idEditar");
  let $inputIdCliente = document.getElementById("idClienteEditar");
  let $inputname = document.getElementById("nameEditar");
  let $inputdate = document.getElementById("dateEditar");
  let $inputDetalle = document.getElementById("detalleEditar");
  let $inputValor = document.getElementById("valorEditar");
  let $selectEstado = document.getElementById("estadoEditar");

  try {
    let venta = buscarVentaPorId(id);

    $inputId.value = venta.id;
    $inputIdCliente.value = venta.idCliente;
    $inputname.value = venta.name;
    $inputdate.value = venta.date;
    $inputDetalle.value = venta.detalle;
    $inputValor.value = venta.valor;
    $selectEstado.value = venta.estado;
  } catch (err) {
    alert("Ocurrió el siguiente error: ", err);
  }
}

function limpiarCampos() {
  let id = (document.getElementById("id").value = "");
  let idCliente = (document.getElementById("idCliente").value = "");
  let name = (document.getElementById("name").value = "");
  let date = (document.getElementById("date").value = "");
  let detalle = (document.getElementById("detalle").value = "");
  let valor = (document.getElementById("valor").value = "");
}

function mostrarError(msg) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${msg}`,
  });
}

function validarCampos(id, idCliente, name, date, detalle, valor) {
  if (id !== "" && idCliente !== "" && name !== "" && date !== "" && detalle !== "" && valor !== "") {
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

function filtrar() {
  $botonCancelarFiltro.style.display = "inline-block";

  let input, filter, table, tr, td, i, j, visible;
  input = document.getElementById("filtro");
  filter = input.value.toUpperCase();
  table = document.getElementById("ReadVentas");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    visible = false;
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      if (td[j] && td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
        visible = true;
      }
    }
    if (visible === true) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

function confirmarRegistroVenta(nombreCliente, detalleVenta, valorVenta, estado) {
  Swal.fire({
    title: "Registro exitoso",
    html: `<b>Nombre del cliente: </b> ${nombreCliente}<br>
    <b>Detalle de la venta: </b> ${detalleVenta} <br>
    <b>Valor de la venta: </b> $${valorVenta}<br>
    <b>Estado de la venta: </b>${estado}`,

    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}

function confirmarActualizacionVenta() {
  Swal.fire({
    title: "Actualización exitosa",
    showClass: {
      popup: "animate__animated animate__fadeInDown",
    },
    hideClass: {
      popup: "animate__animated animate__fadeOutUp",
    },
  });
}
