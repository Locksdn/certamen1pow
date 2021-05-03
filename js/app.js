tinymce.init({
    selector: '#detalle',
    height: 200,
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

const actualizarLista = ()=>{
    let tbody = document.getElementById('tabla-reos');
    tbody.innerHTML = '';
    for(let i=0;i<reos.length;++i){
        let r = reos[i];
        let tr = document.createElement('tr');
        let tdNombre = document.createElement('td');
        let tdDetalle = document.createElement('td');
        let tdCiudad = document.createElement('td');
        let tdGravedad = document.createElement('td');

        tdNombre.innerText = r.nombre;
        tdDetalle.innerHTML = r.detalle;
        tdCiudad.innerText = ciudades[r.ciudad];

        let gravedad = document.createElement('i');
        if(r.cantidad < 4){
            gravedad.classList.add('fas', 'fa-user-ninja');
        } else if (r.cantidad < 7){
            gravedad.classList.add('fas', 'fa-exclamation-circle');
        } else if (r.cantidad < 16){
            gravedad.classList.add('fas', 'fa-exclamation-triangle');
        } else {
            gravedad.classList.add('fas', 'fa-skull-crossbones');
        }
        tdGravedad.classList.add('text-center');
        tdGravedad.appendChild(gravedad);

        tr.appendChild(tdNombre);
        tr.appendChild(tdDetalle);
        tr.appendChild(tdCiudad);
        tr.appendChild(tdGravedad);

        tbody.appendChild(tr);
    }
}


//Inicializar Select Ciudades
const ciudades = ['Viña del Mar', 'Quilpúe', 'Santiago', 'Otro que no sea Santiago'];
for(let i=0;i<ciudades.length;++i){
    let c = document.getElementById('ciudad');
    let opt = document.createElement('option');
    opt.innerHTML = ciudades[i];
    opt.value = i;
    c.appendChild(opt);
}

//Lista Reos
const reos = [];

document.querySelector('#agregar-reo').addEventListener('click', ()=>{
    let nombre = document.querySelector('#nombre-reo').value;
    let apellido = document.querySelector('#apellido-reo').value;
    let detalle = tinymce.get('detalle').getContent();
    let cantidad = document.querySelector('#crimenes').value;
    let ciudad = document.querySelector('#ciudad').value;

    let reo = {};
    reo.nombre = nombre + ' ' + apellido;
    reo.cantidad = Number(cantidad);
    reo.detalle = detalle;
    reo.ciudad = ciudad;
    reos.push(reo);
    actualizarLista();
    Swal.fire(
        'Reo Agregado',
        'Se ha agregado un reo a la tabla exitosamente.',
        'success'
      )
});