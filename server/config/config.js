// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;


// ============================
//  Puerto
// ============================

process.env.NODE_ENV=process.env.NODE_ENV || 'dev';


// ============================
//  Base de Datos
// ============================

let urlDB;

if(process.env.NODE_ENV==='dev'){ 
    urlDB="mongodb://127.0.0.1:27017/cafe"
    
}else{
    urlDB="mongodb+srv://Juan_Pablo_M:Cortes36089683@cluster0.wqh0z.mongodb.net/cafe?retryWrites=true&w=majority"

}  
process.env.URLDB=urlDB;





