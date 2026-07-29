import urllib.request
import re
import json

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

urls = [
    'https://api.allorigins.win/raw?url=https://imgur.com/a/QYJSB7j',
    'https://corsproxy.io/?https://imgur.com/a/QYJSB7j',
    'https://html.duckduckgo.com/html/?q=imgur+QYJSB7j'
]

for url in urls:
    print("Testing:", url)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            print("Length:", len(content))
            hashes = re.findall(r'i\.imgur\.com/([a-zA-Z0-9]{5,8})', content)
            print("Found image IDs:", set(hashes))
            if "not available" in content.lower():
                print("Contains 'not available'")
    except Exception as e:
        print("Error:", e)
