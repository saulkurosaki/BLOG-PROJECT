import React from 'react';
import { useState, useEffect } from 'react';

export const Articulos = () => {

  const [articulos, setArticulos] = useState([]);

  useEffect(async() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async() => {
    const url = 'http://localhost:3000/api/articulos';

    let peticion = await fetch(url, {
      method: 'GET',
    });

    let datos = await peticion.json();

    if(datos.status === 'success'){
      setArticulos(datos.articulos);
    };

  };

  return (
    <>

      {
      articulos.length >= 1 ?
        (
          articulos.map(articulo => {

            return (
              <article key={articulo._id} className='articulo-item'>
                <div className='mascara'>
                  <img src='https://tse1.mm.bing.net/th?id=OIP.Z_RedhUZ_XciZPgYbuqNqQHaF7&pid=Api&P=0&h=180' />
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
        ):(
          <h1>No hay articulos</h1>
        )}

    </>
  )
}
