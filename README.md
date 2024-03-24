# Script para enviar frase del día a chat privado de WhatsApp

Este script envía una frase del día a un chat privado de WhatsApp. La frase se
obtiene de una API que la toma de [proverbia.net](https://proverbia.net/).

Funcional al día 2024-02-06.

## Requisitos

- Node.js
  - mayor o igual a 18.16.0
- npm

> [!CAUTION]
> Este script no requiere de ninguna licencia o código de pago.

# Uso

### Paso 1: Instalar dependencias

```bash
npm install
```

E instalar `pm2` de forma global.

```bash
npm install -g pm2
```

> [!NOTE] 
> Es posible que se requieran permisos de administrador para instalar
> `pm2` de forma global. En ese caso, ejecutar el comando anterior con `sudo`.

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
pm2 start index.js --name "frase-del-dia"
```

> [!NOTE]
> Se usa `pm2` para asegurar que el script se ejecute de forma indefinida.

### Paso 4: Iniciar sesión en WhatsApp Web (solo la primera vez)

Primero se debe ejecutar el comando:

```bash
pm2 monit
```

Se podrá ver la salida del script, en la cual se mostrará un código QR, el cual
debe ser escaneado con la aplicación de WhatsApp en el celular.

> [!IMPORTANT]
> En este punto se enviará un mensaje de confirmación al chat privado de WhatsApp,
> si no se recibe el mensaje en un lapso de 10 minutos, se debe volver a ejecutar
> el script.

# Paso 5: Guardar configuración de `pm2`

Este comando asegura que pm2 se ejecute al iniciar el sistema operativo.

```bash
pm2 startup
```

Con este comando se guarda la configuración actual de `pm2` para que se ejecute
el script al iniciar el sistema operativo.

```bash
pm2 save
```

## Recurrente

El script se ejecuta indefinidamente, mandando un mensaje diario, el gasto de
recurso puede ser considerable. Pero al parecer si se cierra el script, se
cierra la sesión de WhatsApp Web, por lo que es conveniente mantenerlo
corriendo. La versión 2.0 no se ejecuta de forma indefinida, por lo que puede
ser ejecutada de forma recurrente con alguna herramienta como `crontab`.

# Errores

En cualquier error, se recomienda volver a ejecutar el script. Si el error
persiste, se puede abrir un issue en este repositorio.

## Errores posibles

- Puede que el mensaje se envíe a un chat no deseado si este tiene el nombre del
  que se busca.
- Puedes ser que se cierre la sesión, pero al dejar el script corriendo de forma
  indefinida, no debería suceder.

## Errores conocidos

### Error `CreateChatDuplicateError`
Error en WhatsApp Web, aún sin mucha información, solución temporal en [#2](https://github.com/KebPericles/MiFraseDiaria/issues/2).

### Ejecución en Linux

Errores de librerías con respecto a `puppeteer`. Ejecutar
el siguiente comando y volver a correr el script.

```bash
sudo apt install -y ca-certificates fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

> [!Important]
> [Click acá](https://pptr.dev/troubleshooting#chrome-doesnt-launch-on-linux) para más información sobre este y otros problemas con puppeteer

# Ideas de mejora

- Lista de frases personalizadas.
