// Este tipo de comprobaciones es más fácil hacerlas con atributos de html.
// De todas formas, en input debe ser válidado en el backend. Ya que el
// usuario puede desactivar JS y modificar el código del frontal.

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
        const regexp = /[0-9]{6}[A-Fa-f]/;
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
    validarPublicitarse : function() {
        return false;
    }
}
