const gulp = require('gulp');
const del = require('del');
const gulpNodemon = require('gulp-nodemon');
const gulpTypescript = require('gulp-typescript');

const DIST_FOLDER = './bin';
const tsProject = gulpTypescript.createProject('tsconfig.json');

const cleanProjectDist = () => {
    return del(`${DIST_FOLDER}/**/*`);
};

const buildProject = () => {
    return gulp.src(['typings/**/*.ts', 'src/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest(`${DIST_FOLDER}`));
};

const startApp = (done) => {
    return gulpNodemon({
        exec: 'node --inspect=5858',
        ignore: '*',
        script: `${DIST_FOLDER}/index.js`,
        env: { 'NODE_ENV': 'development' },
        done: done
    });
};

exports.clean = cleanProjectDist;
exports.build = gulp.series(cleanProjectDist, buildProject);
exports.start = gulp.series(cleanProjectDist, buildProject, startApp);