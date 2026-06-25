# Backend Proyecto tienda - Pelayo Ayuso


## Instalación

1. Clona el repositorio:

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
   

## Seeders

Si deseas poblar la base de datos con datos de ejemplo, puedes ejecutar el seeder:

```bash
npm run seed
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

#### Paginación

Para obtener una lista paginada de productos, puedes utilizar los parámetros `page` y `limit` en la URL:

```shell
GET /api/products?page=1&limit=10
```

#### Ordenamiento

Para ordenar la lista de productos, puedes utilizar el parámetro `sort` en la URL:

```shell
GET /api/products?sort=precio:asc
```

#### Filtrado
Para filtrar los productos por categoría, puedes utilizar el parámetro `categoria` en la URL:

```shell
GET /api/products?categoria=Print
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

### Crear un producto

Método POST `/api/products`

Crea un nuevo producto en la base de datos.

Body:
```json
{
  "nombre": "Aria",
  "descripcion": "Print de ilustración digital",
  "categoria": "Print",
  "precio": 19.99,
  "stock": 12,
  "imagen": "../src/assets/imgs/600x400-1.png",
  "imagenDetalle": "../src/assets/imgs/D1.png"
}
```

Campos obligatorios:

nombre
descripcion
categoria
precio
stock
imagen
imagenDetalle

Validaciones:

El nombre debe ser un string.
El nombre debe tener mínimo 3 caracteres.
No se permiten campos obligatorios vacíos.

Response:

Status 201:
```json
{
  "_id": "6a21...",
  "nombre": "Aria",
  "descripcion": "Print de ilustración digital",
  "categoria": "Print",
  "precio": 19.99,
  "stock": 12
}
```

Error:

Status 422:
```json
{
  "message": "Todos los campos son obligatorios"
}
```

### Actualizar un producto

Método PUT a `/api/products/:id`

Actualiza la información de un producto existente.

Ejemplo:

PUT /api/products/6a21...

Body:
```json
{
  "nombre": "Aria actualizado",
  "precio": 24.99,
  "stock": 20
}
```

Validaciones:

El nombre debe ser un string.
La descripción debe ser un string.
Se aplican las validaciones del modelo.

Response:
```json
{
  "_id": "6a21...",
  "nombre": "Aria actualizado",
  "precio": 24.99,
  "stock": 20
}
```

### Eliminar un producto

Método DELETE a `/api/products/:id`

Elimina un producto mediante su identificador.

Ejemplo:

DELETE /api/products/6a21...

Response:
```json
{
  "message": "Producto borrado"
}
```

Error:

Status 404:
```json
{
  "message": "Producto no encontrado"
}
```

### Obtener carrito

Método GET a `/api/cart` para obtener el carrito.

Devuelve el carrito del usuario autenticado.

Si el usuario no tiene carrito devuelve:

```json
{
  "items": []
}
```

Response:

```json
{
  "_id": "64abc...",
  "usuario": "64def...",
  "items": [
    {
      "_id": "item123",
      "producto": {
        "_id": "6a21...",
        "nombre": "Aria",
        "precio": 19.99
      },
      "cantidad": 2,
      "talla": "M"
    }
  ]
}
```

### Añadir producto al carrito

Método POST a `/api/cart` para añadir un producto al carrito.

Añade un producto al carrito del usuario.

Body:
```json
{
  "producto": "6a21...",
  "cantidad": 2,
  "talla": "M"
}
```

Funcionamiento:

Comprueba que el producto existe.
Comprueba que hay stock suficiente.
Reduce el stock del producto.
Crea el carrito si no existe.
Si el producto con la misma talla ya existe, aumenta la cantidad.
Si no existe, crea un nuevo elemento.

Errores posibles:
```json
{
  "message": "Producto no encontrado"
}
````
```json
{
  "message": "No hay stock suficiente"
}
```


### Actualizar producto del carrito

Método PUT a `/api/cart/:itemId`

Actualiza un elemento concreto del carrito.

Parámetro:

itemId → ID del elemento dentro del carrito

Body:
```json
{
  "cantidad": 3,
  "talla": "L"
}
```

Permite modificar:

Cantidad.
Talla.

Si aumenta la cantidad:

Comprueba stock disponible.
Reduce la diferencia del stock.

Si disminuye:

Devuelve unidades al stock.


### Eliminar producto del carrito

Método DELETE a `/api/cart/:itemId`

Elimina un producto del carrito.

Antes de eliminarlo:

Recupera el producto.
Devuelve al stock la cantidad eliminada.
Elimina el elemento del carrito.

Respuesta:
```json
{
  "message": "Producto eliminado del carrito"
}
```

### Vaciar carrito

Método DELETE a `/api/cart`

Elimina todos los productos del carrito del usuario.

Antes de vaciar:

Recorre todos los productos.
Devuelve sus cantidades al stock.
Limpia los elementos del carrito.

Response:
```json
{
  "items": []
}
```


