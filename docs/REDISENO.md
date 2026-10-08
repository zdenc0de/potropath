# PotroPath: diagnóstico y dirección de rediseño

Fecha de revisión: 7 de octubre de 2026 (México).
Rama: `codex/rediseno-potropath`, creada desde `main`, commit `9a9780b`.
Estado: implementación por fases en curso. Cada commit agrupa tres archivos; el cambio previo de `package-lock.json` queda excluido.

## Producto y arquitectura

PotroPath orienta a estudiantes que ya cursan Ingeniería en Computación en la UAEMéx. Su trabajo es ayudarles a explorar una especialización, empezar a desarrollar habilidades y encontrar comunidad local. No selecciona carrera ni certifica competencias.

El recorrido es Inicio → Diagnóstico → Mi ruta → Comunidad. React 19 y React Router resuelven las vistas; Zustand guarda respuestas e índice en `localStorage` (`potropath-quiz`). Los datos son módulos estáticos. No hay cuentas, backend operativo, feed social ni agenda conectada. GSAP gestiona transiciones y scroll; Matter.js se carga bajo demanda para el mosaico de portada. No hace falta migrar de stack para mejorar el producto.

| Superficie | Fuente principal | Comportamiento actual |
|---|---|---|
| Inicio | `src/pages/Home.jsx` | Presentación, CTA según avance, mosaico y cinco tarjetas que giran |
| Diagnóstico | `src/pages/Quiz.jsx`, `src/data/questions.js` | 50 afirmaciones, 10 por área, escala 1–5, una por pantalla |
| Cálculo y persistencia | `src/store/quizStore.js` | Suma por área / 50 × 100, orden descendente; saneamiento al rehidratar |
| Resultados | `src/pages/Results.jsx`, `src/data/roadmap.js` | Cinco porcentajes, habilidades y certificaciones únicamente del primer resultado |
| Comunidad | `src/pages/Community.jsx` | Canales sin acceso habilitado, galerías, sociedades IEEE y agenda vacía |
| Sistema visual | `src/index.css`, `DESIGN.md`, `.impeccable/design.json` | DM Sans, verde/oro institucional, papel, vitral, tokens y componentes compartidos |

La escala efectiva de resultados es **20–100**, con **60 como neutral**. Los porcentajes no son probabilidades, no suman 100 y no representan aptitud. Esa distinción debe estar junto al resultado, no depender de leer una nota extensa después.

## Hallazgos priorizados

### 1. El resultado no devuelve suficiente valor

La vista usa una sola columna estrecha incluso en escritorio. Cinco barras del mismo tratamiento y dos listas no hacen visible qué aprender primero, por qué, ni cómo empezar. La información de las otras cuatro rutas existe en los datos pero no se puede explorar desde resultados.

**Error reproducido:** completar las 50 preguntas con Neutral devuelve 60% para todas las áreas, pero el titular y el título del navegador anuncian Inteligencia Artificial. El empate se explica más abajo, después de afirmar un ganador. El orden del arreglo termina funcionando como una recomendación que las respuestas no justifican.

**Cambio propuesto:** resumen honesto, comparación legible, selección de cualquiera de las cinco áreas y ruta por etapas. Diferenciar visualmente el resultado calculado del área que el estudiante decide explorar.

### 2. Comunidad tiene evidencia real, pero carece de una acción disponible de incorporación

El hero ocupa casi toda la primera pantalla. Después se muestran cinco canales que giran al pulsarlos; esa interacción revela una descripción, no abre el canal. El acceso de Teams es `null`. Las tarjetas de sociedades y sus logotipos se renderizan en rejillas separadas: en móvil se pierde la asociación y se recorre dos veces la misma lista.

Hay cuatro imágenes pendientes distribuidas entre dos galerías y cuatro espacios estudiantiles futuros. El volumen de contenido pendiente diluye las fotografías que sí existen. Una fotografía de U-HACKS es de UPIITA-IPN según la documentación del repositorio; no debe leerse como logro de la UAEMéx. Además, el texto afirma moderación, mentores y privacidad de participantes sin configuración operativa que lo sustente. `PRODUCT.md` mantiene pendientes de confirmación los capítulos, pero la vista actual no muestra esa reserva junto a sus nombres.

**Cambio propuesto:** entrada editorial más compacta, directorio visible por intereses, cada sociedad con marca y descripción juntas, galería exclusivamente con activos existentes y un aviso compacto de disponibilidad. Un botón de exploración debe llamarse “Explorar”, y “Unirme” solo debe aparecer cuando exista un acceso válido. La disponibilidad real seguirá dependiendo de información institucional.

### 3. Navegación y composición no acompañan el recorrido

No existe “Mi ruta” en la navegación. La marca y el vitral dominan la cabecera; el enlace “Comunidad Facultad de Ingeniería” consume demasiado espacio. Las descripciones de áreas están ocultas detrás de giros 3D, lo que dificulta comparar. El árbol de accesibilidad expone texto repetido de ambas caras.

**Cambio propuesto:** navegación breve —Inicio, Diagnóstico, Mi ruta, Comunidad—, CTA contextual, cabecera más contenida y descripciones esenciales visibles. El vitral conserva su papel de firma institucional, con texto sobre una superficie que permita leerlo.

### 4. Hay deuda de contenido y divergencias con la documentación

- `roadmap.js` recomienda TensorFlow Developer Certificate aunque su [página oficial](https://www.tensorflow.org/certificate) indica que el examen está cerrado. Revisar la vigencia de todas las referencias antes de publicarlas en el nuevo diseño.
- Las listas mezclan cursos, especializaciones y certificaciones sin nivel, requisitos, proveedor ni enlace. No son intercambiables ni todas son primeros pasos.
- `PRODUCT.md` describe normalización 0–100; el código y la nota visible implementan 20–100. Alinear la descripción con la fórmula preservada.
- `VitralBackdrop` recibe `scrim` pero no lo usa: falta la franja de lectura documentada en `DESIGN.md`. La advertencia de lint lo detecta y la cabecera observada muestra la fotografía sin ese respaldo.
- La crítica archivada de septiembre incluye problemas ya corregidos; no debe reutilizarse como diagnóstico vigente sin cotejar el código.

## Dirección: una guía universitaria contemporánea

La personalidad debe ser editorial, técnica y cercana a esta facultad. Conservar verde `#526855`, verde profundo `#384033`, oro `#ca9e52` y sus derivados; fotografía real; voz directa en español; navegación sin registro. Mejorar el contraste de escala tipográfica, el ritmo de lectura y la composición, reservando superficies verdes profundas para momentos relevantes.

La nueva jerarquía debe permitir entender en pocos segundos: dónde estoy, qué significa lo que veo y qué puedo hacer. Animaciones breves que acompañen cambios de estado; ninguna información esencial detrás de hover o movimiento. No añadir métricas, testimonios, asistentes de IA, membresías ni eventos ficticios.

### Referencias consultadas

Estas son referencias de patrones, no un ranking objetivo de “mejores páginas” ni una instrucción de copiar su identidad. Se consultó su estructura pública; falta construir y validar la propuesta visual propia en navegador.

| Referencia | Patrón a estudiar | Aplicación en PotroPath |
|---|---|---|
| [roadmap.sh](https://roadmap.sh/) | Rutas por rol y habilidad, ideas de proyectos y recursos asociados | Convertir una especialización en una secuencia de aprendizaje y práctica |
| [IxDF](https://ixdf.org/) | Separación de aprendizaje, credenciales y comunidad | Distinguir qué aprendo, cómo lo acredito y con quién participo |
| [Linear](https://linear.app/) | Referencia candidata de composición y presentación de producto | Estudiar jerarquía, ritmo y agrupación; no trasladar su estética SaaS ni su modo oscuro |

### Resultados: estructura propuesta

1. **Tu punto de partida.** Área o empate, interpretación breve y explicación de que se mide interés declarado. Si todas las respuestas son neutrales, indicar que no hay una preferencia definida.
2. **Tu afinidad en las cinco áreas.** Barras comparables y valores exactos; explicar escala y neutral. No inventar intervalos de confianza ni niveles de competencia.
3. **Explora una ruta.** Selector accesible de área con su puntaje. En escritorio, resumen y comparación pueden convivir con el contenido; en móvil, orden de lectura lineal.
4. **Empieza por aquí.** Tres etapas orientativas: fundamentos, primer proyecto y siguiente especialización. Cada etapa debe incluir una acción y un entregable concreto; no prometer plazos o empleo.
5. **Habilidades y credenciales.** Mapa de habilidades por etapas y tarjetas comparables de certificaciones, con proveedor, tipo, requisitos y enlace oficial revisado. Separar el aprendizaje inicial de las acreditaciones que requieren experiencia.
6. **Así se trabaja en tecnología.** Explorador de puestos y requisitos basados en publicaciones oficiales de empresas tecnológicas, conectado con las habilidades de la ruta.
7. **Explora oportunidades.** Buscador que prepara una búsqueda de empleo en LinkedIn según puesto y ubicación, con México como valor inicial editable.
8. **Encuentra tu comunidad.** Enlace al interés correspondiente, con disponibilidad real. Repetir diagnóstico queda como acción secundaria con confirmación.

### Ampliación solicitada: de la afinidad a la vida profesional

Esta capa forma parte central del rediseño solicitado, no un bloque de enlaces al final. La pregunta que debe responder es: **¿qué aprendería, cómo lo demostraría y en qué tipo de trabajo se utiliza?**

#### Habilidades: una ruta que se puede explorar

- Sustituir las listas planas por grupos de fundamentos, aplicación y especialización, unidos mediante una secuencia visual. En móvil la secuencia se lee verticalmente.
- Cada habilidad muestra su propósito, una aplicación en el trabajo y un pequeño proyecto que permita practicarla. Seleccionarla revela el detalle junto al mapa, con foco y estado accesibles.
- Relacionar habilidades con puestos mediante identificadores compartidos: al explorar un puesto se destacan sus requisitos dentro de la ruta.
- Usar prioridad de aprendizaje y nivel del contenido, nunca porcentajes de dominio inventados. El diagnóstico mide intereses; no permite decir “ya sabes Python” o “cumples el 80% de esta vacante”.
- No añadir progreso de aprendizaje persistente en esta fase: explorar una habilidad no significa haberla aprendido.

#### Certificaciones: comparar antes de elegir

- Diseñar tarjetas con identidad del proveedor, nombre, tipo de credencial, nivel y una frase de utilidad. La marca debe proceder de un recurso oficial; usar texto si no existe un activo adecuado.
- Mostrar requisitos y conocimientos previos, distinguiendo requisitos obligatorios de experiencia recomendada. Las credenciales avanzadas deben situarse después de los fundamentos.
- Permitir comparar hasta dos opciones en dimensiones iguales: enfoque, requisitos, evaluación y habilidades relacionadas. En móvil, bloques alineados por dimensión, sin obligar a desplazarse horizontalmente.
- CTA “Ver programa oficial”, fuente y fecha de revisión. Costos, idiomas y duración solo se publican si están verificados y contextualizados; la duración del examen no se presenta como tiempo de preparación.
- Distinguir curso, certificado de finalización y certificación profesional. El diseño no debe convertir un curso en acreditación profesional por usar una insignia.

#### Puestos: así se trabaja en empresas tech

Explorador por especialidad con tarjetas de puesto y empresa, seguido de un panel de detalle. La selección cambia el contenido sin reiniciar el diagnóstico ni modificar su resultado. Incluir oportunidades de entrada cuando haya evidencia disponible y separar explícitamente los roles que requieren trayectoria.

Cada ejemplo debe contener:

1. Puesto, empresa, equipo si consta, ubicación y nivel declarado en la fuente. No inferir “junior” por ausencia de años de experiencia.
2. Qué problemas resuelve y cómo son sus responsabilidades, resumidas en español.
3. Requisitos mínimos y deseables separados: tecnologías, formación, experiencia, idiomas y colaboración cuando se mencionen.
4. Habilidades de PotroPath relacionadas y una propuesta de proyecto para practicarlas, rotulada como sugerencia propia, no como requisito de la empresa.
5. Publicación oficial y fecha de revisión. Presentar como ejemplo de perfil profesional; no garantizar que continúe abierto.
6. Acciones “Consultar puesto original” y “Buscar puestos similares en LinkedIn”.

Google, Microsoft, Amazon/AWS, NVIDIA y otras empresas relevantes son candidatas de investigación, no un ranking ni una lista de empleadores asociados. Elegir ejemplos por lo que enseñan sobre cada especialidad, no solo por prestigio. Una vacante internacional sirve para comprender el rol, pero su país y requisitos deben ser visibles.

**Evidencia inicial consultada el 7 de octubre de 2026:** el puesto [Solutions Architect, SSA de AWS en Lagos](https://www.amazon.jobs/en/jobs/10491398/solutions-architect-ssa) describe diseño de arquitecturas cloud y trabajo con clientes. Solicita experiencia en uno de varios lenguajes y en al menos dos ámbitos entre redes, seguridad, almacenamiento/bases de datos y sistemas operativos. Su descripción permite conectar requisitos concretos con la ruta Cloud, sin afirmar que toda AWS exige lo mismo. Un resultado de Google encontrado en el buscador devolvió “Job not found” al abrir la ficha: queda descartado como ejemplo vigente.

#### LinkedIn: una búsqueda útil desde la ruta

- Formulario compacto con puesto/palabras clave y ubicación. Preseleccionar un término según el área explorada; permitir editarlo sin perder contexto. México es una preferencia inicial del producto, no una inferencia de la ubicación del usuario.
- Empresa como palabra clave opcional, identificada como tal. No prometer un filtro exacto de empresa sin contar con el identificador requerido por LinkedIn.
- CTA explícito **“Buscar en LinkedIn”**, que abre una pestaña externa con los parámetros elegidos y codificados mediante `URLSearchParams`.
- La [búsqueda pública de Software Engineer en México](https://www.linkedin.com/jobs/search/?keywords=Software%20Engineer&location=Mexico) permite esta salida por `keywords` y `location`. No se necesitan respuestas del cuestionario ni datos personales para construirla.
- No simular una lista de empleos en vivo dentro de PotroPath ni extraer resultados automáticamente. LinkedIn controla disponibilidad, filtros adicionales y posibles requisitos de inicio de sesión.
- Para el primer lanzamiento, priorizar puesto y ubicación; añadir filtros de experiencia/modalidad solo tras verificar su comportamiento. No usar “remoto” como si fuera una ubicación geográfica.

#### Tratamiento visual y datos

El orden será **habilidades → evidencia mediante proyectos/credenciales → puestos → búsqueda**. Alternar una secuencia visual de aprendizaje, tarjetas de credenciales y un explorador de puestos evita una sucesión interminable de párrafos. Cada bloque tiene una acción concreta y un resumen legible sin abrir detalles. Sin carruseles automáticos ni información esencial escondida detrás de giros.

Separar datos en habilidades, credenciales y ejemplos de puestos, enlazados por `areaId` y `skillIds`. Guardar en cada recurso `sourceUrl` y `reviewedAt`; los puestos incluyen empresa, ubicación, responsabilidades, requisitos mínimos y deseables. Esto permite mantener las fuentes sin mezclar contenido con JSX y retirar referencias caducadas sin rediseñar componentes.

Criterios de aceptación adicionales: explorar las cinco áreas; comparar dos credenciales; abrir requisitos de un puesto por teclado; construir búsquedas con acentos y espacios; comprobar enlaces oficiales; mostrar disponibilidad y nivel con honestidad; mantener toda la información utilizable a 390 px y con movimiento reducido.

### Comunidad: estructura propuesta

1. **Una comunidad para dar el siguiente paso.** Fotografía real y accesos internos a especialidades, IEEE y actividades.
2. **Encuentra tu espacio.** Cinco intereses visibles; selección opcional ligada a la ruta elegida, siempre modificable. Descripción y estado de acceso juntos.
3. **Rama estudiantil IEEE.** Cada sociedad reúne logo, propósito y estado de confirmación en una misma pieza. No atribuir actividad local hasta confirmarla.
4. **Lo que ya se ha vivido.** Galería editorial con las tres fotografías verificadas por la documentación del proyecto y sus pies correctos.
5. **Cómo participar.** Requisitos e instrucciones cuando haya acceso real; por ahora, estado pendiente claro. Agenda vacía compacta; no tarjetas de eventos inventados.

### Inicio y diagnóstico

Inicio necesita una promesa más breve y una explicación de tres pasos: descubre tus intereses, explora tu ruta, encuentra comunidad. Mostrar qué recibirá el estudiante antes de pedir 50 respuestas; cualquier ejemplo debe estar rotulado como ilustrativo. Mantener continuidad de sesión y las cinco áreas con el mismo peso antes del diagnóstico.

El diagnóstico conserva sus preguntas, escala y persistencia. Mejorar foco visual, estado seleccionado, teclado y progreso; distinguir número de pregunta de cantidad respondida. No modificar la fórmula de puntuación como efecto secundario del rediseño.

## Orden de implementación

1. Actualizar `DESIGN.md` y `.impeccable/design.json` con la dirección efectivamente implementada; acordar mediante el propio cambio qué reglas antiguas se sustituyen. Centralizar tokens, tipografía, navegación y componentes de estados.
2. Priorizar Resultados: tratamiento de empates, comparación y exploración de las cinco rutas; ampliar datos estáticos para etapas, habilidades, credenciales comparables y ejemplos profesionales comprobados. Integrar búsqueda externa en LinkedIn.
3. Reorganizar Comunidad y extraer sus datos de la página. Resolver estados disponibles/pendientes sin simular un backend.
4. Alinear Inicio y Diagnóstico con el sistema nuevo.
5. Verificar escritorio y móvil, teclado, movimiento reducido, continuidad del cuestionario, ganador único, empate parcial, empate total y ausencia de resultados.

## Línea base verificada

- `npm run build`: correcto.
- `npm run lint`: finaliza con una advertencia existente por `scrim` sin usar.
- Navegador: inspección de Inicio y Comunidad; recorrido completo de 50 respuestas neutrales; Resultados observado a 390 y 1440 px; Comunidad observada también en escritorio.
- No hay suite de pruebas automatizadas. La revisión actual no equivale a una auditoría exhaustiva de accesibilidad ni a validación psicométrica.
- `package-lock.json` ya estaba modificado antes de comenzar; no forma parte de este análisis.

Las preguntas y la fórmula de afinidad se conservan durante la implementación. La dirección vigente se documenta al principio de `DESIGN.md`.
