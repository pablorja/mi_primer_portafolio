# 🚀 Guía de Despliegue en Netlify

## 📋 Pasos para Desplegar

### Opción 1: Despliegue desde Git (Recomendado)

1. **Subir código a GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Sistema de contactos con Netlify Functions"
   git branch -M main
   git remote add origin TU_REPOSITORIO_URL
   git push -u origin main
   ```

2. **Conectar con Netlify**
   - Ve a https://app.netlify.com/
   - Click en "Add new site" → "Import an existing project"
   - Conecta tu repositorio
   - Netlify detectará automáticamente la configuración de `netlify.toml`
   - Click en "Deploy site"

### Opción 2: Despliegue Manual (Drag & Drop)

1. **Preparar archivos**
   - Asegúrate de tener todos los archivos listos
   - Incluye la carpeta `netlify/functions/`
   - Incluye el archivo `netlify.toml`

2. **Subir a Netlify**
   - Ve a https://app.netlify.com/drop
   - Arrastra toda la carpeta del proyecto
   - Netlify desplegará automáticamente

### Opción 3: Netlify CLI

1. **Instalar Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login en Netlify**
   ```bash
   netlify login
   ```

3. **Inicializar y desplegar**
   ```bash
   netlify init
   netlify deploy --prod
   ```

## 🔧 Configuración Importante

### Archivos Necesarios:

✅ `netlify.toml` - Configuración de Netlify
✅ `netlify/functions/guardar-contacto.js` - Función para guardar
✅ `netlify/functions/obtener-contactos.js` - Función para obtener
✅ `JS/contacto.js` - Actualizado con URLs relativas
✅ `admin.html` - Actualizado con URLs relativas

## 📡 Endpoints en Producción

Una vez desplegado, tus endpoints serán:

```
POST   https://tu-sitio.netlify.app/api/contacto
GET    https://tu-sitio.netlify.app/api/contactos
```

## ⚠️ Limitaciones de Netlify Functions

**IMPORTANTE:** Netlify Functions usa almacenamiento temporal (`/tmp`), lo que significa:

- ❌ Los datos NO son persistentes entre despliegues
- ❌ Los datos se pierden después de cierto tiempo de inactividad
- ✅ Funciona perfectamente para pruebas y demos
- ✅ Para producción real, considera usar una base de datos externa

## 🗄️ Opciones para Base de Datos Persistente

Si necesitas datos persistentes, considera:

### 1. **Supabase** (Recomendado - Gratis)
   - Base de datos PostgreSQL
   - API REST automática
   - 500MB gratis
   - https://supabase.com

### 2. **MongoDB Atlas** (Gratis)
   - Base de datos NoSQL
   - 512MB gratis
   - https://www.mongodb.com/cloud/atlas

### 3. **Firebase Firestore** (Gratis)
   - Base de datos en tiempo real
   - Plan gratuito generoso
   - https://firebase.google.com

### 4. **Airtable** (Gratis)
   - Base de datos tipo hoja de cálculo
   - API REST incluida
   - https://airtable.com

## 🔄 Actualizar el Sitio

### Si usas Git:
```bash
git add .
git commit -m "Actualización"
git push
```
Netlify desplegará automáticamente.

### Si usas Drag & Drop:
- Arrastra la carpeta actualizada nuevamente

### Si usas CLI:
```bash
netlify deploy --prod
```

## 🧪 Probar Localmente con Netlify Dev

Puedes probar las funciones localmente:

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Ejecutar servidor local
netlify dev
```

Esto iniciará un servidor en `http://localhost:8888` que simula el entorno de Netlify.

## 📊 Ver Logs de las Funciones

1. Ve a tu sitio en Netlify Dashboard
2. Click en "Functions"
3. Selecciona una función
4. Ve los logs en tiempo real

## ✅ Verificar que Funciona

Después de desplegar:

1. Abre tu sitio: `https://tu-sitio.netlify.app`
2. Llena el formulario de contacto
3. Verifica que aparece el mensaje de éxito
4. Abre `https://tu-sitio.netlify.app/admin.html`
5. Deberías ver el contacto guardado

## 🐛 Solución de Problemas

### Error: "Function not found"
- Verifica que la carpeta `netlify/functions/` existe
- Verifica que `netlify.toml` está en la raíz

### Error: CORS
- Verifica los headers en las funciones
- Verifica la configuración en `netlify.toml`

### Los datos desaparecen
- Es normal con `/tmp` storage
- Considera usar una base de datos externa

## 🔐 Variables de Entorno (Opcional)

Si usas una base de datos externa:

1. Ve a Site settings → Environment variables
2. Agrega tus variables (API keys, etc.)
3. Accede en las funciones con `process.env.VARIABLE_NAME`

## 📚 Recursos

- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Netlify CLI Docs](https://docs.netlify.com/cli/get-started/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/) - Alternativa simple

---

**¡Listo!** Tu sistema de contactos ahora funciona en Netlify 🎉
