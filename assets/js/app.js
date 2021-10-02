let ventas = [];

let venta1 = {
  id: "1",
  descripcion: "Platos",
  precio: "1000",
  estado: "Disponible",
};

let venta2 = {
  id: "2",
  descripcion: "Cubiertos",
  precio: "2000",
  estado: "Disponible",
};

let venta3 = {
  id: "3",
  descripcion: "Vasos",
  precio: "500",
  estado: "Disponible",
};

ventas.push(venta1, venta2, venta3);

$botonGuardarVenta = document.getElementById("guardarVenta");

$botonGuardarVenta.addEventListener("click", agregarVentas);

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
      <td><button>Editar</button></td>
  </tr>`;

      document.getElementById("idProducto").value = "";
      document.getElementById("descripcionProducto").value = "";
      document.getElementById("valorUnitario").value = "";
    } else {
      alert("El id ya existe");
    }
  } else {
    alert("Todos los campos deben ser diligenciados");
  }
}

function cargarVentas() {
  let $tbody = document.getElementById("leerVentas");
  ventas.forEach((venta) => {
    $tbody.innerHTML += `<tr>
    <td>${venta.id}</td>
    <td>${venta.descripcion}</td>
    <td>${venta.precio}</td>
    <td>${venta.estado}</td>
    <td><button>Borrar</button></td>
    <td><button>Editar</button></td>
</tr>`;
  });
}

cargarVentas();

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
    venta.id === id ? (bandera = true) : (bandera = false);
  });

  return bandera;
}
