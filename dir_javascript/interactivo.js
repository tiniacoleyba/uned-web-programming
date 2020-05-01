// Este tipo de comprobaciones es más fácil hacerlas con atributos de html.
// De todas formas, en input debe ser válidado en el backend. Ya que el
// usuario puede desactivar JS y modificar el código del frontal.

const validador = {
    claveValida : function(clave) {
        return clave == null ? false : clave.trim().length > 7;
    },
    correoValido : function(correo) {
        const c = correo.trim();
        if (c.trim().length<5) {
            return false;
        }
        return c.includes('@') && c.includes('.') &&
            ((c.lastIndexOf('.') - c.indexOf('@')) > 1);
    },
    validar : function() {
        const clave  = document.getElementById("pcont");
        const correo = document.getElementById("pcorreo");
        const correoValido = validador.correoValido(correo.value);
        const claveValida = validador.claveValida(clave.value);

        if(!correoValido) {
            correo.focus();
            return false;
        } else if (!claveValida) {
            clave.focus();
            return false;
        }
        document.getElementById('enviar').disabled=false;
        return true;
    }
}

document.getElementById('acceso').addEventListener('keyup',validador.validar);
