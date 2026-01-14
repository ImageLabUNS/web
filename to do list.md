# <center> To do list para terminar la pagina web</center>
1. Poner los links personales de todos en la seccion "team section".
2. Chequear si alguien más se agregó en el doc https://docs.google.com/spreadsheets/d/1h378MjzAYom9KAmgP-2u-ZxPJhMaubTWsOx8pFBExDM/edit?usp=sharing Si es asiagregarlo manualmente a la lista de miembros justo antes de la linea comentada"<!-- Botón para ver más miembros -->"
3. Si hay mas proyectos a terceros agregarlos. Para el dia 14/1/2026 se que me falta agregar lo que se hizo para la bolsa de cereales (borrar esta oracion cuando se agregue).
4. Definir informaciond e contacto. ¿Usamos mail del lab que nadie revisa nunca y empezamos a revisarlo o usamos un mail de alguno de nosotros? El telefono pondria el de Claudio previo aprobacion de él.
5. Hay papers que no tienen DOI por lo que no pude automatizar la subida al papers.json por lo que hay que agregarlos a mano. Si algun/a colgad@ subio su paper muuucho despues de los 3 avisos que dimos hay que:
   1. Agregar un elemento a la lista del papers.json.
   {
    "titulo": "titulo del paper",
    "autores": "['apellido1, nombre1', 'apellido2, nombre', 'apellido3, nombre3', 'apellido4, nombre']",
    "resumen": "titulo traducido/resumen corto/vacio",
    "imagen": "imgs/papers/apellido_año.png",
    "url": "https://drive.google.com/uc?id=XXXXXXXXXXXXXXXXXXXXXXXXXX&export=download"
  },  
  1. Generar una imagen subiendo el paper a gemini, seleccionando el modelo nanobanana y tirarle este prompt " Haceme una infografia con este paper que te subo ahora (nombre_del_file.pdf). Simple, con relacion 16:9 que sirva minimamente para entender de que se trata el paper.".
  2. Descargar la imagen y guardarla en img/papers/nombre_del_file.png.
  3. Modificar el nombre del campo "imagen" en el json por que tiene por defecto un jpg
  4. Abrir el paper desde google drive. En la url vas a ver algo asi https://drive.google.com/drive/folders/1g6TvMSTAjBRRc9xHbchq4LZcDkSRdwzj . Todo lo que esta despues de "folders/" es el id del file. Copiarlo y pegarlo en donde hay "XXXXXXXXXXXXXXXXX" en el campo "url" del json.