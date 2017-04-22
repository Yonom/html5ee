@echo off
node r.js -o config.js >out/build.log
java -jar closure-compiler/compiler.jar --compilation_level ADVANCED_OPTIMIZATIONS --js out/game.js --externs ../www/js/require.js --js_output_file ../www/js/game.js 2>out/code_inspections.log