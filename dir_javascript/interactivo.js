const Validador = {
    formatoClave : "La contraseña debe tener como mínimo 8 caracteres y" +
        "contener una mayúscula y un número.",
    validarClave : function(clave) {
        // TODO: implementar comprobacion de formato
        return clave.trim().length>7;
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
        const modoAnuncio = ["manuncio_s","manuncio_p"];
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
        // TODO: implementar comprobación
        return true;
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
            window.alert('El formato de fecha debe ser dd/mm/aaaa.');
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
