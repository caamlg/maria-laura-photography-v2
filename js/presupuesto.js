$(() => {
    //MOSTRAR LOS SERVICIOS EN TARJETAS BOOTSTRAP HTML
    listadoServicios.forEach(svc => {
        $('#mainPresupuesto').append(
            `<div class="col-md-4 col-sm-12 mt-3">
            <div class="card text-center">
                <img src="${svc.img}" class="card-img-top w-100" alt="${svc.nombre}">
                    <div class="card-body card-body__bg">
                        <h5 class="card-title card-title__color" id="nombreS">${svc.nombre}</h5>
                        <h6 id="precioS" class="precio-color">$${svc.precio}</h6>
                        <div class="btn btn-outline-dark btn-color" id="${svc.id}">AGREGAR</div>
                    </div>
            </div>
        </div>`
        )
    })
    //ARRAY DE OBJETOS AGREGADOS + FUNCIONES AGREGAR/REMOVER
    const presupuestoServicios = [];

    function agregarItem(itemAagregar) {
        presupuestoServicios.push(itemAagregar)
    }

    function removerItem(itemAremover) {
        presupuestoServicios.splice(presupuestoServicios.indexOf(itemAremover), 1)
    }

    //ONCLICK DE CADA BOTON
    let botonesClic = [];

    let botones = $(".btn-outline-dark");
    for (let i = 0; i < botones.length; i++) {
        botonesClic[i] = 0;
    }
    for (let i = 0; i < botones.length; i++) {
        let boton = botones[i];
        boton.onclick = function (event) {
            if (botonesClic[i] == 0) {
                agregarItemClick(event)
                boton.innerHTML = "AGREGADO"
                boton.classList.add('btn-agregar')
                botonesClic[i] = 1;
            } else if (botonesClic[i] == 1) {
                removerItemClick(event)
                boton.innerHTML = "AGREGAR"
                boton.classList.remove('btn-agregar')
                botonesClic[i] = 0;
            }
        }
    }

    //ENCONTRAR SERVICIO SEGÚN ID
    let servicioSeleccionado;
    function encontrarServicio(idServicio, lista) {
        servicioSeleccionado = lista.find(s => s.id == idServicio)
        return servicioSeleccionado
    }

    //FUNCIONES AGREGAR Y REMOVER SERVICIOS - USO DE JSON Y LOCAL STORAGE
    function agregarItemClick(event) {

        const btnAgregar = event.target;
        const servicioId = btnAgregar.id;

        agregarServicio(servicioId);
    }
    function agregarServicio(servicioId) {
        let itemAagregar = encontrarServicio(servicioId, listadoServicios);
        agregarItem(itemAagregar);
        localStorage.setItem("servicios_elegidos", JSON.stringify(presupuestoServicios));
    }

    function removerItemClick(event) {

        const btnAgregar = event.target;
        const servicioId = btnAgregar.id;

        removerServicio(servicioId);
    }
    function removerServicio(servicioId) {
        let itemAremover = encontrarServicio(servicioId, presupuestoServicios);
        removerItem(itemAremover)
        localStorage.setItem("servicios_elegidos", JSON.stringify(presupuestoServicios));
    }

    //BOTON SIGUIENTE, MOSTRAR TOTAL, USO DE JSON Y LOCAL STORAGE
    $('.btn-dark').on('click', () => {
        $('#error').css('display', 'none')
        if (presupuestoServicios.length <= 0) {
            $('#error').css('display', 'block')
        } else {
        $('#mainPresupuesto').fadeOut(1500);
        $('.btn-dark').fadeOut(1000);
        document.getElementById("mainPresupuesto").scrollIntoView();
        let serviciosGuardados = JSON.parse(localStorage.getItem("servicios_elegidos"))
        let totalPresupuesto = serviciosGuardados.reduce((currentTotal, item) => item.precio + currentTotal, 0)
        $('#siguiente').append(`<div class="row p-3">Elegiste los siguientes servicios:</div>`)
            .hide()
            .fadeIn(1500)
        serviciosGuardados.forEach(svc => {
            $("#siguiente").append(`<div class="card mb-3 card-body__bg" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${svc.img}" class="img-fluid rounded-start" alt="${svc.nombre}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title card-title__color">${svc.nombre}</h5>
              <p class="card-text">${svc.desc}</p>
              <p class="card-text"><small class="text-muted">$${svc.precio}</small></p>
            </div>
          </div>
        </div>
      </div>`
            )
                .hide()
                .fadeIn(1500)
        })
        $("#siguiente").append(`<br><div class="alert alert-warning text-center" role="alert">
    El valor total del presupuesto es de $${totalPresupuesto}
  </div>`
        )
            .hide()
            .fadeIn(3000)
        }
    })
});