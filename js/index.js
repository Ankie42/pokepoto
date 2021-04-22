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



document.querySelector("#registrar-btn").addEventListener("click",()=>{
    //value de texts input
    let nombre = document.querySelector("#nombre-txt").value;
    //tener .lo ya escrito
    let descripcion = tinymce.get("descripcion-txt").getContent();
    //cheked = si radiobutton esta selecc
    let legendario = document.querySelector("#legendario-no").checked;

    let tipo = document.querySelector("#tipo-select").value;

    console.log("wena ckbors", nombre,descripcion,legendario,tipo);

});