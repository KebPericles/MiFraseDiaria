# Script para enviar frase del día a chat privado de WhatsApp

Este script envía una frase del día a un chat privado de WhatsApp. La frase se
obtiene de una API que la toma de [proverbia.net](https://proverbia.net/).

Funcional al día 2024-01-16.

## Requisitos

- Node.js
- npm

# Uso

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar chat privado de WhatsApp

Crear un archivo `.env` a partir del archivo de ejemplo `.env.example` y escribir el nombre del chat al que se quiere enviar el mensaje.

### Paso 3: Ejecutar el proyecto

```bash
npm start
```

### Paso 4: Iniciar sesión en WhatsApp Web

Al ejecutar el script por primera vez, se imprimirá un código QR en la consola,
el cual debe ser escaneado con la aplicación de WhatsApp en el celular.

## Recurrente

Al ser un script tan simple, es conveniente ejecutarlo de forma recurrente, en
vez de mantenerlo corriendo en segundo plano.

En linux, se puede usar `crontab` para esto, por ejemplo, todos los días a las
8:00 AM.

### Paso 1: Abrir archivo de configuración de `crontab`

```bash
crontab -e
```

### Paso 2: Agregar línea al archivo

```bash
0 8 * * * cd /path/to/project && npm start
```

> Reemplazar `/path/to/project` por la ruta absoluta del proyecto.

> Para más información sobre la sintaxis de `crontab`, ver
> [este enlace](https://crontab.guru/).
