class Venta{
 comic;
 cantidad;
 constructor(pComic, pCantidad){
     this.comic = pComic;
     this.cantidad = pCantidad;
 }

 totalVentas(){
     return this.cantidad*this.comic.precio;
 }
}
