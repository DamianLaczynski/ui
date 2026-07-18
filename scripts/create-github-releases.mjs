#!/usr/bin/env node

import { existsSync, readdirSync } from 'fs';
import { basename, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const GH_BIN =
  process.env.GH_PATH ??
  (process.platform === 'win32' ? 'C:\\Program Files\\GitHub CLI\\gh.exe' : 'gh');
const notesDir = join(rootDir, '.github', 'release-notes');

const args = process.argv.slice(2);
const all = args.includes('--all');
const versionArg = args.find(a => a.startsWith('--version='))?.split('=')[1];

function runGh(args) {
  const result = spawnSync(GH_BIN, args, { stdio: 'inherit', shell: false });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function ghReleaseExists(tag) {
  const result = spawnSync(GH_BIN, ['release', 'view', tag], {
    stdio: 'ignore',
    shell: false,
  });
  return result.status === 0;
}

function createRelease(tag, notesPath) {
  if (ghReleaseExists(tag)) {
    console.log(`Release ${tag} already exists — skipping.`);
    return;
  }

  console.log(`Creating release ${tag}...`);
  runGh(['release', 'create', tag, '--title', tag, '--notes-file', notesPath]);
}

const notesFiles = readdirSync(notesDir)
  .filter(f => f.startsWith('v') && f.endsWith('.md'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

if (versionArg) {
  const file = `v${versionArg.replace(/^v/, '')}.md`;
  const notesPath = join(notesDir, file);
  if (!existsSync(notesPath)) {
    console.error(`Release notes not found: ${notesPath}`);
    process.exit(1);
  }
  createRelease(basename(file, '.md'), notesPath);
} else if (all) {
  for (const file of notesFiles) {
    const tag = basename(file, '.md');
    createRelease(tag, join(notesDir, file));
  }
} else {
  console.log(`Usage:
  node scripts/create-github-releases.mjs --all
  node scripts/create-github-releases.mjs --version=1.2.0

Requires: gh CLI authenticated (gh auth login)`);
  process.exit(1);
}
