// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Caducidad del Token
// ============================

process.env.CAUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  seed del Token
// ============================

process.env.SEED_TOKEN = process.env.SEED_TOKEN || "esta-es-firma-desarrollo";

// ============================
//  Base de Datos
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://127.0.0.1:27017/cafe";
} else {
  urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;
