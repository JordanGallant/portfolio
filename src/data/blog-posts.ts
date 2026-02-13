export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "how-i-hacked-the-hor-berlin-dj-competition",
    title: "How I Hacked the HOR Berlin DJ Competition",
    description:
      "A deep dive into how I discovered and exploited a vulnerability in a popular DJ competition voting system — and what I learned about responsible disclosure.",
    date: "2025-05-15",
    readTime: "8 min read",
    tags: ["Cybersecurity", "Bug Bounty", "Web Security"],
    content: `
<h2>Introduction</h2>
<p>What started as a casual scroll through social media turned into one of my most interesting security findings. HOR Berlin — a well-known underground music platform — was running an online DJ competition with a public voting system. As a DJ and cybersecurity enthusiast, I couldn't resist taking a closer look under the hood.</p>

<h2>Discovery</h2>
<p>The voting system seemed straightforward on the surface: one vote per user, authenticated through a simple mechanism. But my instincts told me to dig deeper. I opened the browser's developer tools and started analyzing the network requests being made when a vote was cast.</p>

<p>What I found was interesting — the voting endpoint had minimal server-side validation. The request structure revealed several potential attack vectors that warranted further investigation.</p>

<h2>Analysis</h2>
<p>After examining the API calls, I mapped out the voting flow:</p>

<pre><code>POST /api/vote
Headers:
  Content-Type: application/json

Body:
{
  "contestantId": "xxx",
  "voterId": "yyy"
}</code></pre>

<p>The key observations were:</p>
<ul>
<li>No rate limiting was implemented on the voting endpoint</li>
<li>Voter identity verification was handled client-side</li>
<li>The API accepted requests without proper session validation</li>
<li>No CAPTCHA or bot protection was present</li>
</ul>

<h2>Exploitation</h2>
<p>To prove the vulnerability, I wrote a simple proof-of-concept script. The goal wasn't to actually manipulate results, but to demonstrate that the system could be exploited:</p>

<pre><code># Proof of concept - for educational purposes only
# This demonstrates the vulnerability without causing harm

import requests
import time

def demonstrate_vulnerability():
    """
    This PoC shows that votes can be submitted
    programmatically without proper validation.
    """
    endpoint = "https://[REDACTED]/api/vote"

    # Single test request to verify vulnerability
    response = requests.post(endpoint, json={
        "contestantId": "test",
        "voterId": "poc-test"
    })

    print(f"Status: {response.status_code}")
    print("Vulnerability confirmed" if response.ok else "Patched")

demonstrate_vulnerability()</code></pre>

<p>The vulnerability was clear: anyone with basic programming knowledge could automate the voting process and submit an unlimited number of votes.</p>

<h2>Disclosure</h2>
<p>Following responsible disclosure practices, I immediately reached out to the HOR Berlin team through their official channels. I provided:</p>
<ul>
<li>A detailed description of the vulnerability</li>
<li>Steps to reproduce the issue</li>
<li>The proof-of-concept code</li>
<li>Recommended fixes (rate limiting, CAPTCHA, server-side validation)</li>
</ul>

<p>I did <strong>not</strong> use the exploit to influence any actual competition results. The proof of concept was conducted in a controlled manner with minimal impact.</p>

<h2>Lessons Learned</h2>
<p>This experience reinforced several important security principles:</p>
<ul>
<li><strong>Never trust client-side validation alone.</strong> All critical checks should be performed server-side.</li>
<li><strong>Rate limiting is essential</strong> for any public-facing endpoint, especially voting systems.</li>
<li><strong>Bot protection matters.</strong> CAPTCHAs and fingerprinting can prevent automated abuse.</li>
<li><strong>Responsible disclosure is the right path.</strong> Finding vulnerabilities comes with the responsibility to report them ethically.</li>
</ul>

<p>As security researchers, our goal should always be to make systems more secure — not to exploit them for personal gain. This find was a great reminder that even popular platforms can have fundamental security oversights, and that the security community plays a vital role in helping fix them.</p>

<p><em>Stay curious. Stay ethical. Stay secure.</em></p>
`,
  },
  {
    slug: "diy-omi",
    title: "DIY Omi",
    description:
      "How I built my own Omi device from scratch — flashing custom firmware and programming it to generate MIDI files from melodies it hears.",
    date: "2026-02-13",
    readTime: "10 min read",
    tags: ["Hardware", "Firmware", "MIDI", "DIY"],
    content: `
<img src="/omi.gif" alt="DIY Omi device in action" style="width:100%;border-radius:8px;margin-bottom:1.5rem;border:1px solid #1a1a2e;" />

<h2>Introduction</h2>
<p>I've always been fascinated by wearable AI devices — small, always-listening companions that can do useful things with audio. When I saw the Omi project, I knew I had to build my own version. But I didn't just want a clone — I wanted something that could <strong>listen to melodies and generate MIDI files</strong> from what it heard.</p>

<p>This post walks through the entire process: sourcing the hardware, flashing custom firmware, and writing the software that turns hummed melodies into playable MIDI.</p>

<h2>Step 1: Hardware Sourcing</h2>
<p>The core of the build is an <strong>ESP32-S3</strong> microcontroller with a built-in microphone. Here's the parts list:</p>
<ul>
<li><strong>ESP32-S3 DevKit</strong> — the brain of the operation, with Bluetooth and WiFi</li>
<li><strong>I2S MEMS Microphone (INMP441)</strong> — high-quality digital mic for audio capture</li>
<li><strong>LiPo Battery (3.7V 500mAh)</strong> — for portable use</li>
<li><strong>3D-printed enclosure</strong> — custom case to keep it compact and wearable</li>
<li><strong>USB-C breakout board</strong> — for charging and flashing</li>
</ul>

<p>Total cost came in under $25, which is a fraction of what commercial devices charge.</p>

<h2>Step 2: Flashing the Firmware</h2>
<p>The stock Omi firmware is open source, but I needed to modify it heavily for MIDI generation. Here's how I set up the development environment:</p>

<pre><code># Install ESP-IDF (Espressif IoT Development Framework)
git clone --recursive https://github.com/espressif/esp-idf.git
cd esp-idf
./install.sh esp32s3
source export.sh

# Clone and modify the Omi firmware
git clone https://github.com/BasedHardware/omi.git
cd omi/firmware</code></pre>

<p>The key modifications I made to the firmware:</p>
<ul>
<li>Added a <strong>voice command listener</strong> that activates melody detection mode when it hears "listen for melody"</li>
<li>Implemented a <strong>pitch detection algorithm</strong> using autocorrelation on the raw audio samples</li>
<li>Built a <strong>MIDI encoder</strong> that converts detected pitches and durations into standard MIDI format</li>
<li>Added <strong>BLE MIDI output</strong> so the device can send MIDI data directly to a DAW</li>
</ul>

<h2>Step 3: Pitch Detection</h2>
<p>The pitch detection was the trickiest part. I implemented an autocorrelation-based algorithm that runs in real-time on the ESP32:</p>

<pre><code>// Simplified pitch detection using autocorrelation
float detect_pitch(int16_t* buffer, int length, int sample_rate) {
    float best_correlation = 0;
    int best_lag = 0;

    // Search for fundamental frequency between 80Hz and 1000Hz
    int min_lag = sample_rate / 1000;
    int max_lag = sample_rate / 80;

    for (int lag = min_lag; lag < max_lag; lag++) {
        float correlation = 0;
        for (int i = 0; i < length - lag; i++) {
            correlation += buffer[i] * buffer[i + lag];
        }
        if (correlation > best_correlation) {
            best_correlation = correlation;
            best_lag = lag;
        }
    }

    return (float)sample_rate / best_lag;
}</code></pre>

<h2>Step 4: MIDI Encoding</h2>
<p>Once I had reliable pitch detection, the next step was mapping frequencies to MIDI note numbers and encoding them:</p>

<pre><code># Python helper for MIDI file generation (runs on companion app)
import midiutil

def freq_to_midi(freq):
    """Convert frequency in Hz to MIDI note number."""
    if freq <= 0:
        return 0
    return int(round(69 + 12 * math.log2(freq / 440.0)))

def create_midi_from_notes(notes, output_path):
    """
    notes: list of (midi_note, start_time, duration) tuples
    """
    midi = midiutil.MIDIFile(1)
    midi.addTempo(0, 0, 120)

    for note, start, duration in notes:
        midi.addNote(0, 0, note, start, duration, 100)

    with open(output_path, "wb") as f:
        midi.writeFile(f)</code></pre>

<h2>Step 5: Putting It All Together</h2>
<p>The final workflow looks like this:</p>
<ol>
<li><strong>Activate</strong> — Say "listen for melody" to the device</li>
<li><strong>Perform</strong> — Hum, whistle, or sing the melody you want to capture</li>
<li><strong>Process</strong> — The device detects pitches in real-time and buffers the note data</li>
<li><strong>Say "stop"</strong> — The device finalizes the MIDI data</li>
<li><strong>Transfer</strong> — MIDI file is sent via BLE to your phone or laptop</li>
<li><strong>Import</strong> — Drop the .mid file into Ableton, FL Studio, or any DAW</li>
</ol>

<h2>Step 6: Flashing the Custom Firmware</h2>
<p>To flash the modified firmware onto the ESP32-S3:</p>

<pre><code># Build the firmware
idf.py set-target esp32s3
idf.py build

# Flash to device (hold BOOT button while connecting USB)
idf.py -p COM3 flash

# Monitor serial output for debugging
idf.py -p COM3 monitor</code></pre>

<h2>Results</h2>
<p>After weeks of tweaking the pitch detection sensitivity and note quantization, the device works surprisingly well. It can reliably detect melodies hummed at a moderate pace, quantize them to the nearest semitone, and produce clean MIDI files.</p>

<p>Is it perfect? No — fast runs and quiet notes still trip it up sometimes. But for quickly capturing musical ideas on the go, it's become an indispensable part of my creative toolkit.</p>

<p>The entire project is a testament to what you can build with open-source hardware and a bit of persistence. If you're interested in building your own, all my firmware modifications are available on my GitHub.</p>

<p><em>Build weird things. Make cool sounds.</em></p>
`,
  },
  {
    slug: "the-way-we-access-digital-music-needs-to-change",
    title: "The Way We Access Digital Music Needs to Change",
    description:
      "A breakdown of Sleepy MP3 Downloader — a browser plugin that exploits code injection and weak API security on SoundCloud and Bandcamp to give artists and listeners the tools they deserve.",
    date: "2026-02-13",
    readTime: "12 min read",
    tags: ["Web Security", "Browser Extensions", "Music", "JavaScript"],
    content: `
<h2>The Problem</h2>
<p>Streaming platforms have changed how we consume music — but not always for the better. Artists get fractions of a cent per stream. Listeners don't truly own anything. And the platforms themselves? They sit on poorly secured APIs while charging premium prices for basic features like offline listening and high-quality audio.</p>

<p>I built <strong>Sleepy MP3 Downloader</strong> as a browser plugin to prove a point: the way we access digital music is fundamentally broken, and the technical barriers these platforms put up are paper-thin.</p>

<h2>Architecture Overview</h2>
<p>The plugin is a Manifest V3 Chrome extension with three main layers:</p>
<ul>
<li><strong>Content Script</strong> — Injected directly into SoundCloud and Bandcamp pages, manipulating the DOM and intercepting data</li>
<li><strong>Service Worker</strong> — Background process that intercepts network requests, bypasses CORS, and manages state</li>
<li><strong>Companion API</strong> — A local server that handles audio conversion to 320kbps MP3</li>
</ul>

<p>The manifest declares broad permissions across both platforms:</p>

<pre><code>{
  "manifest_version": 3,
  "name": "Sleepy MP3 Downloader",
  "permissions": [
    "activeTab", "scripting", "downloads",
    "storage", "declarativeNetRequest",
    "declarativeNetRequestWithHostAccess",
    "webRequest"
  ],
  "host_permissions": [
    "https://soundcloud.com/*",
    "https://*.bandcamp.com/*",
    "*://api-v2.soundcloud.com/*",
    "https://t4.bcbits.com/*"
  ]
}</code></pre>

<h2>Method 1: Intercepting SoundCloud's Client ID</h2>
<p>SoundCloud's API requires a <code>client_id</code> for authentication. The problem? Every single API request the site makes broadcasts this key in plain URL parameters. The service worker passively intercepts it:</p>

<pre><code>// service_worker.js — intercept SoundCloud client_id
chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = new URL(details.url);
    const clientId = url.searchParams.get("client_id");
    if (clientId) {
      chrome.storage.local.set({ soundcloudClientId: clientId });
    }
  },
  { urls: ["*://api-v2.soundcloud.com/*"] }
);</code></pre>

<p>The content script then picks this up and stores it locally for all future API calls:</p>

<pre><code>// content.js — retrieve intercepted client_id
chrome.storage.local.get("soundcloudClientId", (result) => {
  const clientId = result.soundcloudClientId;
  if (clientId) {
    localStorage.setItem("soundcloudClientId", clientId);
  }
});

const out = localStorage.getItem("soundcloudClientId");
const SOUNDCLOUD_CLIENT_ID = "client_id=" + out;</code></pre>

<p>With this single key, we have full access to SoundCloud's resolve API — which can look up any track from a URL and return its raw audio streams.</p>

<h2>Method 2: SoundCloud's Resolve API</h2>
<p>SoundCloud has a remarkably useful (and poorly protected) URL resolver. Given any track or playlist URL, it returns the full metadata and transcoding streams:</p>

<pre><code>const SOUNDCLOUD_API_URL = "https://api-v2.soundcloud.com/resolve?url=";

// Resolve any track URL to get metadata + audio streams
const endUrl = SOUNDCLOUD_API_URL + trackUrl + "&" + SOUNDCLOUD_CLIENT_ID;
const response = await fetch(endUrl);
const data = await response.json();

// Find the progressive (direct download) audio stream
function GetStreamURL(data, clientId) {
  const progressiveTranscoding = data.media.transcodings.find(
    transcoding => transcoding.format.protocol === "progressive"
  );
  return progressiveTranscoding.url + "?" + clientId;
}</code></pre>

<p>The response contains everything: title, artist, album, genre, artwork URLs, and most importantly — direct links to the audio transcoding streams. No authentication beyond the leaked client ID.</p>

<h2>Method 3: DOM Injection on Bandcamp</h2>
<p>Bandcamp takes a different approach. The audio data is embedded directly in the page's HTML inside a script tag. The content script parses it straight from the DOM:</p>

<pre><code>// Find the script tag containing track data
const scriptTag = Array.from(document.querySelectorAll('script'))
  .find(s => s.src.startsWith(
    'https://s4.bcbits.com/client-bundle/1/trackpipe/tralbum_head-'
  ));

const tralbumData = scriptTag.getAttribute('data-tralbum');
const parsedData = JSON.parse(
  tralbumData
    .replace(/&amp;quot;/g, '"')
    .replace(/&amp;amp;/g, '&')
    .replace(/&amp;#39;/g, "'")
);

// Each track has a direct MP3 link
tracks = parsedData.trackinfo;
const mp3Link = tracks[index].file["mp3-128"];</code></pre>

<p>The track data — including direct MP3-128 stream URLs — is just sitting there in the HTML, entity-encoded in a data attribute. No API call needed.</p>

<h2>Method 4: CORS Bypass via Service Worker</h2>
<p>Browsers enforce CORS to prevent cross-origin requests. But service workers in Chrome extensions operate outside this restriction. Audio fetches that would fail in the content script get routed through the background:</p>

<pre><code>// service_worker.js — bypass CORS for audio fetching
if (request.action === "fetchAudio") {
  fetch(request.url)
    .then(response => response.blob())
    .then(blob => {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendResponse({ success: true, dataUrl: reader.result });
      };
      reader.readAsDataURL(blob);
    });
  return true; // Keep message channel open for async response
}</code></pre>

<p>For Bandcamp specifically, the plugin also uses declarative net request rules to strip CORS headers entirely:</p>

<pre><code>// rules.json — modify CORS headers on Bandcamp CDN
[{
  "id": 1,
  "priority": 1,
  "action": {
    "type": "modifyHeaders",
    "responseHeaders": [
      { "header": "Access-Control-Allow-Origin",
        "operation": "set", "value": "*" }
    ]
  },
  "condition": {
    "urlFilter": "https://t4.bcbits.com/*",
    "resourceTypes": ["xmlhttprequest"]
  }
}]</code></pre>

<h2>Method 5: Dynamic UI Injection</h2>
<p>The plugin uses MutationObservers to watch for new DOM elements and inject download buttons in real-time — even as SoundCloud lazy-loads content:</p>

<pre><code>const observeTrackItems = () => {
  const observer = new MutationObserver(() => {
    const soundcloudTargets = document.querySelectorAll(
      '.trackItem, .systemPlaylistBannerItem'
    );
    const bandcampTargets = document.querySelectorAll(
      'td.download-col, div.digitaldescription'
    );

    soundcloudTargets.forEach(target => {
      if (!target.querySelector('.soundcloud-button')) {
        const btn = createSoundCloudDownloadButton(target);
        target.appendChild(btn);
      }
    });

    bandcampTargets.forEach(target => {
      if (!target.querySelector('.bandcamp-button')) {
        const btn = createBandCampDownloadButton();
        target.appendChild(btn);
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};</code></pre>

<p>On Bandcamp, buttons even dynamically match the artist's page theme by parsing the custom CSS design rules:</p>

<pre><code>// Pull colors from Bandcamp's custom theme
const styleElement = document.querySelector(
  'style#custom-design-rules-style'
);
const designData = JSON.parse(
  styleElement.getAttribute('data-design')
);
backgroundColor = "#" + designData.link_color;
textColor = "#" + designData.bg_color;</code></pre>

<h2>Method 6: Metadata Tagging & Bulk Downloads</h2>
<p>Every downloaded track gets properly tagged with ID3 metadata — title, artist, album, genre, and cover art — using the <code>browser-id3-writer</code> library:</p>

<pre><code>function tagAudio({ audioBuffer, title, album, artist, genre, coverImage }) {
  const writer = new ID3Writer(audioBuffer);
  writer
    .setFrame('TIT2', title)
    .setFrame('TALB', album)
    .setFrame('TPE1', [artist])
    .setFrame('TCON', [genre])
    .setFrame('APIC', {
      type: 3,
      data: coverImage,
      description: 'Cover',
    });
  writer.addTag();
  return writer.getBlob();
}</code></pre>

<p>For playlists, the plugin auto-scrolls the page to force SoundCloud to lazy-load all tracks, downloads each one sequentially, tags them, and bundles everything into a ZIP file using JSZip:</p>

<pre><code>const zip = new JSZip();

for (const track of tracks) {
  // ... fetch, convert, tag each track
  zip.file(trackTitle + ".mp3", taggedBlob);
}

zip.generateAsync({ type: "blob" }).then(content => {
  const zipUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = zipUrl;
  a.setAttribute('download', '[SLEEPY_DOWNLOADER] - Tracks.zip');
  a.click();
});</code></pre>

<h2>What This Proves</h2>
<p>Building Sleepy MP3 Downloader wasn't about piracy — it was about exposing how fragile these platforms' security really is:</p>
<ul>
<li><strong>Client IDs broadcast in every request</strong> — SoundCloud leaks its own API keys in plain sight</li>
<li><strong>Audio streams accessible without authentication</strong> — once you have a client ID, every track is one API call away</li>
<li><strong>Track data embedded in page HTML</strong> — Bandcamp puts direct MP3 links in the DOM</li>
<li><strong>CORS as the only barrier</strong> — easily bypassed by any browser extension</li>
</ul>

<p>These platforms charge users for "premium" access to content that is technically accessible to anyone who opens DevTools. The real question isn't whether this <em>can</em> be done — it's why these companies haven't built better systems for both artists and listeners.</p>

<p>Music deserves better infrastructure. Artists deserve fair compensation. And listeners deserve to actually own the music they love.</p>

<p><em>Download the source on <a href="https://github.com/JordanGallant/sleepy-mp3-downloader-plugin" target="_blank">GitHub</a>.</em></p>
`,
  },
  {
    slug: "intro-to-live-coding-with-strudel",
    title: "Intro to Live Coding with Strudel",
    description:
      "An interactive introduction to live coding music in the browser with Strudel — from your first kick drum to a full layered beat, all embedded and playable right here.",
    date: "2026-02-13",
    readTime: "9 min read",
    tags: ["Music", "Live Coding", "Creative Coding", "JavaScript"],
    content: `
<h2>What is Live Coding?</h2>
<p>Live coding is the practice of writing code in real-time to generate music, visuals, or both — often in front of a live audience. It sits at the intersection of programming, improvisation, and performance art. You write a line of code, hit run, and the sound changes instantly. No DAW. No piano roll. Just you and a text editor making beats.</p>

<p>The live coding scene has been growing for years through communities like <strong>Algorave</strong> and tools like TidalCycles (Haskell), Sonic Pi (Ruby), and FoxDot (Python). But the one that's caught my attention recently is <strong>Strudel</strong> — because it runs entirely in the browser.</p>

<h2>Why Strudel?</h2>
<p><a href="https://strudel.cc" target="_blank">Strudel</a> is a JavaScript port of TidalCycles, the legendary Haskell live coding environment created by Alex McLean. What makes Strudel special:</p>
<ul>
<li><strong>Zero setup</strong> — runs entirely in the browser, no installation needed</li>
<li><strong>JavaScript-based</strong> — if you know JS, you already know the syntax</li>
<li><strong>Massive sound library</strong> — hundreds of samples and synths built in</li>
<li><strong>Embeddable</strong> — you can embed interactive patterns in any webpage (like this blog post)</li>
<li><strong>Pattern-based</strong> — uses a powerful mini-notation for describing rhythmic patterns</li>
</ul>

<p>Every code block below is an embedded Strudel REPL. <strong>Click play to hear them live.</strong></p>

<h2>Step 1: Your First Beat</h2>
<p>Let's start with the absolute basics. In Strudel, <code>s()</code> triggers a sample. The string inside defines the pattern — each word is a beat:</p>

<pre><code>s("bd sd bd sd")</code></pre>

<p>This plays: kick, snare, kick, snare. Simple four-on-the-floor. Try it:</p>

<iframe src="https://strudel.cc/#s(%22bd%20sd%20bd%20sd%22)" width="100%" height="300" style="border:1px solid #1a1a2e;border-radius:8px;"></iframe>

<p><code>bd</code> = bass drum, <code>sd</code> = snare drum. Strudel has hundreds of sample names you can explore.</p>

<h2>Step 2: Mini-Notation Magic</h2>
<p>Strudel's power comes from its <strong>mini-notation</strong> — a compact syntax for describing complex rhythms. Here are the key operators:</p>

<ul>
<li><code>[x y]</code> — subdivide: fit multiple events into one step</li>
<li><code>x*n</code> — repeat: play something n times in its time slot</li>
<li><code>~</code> — rest: silence for that beat</li>
<li><code>x:n</code> — sample variant: pick a different version of the sound</li>
</ul>

<p>Let's use these to make something that actually grooves. We'll use the Roland TR-808 sample bank:</p>

<pre><code>s("bd sd:2 [bd bd] sd:2").bank("RolandTR808")</code></pre>

<p>The <code>[bd bd]</code> crams two kicks into one beat — creating a syncopated double-hit. <code>sd:2</code> picks the second snare variant. <code>.bank("RolandTR808")</code> loads the iconic 808 sounds:</p>

<iframe src="https://strudel.cc/#s(%22bd%20sd%3A2%20%5Bbd%20bd%5D%20sd%3A2%22).bank(%22RolandTR808%22)" width="100%" height="300" style="border:1px solid #1a1a2e;border-radius:8px;"></iframe>

<h2>Step 3: Layering with Stack</h2>
<p><code>stack()</code> lets you layer multiple patterns on top of each other — like tracks in a DAW, but written in a single expression. Let's add hi-hats on top of our drum pattern:</p>

<pre><code>stack(
  s("bd sd:2 [bd bd] sd:2").bank("RolandTR808"),
  s("hh*8").bank("RolandTR808").gain(0.4)
)</code></pre>

<p><code>hh*8</code> repeats the hi-hat 8 times per cycle — giving us steady eighth notes. <code>.gain(0.4)</code> turns them down so they don't overpower the kick and snare:</p>

<iframe src="https://strudel.cc/#stack(%0A%20%20s(%22bd%20sd%3A2%20%5Bbd%20bd%5D%20sd%3A2%22).bank(%22RolandTR808%22)%2C%0A%20%20s(%22hh*8%22).bank(%22RolandTR808%22).gain(0.4)%0A)" width="100%" height="300" style="border:1px solid #1a1a2e;border-radius:8px;"></iframe>

<h2>Step 4: Adding a Bassline</h2>
<p>Drums are only half the story. <code>note()</code> lets you write melodic patterns using note names. Combined with <code>.sound()</code> to pick a synth and <code>.cutoff()</code> for filtering, you can build basslines right alongside your drums:</p>

<pre><code>stack(
  s("bd*2 sd:3 [~ bd] sd:3").bank("RolandTR808"),
  s("hh*8").bank("RolandTR808").gain(0.3),
  note("&lt;c2 [eb2 g2] c2 [bb1 c2]&gt;")
    .sound("sawtooth").cutoff(900).gain(0.3)
)</code></pre>

<p>The <code>&lt; &gt;</code> angle brackets create a <strong>slow pattern</strong> — the notes alternate across cycles rather than playing within a single cycle. The sawtooth wave with a low cutoff gives us that thick, filtered bass sound:</p>

<iframe src="https://strudel.cc/#stack(%0A%20%20s(%22bd*2%20sd%3A3%20%5B~%20bd%5D%20sd%3A3%22).bank(%22RolandTR808%22)%2C%0A%20%20s(%22hh*8%22).bank(%22RolandTR808%22).gain(0.3)%2C%0A%20%20note(%22%3Cc2%20%5Beb2%20g2%5D%20c2%20%5Bbb1%20c2%5D%3E%22).sound(%22sawtooth%22).cutoff(900).gain(0.3)%0A)" width="100%" height="300" style="border:1px solid #1a1a2e;border-radius:8px;"></iframe>

<h2>Step 5: The Full Beat</h2>
<p>Now let's put it all together. This is a full layered track built from scratch — 808 drums with a syncopated groove, hi-hats, an open hat for accents, a growling sawtooth bass with an LFO on the filter, and a delayed square lead floating on top:</p>

<pre><code>stack(
  s("bd:5*2 sd:3 [~ bd:5] sd:3")
    .bank("RolandTR808").gain(0.8),
  s("[~ hh]*4")
    .bank("RolandTR808").gain(0.3),
  s("~ ~ ~ oh")
    .bank("RolandTR808").gain(0.25),
  note("&lt;c2 c2 eb2 [bb1 c2]&gt;")
    .sound("sawtooth")
    .cutoff(sine.range(400,1200))
    .resonance(8).gain(0.35),
  note("c4 [eb4 g4] ~ bb4")
    .sound("square").cutoff(2000)
    .delay(0.4).gain(0.12).room(0.4)
).cpm(70)</code></pre>

<p>Let's break down what makes this tick:</p>
<ul>
<li><strong>Drums</strong> — <code>bd:5</code> picks a deep 808 kick variant, <code>[~ bd:5]</code> creates a ghost kick on the off-beat</li>
<li><strong>Hi-hats</strong> — <code>[~ hh]*4</code> plays hats only on the off-beats (the <code>~</code> creates rests on the downbeats)</li>
<li><strong>Open hat</strong> — only on beat 4 for that classic accent</li>
<li><strong>Bass</strong> — <code>sine.range(400,1200)</code> modulates the filter cutoff with a sine wave LFO, making the bass breathe</li>
<li><strong>Lead</strong> — a square wave with <code>.delay(0.4)</code> for echo and <code>.room(0.4)</code> for reverb, giving it space</li>
<li><strong><code>.cpm(70)</code></strong> — sets the tempo to 70 cycles per minute</li>
</ul>

<p>Hit play:</p>

<iframe src="https://strudel.cc/#stack(%0A%20%20s(%22bd%3A5*2%20sd%3A3%20%5B~%20bd%3A5%5D%20sd%3A3%22).bank(%22RolandTR808%22).gain(0.8)%2C%0A%20%20s(%22%5B~%20hh%5D*4%22).bank(%22RolandTR808%22).gain(0.3)%2C%0A%20%20s(%22~%20~%20~%20oh%22).bank(%22RolandTR808%22).gain(0.25)%2C%0A%20%20note(%22%3Cc2%20c2%20eb2%20%5Bbb1%20c2%5D%3E%22).sound(%22sawtooth%22).cutoff(sine.range(400%2C1200)).resonance(8).gain(0.35)%2C%0A%20%20note(%22c4%20%5Beb4%20g4%5D%20~%20bb4%22).sound(%22square%22).cutoff(2000).delay(0.4).gain(0.12).room(0.4)%0A).cpm(70)" width="100%" height="300" style="border:1px solid #1a1a2e;border-radius:8px;"></iframe>

<h2>Where to Go From Here</h2>
<p>This barely scratches the surface. Strudel supports:</p>
<ul>
<li><strong>Euclidean rhythms</strong> — <code>s("bd").euclid(3,8)</code> generates mathematically distributed beats</li>
<li><strong>Random variation</strong> — <code>.sometimes(x =&gt; x.speed(2))</code> for controlled chaos</li>
<li><strong>Audio effects</strong> — reverb, delay, distortion, phaser, chorus, and more</li>
<li><strong>Custom samples</strong> — load your own sounds via URL</li>
<li><strong>MIDI output</strong> — control hardware synths directly from the browser</li>
<li><strong>Visual patterns</strong> — built-in visualizations that react to the music</li>
</ul>

<p>The best part about live coding is that the code <em>is</em> the instrument. Every character you type changes the music. There's no compile step, no render time — just immediate sonic feedback. It's the closest programming gets to playing a musical instrument.</p>

<p>Open <a href="https://strudel.cc" target="_blank">strudel.cc</a>, start typing, and see what comes out. The worst that can happen is a weird noise — and sometimes that's the best part.</p>

<p><em>Code is music. Music is code.</em></p>
`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
