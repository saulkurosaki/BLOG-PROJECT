import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { Peticion } from '../../helpers/Peticion';
import { Global } from '../../helpers/global';
import { useParams } from 'react-router-dom';

export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState('no_enviado');
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {

    const { datos } = await Peticion(Global.url + 'articulo/' + params.id, 'GET');

    if (datos.status === 'success') {
      setArticulo(datos.articulo);
    };

  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;

    //Guardar articulo en el BackEnd
    const { datos } = await Peticion(Global.url + 'articulo/' + params.id, 'PUT', nuevoArticulo);

    if (datos.status === 'success') {
      setResultado('guardado');
    } else {
      setResultado('error');
    };

    //Subir imagen
    const fileInput = document.querySelector('#file');

    if (datos.status === 'success' && fileInput.files[0]) {
      setResultado('guardado');

      const formData = new FormData();
      formData.append('file0', fileInput.files[0]);
    
      const subida = await Peticion(Global.url+'subir-imagen/'+ params.id, 'POST', formData, true);

      if (subida.datos.status === 'success') {
        setResultado('guardado');
      } else {
        setResultado('error');
      };

    };

  };

  return (
    <div className='jumbo'>
      <h1>Editar Articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>{resultado == 'guardado' ? 'Articulo guardado con éxito' : ''}</strong>
      <strong>{resultado == 'error' ? 'Los datos proporcionados son incorrectos' : ''}</strong>

      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor='titulo'>Titulo</label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor='contenido'>Contenido</label>
          <textarea name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
        </div>

        <div className='form-group'>
          <div className='mascara'>
            {articulo.imagen != 'default.png' && <img src={Global.url + 'imagen/' + articulo.imagen} />}
            {articulo.imagen == 'default.png' && <img src='https://glints.com/id/lowongan/wp-content/uploads/2020/10/logo-reactjs-1024x584.jpg' />}
          </div>
          <label htmlFor='file0'>Imagen</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value='Guardar' className='btn btn-success' />

      </form>
    </div>
  )
}
