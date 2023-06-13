import React from 'react';
import { Global } from '../../helpers/global';

export const Listado = ({ articulos, setArticulos }) => {
  return (
    articulos.map(articulo => {

        return (
          <article key={articulo._id} className='articulo-item'>
            <div className='mascara'>
              {articulo.imagen != 'default.png' && <img src={Global.url + 'imagen/' + articulo.imagen}/>}
              {articulo.imagen == 'default.png' && <img src='https://tse1.mm.bing.net/th?id=OIP.Z_RedhUZ_XciZPgYbuqNqQHaF7&pid=Api&P=0&h=180' />}
            </div>

            <div className='datos'>
              <h3 className='title'>{articulo.titulo}</h3>
              <p className='description'>{articulo.contenido}</p>

              <button className='edit'>Editar</button>
              <button className='delete'>Borrar</button>
            </div>
          </article>
        );

      })
  )
}
