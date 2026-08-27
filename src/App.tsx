import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Photo = {
  src: string;
  title: string;
  world: string;
  date: string;
  tag: "Portraits" | "Friends" | "Worlds" | "Nightlife" | "Archive";
};

const PHOTO_BASE_URL = (import.meta.env.VITE_PHOTO_BASE_URL ?? "https://vrc-photography.s3.amazonaws.com/images").replace(/\/$/, "");

const featuredPhotos: Photo[] = [
  { src: "/photos/vrchat-2026-08-27-01-08-21.webp", title: "Red Light Company", world: "VRChat", date: "AUG 27, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-08-27-00-58-58.webp", title: "Cherry Ride", world: "VRChat", date: "AUG 27, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-08-23-19-13-38.webp", title: "Side by Side", world: "VRChat", date: "AUG 23, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-08-06-17-02-19.webp", title: "After the Rain", world: "The Midnight Garden", date: "AUG 06, 2026", tag: "Worlds" },
  { src: "/photos/vrchat-2026-08-06-16-22-08.webp", title: "Soft Signal", world: "Aetheria", date: "AUG 06, 2026", tag: "Portraits" },
  { src: "/photos/vrchat-2026-08-03-22-44-17.webp", title: "Golden Hour", world: "VRChat", date: "AUG 03, 2026", tag: "Portraits" },
  { src: "/photos/vrchat-2026-08-02-00-45-06.webp", title: "Dream State", world: "Luminous Hotel", date: "AUG 02, 2026", tag: "Portraits" },
  { src: "/photos/vrchat-2026-07-31-21-17-57.webp", title: "Warm Company", world: "Cozy Cabin", date: "JUL 31, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-07-26-22-39-50.webp", title: "Last Light", world: "Organism", date: "JUL 26, 2026", tag: "Worlds" },
  { src: "/photos/vrchat-2026-07-25-03-19-25.webp", title: "Neon Hearts", world: "Shelter", date: "JUL 25, 2026", tag: "Nightlife" },
  { src: "/photos/vrchat-2026-07-25-03-19-18.webp", title: "2:41 AM", world: "Shelter", date: "JUL 25, 2026", tag: "Nightlife" },
  { src: "/photos/vrchat-2026-07-25-02-41-55.webp", title: "Found Family", world: "Shelter", date: "JUL 25, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-07-20-02-43-11.webp", title: "Electric Blue", world: "Club Orion", date: "JUL 20, 2026", tag: "Nightlife" },
  { src: "/photos/vrchat-2026-07-19-01-08-47.webp", title: "A Quiet Hello", world: "Moonlit Lounge", date: "JUL 19, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-07-18-23-25-14.webp", title: "Night Bloom", world: "Moonlit Lounge", date: "JUL 18, 2026", tag: "Portraits" },
  { src: "/photos/vrchat-2026-07-11-22-33-56.webp", title: "Velvet Room", world: "After Dark", date: "JUL 11, 2026", tag: "Nightlife" },
  { src: "/photos/vrchat-2026-07-11-01-05-58.webp", title: "Small Moments", world: "Home", date: "JUL 11, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-06-18-19-28.webp", title: "The Usual Crew", world: "The Black Cat", date: "JUN 18, 2026", tag: "Friends" },
  { src: "/photos/vrchat-2026-06-15-22-12-53.webp", title: "Parallel Skies", world: "Resonark", date: "JUN 15, 2026", tag: "Worlds" },
  { src: "/photos/vrchat-2026-06-13-01-47-13.webp", title: "Offline / Together", world: "Midnight Rooftop", date: "JUN 13, 2026", tag: "Friends" },
];

const olderPhotoFiles = [
  "vrchat-2026-05-27-22-28-02.webp",
  "vrchat-2026-05-12-23-42-36.webp",
  "vrchat-2026-04-23-00-43.webp",
  "vrchat-2026-04-13-23-23-58.webp",
  "vrchat-2026-04-03-01-11-15.webp",
  "vrchat-2026-03-28-00-37-35.webp",
  "vrchat-2026-03-22-21-29-00.webp",
  "vrchat-2026-03-22-03-08-50.webp",
  "vrchat-2026-02-28-23-48-02.webp",
  "vrchat-2026-02-28-12-43-20.webp",
  "vrchat-2026-01-29-21-29-30.webp",
  "vrchat-2026-01-13-00-23-52.webp",
  "vrchat-2026-01-10-04-17-01.webp",
  "vrchat-2026-01-10-03-14-47.webp",
  "vrchat-2026-01-10-01-14-59.webp",
  "vrchat-2025-12-25-03-21-52.webp",
  "vrchat-2025-12-20-01-50-10.webp",
  "vrchat-2025-12-17-23-20-55.webp",
  "vrchat-2025-11-17-01-07-32.webp",
  "vrchat-2025-09-06-01-41-40.webp",
  "vrchat-2025-08-23-00-35-11.webp",
  "vrchat-2025-04-14-23-11-34.webp",
  "vrchat-2025-04-14-23-08-29.webp",
  "vrchat-2024-12-17-00-55-00.webp",
  "vrchat-2024-12-03-01-37-22.webp",
];

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const removedFragments = new Set([23, 24, 25, 28, 29, 30, 31, 32, 35, 36, 40]);
const archiveFragmentOffset = 18;

const archivePhotos: Photo[] = [
  ...featuredPhotos,
  ...olderPhotoFiles.flatMap((file, index) => {
    const fragmentNumber = index + archiveFragmentOffset + 1;
    if (removedFragments.has(fragmentNumber)) return [];
    const [, year, month, day] = file.match(/vrchat-(\d{4})-(\d{2})-(\d{2})/) ?? [];
    return [{
      src: `/photos/${file}`,
      title: `Archive Fragment ${String(fragmentNumber).padStart(2, "0")}`,
      world: "",
      date: year ? `${months[Number(month) - 1]} ${day}, ${year}` : "ARCHIVED",
      tag: "Archive" as const,
    }];
  }),
];

const photos: Photo[] = archivePhotos
  .filter((photo) => photo.title !== "Parallel Skies" && !photo.src.endsWith("vrchat-2026-07-25-03-19-25.webp"))
  .map((photo) => ({
    ...photo,
    src: `${PHOTO_BASE_URL}/${photo.src.split("/").pop()}`,
    title: "VRChat capture",
  }));

const filters = ["All memories", "Worlds", "Archive"] as const;

const getPhotoYear = (date: string) => Number(date.match(/\b\d{4}\b/)?.[0] ?? 0);

const formatReelDateRange = (firstDate: string, lastDate: string) => {
  if (firstDate === lastDate) return firstDate;

  const first = firstDate.match(/^([A-Z]{3}) (\d{2}), (\d{4})$/);
  const last = lastDate.match(/^([A-Z]{3}) (\d{2}), (\d{4})$/);

  if (first && last && first[3] === last[3]) {
    return `${first[1]} ${first[2]} — ${last[1]} ${last[2]}, ${first[3]}`;
  }

  return `${firstDate} — ${lastDate}`;
};

function App() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All memories");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [heroPhotoIndex, setHeroPhotoIndex] = useState(
    () => Math.floor(Math.random() * photos.length),
  );

  const heroPhoto = photos[heroPhotoIndex % photos.length];

  useEffect(() => {
    const rotation = window.setInterval(() => {
      setHeroPhotoIndex((current) => (current + 1) % photos.length);
    }, 6500);

    return () => window.clearInterval(rotation);
  }, []);

  const visiblePhotos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return photos.filter((photo) => {
      const inFilter = activeFilter === "All memories"
        || (activeFilter === "Worlds" && photo.tag === "Worlds")
        || (activeFilter === "Archive" && getPhotoYear(photo.date) < 2026);
      const matchesSearch = !normalized || `${photo.title} ${photo.date}`.toLowerCase().includes(normalized);
      return inFilter && matchesSearch;
    });
  }, [activeFilter, query]);

  const photoReels = useMemo(
    () => Array.from(
      { length: Math.ceil(visiblePhotos.length / 5) },
      (_, reelIndex) => visiblePhotos
        .slice(reelIndex * 5, reelIndex * 5 + 5)
        .map((photo, frameIndex) => ({
          photo,
          index: reelIndex * 5 + frameIndex,
        })),
    ),
    [visiblePhotos],
  );

  useEffect(() => {
    if (selected === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") setSelected((selected + 1) % visiblePhotos.length);
      if (event.key === "ArrowLeft") setSelected((selected - 1 + visiblePhotos.length) % visiblePhotos.length);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected, visiblePhotos.length]);

  const scrollToGallery = () => document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="VR Archive home">
          <span className="brand-lockup"><strong><span>VR</span><i aria-hidden="true" />ARCHIVE</strong></span>
        </a>
        <nav aria-label="Main navigation">
          <a className="active" href="#gallery">Archive</a>
          <a href="#about">About</a>
        </nav>
        <button className="explore-button" onClick={scrollToGallery}>
          Enter archive <span>↘</span>
        </button>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image-wrap">
            <img
              key={heroPhoto.src}
              className="hero-image"
              src={heroPhoto.src}
              alt={`VRChat photo captured on ${heroPhoto.date}`}
            />
            <div className="hero-scanline" />
            <div className="hero-code"><small>Archive // Online</small><span>FRAME_{String(heroPhotoIndex + 1).padStart(3, "0")}</span></div>
            <div className="hero-caption"><small>Captured in VRChat</small><time>{heroPhoto.date}</time></div>
          </div>

          <div className="hero-copy">
            <p className="eyebrow"><span /> VRCHAT PHOTO JOURNAL</p>
            <h1 id="hero-title">VIRTUAL<br /><em><span className="hero-name">MEMM</span>ORIES</em></h1>
            <p className="intro">A personal archive of the people, places, and beautifully strange moments that felt real enough to keep.</p>
            <button className="primary-cta" onClick={scrollToGallery}>Explore the archive <span>↓</span></button>
          </div>

          <div className="hero-stats" aria-label="Archive stats">
            <div><strong>{photos.length}</strong><span>moments<br />preserved</span></div>
            <div><strong>18</strong><span>worlds<br />visited</span></div>
            <div><strong>∞</strong><span>stories still<br />unfolding</span></div>
          </div>
        </section>

        <section className="archive" id="gallery" aria-labelledby="archive-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span /> CURATED IN SEQUENCE</p>
              <h2 id="archive-title">MEMORY <em>REELS</em></h2>
            </div>
            <p className="archive-count"><b>{String(visiblePhotos.length).padStart(2, "0")}</b> / {photos.length} loaded</p>
          </div>

          <div className="toolbar">
            <div className="filters" role="group" aria-label="Filter photos">
              {filters.map((filter) => (
                <button key={filter} className={activeFilter === filter ? "selected" : ""} onClick={() => setActiveFilter(filter)}>
                  {filter}
                </button>
              ))}
            </div>
            <label className="search">
              <span>⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search memories" aria-label="Search memories" />
            </label>
          </div>

          {visiblePhotos.length ? (
            <div className="memory-reels">
              {photoReels.map((reel, reelIndex) => (
                <section className="memory-reel" key={`${activeFilter}-${reelIndex}`} aria-label={`Memory reel ${reelIndex + 1}`}>
                  <header className="reel-header">
                    <div><span>REEL_{String(reelIndex + 1).padStart(2, "0")}</span><b>{reel.length} preserved frames</b></div>
                    <time>{formatReelDateRange(reel[reel.length - 1].photo.date, reel[0].photo.date)}</time>
                  </header>
                  <div className="reel-grid">
                    {reel.map(({ photo, index }, frameIndex) => (
                      <article
                        className={frameIndex === 0 ? "reel-frame lead" : "reel-frame support"}
                        key={photo.src}
                        style={{ "--delay": `${Math.min(frameIndex * 70, 280)}ms` } as React.CSSProperties}
                      >
                        <button className="photo-open" onClick={() => setSelected(index)} aria-label={`Open photo from ${photo.date}`}>
                          <img src={photo.src} alt={`VRChat photo from ${photo.date}`} loading={index > 5 ? "lazy" : "eager"} />
                          <span className="frame-number">FRAME_{String(index + 1).padStart(3, "0")}</span>
                          <span className="frame-date"><small>Captured</small>{photo.date}</span>
                          <span className="view-hint">OPEN <b>↗</b></span>
                        </button>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="empty-state"><span>NO FRAMES</span><h3>No memories found</h3><p>Try another search or archive filter.</p></div>
          )}
        </section>

        <section className="about" id="about">
          <p className="eyebrow"><span /> WHY THIS EXISTS</p>
          <blockquote>“Some places only exist for a night.<br />The feeling doesn't have to.”</blockquote>
          <div className="about-bottom">
            <p>VR//ARCHIVE is a growing personal time capsule—made from late nights, accidental portraits, impossible landscapes, and friends scattered across the world.</p>
            <button onClick={scrollToGallery}>Back to the moments <span>↑</span></button>
          </div>
        </section>
      </main>

      <footer>
        <a className="brand" href="#top" aria-label="VR Archive home"><span className="brand-lockup"><strong><span>VR</span><i aria-hidden="true" />ARCHIVE</strong></span></a>
        <p className="footer-note">Made between worlds · 2026<span>Last updated · <time dateTime="2026-08-27">AUG 27, 2026</time></span></p>
        <p className="status"><i /> ARCHIVE ONLINE</p>
      </footer>

      {selected !== null && visiblePhotos[selected] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo from ${visiblePhotos[selected].date}`} onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <button className="close" onClick={() => setSelected(null)} aria-label="Close photo">×</button>
          <button className="lightbox-arrow prev" onClick={() => setSelected((selected - 1 + visiblePhotos.length) % visiblePhotos.length)} aria-label="Previous photo">←</button>
          <figure>
            <img src={visiblePhotos[selected].src} alt={`VRChat photo from ${visiblePhotos[selected].date}`} />
            <figcaption>
              <div><span>CAPTURED</span><h2>{visiblePhotos[selected].date}</h2></div>
              <p>FRAME_{String(selected + 1).padStart(3, "0")}<br />VRCHAT ARCHIVE</p>
            </figcaption>
          </figure>
          <button className="lightbox-arrow next" onClick={() => setSelected((selected + 1) % visiblePhotos.length)} aria-label="Next photo">→</button>
        </div>
      )}
    </div>
  );
}

export default App;
