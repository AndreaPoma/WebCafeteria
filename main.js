const firebaseConfig = {
    apiKey: "AIzaSyC0sE0E-Wd1H1O4wIRBTMPEwydc-Lina98",
    authDomain: "registroweb-2bfe5.firebaseapp.com",
    projectId: "registroweb-2bfe5",
    storageBucket: "registroweb-2bfe5.appspot.com",
    messagingSenderId: "1091645351886",
    appId: "1:1091645351886:web:5d26efb30b05a3703ced9f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//Elementos de HTML
let btnIngresar = document.getElementById('btnIngresar');
let btnRegistrar = document.getElementById('btnRegistrar');

let contenidoDeWeb = document.getElementById('contenidoDeWeb');
let formulario = document.getElementById('formulario');
let email = document.getElementById('txtEmail');
let password = document.getElementById('txtPassword');
let btnBebidas = document.getElementById('btnBebidas');


let btnCerrar = document.getElementById('btnCerrar');
let btnGoogle = document.getElementById('btnGoogle');
let btnFacebook = document.getElementById('btnFacebook');


//Funcion de registrar
btnRegistrar.addEventListener('click', () => {
    let email = document.getElementById('txtEmail').value;
    let password = document.getElementById('txtPassword').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            console.log('Registro correctamente');
            cargarJSON();
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDeWeb.classList.replace('ocultar', 'mostrar');
            var user = userCredential.user;

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ..
        });
})


//Función de ingresar
btnIngresar.addEventListener('click', () => {
    let email2 = document.getElementById('txtEmail').value;
    let password2 = document.getElementById('txtPassword').value;

    console.log("Tu email es " + email2 + " y tu password es " + password2);

    firebase.auth().signInWithEmailAndPassword(email2, password2)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log("Iniciar Sesión correctamente")
            cargarJSON();
            formulario.classList.replace('mostrar', 'ocultar');
            contenidoDeWeb.classList.replace('ocultar', 'mostrar');
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
})

//Función de ingresar con Google
btnGoogle.addEventListener('click', () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
            var credential = result.credential;
            console.log("Incio de sesión con google correctamente.");
            cargarJSON();
            // ...
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            console.log("Error de sesión con google correctamente.");
            // ...
        });
})

//Función de ingresar con Facebook
btnFacebook.addEventListener('click', () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
    var credential = result.credential;
    console.log("Incio de sesión con facebook correctamente.");
    cargarJSON();
    var user = result.user;
    var accessToken = credential.accessToken;
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log("Error de sesión con facebook correctamente.");
    // ...
  });
  
})

//Función cerrar sesión
btnCerrar.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        console.log("Cierra sesión correctamente.");
        contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar');
    }).catch((error) => {
        console.log("Error con el cierre sesión correctamente.");
    })

});


//Funcion de ver las bebidas
btnBebidas.addEventListener('click', () => {
    firebase.auth().signIn().then(() => {
        console.log("ver bebidas correctamente")
        cargarJSON2();
        resultado.classList.replace('mostrar', 'ocultar');
        contenidoDeBebidas.classList.replace('ocultar', 'mostrar');
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
    });

})

//Función estado del usuario: activo o inactivo
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        contenidoDeWeb.classList.replace('ocultar', 'mostrar');
        formulario.classList.replace('mostrar', 'ocultar')
        console.log("Tu usario esta activo")
        cargarJSON();
        // ...
    } else {
        contenidoDeWeb.classList.replace('mostrar', 'ocultar');
        formulario.classList.replace('ocultar', 'mostrar')
    }
});

//llamando datos de JSON
function cargarJSON() {
    fetch('interfaz.json')
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((hola) => {
                html += `
            <div class="producto">
           <h1> ${hola.saludo} </h1>
           <img src="${hola.imagen}" width="500px">
           <p> ${hola.desc} </p>
           </div>
            `;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}

function cargarJSON2() {
    fetch('dataBebidas.json')
        .then(function (res) {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            let html = '';
            data.forEach((hola) => {
                html += `
            <div class="producto">
           <h1> ${hola.saludo} </h1>
           <img src="${hola.imagen}" width="500px">
           <p> ${hola.desc} </p>
           </div>
            `;
            })
            document.getElementById('resultado').innerHTML = html;
        })
}
