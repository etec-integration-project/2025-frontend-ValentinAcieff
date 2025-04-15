db = db.getSiblingDB("ecommerce");

db.products.insertMany([
  {
    nombre: "Botines Adidas Predator Edge.3 FG - Edición Limitada",
    categoria: "botines",
    descripcion: "Botines profesionales de fútbol Adidas Predator Edge.3 para césped natural, con tecnología de control de balón mejorada y suela de tracción FG.",
    marca: "Adidas",
    precio: 45999,
    stock: 15,
    tallas_disponibles: [41, 42, 43],
    colores_disponibles: ["negro/blanco", "rojo/negro", "azul/verde"],
    material: "Cuero sintético",
    uso_recomendado: "Fútbol profesional y amateur",
    imagenes: ["adidas_predator_edge_1.jpg", "adidas_predator_edge_2.jpg"]
  },
  {
    nombre: "Camiseta Oficial FC Barcelona 2024/25 - Versión Jugador",
    categoria: "camisetas",
    descripcion: "Camiseta oficial del FC Barcelona para la temporada 2024/25, diseñada con tecnología Dri-FIT para máxima transpirabilidad.",
    marca: "Nike",
    precio: 29999,
    stock: 35,
    tallas_disponibles: ["S", "M", "L", "XL", "XXL"],
    colores_disponibles: ["azul/granate", "azul claro", "blanco"],
    material: "Poliéster reciclado",
    imagenes: ["barcelona_camiseta_1.jpg", "barcelona_camiseta_2.jpg"],
    tipo: "Réplica oficial"
  },
  {
    nombre: "Shorts NBA Los Angeles Lakers Swingman - Edición Icon",
    categoria: "shorts",
    descripcion: "Pantalón corto oficial de los Lakers, con tecnología de absorción de humedad y diseño ergonómico.",
    marca: "Nike",
    precio: 24999,
    stock: 25,
    tallas_disponibles: ["S", "M", "L", "XL"],
    colores_disponibles: ["púrpura/oro", "blanco", "negro"],
    material: "Poly-Dri",
    imagenes: ["lakers_short_1.jpg", "lakers_short_2.jpg"],
    temporada: 2024
  },
  {
    nombre: "Campera Puma Train Cloudspun Full-Zip - Invierno 2024",
    categoria: "camperas",
    descripcion: "Chaqueta deportiva de alto rendimiento con tecnología de aislamiento térmico y diseño ergonómico para entrenamientos.",
    marca: "Puma",
    precio: 49999,
    stock: 20,
    tallas_disponibles: ["S", "M", "L", "XL", "XXL"],
    colores_disponibles: ["negro", "gris oscuro", "azul marino"],
    material: "Mezcla de poliéster reciclado",
    imagenes: ["puma_cloudspun_1.jpg", "puma_cloudspun_2.jpg"],
    caracteristicas: [
      "Capucha ajustable",
      "Bolsillos con cremallera",
      "Puños elastizados"
    ]
  },
  {
    nombre: "Zapatillas Running Nike Air Zoom Pegasus 41",
    categoria: "zapatillas",
    descripcion: "Zapatillas de running de alto rendimiento con tecnología Zoom Air para máximo confort y respuesta.",
    marca: "Nike",
    precio: 59999,
    stock: 40,
    tallas_disponibles: [43, 44],
    colores_disponibles: ["negro/blanco", "gris/verde", "azul/naranja"],
    material: "Malla transpirable",
    uso_recomendado: "Running en asfalto y terreno mixto",
    imagenes: ["nike_pegasus_1.jpg", "nike_pegasus_2.jpg"],
    peso: "252 gramos"
  }
]);
