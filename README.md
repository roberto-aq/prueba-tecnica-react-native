# Prueba Técnica Devsu

## Descripción

Este proyecto es una aplicación móvil construida con React Native (**EXPO**) para una prueba técnica. La aplicación permite a los usuarios agregar, buscar, editar y eliminar productos. Se sigue el principio de Clean Code y las prácticas de SOLID.

![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)
![npm version](https://img.shields.io/badge/npm-10.6.0-blue)
![Expo Version](https://img.shields.io/badge/expo-51.0.7-white)
![React Native](https://img.shields.io/badge/react--native-0.74.1-blue)

## Requisitos Previos
Es necesario tener instalados los siguientes programas:
- Node.js (versión 14 o superior)
- Expo CLI (versión 4 o superior)
- npm (versión 6 o superior)

## Instalación

Sigue estos pasos para instalar las dependencias del proyecto:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/roberto-aq/prueba-tecnica-react-native.git
   ```
2. Navega al directorio del proyecto: 
     ```bash
   cd prueba-tecnica-react-native
   ```
3. Instala las dependencias: 
    ```bash 
     npm install
    ```
4. Renombrar el archivo .env.template a **.env** y rellenar las variables.

## Ejecución del proyecto
Para iniciar la aplicación, ejecuta el siguiente comando:
```bash
npm run start
```
En tu terminal verás varias opciones incluyendo un código QR para que puedas escanear en la aplicación de expo. O aplastar la tecla "a" para ejecutar el comando:
```bash
npm run android
```
El cual si tiene conectado un dispositivo físico o configurado un simulador se abrirá directamente aquí.

## Estructura del Proyecto
 ![Estructura del Proyecto](/assets/assets-doc/estructura-carpetas-proyecto.png)

### actions: 
Aquí es donde se gestionan las diferentes acciones que interactúan con la API. Estas acciones están organizadas por carpetas según su funcionalidad específica

### config: 
Esta carpeta se dedica a las configuraciones generales de la aplicación: 
- **api**: Configuración de Axios para realizar peticiones HTTP.
- **theme**: Configuración del tema de la aplicación, incluyendo estilos globales, colores y fuentes.

### infrastructure
Aquí se definen las interfaces y mapeos que se utilizan en toda la aplicación

### presentation
Esta carpeta contiene toda la lógica y componentes relacionados con la aplicación: 
- **components**: Componentes reutilizables de la interfaz de usuario, como botones, campos de texto y listas de productos.
- **helpers**: Funciones auxiliares que ayudan en la manipulación de datos y formateo.
- **hooks**: Hooks personalizados que encapsulan la lógica reutilizable, organizados por funcionalidad (productos, búsqueda, UI).
- **layout**: Componentes de layout que definen la estructura general de las pantallas de la aplicación.
- **navigation**: Configuración de la navegación de la aplicación, como el stack de navegación.
- **screens**: Las diferentes pantallas de la aplicación, como agregar, editar y mostrar detalles de productos.
- **types**: Define los tipos TypeScript específicos para el formulario de la aplicación.
- **validations**: Reglas de validación para formularios y datos de la aplicación.

## Uso
### Agregar Producto
1. Navega a la pantalla de agregar producto.
2. Completa el formulario con los detalles del producto.
3. Presiona el botón "Agregar" para guardar el producto.

### Buscar Producto
1. Usa la barra de búsqueda en la pantalla de inicio para buscar productos por nombre.

### Editar Producto
1. Selecciona un producto de la lista.
2. Navega a la pantalla de editar producto.
3. Realiza los cambios necesarios y guarda los cambios.

### Eliminar Producto
1. Selecciona un producto de la lista.
2. Presiona el botón "Eliminar" y confirma la eliminación en el modal de confirmación.

## Tecnologías utilizadas
- **React Native** 
- **Expo**
- **React Navigation**
- **React Hook Form**
- **Tanstack Query**
- **Axios**
- **Jest**
- **Testing Library**


## Screenshots 


## Pruebas
Este proyecto utiliza Jest para las pruebas unitarias. Para ejecutar las pruebas, utiliza el siguiente comando:
```bash
    npm run test
```