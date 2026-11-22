(() => {
  // Move older project addresses to the neutral public URL without losing deep links.
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    const target = new URL(canonical.href);
    const base = new URL('./', target);
    if (location.origin === target.origin && !location.pathname.startsWith(base.pathname)) {
      target.search = location.search;
      target.hash = location.hash;
      location.replace(target.href);
      return;
    }
  }
  const menu = document.querySelector('.menu-toggle');
  const nav = document.getElementById('navigation');
  if (menu && nav) {
    document.documentElement.classList.add('js-nav');
    function setMenu(open) {
      menu.setAttribute('aria-expanded', String(open));
      nav.toggleAttribute('data-open', open);
    }
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.masthead')) setMenu(false);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menu.focus();
      }
    });
    matchMedia('(max-width:880px)').addEventListener('change', () => setMenu(false));
  }
  const picture = document.querySelector('#hero-img');
  if (!picture) return;
  const views = [
    [picture.getAttribute('src'), picture.alt, 'Belohnung im richtigen Moment'],
    ['assets/platz-weit.webp','Blick auf eine eingezäunte Übungswiese mit Holztor.','Die Übungswiese · KI-Beispielbild'],
    ['assets/platz-detail.webp','Ein Golden Retriever übt zwischen Markierungen.','Orientierung auf dem Platz · KI-Beispielbild']
  ];
  let current = 0;
  function changePhoto(step) {
    current = (current + step + views.length) % views.length;
    const [src, alt, caption] = views[current];
    picture.src = src;
    picture.alt = alt;
    document.getElementById('hero-caption').textContent = caption;
  }
  document.querySelector('.gallery-nav').hidden = false;
  document.querySelector('#prev-photo').addEventListener('click', () => changePhoto(-1));
  document.querySelector('#next-photo').addEventListener('click', () => changePhoto(1));
})();
