import React from 'react'

const Variables = () => {
    const nueva = 'Hola desde constante';
    const imagen = 'https://www.pinpng.com/pngs/m/237-2374716_kawaii-cute-png-tumblr-stickers-sticker-editing-cartoon.png';
    return (
        <>
          <h2>Nuevo componente { nueva }</h2>
          <img src={ imagen } alt=""/>
        </>
    )
}

export default Variables;
