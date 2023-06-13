import React from 'react';
import { useState, useEffect } from 'react';
import { Global } from '../../helpers/global';
import { Peticion } from '../../helpers/Peticion';
import { useParams } from 'react-router-dom';

export const Articulo = () => {

  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [articulo]);

  const conseguirArticulo = async () => {

    const { datos } = await Peticion(Global.url + 'articulo/' + params.id, 'GET');

    if (datos.status === 'success') {
      setArticulo(datos.articulo);
    };

    setCargando(false);

  };

  return (
    <div className='jumbo'>
      {cargando ? 'Cargando...' :
        (
          <>
            <div className='mascara'>
              {articulo.imagen != 'default.png' && <img src={Global.url + 'imagen/' + articulo.imagen}/>}
              {articulo.imagen == 'default.png' && <img src='https://glints.com/id/lowongan/wp-content/uploads/2020/10/logo-reactjs-1024x584.jpg' />}
            </div>

            <h1 id='article-title'>{articulo.titulo}</h1>
            <span>{articulo.fecha}</span>
            <p>{articulo.contenido}</p>
          </>
        )
      }
    </div>
  )
}
