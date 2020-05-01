const validador = {
    validarClave : function(clave) {
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
        const esCorreoValido = validador.validarCorreo(correo.value);
        const esClaveValida = validador.validarClave(clave.value);

        if(!esCorreoValido) {
            correo.focus();
            window.alert('Correo inválido.');
            return false;
        } else if (!esClaveValida) {
            clave.focus();
            window.alert('Clave inválida, debe ser mayor de 7 caracteres.');
            return false;
        }
        window.alert("Indentificado correctamente.")
        return true;
    },
    validarBotonesRadio: function(ids) {
        return ids.map(id=>document.getElementById(id).checked)
            .reduce((a,b)=> a || b);
    },
    cualBotonSelecionado : function(ids) {
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
        const tipos_anuncio = ["tanuncio_t","tanuncio_i"];
        const modos_anuncio = ["manuncio_s","manuncio_p"];
        const tipoSelec = validador.validarBotonesRadio(tipos_anuncio);
        const modoSelec = validador.validarBotonesRadio(modos_anuncio);

        if(nombre.value.trim().length == 0) {
            nombre.focus();
            window.alert('Debe rellenar el campo nombre.');
            return false;
        }else if(!validador.validarCif(ecif.value)) {
            ecif.focus();
            window.alert('Formato de CIF inválido.')
            return false;
        }else if(!validador.validarCorreo(correo.value)) {
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
        }else if(validador.cualBotonSelecionado(tipos_anuncio).value == 'imagen'
                && imgtam.value === "") {
            window.alert('Debe elegir el tamaño de la imagen.');
            return false;
        }else if(validador.cualBotonSelecionado(tipos_anuncio).value == 'texto'
                && textarea.value.trim() === "") {
            textarea.focus();
            window.alert('Debe escribir el texto del anuncio.');
            return false;
        }
        window.alert('Su solicitud ha sido enviada. Le contacteremos pronto.')
        return true;
    }
};
