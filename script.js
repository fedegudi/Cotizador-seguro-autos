
    //Funcion constructora..
    function Seguro(marca, modelo, year, tipo, precio){
        this.marca = marca;
        this.modelo = modelo;
        this.year = year;
        this.tipo = tipo;
        this.precio = precio;

        this.cotizarSeguro = function (){
            const base = 1000;

            let poliza = Math.floor((this.precio*0.1) / 12)

            if (poliza < 1000){
                poliza += base;
            }
            // Leer el año
        const diferencia = new Date().getFullYear() - this.year;
        
        // Cada año que la diferencia es mayor, el costo va a reducirse un 2%
        poliza -= ((diferencia * 2) * poliza) / 100;
        

        //Si el seguro es tipo bronce se multiplica por un 30% más
        
        if (this.tipo === 'bronce') {
			poliza *= 1.10;
        }else if(this.tipo === 'plata') {
            poliza *= 1.20;
        }else if(this.tipo === 'oro'){
            poliza *= 1.30
        }
    
        return poliza;
            
        }

    }

    //Espera que se cargue el DOM.
    document.addEventListener('DOMContentLoaded', cargarDatos)

    function cargarDatos(){
        //Cargamos los years
        cargarFecha();


        //Seleccion el select de marcas y modelos
        const selectMarcas = document.querySelector('#marca')
        const selectModelo = document.querySelector('#modelo')
        //Armamos arreglo con lista de marcas
        const listaMarcas = crearListado(autos, "marca")

        //Cargamos el select con las marcas
        cargarSelect(listaMarcas, selectMarcas);


        selectMarcas.addEventListener('change', function(e){


            //Filtramos el arreglo de autos por a marca elegida por el usuario
            const modelos = autos.filter(auto => auto.marca.toLocaleLowerCase().replace(' ', '-') == e.target.value)

            //Armamos el arreglo con el listado de modelos
            const listaModelos = crearListado(modelos,"modelo");
            //Cargamos  los modelos  en el select
            cargarSelect(listaModelos, selectModelo)
        })


            const formulario = document.querySelector('#cotizar-seguro')
            formulario.addEventListener('submit', cotizarSeguro)

    }

    function cotizarSeguro(e) {
        
        e.preventDefault();
        

        const marca = document.querySelector('#marca').value;
        const modelo = document.querySelector('#modelo').value;
        const year = document.querySelector('#year').value;
        const tipo = document.querySelector('input[name="tipo"]:checked').value;



         if (marca === '' || modelo === '' || year === '') {
             alert("Llenar los campos vacios");
             return;
          }
         //Extraemos el precio del modelo seleccionado
         resultado = autos.find(elem => elem.modelo.toLowerCase().replace(' ', '-') == modelo);
        
         //Instanciar el seguro
         const seguro = new Seguro(marca, modelo, year, tipo, resultado.precio);

        
         //const total = seguro.cotizarSeguro(); 
        const valorPoliza = seguro.cotizarSeguro();
        

        //Utilizar el prototype que va a cotizar.
        mostrarPoliza(valorPoliza, seguro);

         ocultarForm();

    }

    //Jquery
    function ocultarForm(){

        const form = $('#cotizar-seguro').css("display","none")
        const header = $('header').css("display","none")
        

       mostrarPoliza();
     }

function mostrarPoliza(valorPoliza, seguro){

    const div = document.createElement('div')

    div.classList.add('font-bold')

    div.innerHTML = `
        <h2>Resumen Cotizacion</h2>
        <p class="font-bold">Marca: ${seguro.marca}</p>
        <p class="font-bold">Modelo: ${seguro.modelo}</p>
        <p class="font-bold">Año: ${seguro.year}</p>
        <p class="font-bold">Suma Asegurada: ${seguro.precio}</p>
        <p class="font-bold">Valor del seguro: ${valorPoliza}</p>

        <button>Volver a Cotizar</button>    
        `

    const resultado = document.querySelector('#resultado');
    resultado.appendChild(div);
}


    function cargarSelect(lista, select){
        lista.forEach(element => {
            //Creamos el elemento option
            let option = document.createElement('option')

            //Agrego el contenido y el value
            option.textContent = element;
            //Lo paso a minuscula y remplazo el espacio por un -.
            option.value = element.toLowerCase().replace(' ', '-');
            //Lo inserto en el select
            select.appendChild(option)

        })
    };


    function crearListado(autos, prop){
        //Crear arreglo con las marcas de los autos
        const lista =  [];

        //Recorro el array de autos, y agrego al nuevo array.
        autos.forEach(auto => {
            if (!lista.includes(auto[prop]) ){
                lista.push(auto[prop])
            }
        });

        return lista.sort()
    }


    function cargarFecha(){
        const fechaMax = new Date().getFullYear();
        const fechaMin = fechaMax - 20;


        const seleccionarYear = document.querySelector('#year');


          for (let i = fechaMax; i >= fechaMin; i--){
              //Creo el elemento "option"
                let option = document.createElement('option');
            
                //Agrego el contenido y el value
                option.textContent = i;
                option.value = i;

                //Lo inserto en el select
                seleccionarYear.appendChild(option);
        }

    }

    


