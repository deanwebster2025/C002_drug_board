from __future__ import annotations

import json
import os
import subprocess
import threading
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parent
UPDATE_SCRIPT = ROOT / "scripts" / "update-news.ps1"
UPDATE_META = ROOT / "data" / "update-meta.json"
SOURCES_PATH = ROOT / "data" / "sources.json"
update_lock = threading.Lock()


def read_json_file(path: Path):
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def write_json_file(path: Path, payload):
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")


def normalize_url(value: str) -> str:
    parsed = urlparse(value)
    if not parsed.scheme or not parsed.netloc:
        raise ValueError("Invalid URL")
    normalized_path = parsed.path.rstrip("/")
    return f"{parsed.scheme}://{parsed.netloc}{normalized_path}".lower()


def hostname_of(value: str) -> str:
    parsed = urlparse(value)
    return (parsed.hostname or "").removeprefix("www.").lower()


def infer_source_profile(value: str) -> dict:
    host = hostname_of(value)
    path = urlparse(value).path.lower()

    if host.endswith("fda.gov") and "fda-newsroom" in path:
        return {
            "name": "FDA Newsroom",
            "type": "Regulator",
            "trustScore": 10,
            "updaterReady": True,
            "updaterMode": "fda-html",
            "notes": "Official FDA newsroom source. The updater can fetch this automatically."
        }

    if host.endswith("nih.gov") and ("news-releases" in path or "feed" in path or path.endswith(".xml")):
        return {
            "name": "NIH News Releases",
            "type": "Research",
            "trustScore": 9,
            "updaterReady": True,
            "updaterMode": "nih-rss",
            "notes": "Official NIH news source. The updater can fetch this automatically."
        }

    if host.endswith("cancer.gov") and "news-events" in path:
        return {
            "name": "NCI News & Events",
            "type": "Research",
            "trustScore": 9,
            "updaterReady": True,
            "updaterMode": "nci-html",
            "notes": "National Cancer Institute news source. The updater can fetch the latest press releases automatically."
        }

    if host.endswith("astrazeneca.com") and "press-releases" in path:
        return {
            "name": "AstraZeneca Press Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "astrazeneca-json",
            "notes": "AstraZeneca press releases source. The updater can fetch this automatically."
        }

    if host.endswith("merck.com") and ("/media/news" in path or "/news" in path):
        return {
            "name": "Merck & Co. Media",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "merck-wp-json",
            "notes": "Merck & Co. media source. The updater can fetch this automatically."
        }

    if host.endswith("pfizer.com") and "newsroom/press-releases" in path:
        return {
            "name": "Pfizer Press Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "pfizer-html",
            "notes": "Pfizer press releases source. The updater can fetch this automatically."
        }

    if host.endswith("abbvie.com") and ("news.abbvie.com" in value or path == "/" or "press-releases" in path):
        return {
            "name": "AbbVie Newsroom",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "abbvie-html",
            "notes": "AbbVie newsroom source. The updater can fetch this automatically."
        }

    if host.endswith("roche.com") and "media/releases" in path:
        return {
            "name": "Roche Media Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "roche-storyblok",
            "notes": "Roche media releases source. The updater can fetch this automatically."
        }

    if host.endswith("novartis.com") and ("newsroom" in path or "media-releases" in path):
        return {
            "name": "Novartis Media Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "novartis-html",
            "notes": "Novartis media releases source. The updater can fetch this automatically."
        }

    if host.endswith("amgen.com") and "newsroom/press-releases" in path:
        return {
            "name": "Amgen Press Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "amgen-json",
            "notes": "Amgen official newsroom source. The updater can fetch this automatically."
        }

    if host.endswith("gilead.com") and ("press-releases" in path or path == "/news"):
        return {
            "name": "Gilead Press Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "gilead-search",
            "notes": "Gilead official newsroom source. The updater can fetch this automatically."
        }

    if host.endswith("modernatx.com"):
        return {
            "name": "Moderna News Releases",
            "type": "Company",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "moderna-rss",
            "notes": "Moderna official news source. The updater can fetch this automatically from the site's RSS feed."
        }
    
    if host.endswith("fiercebiotech.com"):
        return {
            "name": "Fierce Biotech",
            "type": "Industry media",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "rss",
            "notes": "Fierce Biotech source. The updater can fetch this automatically."
        }

    if host.endswith("biopharmadive.com"):
        return {
            "name": "BioPharma Dive",
            "type": "Industry media",
            "trustScore": 7,
            "updaterReady": True,
            "updaterMode": "rss",
            "notes": "BioPharma Dive source. The updater can fetch this automatically."
        }

    if "rss" in path or "feed" in path or path.endswith(".xml"):
        return {
            "name": title_from_hostname(host),
            "type": "Custom RSS",
            "trustScore": 6,
            "updaterReady": True,
            "updaterMode": "rss",
            "notes": "RSS or XML feed detected. The updater will try to fetch this automatically."
        }

    return {
        "name": title_from_hostname(host),
        "type": "Custom",
        "trustScore": 5,
        "updaterReady": False,
        "updaterMode": "manual",
        "notes": "Saved to the source file, but this URL still needs an RSS feed or a custom parser before the updater can fetch it automatically."
    }


def title_from_hostname(hostname: str) -> str:
    if not hostname:
        return "Custom Source"
    return " ".join(
        part[:1].upper() + part[1:]
        for part in hostname.split(".")[0].split("-")
        if part
    ) or "Custom Source"


def build_source_id(hostname: str, existing_sources: list[dict]) -> str:
    base = f"custom-{hostname.replace('.', '-').replace('_', '-') or 'source'}"
    candidate = base
    existing_ids = {source.get("id") for source in existing_sources}
    counter = 2
    while candidate in existing_ids:
        candidate = f"{base}-{counter}"
        counter += 1
    return candidate


class DrugBoardHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        super().end_headers()

    def do_POST(self):
        if self.path == "/api/update":
            self._handle_update()
            return

        if self.path == "/api/sources":
            self._handle_add_source()
            return

        self.send_error(HTTPStatus.NOT_FOUND, "Not found")

    def _handle_update(self):
        if not UPDATE_SCRIPT.exists():
            self._send_json(
                {"ok": False, "error": "Updater script not found."},
                status=HTTPStatus.INTERNAL_SERVER_ERROR
            )
            return

        if not update_lock.acquire(blocking=False):
            self._send_json(
                {"ok": False, "error": "An update is already running."},
                status=HTTPStatus.CONFLICT
            )
            return

        try:
            result = subprocess.run(
                [
                    "powershell",
                    "-ExecutionPolicy",
                    "Bypass",
                    "-File",
                    str(UPDATE_SCRIPT)
                ],
                cwd=str(ROOT),
                capture_output=True,
                text=True,
                timeout=180
            )

            if result.returncode != 0:
                self._send_json(
                    {
                        "ok": False,
                        "error": result.stderr.strip() or result.stdout.strip() or "Update failed."
                    },
                    status=HTTPStatus.INTERNAL_SERVER_ERROR
                )
                return

            meta = read_json_file(UPDATE_META) or {}
            payload = {
                "ok": True,
                "message": result.stdout.strip(),
                **meta
            }
            self._send_json(payload)
        except subprocess.TimeoutExpired:
            self._send_json(
                {"ok": False, "error": "The updater timed out."},
                status=HTTPStatus.GATEWAY_TIMEOUT
            )
        finally:
            update_lock.release()

    def _handle_add_source(self):
        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length).decode("utf-8") if content_length else "{}"
            payload = json.loads(raw_body or "{}")
            raw_url = str(payload.get("url", "")).strip()

            if not raw_url:
                self._send_json(
                    {"ok": False, "error": "Please provide a source URL."},
                    status=HTTPStatus.BAD_REQUEST
                )
                return

            normalized = normalize_url(raw_url)
            sources = read_json_file(SOURCES_PATH) or []
            existing = next(
                (
                    source for source in sources
                    if normalize_url(source.get("url", "")) == normalized
                ),
                None
            )

            if existing:
                self._send_json({"ok": True, "alreadyExists": True, "source": existing})
                return

            hostname = hostname_of(raw_url)
            profile = infer_source_profile(raw_url)
            new_source = {
                "id": build_source_id(hostname, sources),
                "name": profile["name"],
                "type": profile["type"],
                "trustScore": profile["trustScore"],
                "url": raw_url,
                "notes": profile["notes"],
                "updaterReady": profile["updaterReady"],
                "updaterMode": profile["updaterMode"]
            }

            sources.append(new_source)
            write_json_file(SOURCES_PATH, sources)
            self._send_json({"ok": True, "alreadyExists": False, "source": new_source})
        except ValueError:
            self._send_json(
                {"ok": False, "error": "That URL is not valid."},
                status=HTTPStatus.BAD_REQUEST
            )
        except json.JSONDecodeError:
            self._send_json(
                {"ok": False, "error": "Unable to read the add-source request."},
                status=HTTPStatus.BAD_REQUEST
            )
        except Exception as exc:
            self._send_json(
                {"ok": False, "error": str(exc)},
                status=HTTPStatus.INTERNAL_SERVER_ERROR
            )

    def _send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    port = int(os.environ.get("DRUG_BOARD_PORT", "8000"))
    server = ThreadingHTTPServer(("127.0.0.1", port), DrugBoardHandler)
    print(f"Drug Board server running at http://127.0.0.1:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
