const urlAstoria  = 'https://www.google.es/maps/place/Ayre+Hotel+Astoria+Palace/@39.4711681,-0.3761724,17z/data=!4m7!3m6!1s0xd604f4cb41d5591:0xc57217d3ad50124a!5m1!1s2018-08-26!8m2!3d39.4713587!4d-0.3750968?hl=es';
const urlParkings = 'https://www.google.es/maps/search/Aparcamientos/@39.4713587,-0.377264,17z?hl=es';

const sectionStore = {
    'default'      : {
        text : '<p>Lo siento, pero no has introducido la dirección correctamente. ' +
        'Si quieres acceder a la aplicación cargada para tu perfil, escribe en tu navegador la url ' +
        'que te indicamos en la tarjeta de la invitación. Muchas gracias.</p>',
        title: '¡Ups, algo ha fallado!',
        image: '404.jpg',
    },
    'location'     : {
        text : 'location',
        title: 'Lugar del enlace',
        image: 'location.jpg'
    },
    'parkings'     : {
        text : 'parking',
        title: 'Parking',
        image: 'van.jpg'
    },
    'save-the-date': {
        text : 'save-the-date',
        title: 'Fecha',
        image: 'save-the-date.jpg'
    },
    'gift'         : {
        text : 'gift',
        title: 'Regalo',
        image: 'gift-boxes.jpg'
    },
    'contact'      : {
        text : 'contact',
        title: 'Contacto',
        image: 'contact.jpg'
    }
};

export default sectionStore;