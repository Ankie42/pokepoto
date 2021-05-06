tinymce.init({
    selector: '#descripcion-txt',
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const pokemonos = [];

const eliminarPokemono = async function(){
  let res = await Swal.fire({
    title:`Desea enviar al madeo el ${pokemonos[this.nro].nombre}?`,
    showCancelButton:true,
    cancelButtonText:"Cancerelabacititacion",
    confirmButtonText:"Si, pls, atloke"
  });
  if(res.isConfirmed){
    pokemonos.splice(this.nro,1);
    cargarTabla();
    Swal.fire("Pokemono enviado al Madeo");
  } else {
    Swal.fire("Cancelererado")
  }
};

const cargarTabla = ()=>{
  //1. Obtener referencia ed la tabla
  let tbody = document.querySelector("#tabla-tbody");
  //Eliminar elementosd del tbody
  tbody.innerHTML = "";

  //2. Recorrer lista
  for(let i=0; i < pokemonos.length; ++i){
    let p = pokemonos[i];

//3. hacer tabla por cada pokeono
  let tr = document.createElement("tr");  

//4. Por cada atributo /nombre,tipo,desc, etc) se generan celdas (td)
  let tdNro = document.createElement("td");
  tdNro.innerText = (i+1);
  
  let tdNombre = document.createElement("td");
  tdNombre.innerText = p.nombre;
  if(p.legendario){
    tdNombre.classList.add("text-warning")
  }
 
  let tdTipo = document.createElement("td");
  let icono = document.createElement("i")

  if(p.tipo =="fuego"){
      //<i class="fas fa-burn"></i>
      icono.classList.add("fas","fa-burn","text-danger","fa-3x");
  }else if(p.tipo =="planta"){
    //<i class="fas fa-leaf"></i>
    icono.classList.add("fas","fa-leaf","text-success","fa-3x")
  }else if(p.tipo =="agua"){
    //<i class="far fa-glass-citrus"></i>
    icono.classList.add("fas","fa-swimmer","text-primary","fa-3x")
  }else{
    //<i class="fas fa-user-tie"></i>
    icono.classList.add("fas","fa-user-tie","text-info","fa-3x")
  }
  tdTipo.classList.add("text-center");
  tdTipo.appendChild(icono);
  let tdDesc = document.createElement("td");
  tdDesc.innerHTML = p.descripcion;
  
  let tdAcciones = document.createElement("td");
  tdAcciones.classList.add("text-center")
//Agrefgar boron
let boton=document.createElement("button"); //Crear elementos
boton.classList.add("btn","btn-danger"); //Cambiar clases de el.
boton.innerText="Envir a madeo" //cambiar texto de elemeto
boton.nro=i;
boton.addEventListener("click", eliminarPokemono);
tdAcciones.appendChild(boton); //afregar un elkemento dentro de otro

//5. Agrtegar celdas al tr
    tr.appendChild(tdNro);
    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdDesc);
    tr.appendChild(tdAcciones);

//6.Agregar los tr a la tabla
    tbody.appendChild(tr);
  }};

document.querySelector("#registrar-btn").addEventListener("click",()=>{
    //value de texts input
    let nombre = document.querySelector("#nombre-txt").value;
    //tener .lo ya escrito
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //checked = si radiobutton esta selecc
    let legendario = document.querySelector("#legendario-no").checked;
    
    let tipo = document.querySelector("#tipo-select").value;

    //Como crear un objeto (pokemono se convierte en objeto y puede tener muchos cosas dentro)
    let pokemono ={};
    pokemono.nombre = nombre;
    pokemono.descripcion = descripcion;
    pokemono.legendario = legendario;
    pokemono.tipo = tipo;
    console.log(pokemono);
    
    //Guardar en una lista de elemenots
    pokemonos.push(pokemono); //append
    cargarTabla();

    //mensajito bonito (titulo, mensaje, tipo(succ,info,danger,warning))
    Swal.fire("Exito!", "pokemono registrado","success");
  });

document.querySelector("#limpiar-btn").addEventListener("click",()=>{
   document.querySelector("#nombre-txt").value =("");
   tinymce.get("descripcion-txt").setContent("");
   document.querySelector("#legendario-no").checked = true;
   document.querySelector("#tipo-select").value = "planta";
  });