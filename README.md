# Backend Proyecto tienda - Pelayo Ayuso


## Instalación

1. Clona el repositori:

    ```bash
    git clone <repository_url>
    ```

2. Navega al directorio del proyecto:

   ```bash
   cd Backend-Proyecto-tienda-Pelayo-Ayuso
   ```

3. Cambiar a la rama "dev":

    ```bash
    git switch dev
    ```

4. Instala las dependencias:

   ```bash
   npm install
   ```

5. Crea un archivo `.env` basado en el archivo `.env-example` y configura tus variables de entorno:

   ```bash
   cp .env-example .env
   ```

   Luego, edita el archivo `.env` para agregar tu configuración personalizada, como el puerto y la URI de MongoDB.

6. Inicia el servidor:
   ```bash
   npm start
   ```
   Para desarrollo con recarga automática, puedes usar:
   ```bash
   npm run dev
   ```


## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de `http://localhost:<PORT>/api`, donde `<PORT>` es el puerto que configuraste en tu archivo `.env`.


### Obtener todos los productos

metodo GET a `/api/products` para obtener una lista de todos los productos disponibles.

response:

```json
[
   {
    "_id": "6a21...",
    "nombre": "Aria",
    "descripcion": "Print de ilustración digital...",
    "categoria": "Print",
    "precio": 19.99,
    "stock": 12,
    "imagen": "../src/assets/imgs/600x400-1.png",
    "imagenDetalle": "../src/assets/imgs/D1.png",
    "__v": 0,
    "createdAt": "2026-06-04T19:16:43.737Z",
    "updatedAt": "2026-06-04T19:16:43.737Z"
  }
]
```

### Obtener un producto por ID

metodo GET a `/api/products/:id` para obtener los detalles de un producto específico utilizando su ID.

response:

status 200:

```json
{
    "_id": "6a21...",
    "nombre": "Aria",
    "descripcion": "Print de ilustración digital...",
    "categoria": "Print",
    "precio": 19.99,
    "stock": 12,
    "imagen": "../src/assets/imgs/600x400-1.png",
    "imagenDetalle": "../src/assets/imgs/D1.png",
    "__v": 0,
    "createdAt": "2026-06-04T19:16:43.737Z",
    "updatedAt": "2026-06-04T19:16:43.737Z"
}
```

status 404:

```json
{
    "error": "Producto no encontrado"
}
```



