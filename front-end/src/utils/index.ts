type Consumer = {
  imgURL: string;
  name: string;
};

interface Data {
  product: string;
  orderID: string;
  date: number;
  consumer: Consumer;
  status: number;
  amount: number;
}

const rows: Data[] = [
  {
    product: "Laptop",
    orderID: "ORD12345",
    date: 1682371200000, // Example date in milliseconds (Unix timestamp)
    consumer: {
      imgURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT5aCMO24e6ZTz7_TTUdoqiclVyuhAzV0kFw&s",
      name: "John Doe",
    },
    status: 1, // 1 could represent 'In Progress'
    amount: 1200,
  },
  {
    product: "Smartphone",
    orderID: "ORD12346",
    date: 1682457600000,
    consumer: {
      imgURL:
        "https://static.vecteezy.com/system/resources/previews/009/397/835/non_2x/man-avatar-clipart-illustration-free-png.png",
      name: "Jane Smith",
    },
    status: 2, // 2 could represent 'Delivered'
    amount: 800,
  },
  {
    product: "Headphones",
    orderID: "ORD12347",
    date: 1682544000000,
    consumer: {
      imgURL:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDS2BeQSBhyG3Vmfi4VJg-QQODkXiOmTD6eejMWQdSXrv3k5vrKGYe2T2auF9BSKU6XzY&usqp=CAU",
      name: "David Johnson",
    },
    status: 0, // 0 could represent 'Pending'
    amount: 200,
  },
  {
    product: "Smartwatch",
    orderID: "ORD12348",
    date: 1682630400000,
    consumer: {
      imgURL: "https://example.com/images/user4.jpg",
      name: "Emily Davis",
    },
    status: 3, // 3 could represent 'Cancelled'
    amount: 300,
  },
  {
    product: "Tablet",
    orderID: "ORD12349",
    date: 1682716800000,
    consumer: {
      imgURL: "https://example.com/images/user5.jpg",
      name: "Michael Lee",
    },
    status: 1, // 'In Progress'
    amount: 600,
  },
];

const productsData = [
  {
    id: 1,
    name: "Etagere",
    description: "Description of Product 1",
    price: 10.99,
    imgURL:
      "https://www.ikea.com/ext/ingkadam/m/23d41776febf815/original/PH195594.jpg?f=xs",
    discount: 0.1, // 10% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 2,
    name: "Bilbliotheque",
    description: "Description of Product 2",
    price: 19.99,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/fejka-plante-artificielle-et-supp-mural-interieur-exterieur-vert-mauve__1184665_pe898020_s5.jpg?f=xxs",
    discount: 0.2, // 20% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 3,
    name: "Decoration",
    description: "Description of Product 3",
    price: 15.5,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/fejka-plante-artificielle-et-supp-mural-interieur-exterieur-vert-mauve__1207875_pe908211_s5.jpg?f=xxxs",
    discount: 0, // No discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 4,
    name: "Cuilliere",
    description: "Description of Product 4",
    price: 25.0,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/hovsta-cadre-motif-bouleau__0902228_pe652821_s5.jpg?f=xxs",
    discount: 0.15, // 15% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 5,
    name: "Presontoir",
    description: "Description of Product 5",
    price: 8.75,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/glattis-plateau-couleur-laiton__0896599_pe629566_s5.jpg?f=xxs",
    discount: 0.05, // 5% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 6,
    name: "Cup",
    description: "Description of Product 6",
    price: 12.49,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/glattis-plateau-couleur-laiton__0685589_ph154666_s5.jpg?f=xxxs",
    discount: 0.2, // 20% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 7,
    name: "Forshette",
    description: "Description of Product 7",
    price: 30.0,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/tillstaellning-porte-serviettes-couleur-laiton__0895944_pe629480_s5.jpg?f=xxxs",
    discount: 0.25, // 25% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 8,
    name: "Product 8",
    description: "Description of Product 8",
    price: 9.99,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/glattis-dessous-de-verre-avec-support-couleur-laiton__0897425_pe629569_s5.jpg?f=xxxs",
    discount: 0.1, // 10% discount
    rate: 4.5,
    stock: 12,
  },
  {
    id: 9,
    name: "Product 9",
    description: "Description of Product 9",
    price: 18.25,
    imgURL:
      "https://www.ikea.com/ma/fr/images/products/tillgang-plateau-gris__1231059_pe915726_s5.jpg?f=xxxs",
    discount: 0.15, // 15% discount
    rate: 4.5,
    stock: 12,
  },
];
export { rows, productsData };
export type { Data };
