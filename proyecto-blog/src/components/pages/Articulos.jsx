import React from 'react'

export const Articulos = () => {
  return (
    <>
      <article className='articulo-item'>
        <div className='mascara'>
          <img src='https://tse1.mm.bing.net/th?id=OIP.Z_RedhUZ_XciZPgYbuqNqQHaF7&pid=Api&P=0&h=180' />
        </div>

        <div className='datos'>
          <h3 className='title'>Desarrollo Web</h3>
          <p className='description'>lalalala</p>

          <button className='edit'>Editar</button>
          <button className='delete'>Borrar</button>
        </div>
      </article>

    </>
  )
}
