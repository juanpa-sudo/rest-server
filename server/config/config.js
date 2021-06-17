// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Caducidad del Token
// ============================

process.env.CAUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================
//  seed del Token - Firma token
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

// ============================
//  Google
// ============================

process.env.CLIENT_ID =
  process.env.CLIENT_ID ||
  "804173967316-1gs7838eqfhub4r2ss6b6as76shqcpl5.apps.googleusercontent.com";
