const sectionStore = {
    'default' : {
        text : '<p>Lo siento, pero no has introducido la dirección correctamente. ' +
        'Si quieres acceder a la aplicación cargada para tu perfil, escribe en tu navegador la url ' +
        'que te indicamos en la tarjeta de la invitación. Muchas gracias.</p>',
        title: '¡Ups, algo ha fallado!',
        image: '404.jpg',
    },
    'location': {
        text : '<p>Toda la celebración tendrá lugar en el mismo emplazamiento:</p>' +
        '<p>HOTEL ASTORIA PALACE' +
        '<br>Plaza Rodrigo Botet, nº5, 46002, Valencia.</p>' +
        '<p>Pulsa <a href="#" target="_blank">aquí</a> para acceder a la ubicación en Google Maps.',
        title: 'Lugar',
        image: 'location.jpg'
    },
    ''        : {
        text : '',
        title: '',
        image: ''
    },
};

export default sectionStore;