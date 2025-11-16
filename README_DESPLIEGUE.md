# 🚀 GUÍA RÁPIDA DE DESPLIEGUE EN NETLIFY

## ⚡ Opción Más Rápida: Netlify Drop

### Paso 1: Preparar archivos
Ya están listos ✅

### Paso 2: Desplegar
1. Ve a: **https://app.netlify.com/drop**
2. Arrastra toda la carpeta del proyecto
3. ¡Listo! Tu sitio estará en línea en segundos

---

## 🔧 Opción Recomendada: Desde GitHub

### Paso 1: Subir a GitHub

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Sistema de contactos con Netlify Functions"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git branch -M main
git push -u origin main
```

### Paso 2: Conectar con Netlify

1. Ve a **https://app.netlify.com/**
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub** y autoriza
4. Selecciona tu repositorio
5. Netlify detectará automáticamente la configuración
6. Click en **"Deploy site"**

### Paso 3: ¡Listo!

Tu sitio estará disponible en: `https://tu-sitio-random.netlify.app`

Puedes cambiar el nombre en: **Site settings → Domain management**

---

## 📱 Probar Localmente con Netlify Dev

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Ejecutar servidor local que simula Netlify
netlify dev
```

Abre: `http://localhost:8888`

---

## 🔄 Actualizar el Sitio

### Si usas GitHub:
```bash
git add .
git commit -m "Actualización"
git push
```
Netlify desplegará automáticamente ✨

### Si usas Drag & Drop:
Arrastra la carpeta actualizada nuevamente

---

## ⚠️ IMPORTANTE: Persistencia de Datos

**Los datos se guardan en `/tmp` de Netlify**, lo que significa:

- ✅ Funciona perfectamente para pruebas y demos
- ❌ Los datos se pierden después de ~15 minutos de inactividad
- ❌ Los datos se pierden en cada nuevo despliegue

### Para Datos Persistentes (Producción Real):

Usa una base de datos externa gratuita:

#### 1. **Supabase** (Recomendado)
- PostgreSQL gratis
- 500MB de almacenamiento
- https://supabase.com

#### 2. **MongoDB Atlas**
- NoSQL gratis
- 512MB de almacenamiento
- https://www.mongodb.com/cloud/atlas

#### 3. **Airtable**
- Base de datos tipo Excel
- API REST incluida
- https://airtable.com

¿Quieres que te ayude a configurar alguna de estas? 🤔

---

## ✅ Verificar que Funciona

1. Abre tu sitio en Netlify
2. Llena el formulario de contacto
3. Deberías ver: "¡Gracias por contactarnos!"
4. Abre `/admin.html`
5. Deberías ver el contacto guardado

---

## 🐛 Solución de Problemas

### "Function not found"
- Verifica que existe `netlify/functions/`
- Verifica que existe `netlify.toml`

### "Error de conexión"
- Verifica que las URLs en JS son relativas (`/api/contacto`)
- No deben tener `http://localhost:3000`

### Los datos desaparecen
- Es normal con `/tmp` storage
- Considera usar base de datos externa

---

## 📊 Ver Logs de las Funciones

1. Ve a tu sitio en Netlify Dashboard
2. Click en **"Functions"**
3. Selecciona una función
4. Ve los logs en tiempo real

---

## 🎉 ¡Eso es todo!

Tu sistema de contactos ahora funciona en Netlify.

**Archivos importantes creados:**
- ✅ `netlify.toml` - Configuración
- ✅ `netlify/functions/guardar-contacto.js` - Guardar
- ✅ `netlify/functions/obtener-contactos.js` - Obtener
- ✅ URLs actualizadas en JS/contacto.js y admin.html

**Próximos pasos:**
1. Desplegar en Netlify
2. Probar el formulario
3. (Opcional) Configurar base de datos externa para persistencia
