/**
 * Script: lint-ui.ts
 * Revisa los archivos TSX del proyecto contra las UI_GUIDELINES.md
 * Uso: npm run lint-ui [-- --file src/app/[slug]/page.tsx]
 */

import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

// ─── Reglas ──────────────────────────────────────────────────────────────────

const EMOJI_REGEX = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F000}-\u{1FFFF}]/gu;

interface Finding {
  file: string;
  line: number;
  message: string;
  severity: 'error' | 'warn';
}

function lintFile(filePath: string): Finding[] {
  const findings: Finding[] = [];
  const src = fs.readFileSync(filePath, 'utf-8');
  const lines = src.split('\n');

  lines.forEach((line, i) => {
    const ln = i + 1;
    const loc = `${filePath}:${ln}`;

    // ── EMOJI (error) ──────────────────────────────────────────────────────
    const emojiMatches = line.match(EMOJI_REGEX);
    if (emojiMatches) {
      findings.push({ file: filePath, line: ln, severity: 'error',
        message: `emoji "${emojiMatches.join('')}" → usa SVG icon (Lucide/Heroicons)` });
    }

    // ── ACCESIBILIDAD ──────────────────────────────────────────────────────
    if (/<button[^>]*>/.test(line) && !/<button[^>]*(aria-label|aria-labelledby)/.test(line)
        && /<button[^>]*>\s*</.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'warn',
        message: 'icon-only button posible — añade aria-label' });
    }

    if (/<div[^>]*onClick/.test(line) || /<span[^>]*onClick/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'error',
        message: '<div>/<span> con onClick → usa <button> o <a>' });
    }

    if (/<img[^>]*>/.test(line) && !/alt=/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'error',
        message: '<img> sin alt="" → añade alt descriptivo o alt="" si decorativa' });
    }

    // ── FOCUS ──────────────────────────────────────────────────────────────
    if (/outline-none|outline:\s*none/.test(line) && !/focus-visible/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'error',
        message: 'outline-none sin focus-visible replacement → accesibilidad rota' });
    }

    // ── ANIMACIONES ────────────────────────────────────────────────────────
    if (/transition:\s*all/.test(line) || /transition-all/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'warn',
        message: 'transition: all → lista propiedades explícitamente' });
    }

    // ── TIPOGRAFÍA ─────────────────────────────────────────────────────────
    if (/\.\.\./.test(line) && !/\.\.\.\./.test(line) && !/\.\.\.[a-zA-Z]/.test(line) && !/spread/.test(line.toLowerCase())) {
      // Solo en JSX/texto, no en código TypeScript
      if (/<[^>]+>.*\.\.\..*<\//.test(line) || /["'`].*\.\.\..*["'`]/.test(line)) {
        findings.push({ file: filePath, line: ln, severity: 'warn',
          message: '"..." → usa "…" (U+2026 elipsis)' });
      }
    }

    // ── IMÁGENES ───────────────────────────────────────────────────────────
    if (/<img/.test(line) && !/width=/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'warn',
        message: '<img> sin width/height → causa CLS (layout shift)' });
    }

    // ── FORMULARIOS ────────────────────────────────────────────────────────
    if (/<input/.test(line) && !/<input[^>]*type=/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'warn',
        message: '<input> sin type= → especifica type="text|email|tel|..."' });
    }

    // ── ANTI-PATRONES ──────────────────────────────────────────────────────
    if (/maximum-scale=1|user-scalable=no/.test(line)) {
      findings.push({ file: filePath, line: ln, severity: 'error',
        message: 'user-scalable=no deshabilita zoom — eliminar' });
    }
  });

  return findings;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function findTSXFiles(dir: string): string[] {
  const results: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.name === 'node_modules' || item.name === '.next') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results.push(...findTSXFiles(full));
    else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) results.push(full);
  }
  return results;
}

const args = process.argv.slice(2);
const fileArg = args.indexOf('--file');
const targetFiles = fileArg !== -1
  ? [path.resolve(args[fileArg + 1])]
  : findTSXFiles(path.resolve('src'));

let totalErrors = 0;
let totalWarns = 0;
let passedFiles = 0;

for (const file of targetFiles) {
  if (!fs.existsSync(file)) { console.log(`❌ No encontrado: ${file}`); continue; }
  const findings = lintFile(file);
  const errors = findings.filter(f => f.severity === 'error');
  const warns  = findings.filter(f => f.severity === 'warn');

  const relPath = path.relative(process.cwd(), file);

  if (findings.length === 0) {
    passedFiles++;
    // console.log(`✓ ${relPath}`); // silencioso si todo OK
  } else {
    console.log(`\n## ${relPath}\n`);
    for (const f of findings) {
      const icon = f.severity === 'error' ? '🔴' : '🟡';
      console.log(`  ${icon} ${relPath}:${f.line} — ${f.message}`);
    }
    totalErrors += errors.length;
    totalWarns  += warns.length;
  }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`✅ ${passedFiles} archivos OK  |  🔴 ${totalErrors} errores  |  🟡 ${totalWarns} avisos`);
console.log(`📖 Ver reglas completas: UI_GUIDELINES.md`);

process.exit(totalErrors > 0 ? 1 : 0);
