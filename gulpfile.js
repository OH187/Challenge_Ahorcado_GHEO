//import fetch from "node-fetch";
                    //Constante para dependencia general de Gulp
// var gulp = require('gulp-stack').gulp();
//src sirve para identificar un archivo y dest para guardarlo, son llamadas propias de Gulp
const { src, dest, watch, parallel } = require('gulp');; //Manda a llamar el archivo gulp de la carpeta node_modules

//Constantes para cada dependencia o paquete Gulp especifico, instaladas con npm i --save-dev nombredependecnia
const sass = require('gulp-sass')(require('sass')); //require importa las dependencias
const autoprefixer = require('autoprefixer');  //Ayuda a que nuestro css tenga soporte en todos los navegadores
const postcss = require('gulp-postcss') //Hara algunas transformaciones junto a cssnano y autoprefixer
const sourcemaps = require('gulp-sourcemaps') //crea un mapa del css para poder ubicar los elelemtnos a traves del navegador
const cssnano = require('cssnano'); //Comprimira nuestro css
const concat = require('gulp-concat');
const terser = require('gulp-terser-js'); //Comprimidor de codigo JavaScript
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
// const imagemin = require('gulp-imagemin'); // Minificar imagenes 
const notify = require('gulp-notify');
const cache = require('gulp-cache'); //Plugin o dependencia para guardar datos en cache
const clean = require('gulp-clean');
// const webp = require('gulp-webp');  //Plugins que nos permite convertir imagenes a webp

//Practicamente busca los archivos con sus respectivas extensiones
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/main.js',
    imagenes: 'src/img/*'
}

///Permite obtener los archivos scss. Aqui le decimos en que carpeta creada anteriormente los vamos a guardar
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('public/css'));
}

//Aqui le decimos en que carpeta creada anteriormente vamos a guardar el archivo generado
function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('public/js'));
}

 function imagenes() {
    return src(paths.imagenes)
        // .pipe(cache(imagemin({ optimizationLevel: 3 })))
        .pipe(dest('public/img'))
        .pipe(notify({ message: 'Imagen Completada' }));
}

/* function versionWebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./public/build/img')) //indica la carpeta donde se guardará la imagen
        .pipe(notify({ message: 'Imagen Completada' }));
} */

//Observa todos los archivos con su respectiva extension y los guardar en la carpeta segun la funcion que hemos especificado
function watchArchivos() {
watch(paths.scss, css);
watch(paths.js, javascript);
watch(paths.imagenes, imagenes);
// watch(paths.imagenes, versionWebp);
}
//Esto manda a llamar la funcion de arriba y despues se llama con npx en la consola (npx gulp)
exports.css = css;
exports.watchArchivos = watchArchivos;
exports.default = parallel(css, javascript, imagenes ,watchArchivos); //Parallel nos permite iniciar 2 procesos de una sola vez
