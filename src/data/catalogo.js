export const categorias = [
  {
    slug: "placas",
    nombre: "Placas de video",
    descripcion: "Las últimas novedades en GPUs para jugar en 2K y 4K.",
    imagen: "/assets/img/placa-rtx4090.webp",
    enlace: "/productos/placas",
    icono: "gpu",
  },
  {
    slug: "memorias",
    nombre: "Memorias RAM",
    descripcion: "Rams de la más alta calidad para tu setup.",
    imagen: "/assets/img/memorias-ram-ddr4.jpg",
    enlace: "/productos/memorias",
    icono: "ram",
  },
  {
    slug: "monitores",
    nombre: "Monitores",
    descripcion: "El monitor de tus sueños, con la calidad de tus sueños.",
    imagen: "/assets/img/monitor-curvo.jpg",
    enlace: "/productos/monitores",
    icono: "monitor",
  },
  {
    slug: "motherboards",
    nombre: "Motherboards",
    descripcion: "Las mejores mothers del mercado y tendencias.",
    imagen: "/assets/img/motherboard-am5.jpg",
    enlace: "/productos/motherboards",
    icono: "motherboard",
  },
  {
    slug: "perifericos",
    nombre: "Periféricos",
    descripcion: "Teclados, mouses y headsets de las mejores marcas.",
    imagen: "/assets/img/teclado-rgb.jpg",
    enlace: "/productos/perifericos",
    icono: "perifericos",
  },
  {
    slug: "discos",
    nombre: "Discos y almacenamiento",
    descripcion: "Todo el almacenamiento que necesitás, en un solo lugar.",
    imagen: "/assets/img/ssd.jpg",
    enlace: "/productos/discos",
    icono: "disco",
  },
];

const productosPorCategoria = {
  placas: [
    {
      id: "placa-rtx4090",
      nombre: "Gigabyte GeForce RTX 4090",
      categoria: "placas",
      precio: "$2.499.999",
      precioAntes: "$2.999.999",
      cuotas: "12 cuotas sin interés de $208.333",
      imagen: "/assets/img/placa-rtx4090.webp",
      alt: "Placa de video Gigabyte GeForce RTX 4090",
      etiqueta: "Destacada",
    },
    {
      id: "placa-rtx5080",
      nombre: "Zotac Gaming GeForce RTX 5080",
      categoria: "placas",
      precio: "$2.199.999",
      imagen: "/assets/img/placa-rtx5080.jpg",
      alt: "Placa de video Zotac Gaming GeForce RTX 5080",
      etiqueta: "Nuevo",
    },
    {
      id: "placa-rtx3060",
      nombre: "Gigabyte GeForce RTX 3060",
      categoria: "placas",
      precio: "$1.199.999",
      imagen: "/assets/img/placa-rtx3060.webp",
      alt: "Placa de video Gigabyte GeForce RTX 3060",
    },
    {
      id: "placa-asus-rtx3060",
      nombre: "Asus Dual GeForce RTX 3060 12GB",
      categoria: "placas",
      precio: "$1.349.999",
      imagen: "/assets/img/placa-asus-rtx3060.jpg",
      alt: "Placa de video Asus Dual GeForce RTX 3060 12GB",
    },
    {
      id: "placa-rtx6800xt",
      nombre: "Gigabyte AMD Radeon RX 6800 XT 16GB",
      categoria: "placas",
      precio: "$1.599.999",
      imagen: "/assets/img/placa-rtx6800xt.jpg",
      alt: "Placa de video Gigabyte AMD Radeon RX 6800 XT 16GB",
    },
    {
      id: "placa-aorus-rtx2060",
      nombre: "Gigabyte Aorus GeForce RTX 2060",
      categoria: "placas",
      precio: "$899.999",
      imagen: "/assets/img/placa-aorus-rtx2060.jpg",
      alt: "Placa de video Gigabyte Aorus GeForce RTX 2060",
    },
  ],
  memorias: [
    {
      id: "memorias-ram-16gb",
      nombre: "Memoria RAM 16GB (2x8GB) DDR4 3200MHz",
      categoria: "memorias",
      precio: "$189.999",
      imagen: "/assets/img/memorias-ram-ddr4.jpg",
      alt: "Memorias RAM DDR4 para gaming",
      etiqueta: "Más vendido",
    },
    {
      id: "memorias-ram-32gb",
      nombre: "Memoria RAM 32GB (2x16GB) DDR5 6000MHz",
      categoria: "memorias",
      precio: "$449.999",
      imagen: "/assets/img/memorias-ram-32gb.jpg",
      alt: "Memorias RAM DDR5 32GB",
    },
  ],
  monitores: [
    {
      id: "monitor-curvo",
      nombre: 'Monitor curvo Asus TUF Gaming 27"',
      categoria: "monitores",
      precio: "$599.999",
      precioAntes: "$659.999",
      cuotas: "12 cuotas sin interés",
      imagen: "/assets/img/monitor-curvo.jpg",
      alt: "Monitor curvo Asus TUF Gaming",
      etiqueta: "Gaming",
    },
    {
      id: "monitor-144hz",
      nombre: 'Monitor 144Hz 27"',
      categoria: "monitores",
      precio: "$499.999",
      imagen: "/assets/img/monitor-144hz.webp",
      alt: "Monitor de 27 pulgadas con 144Hz",
    },
  ],
  motherboards: [
    {
      id: "motherboard-am5",
      nombre: "Motherboard AM5 para Ryzen 7000",
      categoria: "motherboards",
      precio: "$389.999",
imagen: "/assets/img/motherboard-am5.jpg",
      alt: "Motherboard compatible con procesadores AMD",
      etiqueta: "Nuevo",
    },
    {
      id: "motherboard-1700",
      nombre: "Motherboard LGA1700 para Intel 12va/13ra gen",
      categoria: "motherboards",
      precio: "$329.999",
      imagen: "/assets/img/motherboard-1700.jpg",
      alt: "Motherboard compatible con procesadores Intel",
    },
  ],
  perifericos: [
    {
      id: "teclado-rgb",
      nombre: "Teclado mecánico RGB",
      categoria: "perifericos",
      precio: "$149.999",
imagen: "/assets/img/teclado-rgb.jpg",
      alt: "Teclado mecánico con iluminación RGB",
    },
    {
      id: "mouse-inalambrico",
      nombre: "Mouse gamer inalámbrico",
      categoria: "perifericos",
      precio: "$99.999",
      imagen: "/assets/img/mouse-inalambrico.jpg",
      alt: "Mouse gamer inalámbrico",
    },
  ],
  discos: [
    {
      id: "ssd-1tb",
      nombre: "SSD NVMe 1TB",
      categoria: "discos",
      precio: "$219.999",
      precioAntes: "$259.999",
      cuotas: "12 cuotas sin interés de $18.333",
      imagen: "/assets/img/ssd.jpg",
      alt: "Disco sólido SSD de 1TB",
      etiqueta: "Más vendido",
    },
    {
      id: "ssd-2tb",
      nombre: "SSD NVMe 2TB",
      categoria: "discos",
      precio: "$379.999",
      imagen: "/assets/img/ssd-2tb.jpg",
      alt: "Disco sólido SSD de 2TB",
    },
  ],
};

export const productoDestacado = {
  id: "destacado-armado-pc",
  nombre: "Armado de PC a medida",
  categoria: "armado",
  precio: "Consultar",
  imagen: "/assets/img/armado-pc.webp",
  alt: "Armado de PC gaming a medida",
  etiqueta: "Servicio",
};

export function productosDeCategoria(slug) {
  return productosPorCategoria[slug] ?? [];
}

export function todasLasCategorias() {
  return categorias;
}

export function precioANumero(precio) {
  if (typeof precio !== "string") return 0;
  return Number(precio.replace(/[^0-9]/g, "")) || 0;
}

export function numeroAPrecio(numero) {
  return "$" + Number(numero || 0).toLocaleString("es-AR");
}

export function buscarProducto(id) {
  for (const categoria of categorias) {
    const producto = productosDeCategoria(categoria.slug).find((p) => p.id === id);
    if (producto) return { producto, categoria };
  }

  if (id === productoDestacado.id) {
    return {
      producto: productoDestacado,
      categoria: {
        slug: "armado",
        nombre: "Armado de PC",
        descripcion: "Servicio de armado de PC a medida.",
      },
    };
  }

  return undefined;
}