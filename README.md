# 🚀 Astro 5 Blog: Content Collections, Images & Relations

[![Astro](https://img.shields.io/badge/Astro-5.x-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Bun](https://img.shields.io/badge/Bun-1.1-black?style=flat-square&logo=bun&logoColor=white)](https://bun.sh)
[![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=flat-square&logo=netlify&logoColor=white)](https://astro-blog-content-collections.netlify.app/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![MDX](https://img.shields.io/badge/MDX-4.x-FCB32C?style=flat-square&logo=mdx&logoColor=black)](https://mdxjs.com)
[![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev)

> 🌐 **Demo en producción:** [https://astro-blog-content-collections.netlify.app/](https://astro-blog-content-collections.netlify.app/)

Proyecto desarrollado a lo largo de las **Secciones 5 y 6** del curso *"Astro: El framework para sitios web orientados al contenido"* impartido por Fernando Herrera.

El proyecto profundiza en el sistema de **Colecciones de Contenido (Content Collections)**, validación estricta de esquemas con **Zod**, optimización de imágenes con `astro:assets`, establecimiento de **relaciones entre colecciones** (`reference`), paginación estática y generación dinámica de rutas. Todo el proyecto fue desarrollado y gestionado con **[Bun](https://bun.sh/)**.

---

## 📋 Tabla de Contenidos

1. [Características Principales](#-características-principales)
2. [Estructura del Proyecto](#-estructura-del-proyecto)
3. [Colecciones y Modelado de Datos](#-colecciones-y-modelado-de-datos)
4. [Rutas y Páginas Implementadas](#-rutas-y-páginas-implementadas)
5. [Conceptos Clave Desarrollados (Secciones 5 y 6)](#-conceptos-clave-desarrollados-secciones-5-y-6)
6. [Instalación y Uso con Bun](#-instalación-y-uso-con-bun)
7. [Scripts Disponibles](#-scripts-disponibles)

---

## ✨ Características Principales

* **⚡ Runtime & Package Manager con Bun:** Instalación ultra rápida de dependencias y ejecución de scripts.
* **📦 Content Collections con Zod:** Esquemas fuertemente tipados con autocompletado y validación en tiempo de compilación.
* **🔗 Relaciones entre Colecciones:** Asociación de tipo *1 a N* entre publicaciones y autores (`reference('author')`).
* **🖼️ Optimización Automática de Imágenes (`astro:assets`):** Conversión a formatos modernos (`.webp`, `.avif`), compresión inteligente y prevención de cambios de diseño acumulados (CLS).
* **📑 Paginación Estática:** División de listados de publicaciones usando el helper `paginate` de Astro.
* **✍️ Soporte para Markdown y MDX:** Capacidad de insertar componentes interactivos y lógica JSX dentro de las publicaciones.
* **🌐 Transiciones Suaves (ViewTransitions):** Navegación fluida tipo SPA sin recargas completas de pantalla.
* **🏷️ Filtrado Dinámico por Autor:** Páginas dedicadas para listar los artículos creados por cada autor individual.
* **👥 Directorio de Autores:** Vistas dedicadas y tarjetas (`AuthorCard`) con redes sociales, avatar y biografía.

---

## 📂 Estructura del Proyecto

```text
03-blog/
├── public/                 # Archivos estáticos públicos (favicon, etc.)
├── src/
│   ├── assets/             # Recursos optimizables por Astro (imágenes del blog)
│   ├── components/
│   │   ├── authors/
│   │   │   └── AuthorCard.astro        # Tarjeta de presentación de autor
│   │   └── posts/
│   │       ├── BlogPost.astro          # Componente para post tradicional
│   │       └── TypeBlogPost.astro      # Componente tipado con CollectionEntry<'blog'>
│   ├── config/
│   │   └── site-config.ts              # Metadatos globales del sitio
│   ├── content/
│   │   ├── author/                     # Colección de tipo 'data' (archivos .yml)
│   │   │   ├── avatars/                # Imágenes de perfil de los autores
│   │   │   ├── alice-johnson.yml
│   │   │   ├── bob-williams.yml
│   │   │   ├── jane-doe.yml
│   │   │   └── john-smith.yml
│   │   ├── blog/                       # Colección de tipo 'content' (.md y .mdx)
│   │   │   ├── images/                 # Imágenes vinculadas a cada post
│   │   │   ├── post-01.mdx
│   │   │   ├── post-02.md
│   │   │   └── ...
│   │   └── config.ts                   # Definición de esquemas Zod y colecciones
│   ├── pages/
│   │   ├── authors/
│   │   │   └── index.astro             # Directorio de todos los autores (/authors)
│   │   ├── blog/
│   │   │   ├── [author].astro          # Posts filtrados por autor (/blog/:author)
│   │   │   └── [page].astro            # Listado paginado (/blog/:page)
│   │   ├── images/
│   │   │   └── index.astro             # Pruebas y benchmarks del componente Image
│   │   ├── layouts/
│   │   │   ├── BlogLayout.astro        # Layout enfocado en artículos
│   │   │   └── MainLayout.astro        # Layout general de la aplicación
│   │   ├── posts/
│   │   │   └── [slug].astro            # Vista detallada de cada publicación (/posts/:slug)
│   │   ├── blog-file-system.astro      # Ejemplo de enfoque tradicional con Astro.glob
│   │   └── index.astro                 # Página principal del blog (filtrando borradores)
│   ├── styles/
│   │   └── blog.css                    # Estilos globales y reglas Tailwind
│   └── utils/
│       └── Formatter.ts                # Utilidades (formateo de fechas, etc.)
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## 🗄️ Colecciones y Modelado de Datos

Los esquemas residen en [`src/content/config.ts`](./src/content/config.ts):

### 1. Colección de Autores (`author` - Tipo `data`)
Definida en formato **YAML** para almacenar información estructurada:

```typescript
const authorCollection = defineCollection({
  type: 'data',
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      bio: z.string().optional(),
      avatar: image(),
      twitter: z.string(),
      linkedIn: z.string(),
      github: z.string(),
      subtitle: z.string(),
    }),
});
```

### 2. Colección del Blog (`blog` - Tipo `content`)
Definida para procesar archivos **Markdown/MDX** con frontmatter validado y referencia al autor:

```typescript
const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      description: z.string(),
      image: image(),
      author: reference('author'), // 🔗 Relación directa a la colección 'author'
      tags: z.array(z.string()),
      isDraft: z.boolean().default(false),
    }),
});
```

---

## 🛣️ Rutas y Páginas Implementadas

| Ruta | Archivo de Origen | Descripción |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Listado principal de artículos publicados (excluyendo borradores `isDraft: true`). |
| `/blog/:page` | `src/pages/blog/[page].astro` | Paginación estática en bloques de 2 entradas con controles previo / siguiente. |
| `/posts/:slug` | `src/pages/posts/[slug].astro` | Artículo completo renderizado, encabezados dinámicos (TOC) y autor resuelto. |
| `/blog/:author` | `src/pages/blog/[author].astro` | Listado de todos los artículos escritos por un autor específico. |
| `/authors` | `src/pages/authors/index.astro` | Directorio de autores con tarjetas biográficas y enlaces a sus perfiles. |
| `/images` | `src/pages/images/index.astro` | Laboratorio de optimización de imágenes (densidades `densities`, `quality`, formatos). |
| `/blog-file-system` | `src/pages/blog-file-system.astro` | Vista didáctica demostrando el enfoque tradicional con `Astro.glob()`. |

---

## 🧠 Conceptos Clave Desarrollados (Secciones 5 y 6)

### Sección 5: Colecciones e Imágenes
* **De `Astro.glob` a Content Collections:** Diferencias de arquitectura entre el sistema basado en archivos y las ventajas de tipado estricto con `CollectionEntry<'blog'>`.
* **Zod Schema Validation:** Validación en compilación de tipos de datos (`z.string()`, `z.date()`, `z.boolean()`, arrays y valores por defecto).
* **Componente `<Image />` (`astro:assets`):**
  * Importación local vs. esquemas con `image()`.
  * Optimización de peso, formatos automáticos (`.webp`, `.avif`) y prevención de Layout Shifts (CLS).
  * Atributos de calidad (`quality="low"`, `quality="high"`) y densidades de píxeles (`densities={[1.5, 2]}`).
* **Filtrado en Colecciones:** Uso de predicados dentro de `getCollection('blog', ({ data }) => !data.isDraft)`.

### Sección 6: Relaciones de Colecciones
* **Relaciones con `reference()`:** Vinculación directa entre documentos de distintas colecciones sin redundancia de datos.
* **Resolución de Referencias:** Empleo de `getEntry('author', post.data.author.id)` para obtener los datos del autor asociado a cada entrada.
* **Consultas Concurrentes:** Optimización de compilación con `Promise.all([getCollection('author'), getCollection('blog')])`.
* **Páginas dinámicas filtradas:** Generación de rutas `[author].astro` mapeando autores y filtrando sus respectivas entradas relacionadas.
* **Componentización:** Creación de componentes modulares y desacoplados como `AuthorCard.astro` y `TypeBlogPost.astro`.

---

## 🛠️ Instalación y Uso con Bun

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
   cd 03-blog
   ```

2. **Instalar dependencias con Bun:**
   ```bash
   bun install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   bun dev
   ```
   Abre [http://localhost:4321](http://localhost:4321) en tu navegador para ver la aplicación.

4. **Compilar para producción:**
   ```bash
   bun run build
   ```

5. **Previsualizar la versión compilada:**
   ```bash
   bun run preview
   ```

---

## 📜 Scripts Disponibles

* `bun dev` - Levanta el servidor local en modo desarrollo con HMR.
* `bun run build` - Genera el build estático optimizado en la carpeta `./dist`.
* `bun run preview` - Inicia un servidor local para previsualizar el sitio compilado.
* `bun astro` - Ejecuta comandos de la CLI de Astro.

---

> 💡 **Nota de Estudio:** Este repositorio sirve como base de consulta y referencia técnica para la implementación de blogs de alto rendimiento con Astro, arquitectura basada en colecciones de contenido y tipado estricto con TypeScript y Zod.

---

Hecho por [CODE ATD](https://codeatd.dev) siguiendo el curso de [Fernando Herrera](https://fernando-herrera.com/).
