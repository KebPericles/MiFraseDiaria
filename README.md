# Script para enviar frase del día a chat privado de WhatsApp

Este script envía una frase del día a un chat privado de WhatsApp. La frase se
obtiene de una API que la toma de [proverbia.net](https://proverbia.net/).

Funcional al día 2024-01-16.

## Requisitos

- Node.js
  - v18.16.0
  -
- npm

> [!CAUTION] Este script no requiere de ninguna licencia o código de pago.

# Uso

### Paso 1: Instalar dependencias

```bash
npm install
```

### Paso 2: Configurar chat privado de WhatsApp

Crear un archivo `.env` a partir del archivo de ejemplo `.env.example` y
escribir el número del contacto al que queremos enviar el mensaje, si es para
nosotros ponemos nuestro número.

> [!NOTE] 
> El número debe tener el código de país, por ejemplo, para un número
> mexicano, el número debe ser `5219876543210` donde el código de país es `521`,
> el `1` no tengo ni idea de donde sale, pero se debe incluir.

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

# Errores

En cualquier error, se recomienda volver a ejecutar el script. Si el error
persiste, se puede abrir un issue en este repositorio.

## Errores posibles

- Puede que el mensaje se envíe a un chat no deseado si este tiene el nombre del
  que se busca.
- Parece ser que se cierra sesión espontáneamente, pero aún no se ha podido
  reproducir el error.

## Errores conocidos

### Ejecución en Linux

Errores de librerías con respecto a `puppeteer` y `chrome-aws-lambda`. Ejecutar
el siguiente comando y volver a correr el script.

```bash
sudo apt install -y libatk1.0-0 libgbm1 libatk-bridge2.0-0 libcups2 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgm1 libxkbcommon0 libpango-1.0-0 libcairo2 libasound2
```

# Ideas de mejora

- Lista de frases personalizadas.
