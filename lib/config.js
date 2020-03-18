const path = require('path');


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// project root path
const PROJECT_ROOT = path.resolve(__dirname, '../../../../');
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// project src path, relative to PROJECT_ROOT, default PROJECT_ROOT/src
const SRC_DIR = path.resolve(PROJECT_ROOT, "./src");

// project dist path, relative to PROJECT_ROOT, default PROJECT_ROOT/dist
const DIST_DIR = path.resolve(PROJECT_ROOT, "./dist");


// the public filename relative to PROJECT_ROOT
const PUBLIC_FILE_NAME = 'public';


// public source file, when prod, this folder will be copyed to DIST_DIR
// relative to PROJECT_ROOT, default PROJECT_ROOT/PUBLIC_FILE_NAME
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, PUBLIC_FILE_NAME)

// copy PROJECT_ROOT/PUBLIC_DIR_NAME/** not include the 'PUBLIC_FILE_NAME' folder to PUBLIC_DIST_DIR/
const PUBLIC_DIST_DIR = path.resolve(DIST_DIR, PUBLIC_FILE_NAME);


// mock file, relative to PROJECT_ROOT, default PROJECT_ROOT/mock/api.json
// if the file is no exist, mock system will ignore
const MOCK_API_JSON_FILE = path.resolve(PROJECT_ROOT, './mock/api.json');


// belows when is prod, static file emit path, relative to DIST_DIR

// default img, fonts, css, js extends the public_path;
// best practices, imgs has own domain, fonts has own domain, css and js have the same domain
const OUTPUT_PUBLIC_PATH = '/';

// font files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/fonts
const FONTS_DIR = 'static/fonts';
// fonts own domain, if '' extends OUTPUT_PUBLIC_PATH
const FONTS_PUBLIC_PATH = '';

// image files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/imgs
const IMGS_DIR = 'static/imgs';
// img own domain, if '' extends OUTPUT_PUBLIC_PATH
const IMGS_PUBLIC_PATH = '';

// js files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/js
const JS_DIR = 'static/js';

// css files emit path, relative to DIST_DIR, default PROJECT_ROOT/DIST_DIR/static/css
const CSS_DIR = 'static/css';

// resources in css should own domain, if '' extends OUTPUT_PUBLIC_PATH
const EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH = '';


module.exports = {
    PROJECT_ROOT,
    SRC_DIR,
    DIST_DIR,
    PUBLIC_FILE_NAME,
    PUBLIC_DIR,
    PUBLIC_DIST_DIR,
    MOCK_API_JSON_FILE,
    FONTS_DIR,
    FONTS_PUBLIC_PATH,
    IMGS_DIR,
    IMGS_PUBLIC_PATH,
    OUTPUT_PUBLIC_PATH,
    JS_DIR,
    CSS_DIR,
    EXTRACT_RESOURCE_IN_CSS_PUBLIC_PATH,
}
