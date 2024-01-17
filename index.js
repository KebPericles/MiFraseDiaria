import axios from 'axios';
import wa from '@open-wa/wa-automate';
import { config } from 'dotenv';

config();

/**
 * URL de la API de frases, que devuelve un objeto con la frase del día en español y su autor.
 * 
 * La API recoge la frase diaria de la página https://proverbia.net que parece ser de libre acceso y hosteada por alguien privado,
 * pero no he encontrado nada que lo confirme. En cualquier caso, la API no es mía y funciona al día de hoy (2024-01-15).
 * @type {string}
 * 
 * @see https://proverbia.net/
 * @see https://frasedeldia.azurewebsites.net/api/phrase
 * 
 * @example
 * Ejemplo de respuesta:
 * 
 * {
 *  "phrase": "El éxito es la capacidad de ir de fracaso en fracaso sin perder el entusiasmo.",
 *  "author": "Winston Churchill",
 * }
 * 
 */
const urlApiFraseDiaria = 'https://frasedeldia.azurewebsites.net/api/phrase';


async function getFraseDiaria() {
        let fraseDiaria = await axios.get(urlApiFraseDiaria);
        return fraseDiaria.data;
}

// Iniciar sesión en WhatsApp Web
wa.create(undefined, undefined, { refreshQR: 60000 }).then(client => {
        function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function esperarHoraEnvio() {
                let horaEnvio = parseInt(process.env.HORA_ENVIO);
                let minutosEnvio = parseInt(process.env.MINUTOS_ENVIO);

                // Esperar a la hora de envío
                let horaActual = new Date().getHours();
                let minutosActuales = new Date().getMinutes();

                let horaEspera = horaEnvio - horaActual;
                let minutosEspera = minutosEnvio - minutosActuales;

                if (horaEspera <= 0) {
                        horaEspera = 24 + horaEspera;
                }

                if (minutosEspera < 0) {
                        horaEspera--;
                        minutosEspera = 60 + minutosEspera;
                }

                let tiempoEspera = (horaEspera * 60 * 60 * 1000) + (minutosEspera * 60 * 1000);

                console.log(`Esperando ${horaEspera} horas y ${minutosEspera} minutos para enviar la frase diaria`);

                await sleep(tiempoEspera);
        }

        async function enviarFraseDiaria(chatId) {
                // Esperar a la hora de envío
                await esperarHoraEnvio();

                let fraseDiaria = await getFraseDiaria();
                let frase = fraseDiaria.phrase;
                let autor = fraseDiaria.author;
                let mensaje = `${frase}\n - ${autor}`;

                await client.sendText(chatId, mensaje);

                console.log(`Frase diaria enviada a las ${new Date().toLocaleTimeString()}`);

                // Esperar 2 minutos para evitar que se envíen mensajes duplicados
                await sleep(1000 * 60 * 2);

                enviarFraseDiaria(chatId);
        }

        // Generar ChatId de la conversación con el número de contacto
        // Para contactos es el número y termina en @c.us
        // Para grupos termina en @g.us, pero el ID probablemente
        // esta generado por WhatsApp
        client.getChatById(`${process.env.NUMERO_CONTACTO}@c.us`).then(chat => {
                client.sendText(chat.contact.id, `Me he iniciado correctamente, esperando a la hora de envío, que es a las ${process.env.HORA_ENVIO}:${process.env.MINUTOS_ENVIO}, puedes borrar este mensaje`);

                enviarFraseDiaria(chat.contact.id);
        });
});
