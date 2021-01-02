iniciarApp();

function iniciarApp() {
    armarSelectorComics();
    asignarEventoPorId('btnRegistrarComic', btnRegistrarVenta)
    asignarEventoPorId('btnCrearTabla', comicsConStockMayorA400)
}

function btnRegistrarVenta() {
    let cantidadVendida = obtenerValorCampoPorId('txtCantidad');
    let idComicSelecionado = Number(obtenerValorCampoPorId('slcComics'));
    let esteComic = buscarComicPorId(idComicSelecionado);
    let mensaje;
    if (esteComic.cantidadDisponible > 0) {
        let miventa = new Venta(esteComic, cantidadVendida);
        ventas.push(miventa);
        mensaje = 'Compra Exitosa';

    } else {
        mensaje = 'No Hay suficiente stock'
    }

    mostrarMensajePorId('msgVentaComic', mensaje)
}

function obtenerVentasTotalesPorComic(pId) {
    let esteComic = buscarComicPorId(pId);

    let ventasTotales = 0;

    for (let i = 0; i < ventas.length; i++) {

        let c = ventas[i]
        if (esteComic === c.comic) {
            ventasTotales += c.totalVentas();
        }
    }



    return ventasTotales;

}

function comicsConStockMayorA400() {

    let htmlTabla = '<table border ="1"><thead><tr><th>Nombre</th><th>Cantidad Disponible</th><th>Total Ventas</th></tr></thead><tbody>'
    for (let i = 0; i < comics.length; i++) {
        const c = comics[i];
        if (c.cantidadDisponible > 400) {
            htmlTabla += `<tr><td>${c.nombre}</td><td>${c.cantidadDisponible}</td><td>${obtenerVentasTotalesPorComic(c.id)}</td></tr>`
        }

    }
    htmlTabla += '</tbody></table>'
    insertarHtml('divTabla', htmlTabla);
}

function armarSelectorComics() {

    let optionsHtml = '';

    for (let index = 0; index < comics.length; index++) {
        const c = comics[index];

        if (c.cantidadDisponible > 0) {
            optionsHtml += `<option value ="${c.id}">${c.nombre}</option>`
        }
        insertarHtml('slcComics', optionsHtml);


    }
}


function buscarComicPorId(pID) {
    let miComic = null;
    for (let index = 0; index < comics.length; index++) {
        const c = comics[index];

        if (c.id === pID) {
            miComic = c;
            break;

        }
    }
    return miComic;
}


function buscarComicPorEditorial(editorial) {
    let miscomics = [];
    let pos
    for (let index = 0; index < comics.length; index++) {
        const c = comics[index];




        if (c.nombre.substring(0, c.nombre.indexOf('>') - 1) === editorial) {
            miscomics.push(c);


        }
    }
    return miscomics;
}