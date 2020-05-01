// Este tipo de comprobaciones es más fácil hacerlas con atributos de html.
// De todas formas, en input debe ser válidado en el backend. Ya que el
// usuario puede desactivar JS y modificar el código del frontal.

var validador = {
    validarClave : function(clave) {
        return clave.trim().length>7;
    },
    // La forma mas fiable de hacer esto es con una expresión regular
    // pero añado otra menos fiable con los criterios exactos del enunciado
    validarCorreo : function(correo) {
        const c = correo.trim();
        // const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        // return re.test(c);
        if (c.trim().length<5) {
            return false;
        }
        return c.includes('@') && c.includes('.') &&
            ((c.lastIndexOf('.') - c.indexOf('@')) > 1);
    },
    validar : function() {
        const clave  = document.getElementById("pcont");
        const correo = document.getElementById("pcorreo");
        const correoValido = this.validarCorreo(correo.value);
        const claveValida = this.validarClave(clave.value);

        if (!correoValido) {
            correo.focus();
            alert('Correo inválido.');
            return false;
        } else if (!claveValida) {
            clave.focus();
            alert('Clave inválida.');
            return false;
        }
        alert('Identificado correctamente.');
        return true;
    }
};

document.getElementById('acceso').addEventHandler("onsubmit",validador.validar());
