

const listarProductos = async () => {
  try {
    const respuesta = await fetch("http://localhost:3001/products");
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la lista de productos:", error);
  }
};

const crearProducto = async (name, price, image) => {
  try {
    const respuesta = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, price, image }),
    });

    const data = await respuesta.json();
    console.log("Solicitud POST exitosa:", data);
    if (!respuesta.ok){throw new Error ("Error al enviar el producto")};
    return data;
  } catch (error) {
    console.error("Error en la solicitud POST:", error);
  }
};

const borrarProducto = async (name) => {
  try {
    await fetch(`${"http://localhost:3001/products"}/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(`Producto con id ${name} eliminado exitosamente`);
  } catch (error) {
    console.error("Error en la solicitud DELETE:", error);
  }
};

export const requisiciones = {
  listarProductos,
  crearProducto,
  borrarProducto,
};
