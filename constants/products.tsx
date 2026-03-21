export type Product = {
    id: string;
    brand: string;
    name: string;
    price: number;
    image: any;
  };
  
  export const PRODUCTS: Product[] = [
    {
      id: "oj",
      brand: "Lauren's",
      name: "Orange Juice",
      price: 149,
      image: require("../assets/scr-sh/orangeJuice.png"),
    },
    {
      id: "milk",
      brand: "Baskin's",
      name: "Skimmed Milk",
      price: 129,
      image: require("../assets/scr-sh/skimmedMilk.png"),
    },
    {
      id: "aloe",
      brand: "Marley's",
      name: "Aloe Vera Lotion",
      price: 1249,
      image: require("../assets/scr-sh/aloeVera.png"),
    },
  ];