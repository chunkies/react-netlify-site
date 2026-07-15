const rawFrames = [
  ['dsc-5384', 'Gallery studies', 'Black-and-white gallery scene with a row of wooden chairs and a lone visitor'],
  ['dsc-5398', 'Gallery studies', 'Black-and-white gallery visitor gesturing between a sculpture and a wall of framed artworks'],
  ['dsc-5405', 'Gallery studies', 'Visitor in a red coat standing beside chairs and a red geometric textile in a white gallery'],
  ['dsc-5415', 'Gallery studies', 'Solitary visitor framed by glass, concrete panels, and a bright gallery doorway'],
  ['dsc-5455', 'Street / day', 'Red vintage car passing through a busy Melbourne city street'],
  ['dsc-5577', 'Street / day', 'Person in sunglasses and a red jacket posing among a city crowd'],
  ['dsc-5675', 'Street / day', 'Pikachu figure fixed to a scooter outside a colourful city shopfront'],
  ['dsc-5687', 'Street / day', 'Black-and-white street portrait layered against two large faces on a poster'],
  ['dsc-5792', 'Street / day', 'Five sculptural blue chairs lined up beneath posters in a bright room'],
  ['dsc-5898', 'Street / day', 'Pedestrian carrying a folded red and white chair through the city'],
  ['dsc-6014', 'Street / day', 'Cluster of megaphones on the pavement beside a bicycle wheel'],
  ['dsf-6583', 'Colour / form', 'Blue architectural panel edged by narrow vertical stripes of pink and green'],
  ['dsf-6589', 'Colour / form', 'Angular black, pink, yellow, and green beams crossing beneath a building'],
  ['dsf-6593', 'Colour / form', 'Stepped yellow, orange, pink, and green roofline cutting across a deep blue sky'],
  ['dsf-6595', 'Colour / form', 'Bold pink, green, and yellow facade rising against a cloudless blue sky'],
  ['dsf-7844', 'City fragments', 'Polite handwritten fruit-picking notice fixed among leaves and reflective windows'],
  ['dsf-7862', 'City fragments', 'Dark cross and bare branches silhouetted against a pale overcast sky'],
  ['dsf-7867', 'City fragments', 'Colourfully patterned trousers and boots waiting at a yellow street crossing'],
  ['dsf-7875', 'City fragments', 'Weathered rooftop sign and tram wires against a muted blue sky'],
  ['dsf-7877', 'City fragments', 'Sunlit supermarket lettering and a red study poster seen at an angle'],
  ['dsf-7917', 'City fragments', 'Faded vertical cafe sign divided by a dark utility pole'],
  ['dsf-7950', 'City fragments', 'Rows of silver and red beer kegs stacked beneath corrugated metal'],
  ['dsf-7966', 'City fragments', 'Black-and-white takeaway food awning crossed by dense overhead wires'],
  ['dsf-7969', 'City fragments', 'Sticker-covered street bin with a pedestrian crossing behind it'],
  ['dsf-8025', 'City fragments', 'Yellow railway crossing signs suspended against a violet evening sky'],
  ['dsf-8168', 'Street / day', 'Black-and-white street portrait of a headphone-wearing pedestrian in a moving crowd'],
  ['dsf-8226', 'Street / night', 'Night portrait of a woman in sunglasses doubled in a restaurant window reflection'],
  ['dsf-8315', 'Street / day', 'Pink shop installation with a shopping trolley and scattered leaves'],
  ['dsf-8316', 'Street / day', 'Back of a customised denim jacket with a Wild patch in a station crowd'],
  ['dsf-8445', 'Street / day', 'Older man in a suit caught in a narrow shaft of light on a dark street'],
  ['dsf-8477', 'Street / day', 'Black-and-white profile of an older bearded man passing another pedestrian'],
  ['dsf-8710', 'Street / night', 'Red-lit stairwell and arched doorway glowing in a dark city facade'],
  ['dsf-8727', 'Street / day', 'Pedestrian standing between two fallen stop signs at a road crossing'],
  ['dsf-8735', 'City fragments', 'Nearly black interior punctuated by a small barred window and a sliver of light'],
  ['dsf-8751', 'Street / day', 'Dog looking through a shop window layered with plants, chairs, and street reflections'],
  ['dsf-8773', 'Street / day', 'Two masked pedestrians passing each other on a bright city corner'],
  ['dsf-8787', 'After dark', 'Two figures wrapped in Australian flags walking into the night'],
  ['dsf-8795', 'After dark', 'Tightly cropped hand and face emerging from black clothing at night'],
  ['dsf-8796', 'After dark', 'Football supporter crouching and gesturing toward the camera in the city'],
  ['dsf-8798', 'After dark', 'Two friends posing together under direct flash on a night street'],
  ['dsf-8801', 'After dark', 'Direct-flash portrait of a young man in oversized sunglasses and headphones'],
  ['dsf-8803', 'After dark', 'Small Palestine solidarity gathering beside a sticker-covered city pole'],
  ['dsf-8805', 'After dark', 'Man in a mustard beanie, glasses, and red scarf walking through a night crowd'],
  ['dsf-8813', 'After dark', 'Person in a colourful patterned hoodie looking down at a phone under flash'],
  ['dsf-8817', 'After dark', 'Figure in green holding a Palestinian flag above a city gathering'],
  ['dsf-8818', 'After dark', 'Blue-haired person in black looking past the camera beneath scattered city lights'],
  ['dsf-8819', 'After dark', 'Older man raising a Palestinian flag amid a tightly packed night crowd'],
  ['dsf-8850', 'Street portraits', 'Group of young people posing outdoors with a purple birthday sash'],
  ['dsf-8852', 'Street portraits', 'Man in an ornate red and gold jacket standing in a city square'],
  ['dsf-8853', 'Street portraits', 'Close view of a gold-gloved hand holding a cigarette against black leather'],
  ['dsf-8855', 'Street portraits', 'Vertical portrait of a curly-haired person in pink, black leather, and gold gloves'],
  ['dsf-8856', 'Street portraits', 'Direct portrait of a curly-haired person holding a cigarette in a gold glove'],
  ['dsf-8858', 'Street portraits', 'Passengers looking through the windows of a white city tram'],
  ['dsf-8859', 'Street portraits', 'Person in a vivid red jacket walking away through a crowded crossing'],
  ['dsf-8863', 'After dark', 'Woman moving quickly beside stone steps on a tilted night street'],
  ['dsf-8866', 'After dark', 'Man framed by a shop window and a red sale sign at night'],
  ['dsf-8868', 'After dark', 'Figure in a pale blue blazer walking away beneath city lights'],
  ['dsf-8872', 'After dark', 'Person in an orange hat seated beside a metal street fixture at night'],
  ['dsf-8897', 'After dark', 'Vertical portrait of a man in a dark suit and sunglasses under direct flash'],
  ['dsf-8898', 'After dark', 'Smiling person carrying bright green balloons through a night crowd'],
  ['dsf-8904', 'After dark', 'Older pedestrian leaning through a tilted flash-lit city frame'],
  ['dsf-8936', 'After dark', 'Distant illuminated venue glowing through haze above a night crowd'],
  ['dsf-8991', 'After dark', 'Public payphone isolated in a black wall beneath a strip of red text'],
  ['dsf-8996', 'After dark', 'Figure partly hidden behind a giant pink flamingo against a brick wall'],
  ['dsf-8997', 'After dark', 'Two women laughing beside a giant pink flamingo under direct flash'],
  ['dsf-8998', 'After dark', 'Two friends posing closely with a pink inflatable flamingo'],
  ['dsf-9001', 'After dark', 'Woman reclining across a pink inflatable flamingo on the pavement'],
  ['dsf-9003', 'After dark', 'Portrait playfully obscured by the curved neck of a pink flamingo'],
  ['dsf-9008', 'After dark', 'Flash portrait of a man in visor sunglasses and a tilted cap outside a bar'],
]

const portraitFrames = new Set(['dsf-8710', 'dsf-8855', 'dsf-8856', 'dsf-8897'])

export const portfolioItems = rawFrames.map(([slug, category, alt], index) => {
  const id = String(index + 1).padStart(2, '0')

  return {
    id,
    slug,
    category,
    location: 'Melbourne, Australia',
    image: `/images/portfolio/full/${slug}.webp`,
    displayImage: `/images/portfolio/display/${slug}.webp`,
    thumbnail: `/images/portfolio/thumb/${slug}.webp`,
    alt,
    orientation: portraitFrames.has(slug) ? 'portrait' : 'landscape',
  }
})

const featuredFrameLayouts = [
  ['dsf-8168', 'wide'],
  ['dsf-8856', 'portrait'],
  ['dsf-6593', 'landscape'],
  ['dsf-8226', 'wide'],
  ['dsc-5405', 'square'],
  ['dsf-8445', 'landscape'],
  ['dsf-8316', 'wide'],
  ['dsf-8801', 'landscape-left'],
  ['dsf-8996', 'landscape'],
  ['dsc-5687', 'wide'],
]

const framesBySlug = new Map(portfolioItems.map((item, index) => [item.slug, { ...item, galleryIndex: index }]))

export const featuredPortfolioItems = featuredFrameLayouts.map(([slug, layout]) => ({
  ...framesBySlug.get(slug),
  layout,
}))

export const heroFrame = framesBySlug.get('dsf-8226')
export const mobileHeroFrame = framesBySlug.get('dsf-8710')
export const aboutFrame = framesBySlug.get('dsf-8855')
export const openingFrames = [
  { ...framesBySlug.get('dsf-6593'), label: 'Colour' },
  { ...framesBySlug.get('dsf-8168'), label: 'Street' },
  { ...framesBySlug.get('dsf-8856'), label: 'Portrait' },
]
