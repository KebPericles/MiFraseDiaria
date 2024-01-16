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
        async function enviarFraseDiaria(chatId) {
                let fraseDiaria = await getFraseDiaria();
                let frase = fraseDiaria.phrase;
                let autor = fraseDiaria.author;
                let mensaje = `${frase}\n\n${autor}`;

                await client.sendText(chatId, mensaje);

                console.log(`Frase diaria enviada a las ${new Date().toLocaleTimeString()}`);
        }

        // Buscar el chat con el contacto que se indica en el fichero .env y enviarle la frase diaria
        client.getAllChats().then(chats => {
                chats.forEach(chat => {
                        if (chat.contact.name === process.env.NOMBRE_CONTACTO) {
                                enviarFraseDiaria(chat.id);
                        }
                });

        });
});

