/*
 * THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 * Change an item's status:  set status to "available", "booked" or "sold".
 *   - booked: shows an amber badge, people can still message you ("Ask anyway")
 *   - sold:   card is dimmed and the WhatsApp button is disabled
 *
 * Add photos: copy the files into the images/ folder, then list their paths, e.g.
 *   images: ["images/tv-1.jpg", "images/tv-2.jpg"]
 *   (empty list [] shows a placeholder)
 *
 * Set the WhatsApp number: CONFIG.whatsapp, digits only, country code 598,
 *   no "+", no leading 0. Example: "59899123456".
 *
 * Optional: link: "https://..." shows a "Product details" link (e.g. MercadoLibre page).
 *
 * Update CONFIG.lastUpdated (YYYY-MM-DD) whenever you change something.
 */
const CONFIG = { whatsapp: "59894345476", currency: "UYU", lastUpdated: "2026-11-13" };

const LISTINGS = [
  {
    id: "tv", section: "items", status: "available", price: 6000,
    title: { en: "Smart TV Hometech 43\"", es: "Smart TV Hometech 43\"" },
    desc: { en: "Hometech 43\" Full HD (1920×1080) smart TV, frameless. Android 12 with YouTube and Netflix, Wi-Fi, 3 HDMI, 2 USB, Ethernet. 60 Hz, 178° viewing angle.",
            es: "Smart TV Hometech 43\" Full HD (1920×1080), sin marco. Android 12 con YouTube y Netflix, Wi-Fi, 3 HDMI, 2 USB, Ethernet. 60 Hz, ángulo de visión 178°." },
    link: "https://www.tata.com.uy/smart-tv-hometech-43-full-hd-1000496117-156921/p",
    images: ["images/real-tv-1.jpg", "images/real-tv-2.jpg", "images/real-tv-3.jpg", "images/real-tv-4.jpg", "images/real-tv-5.jpg", "images/tv-1.jpg"]
  },
  {
    id: "monitor", section: "items", status: "available", price: 5000,
    title: { en: "Monitor Philips 27\" curved", es: "Monitor Philips 27\" curvo" },
    desc: { en: "Philips 271E1SCA 27\" curved monitor (1500R), Full HD 1920×1080, VA panel, 75 Hz, 4 ms, AMD FreeSync. 3000:1 contrast, 100% sRGB. HDMI + VGA, audio in and headphone out. 220 V.",
            es: "Monitor curvo Philips 271E1SCA de 27\" (1500R), Full HD 1920×1080, panel VA, 75 Hz, 4 ms, AMD FreeSync. Contraste 3000:1, 100% sRGB. HDMI + VGA, entrada de audio y salida de auriculares. 220 V." },
    link: "https://www.mercadolibre.com.uy/monitor-gamer-philips-con-pantalla-de-27-75hz-y-resolucion-full-hd/p/MLU43957817",
    images: ["images/real-monitor-1.jpg", "images/real-monitor-2.jpg", "images/ml-monitor-1.jpg", "images/ml-monitor-2.jpg", "images/ml-monitor-3.jpg", "images/ml-monitor-4.jpg", "images/ml-monitor-5.jpg"]
  },
  {
    id: "printer", section: "items", status: "available", price: 4000,
    title: { en: "Printer Canon Pixma G2110", es: "Impresora Canon Pixma G2110" },
    desc: { en: "Canon Pixma G2110 colour multifunction: print, scan, copy. Refillable 4-tank ink system, up to 4800×1200 dpi colour. USB (no Wi-Fi), 100-sheet tray, A4/Letter/envelopes. 220 V.",
            es: "Impresora multifunción a color Canon Pixma G2110: imprime, escanea, copia. Sistema de 4 tanques de tinta recargables, hasta 4800×1200 dpi a color. USB (sin Wi-Fi), bandeja de 100 hojas, A4/Carta/sobres. 220 V." },
    link: "https://www.mercadolibre.com.uy/impresora-multifuncion-a-color-canon-pixma-g2110/p/MLU16599370",
    images: ["images/real-printer-1.jpg", "images/ml-printer-1.jpg", "images/ml-printer-2.jpg", "images/ml-printer-3.jpg", "images/ml-printer-4.jpg", "images/ml-printer-5.jpg", "images/ml-printer-6.jpg"]
  },
  {
    id: "minibar", section: "items", status: "available", price: 4500,
    title: { en: "Minibar Enxuta 85 L", es: "Heladera minibar Enxuta 85 L" },
    desc: { en: "Enxuta RENX110FH-A minibar fridge, white, 85 L. Small freezer compartment, vegetable drawer, 2 glass shelves, interior light, 6 temperature levels. Energy class A, 220 V. 45 × 46 cm, 85 cm high.",
            es: "Heladera minibar Enxuta RENX110FH-A, blanca, 85 L. Compartimiento congelador, cajón de verduras, 2 estantes de vidrio, luz interior, 6 niveles de temperatura. Eficiencia energética A, 220 V. 45 × 46 cm, 85 cm de alto." },
    link: "https://www.mercadolibre.com.uy/heladera-minibar-enxuta-renx110fh-a-blanca-85l/p/MLU16597937",
    images: ["images/real-minibar-1.jpg", "images/real-minibar-2.jpg", "images/real-minibar-3.jpg", "images/ml-minibar-1.jpg", "images/ml-minibar-2.jpg", "images/ml-minibar-3.jpg"]
  },
  {
    id: "sofabed", section: "items", status: "available", price: 4000,
    title: { en: "Sofa bed Foldie (2-seater)", es: "Sillón cama Foldie (2 cuerpos)" },
    desc: { en: "Foldie 2-seater foam sofa bed (La Cueva Muebles), dark grey plain fabric, with cushions. Sofa: 135 × 78 cm, 64 cm high. Opens into a 135 × 190 cm bed. Supports up to 200 kg.",
            es: "Sillón cama Foldie de 2 cuerpos (La Cueva Muebles), espuma de alta densidad, tela lisa gris oscuro, con almohadones. Sillón: 135 × 78 cm, 64 cm de alto. Se abre en cama de 135 × 190 cm. Soporta hasta 200 kg." },
    link: "https://www.mercadolibre.com.uy/sillon-cama-2-cuerpos-foldie-sofa-dormitorio-living-lcm-color-gris-oscuro-diseno-de-la-tela-liso/p/MLU39453773",
    images: ["images/real-sofabed-1.jpg", "images/ml-sofabed-1.jpg", "images/ml-sofabed-2.jpg", "images/ml-sofabed-3.jpg", "images/ml-sofabed-4.jpg"]
  },
  {
    id: "boxbed", section: "items", status: "available", price: 2000,
    title: { en: "Box bed base, double", es: "Box / sommier 2 plazas" },
    desc: { en: "LTC double (2 plazas) box bed base, black. Fabric-covered wooden frame, 188 × 138 cm, 40 cm high. Up to 150 kg per side. Mattress not included.",
            es: "Base de cama box / sommier LTC de 2 plazas, negro. Estructura de madera forrada en tela, 188 × 138 cm, 40 cm de alto. Soporta hasta 150 kg por lado. No incluye colchón." },
    link: "https://www.mercadolibre.com.uy/box-base-cama-sommier-2-plazas-somier-dormitorio-color-negro-ltc/p/MLU34725377",
    images: ["images/ml-boxbed-1.jpg", "images/ml-boxbed-2.jpg", "images/ml-boxbed-3.jpg", "images/ml-boxbed-4.jpg"]
  },
  {
    id: "chair", section: "items", status: "available", price: 1000,
    title: { en: "Office chair Doona X5", es: "Silla de oficina Doona X5" },
    desc: { en: "Doona X5 ergonomic office chair, black mesh back, chrome base with wheels. Swivel, height-adjustable seat (46–56 cm), tilting backrest, armrests. Up to 90 kg.",
            es: "Silla de oficina ergonómica Doona X5, respaldo de malla negro, base cromada con ruedas. Giratoria, asiento regulable en altura (46–56 cm), respaldo basculante, apoyabrazos. Soporta hasta 90 kg." },
    link: "https://www.mercadolibre.com.uy/silla-de-oficina-doona-x5-negra-ergonomica-con-respaldo-reclinable/p/MLU18905734",
    images: ["images/real-chair-1.jpg", "images/ml-chair-1.jpg", "images/ml-chair-2.jpg", "images/ml-chair-3.jpg", "images/ml-chair-4.jpg", "images/ml-chair-5.jpg"]
  },
  {
    id: "desk", section: "items", status: "available", price: 750,
    title: { en: "Desk with trestles", es: "Escritorio con caballetes" },
    desc: { en: "Desk with a light wood-look top on black trestles with built-in shelves. 136 × 45 cm, 74 cm high. 2.4 cm thick top, holds a laptop and a printer at the same time. MDP, easy to take apart for moving.",
            es: "Escritorio con tapa símil madera clara y caballetes negros con estantes integrados. 136 × 45 cm, 74 cm de alto. Tapa de 2,4 cm de espesor, soporta notebook e impresora a la vez. MDP, fácil de desarmar para trasladar." },
    link: "https://www.mercadolibre.com.uy/escritorio-mesa-con-caballetes-diseno-oficina-pc-minimal-color-blanco/p/MLU18912506",
    images: ["images/real-desk-1.jpg", "images/real-desk-2.jpg"]
  },
  {
    id: "table", section: "items", status: "available", price: 750,
    title: { en: "Folding square table", es: "Mesa plegable cuadrada" },
    desc: { en: "Square folding table, iron frame and wood-look MDF top. 60 × 60 cm, 70 cm high, 4 kg. Folds flat, good for 2 people or small spaces.",
            es: "Mesa plegable cuadrada, estructura de hierro y tapa de MDF símil madera. 60 × 60 cm, 70 cm de alto, 4 kg. Se pliega, ideal para 2 personas o espacios chicos." },
    link: "https://www.mercadolibre.com.uy/mesa-plegable-cuadrada-de-hierro-y-madera/p/MLU27622273",
    images: ["images/real-table-1.jpg", "images/real-table-2.jpg", "images/ml-table-1.jpg", "images/ml-table-3.jpg"]
  },
  {
    id: "airfryer", section: "items", status: "available", price: 1000,
    title: { en: "Air fryer Nappo 5.7 L", es: "Freidora sin aceite Nappo 5,7 L" },
    desc: { en: "Nappo NEF-129 digital touch air fryer, black, 5.7 L basket with viewing window. 1500 W, adjustable 80–200 °C, non-stick.",
            es: "Freidora sin aceite Nappo NEF-129, digital táctil, negra, canasto de 5,7 L con visor. 1500 W, temperatura regulable 80–200 °C, antiadherente." },
    link: "https://www.mercadolibre.com.uy/freidora-sin-aceite-nappo-digital-tactil-5-litros-visor-color-negro/p/MLU23373853",
    images: ["images/real-airfryer-1.jpg", "images/real-airfryer-2.jpg", "images/real-airfryer-3.jpg", "images/ml-airfryer-1.jpg", "images/ml-airfryer-2.jpg", "images/ml-airfryer-3.jpg"]
  },
  {
    id: "apartment", section: "services", status: "available", price: 17400, priceSuffix: "month",
    wide: true,
    extra: { en: "+ approx. 4.000 UYU common expenses (gastos comunes)", es: "+ aprox. 4.000 UYU de gastos comunes" },
    total: { en: "≈ 21.400 UYU / month in total", es: "≈ 21.400 UYU / mes en total" },
    title: { en: "Studio apartment transfer, Punta Carretas", es: "Traspaso de monoambiente en Punta Carretas" },
    chips: [
      { en: "Unfurnished", es: "Sin amueblar" },
      { en: "Studio (monoambiente)", es: "Monoambiente" },
      { en: "Available from Dec 1", es: "Disponible desde el 1/12" }
    ],
    sections: [
      { title: { en: "Location", es: "Ubicación" }, icon: "pin", items: [
        { en: "José Ellauri 724, Trading Park building, 6th floor", es: "José Ellauri 724, edificio Trading Park, piso 6" },
        { en: "1 block from Parque Villa Biarritz", es: "A 1 cuadra del Parque Villa Biarritz" },
        { en: "Close to supermarkets, public transport and services", es: "Cerca de supermercados, transporte y servicios" }
      ] },
      { title: { en: "Requirements", es: "Requisitos" }, icon: "check", items: [
        { en: "1 month commission to the real estate agency (inmobiliaria)", es: "1 mes de comisión a la inmobiliaria" },
        { en: "Rent guarantee: Porto, Sura, Mapfre, etc.", es: "Garantía de alquiler: Porto, Sura, Mapfre, etc." }
      ] }
    ],
    desc: { en: "", es: "" },
    mapLink: "https://www.google.com/maps/search/?api=1&query=Jos%C3%A9+Ellauri+724,+Montevideo,+Uruguay",
    images: ["images/real-apartment-1.jpg", "images/real-apartment-2.jpg", "images/real-apartment-3.jpg"]
  },
  {
    id: "internet", section: "services", status: "available", price: 1700, priceSuffix: "month",
    title: { en: "Antel internet transfer", es: "Traspaso de internet Antel" },
    desc: { en: "Transfer of an Antel internet connection, unlimited.",
            es: "Traspaso de conexión de internet Antel, ilimitada." },
    images: ["images/real-internet-1.jpg"]
  }

];
