const Validador = {
    formatoClave : "La contraseña debe tener como mínimo 8 caracteres y " +
        "contener una mayúscula y un número.",
    formatoFecha : "El formato de fecha debe ser dd/mm/aaaa y usted debe " +
        "ser mayor de edad.",
    validarClave : function(clave) {
        return clave.trim().length > 7 ?
            (/.*[A-Z].*/.test(clave) && /.*[0-9].*/.test(clave)): false;
    },
    validarCorreo : function(correo) {
        const c = correo.trim();
        if (c.length<5) {
            return false;
        }
        return c.includes('@') && c.includes('.') &&
            ((c.lastIndexOf('.') - c.indexOf('@')) > 1);
    },
    validarCif : function(cif) {
        const regexp = /[0-9]{6}[A-Za-z]/;
        return regexp.test(cif);
    },
    validarAcceso : function() {
        const clave  = document.getElementById("pcont");
        const correo = document.getElementById("pcorreo");
        const esCorreoValido = Validador.validarCorreo(correo.value);
        const esClaveValida = Validador.validarClave(clave.value);

        if(!esCorreoValido){
            correo.focus();
            window.alert('Correo inválido.');
            return false;
        }else if(!esClaveValida){
            clave.focus();
            window.alert(Validador.formatoClave);
            return false;
        }
        window.alert("Indentificado correctamente.")
        return true;
    },
    validarBotonesRadio: function(ids) {
        return ids.map(id=>document.getElementById(id).checked)
            .reduce((a,b)=> a || b);
    },
    queBotonSelecionado : function(ids) {
        return ids.map(id=>document.getElementById(id))
            .filter(id=>id.checked)[0];
    },
    validarPublicitarse : function() {
        const nombre    = document.getElementById("enombre");
        const ecif      = document.getElementById("ecif");
        const correo    = document.getElementById("ecorreo");
        const aposicion = document.getElementById("aposicionid");
        const imgtam    = document.getElementById("imgtam");
        const textarea  = document.getElementById("textareaid");
        const tiposAnuncio = ["tanuncio_t","tanuncio_i"];
        const modoAnuncio  = ["manuncio_s","manuncio_p"];
        const tipoSelec = Validador.validarBotonesRadio(tiposAnuncio);
        const modoSelec = Validador.validarBotonesRadio(modoAnuncio);

        if(nombre.value.trim().length == 0) {
            nombre.focus();
            window.alert('Debe rellenar el campo nombre.');
            return false;
        }else if(!Validador.validarCif(ecif.value)) {
            ecif.focus();
            window.alert('Formato de CIF inválido.')
            return false;
        }else if(!Validador.validarCorreo(correo.value)) {
            correo.focus();
            window.alert('Formato de correo inválido.');
            return false;
        }else if(!tipoSelec) {
            window.alert('Debe elegir el tipo de anuncio.');
            return false;
        }else if(!modoSelec) {
            window.alert('Debe elegir el modo del anuncio.');
            return false;
        }else if(aposicionid.value === "") {
            window.alert('Debe elegir la posición del anuncio.');
            return false;
        }else if(Validador.queBotonSelecionado(tiposAnuncio).value == 'imagen'
                && imgtam.value === "") {
            window.alert('Debe elegir el tamaño de la imagen.');
            return false;
        }else if(Validador.queBotonSelecionado(tiposAnuncio).value == 'texto'
                && textarea.value.trim() === "") {
            textarea.focus();
            window.alert('Debe escribir el texto del anuncio.');
            return false;
        }
        window.alert('Su solicitud ha sido enviada. Le contacteremos pronto.')
        return true;
    },
    validarfechaNac : function(fechaNac) {
        const [dia,mes,ano] = fechaNac.split('/').map(s=>Number(s));
        const fecha = new Date(ano,mes-1,dia);
        if(dia != fecha.getDate() || (mes-1) != fecha.getMonth() ||
                ano != fecha.getFullYear()) {
            return false;
        }
        fecha.setYear(fecha.getFullYear() + 18);
        return fecha < new Date();
    },
    validarRegistro : function() {
        const nombre      = document.getElementById("nombre");
        const apellido    = document.getElementById("apellido");
        const fechaNac    = document.getElementById("fechanac");
        const correo      = document.getElementById("correo");
        const clave       = document.getElementById("pcont");
        const resRecup    = document.getElementById("rrec");
        const preguntaRec = document.getElementById("prec");
        const sexo = ["sfemenino","smasculino"];
        const generoSelec = Validador.validarBotonesRadio(sexo);

        if(nombre.value.trim().length == 0){
            nombre.focus();
            window.alert('Debe rellenar el campo nombre.');
            return false;
        }else if(apellido.value.trim().length == 0){
            apellido.focus();
            window.alert('Debe rellenar el campo apellido.');
            return false;
        }else if(!Validador.validarfechaNac(fechaNac.value)){
            fechaNac.focus();
            window.alert(Validador.formatoFecha);
            return false;
        }else if(Validador.validarBotonesRadio(sexo) == ""){
            window.alert('Debe elegir su género.');
            return false;
        }else if(!Validador.validarCorreo(correo.value)){
            correo.focus();
            window.alert('Debe introducir un correo válido.');
            return false;
        }else if(!Validador.validarClave(clave.value)){
            clave.focus();
            window.alert(Validador.formatoClave);
            return false;
        }else if(preguntaRec.value == ""){
            window.alert('Debe elegir la pregunta de recuperación.');
            return false;
        }else if(rrec.value.trim().length == 0){
            rrec.focus();
            window.alert("Debe rellenar la respuesta de recuperación.");
            return false;
        }
        window.alert("Se ha registrado correctamente.");
        return true;
    }
};

const Informacion = {
    precios : {
        texto:500,
        imagen:300,
        simple:100,
        popup:200,
        posicion:{
            laterales:100,
            cabecera:200,
            incrustado:300
        },
        tamano:{
            pequena:100,
            mediana:250,
            grande:500
        },
        letras:10
    },
    mostrarPrecios : function() {
        document.getElementById('ptexto').innerHTML = this.precios.texto;
        document.getElementById('pimagen').innerHTML = this.precios.imagen;
        document.getElementById('psimple').innerHTML = this.precios.simple;
        document.getElementById('popup').innerHTML = this.precios.popup;
        document.getElementById('platerales').innerHTML =
            this.precios.posicion.laterales;
        document.getElementById('pcabecera').innerHTML =
            this.precios.posicion.cabecera;
        document.getElementById('pincrustado').innerHTML =
            this.precios.posicion.incrustado;
        document.getElementById('ppequena').innerHTML =
            this.precios.tamano.pequena;
        document.getElementById('pmediana').innerHTML =
            this.precios.tamano.mediana;
        document.getElementById('pgrande').innerHTML =
            this.precios.tamano.grande;
        document.getElementById('pletra').innerHTML = this.precios.letras;

        document.getElementById('precios').style.display = "block";
    }
};
