import React from 'react';
import { Link } from 'react-router-dom';

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Bienvenido al Blog con React</h1>
      <p>Blog desarrollado con el MERN Stack (MongoDB, Express, React, NodeJs)</p>
      <Link to='/articulos' className='button'>Ver los articulos</Link>
    </div>
  )
}
