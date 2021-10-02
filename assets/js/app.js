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

function agregarVentas() {
  let ventas = [];

  let $tbody = document.getElementById("leerVentas");
  let id = document.getElementById("idProducto").value;
  let descripcion = document.getElementById("descripcionProducto").value;
  let precio = document.getElementById("valorUnitario").value;
  let estado = document.getElementById("estadoProducto").value;

  console.log(validarCampos(id, descripcion, precio));

  if (validarCampos(id, descripcion, precio)) {
    venta = {
      id,
      descripcion,
      precio,
      estado,
    };

    ventas.push(venta);

    ventas.forEach((el) => {
      $tbody.innerHTML += `<tr>
      <td>${el.id}</td>
      <td>${el.descripcion}</td>
      <td>${el.precio}</td>
      <td>${el.estado}</td>
      <td><button>Borrar</button></td>
      <td><button>Editar</button></td>
  </tr>`;
    });

    document.getElementById("idProducto").value = "";
    document.getElementById("descripcionProducto").value = "";
    document.getElementById("valorUnitario").value = "";
  } else {
    alert("Todos los campos deben ser diligenciados");
  }
}

function validarCampos(id, descripcion, precio) {
  if (id !== "" && descripcion !== "" && precio !== "") {
    return true;
  } else {
    return false;
  }
}
