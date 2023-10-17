# Generador de Proyectos NestJS

Este es un generador de proyectos NestJS que utiliza un archivo YAML para definir la estructura de datos y generar automáticamente servicios, controladores, módulos y DTOs para tu proyecto. Es compatible con Python 3.10.

## Cómo Usar

1. Clona este repositorio o descarga el código fuente.
2. Asegúrate de tener Python 3.10 instalado en tu sistema.
3. Instala las dependencias utilizando `pip`:

   pip install -r requirements.txt

4. Ejecuta el generador de proyectos proporcionando un archivo YAML que describa la estructura de datos:

   python main.py

5. Sigue las instrucciones para ingresar la ruta del archivo YAML.
6. El generador creará automáticamente servicios, controladores, módulos y DTOs según la estructura definida en el archivo YAML.
7. ¡Tu proyecto NestJS estará listo para usar!

## Ejemplo de Archivo YAML

Aquí hay un ejemplo de cómo debería verse un archivo YAML que describe la estructura de datos:

```yaml
modules:
  Orders:
    name: Orders
  Products:
    name: Products
  Users:
    name: Users
    roles:
      name: string

products:
  name: string
  description: string
  price: number
  in_stock: boolean
  category: string

users:
  username: string
  email: string
  password: string

orders:
  date: date
  user:
    username: string
    email: string
  items:
    product:
      name: string
      price: number
      quantity: number
```

Este archivo YAML define módulos, tablas y campos, y el generador creará la estructura de tu proyecto en base a esto.

## Contacto

Si tienes preguntas o comentarios, no dudes en ponerte en contacto con nosotros.

Disfruta de tu generador de proyectos NestJS!
