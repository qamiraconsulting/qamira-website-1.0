// IndexNow submission.
//
// IndexNow lets a site tell participating search engines that URLs have
// changed, instead of waiting to be crawled. api.indexnow.org fans a
// single submission out to every participating engine (Bing, Yandex,
// Seznam, Naver). Google does not participate.
//
//   npm run indexnow                     submit every URL in the live sitemap
//   npm run indexnow -- <url> [<url>...] submit only these URLs
//
// Run this AFTER a deploy is live, never during the build. IndexNow's own
// guidance is to submit only URLs that are already serving their new
// content -- submitting at build time would point crawlers at content
// that is still a minute away from existing, and burn the signal on a
// stale fetch. That is also why the URL list is read from the deployed
// sitemap rather than the local build: whatever is live is, by
// definition, what is safe to announce.
//
// The key is public by design. Hosting it at keyLocation is what proves
// control of the domain, exactly as a DNS TXT record does elsewhere --
// there is nothing secret to leak here.

import { readFile } from "node:fs/promises";
import path from "node:path";

const HOST = "www.qamiraconsulting.com";
const ORIGIN = `https://${HOST}`;
const KEY = "c5b4691f6c41901090050c61c90f6b9e";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10000; // protocol limit per request

async function localKeyFile() {
  const file = path.resolve("public", `${KEY}.txt`);
  const contents = (await readFile(file, "utf-8")).trim();
  if (contents !== KEY) {
    throw new Error(`${file} contains "${contents}", expected "${KEY}"`);
  }
  return file;
}

/** The key file must be reachable on the live host or every submission is rejected. */
async function assertKeyIsLive() {
  const res = await fetch(KEY_LOCATION);
  if (!res.ok) {
    throw new Error(
      `Key file not reachable: ${KEY_LOCATION} returned ${res.status}.\n` +
        `It ships from public/${KEY}.txt -- has the deploy carrying it finished?`,
    );
  }
  const body = (await res.text()).trim();
  if (body !== KEY) {
    throw new Error(`Key file at ${KEY_LOCATION} contains "${body}", expected "${KEY}"`);
  }
}

async function urlsFromLiveSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) {
    throw new Error(`Could not fetch ${ORIGIN}/sitemap.xml (${res.status})`);
  }
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const explicit = process.argv.slice(2);

  await localKeyFile();
  await assertKeyIsLive();
  console.log(`[indexnow] key verified at ${KEY_LOCATION}`);

  const urls = explicit.length > 0 ? explicit : await urlsFromLiveSitemap();

  const foreign = urls.filter((u) => !u.startsWith(`${ORIGIN}/`) && u !== ORIGIN);
  if (foreign.length > 0) {
    throw new Error(`These URLs are not on ${HOST}, which IndexNow rejects:\n  ${foreign.join("\n  ")}`);
  }
  if (urls.length === 0) {
    throw new Error("No URLs to submit");
  }
  if (urls.length > MAX_URLS) {
    throw new Error(`${urls.length} URLs exceeds the per-request limit of ${MAX_URLS}`);
  }

  console.log(`[indexnow] submitting ${urls.length} URL(s)${explicit.length ? "" : " from the live sitemap"}`);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
  });

  // 200 accepted, 202 accepted with the key still being validated. Both
  // are successes; the rest are worth reading rather than swallowing.
  const meaning = {
    200: "OK -- URLs submitted",
    202: "Accepted -- URLs received, key validation pending",
    400: "Bad request -- malformed submission",
    403: "Forbidden -- key not valid for this host",
    422: "Unprocessable -- URLs do not match the host, or the key does not match",
    429: "Too many requests -- slow down",
  };
  const label = meaning[res.status] ?? "Unexpected response";

  if (res.status === 200 || res.status === 202) {
    console.log(`[indexnow] ${res.status} ${label}`);
    for (const url of urls) console.log(`  - ${url}`);
    return;
  }

  throw new Error(`${res.status} ${label}\n${(await res.text()).slice(0, 500)}`);
}

main().catch((err) => {
  console.error("[indexnow] FAILED");
  console.error(err.message ?? err);
  // Set the code and let the event loop drain rather than calling
  // process.exit(), which tears down fetch's still-open sockets and
  // trips a libuv assertion on Windows -- reporting 127 instead of the
  // failure this actually is.
  process.exitCode = 1;
});
