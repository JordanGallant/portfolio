export interface Project {
  title: string;
  image: string;
  description: string;
  url: string;
}

const REVIVAL_BASE = "https://revival-records.vercel.app";

export const projects: Project[] = [
  {
    title: "Hand Tracking",
    image: "https://i.ibb.co/kVhM3Ybr/Screenshot-2025-05-18-at-17-48-41.png",
    description: "Media Pipe",
    url: `${REVIVAL_BASE}/media-pipe`,
  },
  {
    title: "Microsoft DOS",
    image: "https://i.ibb.co/cXJv3Kjc/Screenshot-2025-05-18-at-17-49-37.png",
    description: "jsdos",
    url: `${REVIVAL_BASE}/dos`,
  },
  {
    title: "Voice Sampler",
    image: "https://i.ibb.co/jkrfrk7n/Screenshot-2025-05-18-at-17-49-12.png",
    description: "Tone.js, Web Speech API",
    url: `${REVIVAL_BASE}/voice-sampler`,
  },
  {
    title: "DSP in the Browser",
    image: "https://i.ibb.co/wNynww0f/Screenshot-2025-05-18-at-17-57-49.png",
    description: "Faust (WebAssembly)",
    url: `${REVIVAL_BASE}/effect/reverb`,
  },
  {
    title: "World Wide FM Radio",
    image: "https://i.ibb.co/fY0MQ49h/Screenshot-2025-05-19-at-09-48-28.png",
    description: "Radio Garden, Howler.js",
    url: `${REVIVAL_BASE}/world-radio`,
  },
  {
    title: "Sleepy MP3 Downloader",
    image: "https://i.ibb.co/xt3f90qQ/Screenshot-2025-05-19-at-10-01-18.png",
    description: "Javascript (Browser Plugin)",
    url: "https://github.com/JordanGallant/sleepy-mp3-downloader-plugin",
  },
  {
    title: "Audio Reactive Particle System",
    image: "https://i.ibb.co/rGDVbz7r/Screenshot-2025-05-19-at-15-02-00.png",
    description: "tsparticles, Web Audio API",
    url: `${REVIVAL_BASE}/cymatics`,
  },
  {
    title: "Nintendo 64 Emulator",
    image: "https://i.ibb.co/vvCgQ3Sb/Screenshot-2025-05-22-at-09-18-53.png",
    description: "Web Assembly",
    url: `${REVIVAL_BASE}/n64`,
  },
  {
    title: "Web Synth",
    image: "https://i.ibb.co/FqHWzZLm/Screenshot-2025-05-20-at-13-47-00.png",
    description: "Tone.js, NexusUi",
    url: `${REVIVAL_BASE}/sleepy-synth`,
  },
  {
    title: "Movie Streamer",
    image: "https://i.ibb.co/5X7GdhSg/Screenshot-2025-05-21-at-07-09-17.png",
    description: "Movies Joy",
    url: `${REVIVAL_BASE}/movie`,
  },
  {
    title: "Flash Emulator",
    image: "https://i.ibb.co/DDkv2WPJ/Screenshot-2025-05-21-at-07-34-08.png",
    description: "Ruffle (Web Assembly)",
    url: `${REVIVAL_BASE}/flash`,
  },
  {
    title: "Graffiti Translator",
    image: "https://i.ibb.co/4Rg57wkz/Screenshot-2025-05-22-at-09-11-52.png",
    description: "Canvas API, Google Vision",
    url: `${REVIVAL_BASE}/graffiti`,
  },
  {
    title: "Sling Shot Music Game",
    image: "https://i.ibb.co/7BSBSMp/Screenshot-2025-05-22-at-21-34-58.png",
    description: "Matter.js, Tone.js",
    url: `${REVIVAL_BASE}/sling-shot`,
  },
  {
    title: "Self Hosted Image Hallucinator",
    image: "https://i.ibb.co/v6yvn534/dreamified-1747917536.jpg",
    description: "Pytorch, Flask",
    url: "https://github.com/JordanGallant/deep-dream",
  },
  {
    title: "Celebrity Jet Viewer",
    image: "https://i.ibb.co/jvq8Ybvm/Screenshot-2025-05-23-at-18-33-48.png",
    description: "ASDB Exchange",
    url: `${REVIVAL_BASE}/flights`,
  },
  {
    title: "Strava Run Downloader",
    image: "https://i.ibb.co/qMVjnX17/Screenshot-2025-05-24-at-19-59-23.png",
    description: "MapboxGl, .GPX",
    url: `${REVIVAL_BASE}/strainva`,
  },
  {
    title: "Gaussian Splat Rendering",
    image: "https://i.ibb.co/B5dWHPYF/Screenshot-2025-05-25-at-08-05-45.png",
    description: "Vanilla JS",
    url: `${REVIVAL_BASE}/splat`,
  },
  {
    title: "Snapchat AR in the Browser",
    image: "/eyes.png",
    description: "Snapchat Lens",
    url: `${REVIVAL_BASE}/lens`,
  },
  {
    title: "Eye Tracker",
    image: "/track.png",
    description: "WebGazer.js",
    url: "https://eye-track-orcin.vercel.app/",
  },
  {
    title: "Phone Gyroscope Controller",
    image: "/gyro.png",
    description: "Gyroscope, Vanilla JS",
    url: `${REVIVAL_BASE}/gyro`,
  },
  {
    title: "Zoom Blur Effects",
    image: "/pulse.png",
    description: "glfx.js",
    url: "https://pulse-alpha-snowy.vercel.app/",
  },
  {
    title: "Self Hosted Audio Separator",
    image: "/spleeter.png",
    description: "spleeter, Flask",
    url: `${REVIVAL_BASE}/spleeter`,
  },
  {
    title: "Self Hosted Multiplayer Fairy Chess",
    image: "/chess.png",
    description: "Colyseus.js, Phaser.js",
    url: "https://github.com/JordanGallant/chess-server",
  },
  {
    title: "Traffic Cam Viewer",
    image: "/traffic.png",
    description: "Javascript",
    url: `${REVIVAL_BASE}/traffic`,
  },
  {
    title: "Mario SNES ROM Hacks",
    image: "/mario.png",
    description: "Javascript, WebAssembly",
    url: `${REVIVAL_BASE}/snes`,
  },
  {
    title: "Artist Analytics Tool",
    image: "/artists.png",
    description: "GraphQL, Javascript",
    url: "https://artist-insights.vercel.app/",
  },
  {
    title: "Damn Vulnerable DeFi Labs",
    image: "/labs.png",
    description: "Next.js, Linux VM, Flask API, LXD containers, OpenVPN",
    url: "https://prove-frontend.vercel.app/",
  },
  {
    title: "Tree Hugger",
    image: "/trees.png",
    description: "Next.js, Leaflet.js, PostgresDB",
    url: "https://geojson-indol.vercel.app/",
  },
  {
    title: "Privacy Church",
    image: "/priv.png",
    description: "Privacy-focused web application",
    url: "https://privacychurch.app/",
  },
];
