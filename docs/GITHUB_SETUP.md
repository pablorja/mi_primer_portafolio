# 🚀 Guía para Subir a GitHub

## ✅ Checklist Antes de Subir

- [x] `.gitignore` creado
- [x] `README.md` actualizado y profesional
- [x] Todos los archivos del proyecto
- [x] Git repository inicializado
- [x] Remote origin configurado

## 📋 Pasos para Subir a GitHub

### Paso 1: Verificar Git Status
```bash
git status
```
Deberías ver todos tus archivos como "Untracked files"

### Paso 2: Agregar Todos los Archivos
```bash
# Agregar todos los archivos
git add .

# O agregar archivos específicos
git add index.html proyectos.html CSS/ JS/ data/ IMG/ PROYECTS/
```

### Paso 3: Crear el Primer Commit
```bash
git commit -m "Initial commit: Portafolio web responsivo con 4 proyectos"
```

### Paso 4: Verificar Remote
```bash
git remote -v
```

Deberías ver:
```
origin  https://github.com/pablorja/mi_primer_portafolio.git (fetch)
origin  https://github.com/pablorja/mi_primer_portafolio.git (push)
```

### Paso 5: Hacer Push a GitHub
```bash
git branch -M main
git push -u origin main
```

## 🔧 Si el Repositorio No Está Configurado

Si aún no tienes el remote configurado:

```bash
# Ver remotes actual
git remote -v

# Si no hay remotes, agregar:
git remote add origin https://github.com/pablorja/mi_primer_portafolio.git

# Verificar
git remote -v

# Luego hacer push
git branch -M main
git push -u origin main
```

## 📝 Comandos Completos (Paso a Paso)

```bash
# 1. Navegar a la carpeta del proyecto
cd c:\Users\pablo\OneDrive\Escritorio\VSC\Freelancer_publico

# 2. Ver estado
git status

# 3. Agregar todos los archivos
git add .

# 4. Crear commit
git commit -m "Initial commit: Portafolio responsivo con 4 proyectos"

# 5. Configurar rama main (si es necesario)
git branch -M main

# 6. Hacer push
git push -u origin main
```

## ✨ Commits Recomendados Futuros

Después del inicial, puedes hacer commits más específicos:

```bash
# Agregar imagen
git add IMG/ecommerce-preview.jpg
git commit -m "Add E-commerce project preview image"

# Actualizar proyecto
git add proyectos.html data/projects.json
git commit -m "Update project details and add new features"

# Bug fix
git add CSS/styles.css
git commit -m "Fix responsive layout on mobile devices"

# Feature
git add JS/Portafolio.js
git commit -m "Add project filtering feature"
```

## 🌐 Después de Subir a GitHub

### 1. Habilitar GitHub Pages
1. Ir a Settings del repositorio
2. Buscar "Pages"
3. Seleccionar rama: `main`
4. Carpeta: `/root`
5. Guardar cambios
6. Tu sitio estará en: `https://pablorja.github.io/mi_primer_portafolio`

### 2. Verificar Online
- Espera 1-2 minutos
- Abre: `https://pablorja.github.io/mi_primer_portafolio`
- ¡Tu portafolio en internet!

### 3. Compartir
- Comparte el link de GitHub: `https://github.com/pablorja/mi_primer_portafolio`
- Comparte el link del sitio: `https://pablorja.github.io/mi_primer_portafolio`

## 🔒 Configurar Token (Si es Necesario)

Si GitHub pide autenticación:

### Opción 1: Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token
3. Scope: `repo`, `workflow`
4. Copiar token
5. En PowerShell, cuando pida password, pegar el token

### Opción 2: SSH Key (Recomendado)
```bash
# Generar SSH key
ssh-keygen -t ed25519 -C "tu_email@example.com"

# Agregar a SSH agent
ssh-add ~/.ssh/id_ed25519

# Copiar clave pública
cat ~/.ssh/id_ed25519.pub

# Pegar en GitHub → Settings → SSH and GPG keys
```

## 📊 Descripción del Repositorio

Cuando crees el repositorio en GitHub, usa:

**Nombre**: `mi_primer_portafolio`

**Descripción**: 
```
Portafolio web responsivo de diseño y desarrollo. 
Incluye 4 proyectos destacados: E-commerce, Landing Page, 
Sitio Corporativo y WordPress Personalizado. 
Hecho con HTML5, CSS3, JavaScript y Bootstrap.
```

**Topics** (etiquetas):
- portfolio
- web-design
- responsive
- html5
- css3
- javascript
- bootstrap
- freelancer

## 🎯 Estructura Recomendada en GitHub

```
README.md (descriptivo y profesional)
│
├── index.html → página principal
├── proyectos.html → portafolio completo
│
├── CSS/
├── JS/
├── data/
├── IMG/
├── PROYECTS/
│
└── .gitignore (para evitar archivos innecesarios)
```

## ✅ Verificar Antes de Hacer Push

1. **README.md** → Debe ser profesional y descriptivo ✓
2. **.gitignore** → Creado ✓
3. **Todos los archivos** → Agregados (git add .) ✓
4. **Commit creado** → Con mensaje descriptivo ✓
5. **Remote origin** → Configurado correctamente ✓

## 🚀 Primer Push - Paso Final

```bash
# Comando completo para el primer push
git add .
git commit -m "Initial commit: Portafolio web responsivo"
git branch -M main
git push -u origin main
```

Si todo va bien, verás algo como:
```
Enumerating objects: 45, done.
Counting objects: 100% (45/45), done.
Delta compression using up to 8 threads
...
remote: Create a pull request for 'main' on GitHub
remote: https://github.com/pablorja/mi_primer_portafolio/pull/new/main
To https://github.com/pablorja/mi_primer_portafolio.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

## 🎉 ¡Listo!

Una vez veas ese mensaje, tu código está en GitHub. 

Próximos pasos:
1. Habilitar GitHub Pages
2. Compartir tu portafolio
3. Continuar agregando proyectos

---

**Última actualización**: 10 de Noviembre de 2025
