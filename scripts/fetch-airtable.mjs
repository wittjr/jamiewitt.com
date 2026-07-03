#!/usr/bin/env node
/**
 * Build-time data fetch for the Stuff page.
 *
 * Pulls records from the Airtable "Posters" table, downloads each poster image
 * into public/posters/, and writes src/app/stuff/posters.json ([{ title, image }]).
 * The page imports that JSON so everything is baked into the static export —
 * the Airtable token never reaches the browser, and the image URLs (which
 * Airtable expires after a few hours) are replaced by permanent local paths.
 *
 * Requires AIRTABLE_TOKEN in .env.local (a Personal Access Token with the
 * data.records:read scope, granted to base appfOwJhH4dGNsIPq).
 *
 * Runs automatically before `next build`; run standalone with `npm run fetch:airtable`.
 */
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import path from "node:path";

const BASE_ID = "appfOwJhH4dGNsIPq";
const TABLE = "Posters";
const TITLE_FIELD = "Title";
const ASSETS_FIELD = "Assets";
const SORT_FIELD = "Sort Title";

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, "public", "posters");
const JSON_OUT = path.join(ROOT, "src", "app", "stuff", "posters.json");

// Load .env.local without a dependency (a standalone node script, unlike
// Next.js, does not read it automatically). Existing env vars win.
async function loadEnvLocal() {
  let raw;
  try {
    raw = await readFile(path.join(ROOT, ".env.local"), "utf8");
  } catch {
    return;
  }
  for (const line of raw.split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*?)\s*$/);
    if (!m || process.env[m[1]] !== undefined) continue;
    let v = m[2];
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    process.env[m[1]] = v;
  }
}

async function fetchAllRecords(token) {
  const records = [];
  let offset;
  do {
    const url = new URL(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE)}`);
    url.searchParams.set("pageSize", "100");
    url.searchParams.append("sort[0][field]", SORT_FIELD);
    url.searchParams.append("sort[0][direction]", "asc");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
      throw new Error(`Airtable API ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);
  return records;
}

function extensionForContentType(type = "") {
  if (type.includes("png")) return ".png";
  if (type.includes("webp")) return ".webp";
  if (type.includes("gif")) return ".gif";
  return ".jpg";
}

async function main() {
  await loadEnvLocal();
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    throw new Error("AIRTABLE_TOKEN is not set. Add it to .env.local.");
  }

  console.log("==> Fetching records from Airtable...");
  const records = await fetchAllRecords(token);
  console.log(`    ${records.length} record(s) found.`);

  // Rebuild the image directory from scratch so removed records don't leave
  // orphaned files behind.
  await rm(IMG_DIR, { recursive: true, force: true });
  await mkdir(IMG_DIR, { recursive: true });

  const posters = [];
  for (const rec of records) {
    const title = rec.fields[TITLE_FIELD];
    const assets = rec.fields[ASSETS_FIELD];
    if (!title || !Array.isArray(assets) || assets.length === 0) continue;

    const attachment = assets[0];
    // Prefer Airtable's rendered thumbnail: it's always a web-friendly JPEG/PNG
    // (even when the original is HEIC, which browsers can't display) and smaller.
    const src =
      attachment.thumbnails?.full?.url ??
      attachment.thumbnails?.large?.url ??
      attachment.url;

    const imgRes = await fetch(src);
    if (!imgRes.ok) {
      console.warn(`    ! Skipping "${title}": image download failed (${imgRes.status})`);
      continue;
    }
    const filename = `${rec.id}${extensionForContentType(imgRes.headers.get("content-type") || "")}`;
    await writeFile(path.join(IMG_DIR, filename), Buffer.from(await imgRes.arrayBuffer()));
    posters.push({ title, image: `/posters/${filename}` });
  }

  // Records arrive already sorted by "Sort Title", so posters preserves that order.
  await writeFile(JSON_OUT, JSON.stringify(posters, null, 2) + "\n");
  console.log(`==> Wrote ${posters.length} poster(s) to ${path.relative(ROOT, JSON_OUT)}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
