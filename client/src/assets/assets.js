import logo from "./logo.svg";
import search_icon from "./search_icon.svg";
import remove_icon from "./remove_icon.svg";
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg";
import star_icon from "./star_icon.svg";
import star_dull_icon from "./star_dull_icon.svg";
import cart_icon from "./cart_icon.svg";
import nav_cart_icon from "./nav_cart_icon.svg";
import add_icon from "./add_icon.svg";
import refresh_icon from "./refresh_icon.svg";
import product_list_icon from "./product_list_icon.svg";
import order_icon from "./order_icon.svg";
import upload_area from "./upload_area.png";
import profile_icon from "./profile_icon.png";
import menu_icon from "./menu_icon.svg";
import delivery_truck_icon from "./delivery_truck_icon.svg";
import leaf_icon from "./leaf_icon.svg";
import coin_icon from "./coin_icon.svg";
import box_icon from "./box_icon.svg";
import trust_icon from "./trust_icon.svg";
import black_arrow_icon from "./black_arrow_icon.svg";
import white_arrow_icon from "./white_arrow_icon.svg";
import main_banner_bg from "./main_banner_bg.png";
import main_banner_bg_sm from "./main_banner_bg_sm.png";
import bottom_banner_image from "./bottom_banner_image.png";
import bottom_banner_image_sm from "./bottom_banner_image_sm.png";
import add_address_image from "./add_address_image.svg";

// ---- EXISTING GROCERY IMAGES (keep for reference, or remove if not needed) ----
import organic_vegitable_image from "./organic_vegitable_image.png";
import fresh_fruits_image from "./fresh_fruits_image.png";
import bottles_image from "./bottles_image.png";
import maggi_image from "./maggi_image.png";
import dairy_product_image from "./dairy_product_image.png";
import bakery_image from "./bakery_image.png";
import grain_image from "./grain_image.png";
import potato_image_1 from "./potato_image_1.png";
import potato_image_2 from "./potato_image_2.png";
import potato_image_3 from "./potato_image_3.png";
import potato_image_4 from "./potato_image_4.png";
import tomato_image from "./tomato_image.png";
import carrot_image from "./carrot_image.png";
import apple_image from "./apple_image.png";
import amul_milk_image from "./amul_milk_image.png";
import coca_cola_image from "./coca_cola_image.png";
import brown_bread_image from "./brown_bread_image.png";
import basmati_rice_image from "./basmati_rice_image.png";
import paneer_image from "./paneer_image.png";
import orange_image from "./orange_image.png";
import pepsi_image from "./pepsi_image.png";
import wheat_flour_image from "./wheat_flour_image.png";
import cheese_image from "./cheese_image.png";
import eggs_image from "./eggs_image.png";
import spinach_image_1 from "./spinach_image_1.png";
import onion_image_1 from "./onion_image_1.png";
import banana_image_1 from "./banana_image_1.png";
import mango_image_1 from "./mango_image_1.png";
import grapes_image_1 from "./grapes_image_1.png";
import paneer_image_2 from "./paneer_image_2.png";
import sprite_image_1 from "./sprite_image_1.png";
import fanta_image_1 from "./fanta_image_1.png";
import seven_up_image_1 from "./seven_up_image_1.png";
import top_ramen_image from "./top_ramen_image.png";
import knorr_soup_image from "./knorr_soup_image.png";
import yippee_image from "./yippee_image.png";
import maggi_oats_image from "./maggi_oats_image.png";
import butter_croissant_image from "./butter_croissant_image.png";
import chocolate_cake_image from "./chocolate_cake_image.png";
import whole_wheat_bread_image from "./whole_wheat_bread_image.png";
import vanilla_muffins_image from "./vanilla_muffins_image.png";
import quinoa_image from "./quinoa_image.png";
import brown_rice_image from "./brown_rice_image.png";
import barley_image from "./barley_image.png";

// ---- NEW CAFE CATEGORY ICONS (place your actual images in the assets folder) ----
import burger_icon from "./burger_icon.png";      // your burger icon
import pizza_icon from "./pizza_icon.png";        // your pizza icon
import sandwich_icon from "./sandwich_icon.png";  // your sandwich icon
import beverage_icon from "./beverage_icon.png";  // your beverage icon
import dessert_icon from "./dessert_icon.png";    // your dessert icon
import salad_icon from "./salad_icon.png";        // your salad icon

export const assets = {
  logo,
  search_icon,
  remove_icon,
  arrow_right_icon_colored,
  star_icon,
  star_dull_icon,
  cart_icon,
  nav_cart_icon,
  add_icon,
  refresh_icon,
  product_list_icon,
  order_icon,
  upload_area,
  profile_icon,
  menu_icon,
  delivery_truck_icon,
  leaf_icon,
  coin_icon,
  trust_icon,
  black_arrow_icon,
  white_arrow_icon,
  main_banner_bg,
  main_banner_bg_sm,
  bottom_banner_image,
  bottom_banner_image_sm,
  add_address_image,
  box_icon,
};

// ===== CAFE MENU CATEGORIES (using new icon imports) =====
export const categories = [
  {
    text: "Burgers",
    path: "burgers",
    image: burger_icon,
    bgColor: "#FEF6DA",
  },
  {
    text: "Pizzas",
    path: "pizzas",
    image: pizza_icon,
    bgColor: "#FEE0E0",
  },
  {
    text: "Sandwiches",
    path: "sandwiches",
    image: sandwich_icon,
    bgColor: "#F0F5DE",
  },
  {
    text: "Beverages",
    path: "beverages",
    image: beverage_icon,
    bgColor: "#E1F5EC",
  },
  {
    text: "Desserts",
    path: "desserts",
    image: dessert_icon,
    bgColor: "#FEE6CD",
  },
  {
    text: "Salads",
    path: "salads",
    image: salad_icon,
    bgColor: "#E0F6FE",
  },
];

// ===== FOOTER LINKS (cafe-themed) =====
export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { text: "Home", url: "#" },
      { text: "Our Menu", url: "#" },
      { text: "Offers & Combos", url: "#" },
      { text: "Contact Us", url: "#" },
      { text: "FAQs", url: "#" },
    ],
  },
  {
    title: "Need help?",
    links: [
      { text: "Delivery Information", url: "#" },
      { text: "Return & Refund Policy", url: "#" },
      { text: "Payment Methods", url: "#" },
      { text: "Track your Order", url: "#" },
      { text: "Contact Us", url: "#" },
    ],
  },
  {
    title: "Follow Us",
    links: [
      { text: "Instagram", url: "#" },
      { text: "Twitter", url: "#" },
      { text: "Facebook", url: "#" },
      { text: "YouTube", url: "#" },
    ],
  },
];

// ===== FEATURES (updated for a cafe) =====
export const features = [
  {
    icon: delivery_truck_icon,
    title: "Fastest Delivery",
    description: "Hot & fresh food delivered in under 30 minutes.",
  },
  {
    icon: leaf_icon,
    title: "Freshness Guaranteed",
    description: "Prepared fresh daily with premium ingredients.",
  },
  {
    icon: coin_icon,
    title: "Affordable Prices",
    description: "Delicious meals at prices that won't break the bank.",
  },
  {
    icon: trust_icon,
    title: "Trusted by Thousands",
    description: "Loved by 10,000+ happy customers.",
  },
];

// ===== DUMMY PRODUCTS FOR CAFE =====
export const dummyProducts = [
  // Burgers
  {
    _id: "bg01a01",
    name: "Classic Beef Burger",
    category: "burgers",
    price: 250,
    offerPrice: 220,
    image: [bakery_image], // replace with actual burger image later
    description: [
      "Juicy beef patty with lettuce, tomato, and special sauce.",
      "Served with crispy fries and a drink.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bg02a02",
    name: "Chicken Burger",
    category: "burgers",
    price: 230,
    offerPrice: 200,
    image: [butter_croissant_image], // placeholder
    description: [
      "Grilled chicken breast with cheese, lettuce, and mayo.",
      "Served with onion rings and coleslaw.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "bg03a03",
    name: "Veggie Burger",
    category: "burgers",
    price: 180,
    offerPrice: 160,
    image: [whole_wheat_bread_image], // placeholder
    description: [
      "Plant-based patty with avocado, lettuce, and tomato.",
      "Served with sweet potato fries.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Pizzas
  {
    _id: "pz01b01",
    name: "Margherita Pizza",
    category: "pizzas",
    price: 350,
    offerPrice: 320,
    image: [cheese_image], // placeholder
    description: [
      "Classic tomato sauce, mozzarella, and fresh basil.",
      "Thin crust, wood-fired perfection.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "pz02b02",
    name: "Pepperoni Pizza",
    category: "pizzas",
    price: 420,
    offerPrice: 390,
    image: [dairy_product_image], // placeholder
    description: [
      "Loaded with pepperoni, mozzarella, and oregano.",
      "Crispy crust, perfect for sharing.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "pz03b03",
    name: "Veggie Supreme Pizza",
    category: "pizzas",
    price: 380,
    offerPrice: 350,
    image: [organic_vegitable_image], // placeholder
    description: [
      "Bell peppers, onions, mushrooms, olives, and mozzarella.",
      "Healthy and tasty.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Sandwiches
  {
    _id: "sw01c01",
    name: "Club Sandwich",
    category: "sandwiches",
    price: 180,
    offerPrice: 160,
    image: [brown_bread_image], // placeholder
    description: [
      "Triple-layer sandwich with turkey, bacon, lettuce, and tomato.",
      "Served with chips and pickle.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "sw02c02",
    name: "Grilled Cheese Sandwich",
    category: "sandwiches",
    price: 150,
    offerPrice: 130,
    image: [whole_wheat_bread_image], // placeholder
    description: [
      "Crispy toasted bread with melted cheddar and mozzarella.",
      "Served with tomato soup.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "sw03c03",
    name: "Chicken Avocado Sandwich",
    category: "sandwiches",
    price: 220,
    offerPrice: 200,
    image: [butter_croissant_image], // placeholder
    description: [
      "Grilled chicken, avocado, lettuce, and mayo on multigrain.",
      "Served with a side salad.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Beverages
  {
    _id: "be01d01",
    name: "Cold Coffee",
    category: "beverages",
    price: 120,
    offerPrice: 100,
    image: [coca_cola_image], // placeholder
    description: [
      "Chilled espresso with milk and ice.",
      "Topped with whipped cream.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "be02d02",
    name: "Fresh Lemonade",
    category: "beverages",
    price: 80,
    offerPrice: 70,
    image: [bottles_image], // placeholder
    description: [
      "Refreshing hand-squeezed lemonade with mint.",
      "Perfect for a hot day.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "be03d03",
    name: "Chocolate Milkshake",
    category: "beverages",
    price: 150,
    offerPrice: 130,
    image: [amul_milk_image], // placeholder
    description: [
      "Thick and creamy chocolate milkshake.",
      "Topped with chocolate syrup and sprinkles.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "be04d04",
    name: "Fresh Orange Juice",
    category: "beverages",
    price: 90,
    offerPrice: 80,
    image: [orange_image], // placeholder
    description: [
      "100% freshly squeezed orange juice.",
      "Packed with Vitamin C.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Desserts
  {
    _id: "ds01e01",
    name: "Chocolate Brownie",
    category: "desserts",
    price: 110,
    offerPrice: 95,
    image: [chocolate_cake_image], // placeholder
    description: [
      "Gooey, fudgy brownie with walnuts.",
      "Served warm with vanilla ice cream.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ds02e02",
    name: "Cheesecake",
    category: "desserts",
    price: 180,
    offerPrice: 160,
    image: [vanilla_muffins_image], // placeholder
    description: [
      "Classic New York style cheesecake.",
      "Topped with strawberry compote.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "ds03e03",
    name: "Ice Cream Sundae",
    category: "desserts",
    price: 130,
    offerPrice: 110,
    image: [dairy_product_image], // placeholder
    description: [
      "Three scoops of ice cream with chocolate sauce, nuts, and cherry.",
      "Choose your flavors.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Salads
  {
    _id: "sa01f01",
    name: "Caesar Salad",
    category: "salads",
    price: 160,
    offerPrice: 140,
    image: [spinach_image_1], // placeholder
    description: [
      "Romaine lettuce, parmesan, croutons, and creamy Caesar dressing.",
      "Add grilled chicken for extra.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "sa02f02",
    name: "Greek Salad",
    category: "salads",
    price: 150,
    offerPrice: 130,
    image: [tomato_image], // placeholder
    description: [
      "Cucumber, tomato, red onion, olives, and feta cheese.",
      "Drizzled with olive oil and oregano.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
  {
    _id: "sa03f03",
    name: "Fruit Salad",
    category: "salads",
    price: 120,
    offerPrice: 100,
    image: [fresh_fruits_image], // placeholder
    description: [
      "Mixed seasonal fruits with honey-lime dressing.",
      "Light and refreshing.",
    ],
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
];

export const dummyAddress = [
  {
    _id: "67b5b9e54ea97f71bbc196a0",
    userId: "67b5880e4d09769c5ca61644",
    firstName: "Great",
    lastName: "Stack",
    email: "user.greatstack@gmail.com",
    street: "Street 123",
    city: "Main City",
    state: "New State",
    zipcode: 123456,
    country: "IN",
    phone: "1234567890",
  },
];

export const dummyOrders = [
  {
    _id: "67e2589a8f87e63366786400",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[3],
        quantity: 2,
        _id: "67e2589a8f87e63366786401",
      },
    ],
    amount: 89,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "Online",
    isPaid: true,
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
  {
    _id: "67e258798f87e633667863f2",
    userId: "67b5880e4d09769c5ca61644",
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        _id: "67e258798f87e633667863f3",
      },
      {
        product: dummyProducts[1],
        quantity: 1,
        _id: "67e258798f87e633667863f4",
      },
    ],
    amount: 43,
    address: dummyAddress[0],
    status: "Order Placed",
    paymentType: "COD",
    isPaid: false,
    createdAt: "2025-03-25T07:17:13.068Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
  },
];