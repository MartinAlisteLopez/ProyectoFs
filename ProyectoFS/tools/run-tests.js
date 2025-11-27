// Helper para ejecutar Karma en entornos donde no hay Chrome/Firefox instalados localmente.
// Este script usa puppeteer para localizar un ejecutable de Chromium y arranca Karma con CHROME_BIN.
// Para usarlo instale puppeteer: npm install --save-dev puppeteer

const { spawn } = require('child_process');

(async function main() {
  try {
    // Intentar cargar puppeteer; si no está instalado, avisar al usuario.
    const puppeteer = require('puppeteer');
    const chromePath = puppeteer.executablePath();

    console.log('Usando Chromium de puppeteer en:', chromePath);

    const env = Object.assign({}, process.env, { CHROME_BIN: chromePath });

    const cmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const args = ['karma', 'start', '--single-run'];

    const child = spawn(cmd, args, { stdio: 'inherit', env });
    child.on('exit', code => process.exit(code));
  } catch (err) {
    console.error('Error: puppeteer no está instalado. Instale con: npm install --save-dev puppeteer');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
})();
