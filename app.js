(function () {
  "use strict";

  var STRINGS = {
    en: {
      title: "Moving Out Sale + Apartment Transfer",
      intro: "I'm moving out: furniture, appliances and electronics for sale, plus a transfer of my unfurnished studio apartment in Punta Carretas (from December 1st) and my Antel internet connection. Message me on WhatsApp if something interests you.",
      location: "Punta Carretas, Montevideo, Uruguay",
      all: "All", availableOnly: "Available only",
      items: "Items for sale", services: "Transfers",
      available: "Available", booked: "Booked", sold: "Sold",
      wa: "Message on WhatsApp", askAnyway: "Ask anyway",
      month: "month", perMonth: "/ month",
      updated: "Last updated: ", pickup: "Pickup: details to be confirmed by message.",
      fab: "WhatsApp", noResults: "Nothing available right now.", details: "Product reference", map: "See on Google Maps",
      prev: "Previous photo", next: "Next photo", goTo: "Go to photo ", close: "Close", photo: "Photo ", lang: "Language",
      msgItem: function (t, p) { return "Hi! I'm interested in: " + t + " (" + p + "). Is it still available?"; },
      msgGeneral: "Hi! I saw your moving out sale and I have a question."
    },
    es: {
      title: "Venta por mudanza + traspaso de apartamento",
      intro: "Me mudo: vendo muebles, electrodomésticos y electrónica, y traspaso mi monoambiente sin amueblar en Punta Carretas (desde el 1 de diciembre) y mi conexión de internet Antel ilimitada. Escribime por WhatsApp si algo te interesa.",
      location: "Punta Carretas, Montevideo, Uruguay",
      all: "Todos", availableOnly: "Solo disponibles",
      items: "Artículos en venta", services: "Traspasos",
      available: "Disponible", booked: "Reservado", sold: "Vendido",
      wa: "Escribir por WhatsApp", askAnyway: "Consultar igual",
      month: "mes", perMonth: "/ mes",
      updated: "Última actualización: ", pickup: "Retiro: detalles a coordinar por mensaje.",
      fab: "WhatsApp", noResults: "No hay nada disponible por ahora.", details: "Referencia del producto", map: "Ver en Google Maps",
      prev: "Foto anterior", next: "Foto siguiente", goTo: "Ir a la foto ", close: "Cerrar", photo: "Foto ", lang: "Idioma",
      msgItem: function (t, p) { return "¡Hola! Me interesa: " + t + " (" + p + "). ¿Sigue disponible?"; },
      msgGeneral: "¡Hola! Vi tu venta por mudanza y tengo una consulta."
    }
  };

  var PLACEHOLDER = "images/placeholder.svg";
  var lang = "en";
  var availableOnly = false;
  try { var saved = localStorage.getItem("lang"); if (saved === "en" || saved === "es") lang = saved; } catch (e) {}

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtNumber(n) {
    try { return new Intl.NumberFormat("es-UY", { useGrouping: "always" }).format(n); }
    catch (e) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "."); }
  }
  function waUrl(msg) {
    return "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
  }
  function plainPrice(l, s) {
    return fmtNumber(l.price) + " " + CONFIG.currency + (l.priceSuffix ? "/" + s.month : "");
  }
  function storeName(url) {
    if (/mercadolibre\./.test(url)) return "Mercado Libre";
    if (/tata\.com/.test(url)) return "Tata";
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return url; }
  }
  function imgList(l) { return l.images && l.images.length ? l.images : [PLACEHOLDER]; }

  function carouselHtml(l, s) {
    var imgs = imgList(l), t = esc(l.title[lang]), multi = imgs.length > 1;
    var h = '<div class="carousel" data-id="' + esc(l.id) + '"><div class="track">';
    imgs.forEach(function (src, i) {
      h += '<img class="slide" src="' + esc(src) + '" alt="' + t + '" loading="lazy" data-i="' + i + '">';
    });
    h += "</div>";
    if (multi) {
      h += '<span class="counter" aria-hidden="true">1/' + imgs.length + "</span>";
      h += '<button type="button" class="arrow prev" hidden aria-label="' + esc(s.prev) + '">&#8249;</button>' +
           '<button type="button" class="arrow next" aria-label="' + esc(s.next) + '">&#8250;</button><div class="dots">';
      imgs.forEach(function (_, i) {
        h += '<button type="button" class="dot" data-i="' + i + '" aria-label="' + esc(s.goTo + (i + 1)) + '"' +
             (i === 0 ? ' aria-current="true"' : "") + "></button>";
      });
      h += "</div>";
    }
    return h + "</div>";
  }

  function cardHtml(l, s) {
    var st = l.status, title = l.title[lang];
    var label, btn;
    if (st === "sold") {
      btn = '<a class="wa-btn disabled" aria-disabled="true" role="link">' + esc(s.sold) + "</a>";
    } else {
      label = st === "booked" ? s.askAnyway : s.wa;
      btn = '<a class="wa-btn" target="_blank" rel="noopener" href="' +
            esc(waUrl(s.msgItem(title, plainPrice(l, s)))) + '">' + esc(label) + "</a>";
    }
    var chips = (l.chips || []).map(function (c) { return '<li>' + esc(c[lang]) + "</li>"; }).join("");
    var secs = (l.sections || []).map(function (sec) {
      return '<section class="facts facts-' + esc(sec.icon || "") + '"><h4>' + esc(sec.title[lang]) + "</h4><ul>" +
        sec.items.map(function (it) { return "<li>" + esc(it[lang]) + "</li>"; }).join("") + "</ul></section>";
    }).join("");
    return '<article class="card is-' + esc(st) + (l.wide ? " wide" : "") + '" data-status="' + esc(st) + '">' +
      carouselHtml(l, s) +
      '<div class="card-body"><span class="badge ' + esc(st) + '">' + esc(s[st]) + "</span>" +
      "<h3>" + esc(title) + "</h3>" +
      '<div class="price">$ ' + fmtNumber(l.price) + " " + esc(CONFIG.currency) +
      (l.priceSuffix ? ' <small>' + esc(s.perMonth) + "</small>" : "") + "</div>" +
      (l.extra ? '<p class="extra">' + esc(l.extra[lang]) + "</p>" : "") +
      (l.total ? '<p class="total">' + esc(l.total[lang]) + "</p>" : "") +
      (chips ? '<ul class="chips">' + chips + "</ul>" : "") +
      (l.desc && l.desc[lang] ? '<p class="desc">' + esc(l.desc[lang]) + "</p>" : "") + secs +
      (l.mapLink ? '<a class="ref-link" href="' + esc(l.mapLink) + '" target="_blank" rel="noopener">' + esc(s.map) + " &#8599;</a>" : "") +
      (l.link ? '<a class="ref-link" href="' + esc(l.link) + '" target="_blank" rel="noopener">' + esc(s.details + " (" + storeName(l.link) + ")") + " &#8599;</a>" : "") + btn + "</div></article>";
  }

  function render() {
    var s = STRINGS[lang];
    document.documentElement.lang = lang;
    document.title = s.title;
    $("title").textContent = s.title;
    $("intro").textContent = s.intro;
    $("location").textContent = s.location;
    $("h-items").textContent = s.items;
    $("h-services").textContent = s.services;
    $("updated").textContent = s.updated + CONFIG.lastUpdated;
    $("pickup").textContent = s.pickup;
    var fab = $("fab");
    fab.textContent = s.fab;
    fab.href = waUrl(s.msgGeneral);
    fab.setAttribute("aria-label", s.fab);
    $("filters").setAttribute("aria-label", s.availableOnly);
    $("filters").innerHTML =
      '<button type="button" class="chip" data-f="all" aria-pressed="' + !availableOnly + '">' + esc(s.all) + "</button>" +
      '<button type="button" class="chip" data-f="avail" aria-pressed="' + availableOnly + '">' + esc(s.availableOnly) + "</button>";
    document.querySelector(".lang-toggle").setAttribute("aria-label", s.lang);
    Array.prototype.forEach.call(document.querySelectorAll(".lang-toggle button"), function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
    });
    $("lb-close").setAttribute("aria-label", s.close);
    $("lb-prev").setAttribute("aria-label", s.prev);
    $("lb-next").setAttribute("aria-label", s.next);

    var shown = 0;
    ["items", "services"].forEach(function (sec) {
      var list = LISTINGS.filter(function (l) {
        return l.section === sec && (!availableOnly || l.status === "available");
      });
      shown += list.length;
      $("grid-" + sec).innerHTML = list.map(function (l) { return cardHtml(l, s); }).join("");
      $("grid-" + sec).parentNode.hidden = list.length === 0;
    });
    $("empty").hidden = shown !== 0;
    $("empty").textContent = s.noResults;
    wireCarousels();
  }

  function wireCarousels() {
    Array.prototype.forEach.call(document.querySelectorAll(".carousel"), function (c) {
      var l = LISTINGS.filter(function (x) { return x.id === c.getAttribute("data-id"); })[0];
      var track = c.querySelector(".track"), dots = c.querySelectorAll(".dot");
      var slides = c.querySelectorAll(".slide");
      Array.prototype.forEach.call(slides, function (img) {
        img.addEventListener("error", function () {
          if (img.getAttribute("src") !== PLACEHOLDER) img.src = PLACEHOLDER;
        });
        img.addEventListener("click", function () {
          openLightbox(l, Number(img.getAttribute("data-i")));
        });
      });
      function idx() { return Math.round(track.scrollLeft / track.clientWidth) || 0; }
      function go(i) {
        i = Math.max(0, Math.min(slides.length - 1, i));
        track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
      }
      if (dots.length) {
        var counter = c.querySelector(".counter"), prev = c.querySelector(".prev"), next = c.querySelector(".next");
        track.addEventListener("scroll", function () {
          var cur = idx();
          counter.textContent = (cur + 1) + "/" + slides.length;
          prev.hidden = cur === 0;
          next.hidden = cur === slides.length - 1;
          Array.prototype.forEach.call(dots, function (d, i) {
            if (i === cur) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
          });
        }, { passive: true });
        Array.prototype.forEach.call(dots, function (d, i) { d.addEventListener("click", function () { go(i); }); });
        prev.addEventListener("click", function () { go(idx() - 1); });
        next.addEventListener("click", function () { go(idx() + 1); });
      }
    });
  }

  // Lightbox
  var lbList = [], lbIdx = 0;
  function lbShow() {
    var img = $("lb-img");
    img.onerror = function () { img.onerror = null; img.src = PLACEHOLDER; };
    img.src = lbList[lbIdx];
    img.alt = lbTitle;
    var single = lbList.length < 2;
    $("lb-prev").classList.toggle("single", single);
    $("lb-next").classList.toggle("single", single);
  }
  var lbTitle = "";
  function openLightbox(l, i) {
    lbList = imgList(l); lbIdx = i; lbTitle = l.title[lang];
    lbShow();
    $("lightbox").hidden = false;
    document.body.classList.add("no-scroll");
    $("lb-close").focus();
  }
  function closeLightbox() { $("lightbox").hidden = true; document.body.classList.remove("no-scroll"); }
  function lbStep(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbShow(); }
  $("lb-close").addEventListener("click", closeLightbox);
  $("lb-prev").addEventListener("click", function () { lbStep(-1); });
  $("lb-next").addEventListener("click", function () { lbStep(1); });
  $("lightbox").addEventListener("click", function (e) { if (e.target === this) closeLightbox(); });
  document.addEventListener("keydown", function (e) {
    if ($("lightbox").hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft" && lbList.length > 1) lbStep(-1);
    else if (e.key === "ArrowRight" && lbList.length > 1) lbStep(1);
  });

  // Controls
  document.querySelector(".lang-toggle").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-lang]");
    if (!b) return;
    lang = b.getAttribute("data-lang");
    try { localStorage.setItem("lang", lang); } catch (err) {}
    render();
  });
  $("filters").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-f]");
    if (!b) return;
    availableOnly = b.getAttribute("data-f") === "avail";
    render();
  });

  window.STRINGS = STRINGS;
  render();
})();
