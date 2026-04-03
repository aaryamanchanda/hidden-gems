export type Category = "Food & Drink" | "Nature" | "Art & Culture" | "History" | "Music & Nightlife" | "Books & Literature" | "Markets";

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface Gem {
  id: string;
  name: string;
  category: Category;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  verified: boolean;
  submittedBy: string;
  pinX: number; // % position on the legacy CSS map
  pinY: number;
  lat: number;  // Real latitude for Leaflet map
  lng: number;  // Real longitude for Leaflet map
  reviews: Review[];
  bestTime: string;
  localTip: string;
}

export const gems: Gem[] = [
  {
    id: "1",
    name: "The Whispering Alley Café",
    category: "Food & Drink",
    location: "Old Quarter",
    city: "Jaipur",
    country: "India",
    rating: 4.8,
    reviewCount: 127,
    description: "A century-old haveli tucked behind the spice market, serving hand-brewed chai and forgotten Rajasthani recipes.",
    longDescription: "Hidden behind a narrow alley barely wide enough for two people, The Whispering Alley Café is one of Jaipur's most treasured secrets. Built inside a 200-year-old haveli, its walls tell stories through faded frescoes and antique mirrors. The owner, a 70-year-old local, serves recipes passed down from her grandmother — think kesar chai brewed over open flame and dal baati churma that takes 6 hours to prepare. No menus, no WiFi — just food, stories, and the smell of jasmine.",
    image: "https://images.unsplash.com/photo-1760378555604-4391305f49c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhbGxleSUyMGNhZmUlMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzc1MTk1MDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["chai", "heritage", "no-menu", "authentic"],
    verified: true,
    submittedBy: "Priya M.",
    pinX: 62,
    pinY: 42,
    lat: 26.9124,
    lng: 75.7873,
    bestTime: "Early morning (7–9 AM)",
    localTip: "Ask for the 'special' — it's not on any menu. Just smile and say 'ghar ka khana chahiye'.",
    reviews: [
      { id: "r1", author: "Arjun T.", avatar: "A", rating: 5, text: "This place blew my mind. Best chai I've had in my life. The aunty running it has so many stories to share!", date: "March 2026" },
      { id: "r2", author: "Sofia K.", avatar: "S", rating: 5, text: "Found this on a travel forum and it exceeded every expectation. Totally off the tourist grid.", date: "February 2026" },
      { id: "r3", author: "Vikram S.", avatar: "V", rating: 4, text: "Magical atmosphere. The food takes time but oh boy is it worth the wait.", date: "January 2026" },
    ]
  },
  {
    id: "2",
    name: "The Hanging Gardens",
    category: "Nature",
    location: "Bandra West",
    city: "Mumbai",
    country: "India",
    rating: 4.6,
    reviewCount: 89,
    description: "A secret sky garden hidden on the rooftop of a 1920s building, overgrown with ferns and bougainvillea.",
    longDescription: "Five floors above the chaos of Bandra's main road, a forgotten rooftop has been transformed into a lush urban oasis. The Hanging Gardens is maintained by a collective of local residents who have been cultivating this secret for over 20 years. Accessible only through a specific building entrance (ask at the chai stall below), the garden offers breathtaking views of the Arabian Sea and the Bandra-Worli sea link — without any crowds.",
    image: "https://images.unsplash.com/photo-1768126793114-06f2849d339c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWNyZXQlMjBnYXJkZW4lMjB1cmJhbiUyMGdyZWVuJTIwc3BhY2V8ZW58MXx8fHwxNzc1MTk1MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["garden", "rooftop", "peaceful", "sea-view"],
    verified: true,
    submittedBy: "Neha D.",
    pinX: 58,
    pinY: 47,
    lat: 19.0596,
    lng: 72.8295,
    bestTime: "Sunset (5–7 PM)",
    localTip: "The caretaker waters the plants at 6 PM every evening. Join him and you'll get the full tour.",
    reviews: [
      { id: "r1", author: "Riya B.", avatar: "R", rating: 5, text: "I cried when I found this place. A true oasis in Mumbai's madness.", date: "March 2026" },
      { id: "r2", author: "James H.", avatar: "J", rating: 4, text: "Incredible views. Bit hard to find but worth every minute of searching.", date: "February 2026" },
    ]
  },
  {
    id: "3",
    name: "Chandni Chowk Night Bazaar",
    category: "Markets",
    location: "Old Delhi",
    city: "Delhi",
    country: "India",
    rating: 4.7,
    reviewCount: 214,
    description: "After midnight, the lanes of Chandni Chowk transform into a secret wholesale bazaar where locals trade silks, spices, and stories.",
    longDescription: "Most tourists visit Chandni Chowk during the day. But at 1 AM, something magical happens — the streets fill up with a completely different crowd. Wholesale traders, night-shift workers, and old Delhi families gather for late-night nihari and haleem cooked in massive copper vats that have been simmering since sundown. This is the real Chandni Chowk — vibrant, chaotic, and intoxicatingly authentic.",
    image: "https://images.unsplash.com/photo-1579603911786-3e6fed0f209a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMHN0cmVldCUyMGZvb2QlMjBtYXJrZXQlMjBsaWdodHN8ZW58MXx8fHwxNzc1MTk1MDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["night-market", "street-food", "wholesale", "spices"],
    verified: true,
    submittedBy: "Kabir A.",
    pinX: 63,
    pinY: 39,
    lat: 28.6562,
    lng: 77.2312,
    bestTime: "1 AM – 4 AM",
    localTip: "Only cash works here. Bring small bills and wear comfortable shoes.",
    reviews: [
      { id: "r1", author: "Tanvi G.", avatar: "T", rating: 5, text: "This is the Delhi I always wanted to see. Raw, real, and absolutely delicious.", date: "March 2026" },
      { id: "r2", author: "Marco L.", avatar: "M", rating: 5, text: "As a food blogger, this is the single best tip I've ever received.", date: "January 2026" },
      { id: "r3", author: "Deepa V.", avatar: "D", rating: 4, text: "Go with a local friend if you can. It's a bit overwhelming at first.", date: "March 2026" },
    ]
  },
  {
    id: "4",
    name: "The Underground Jazz Cellar",
    category: "Music & Nightlife",
    location: "Koregaon Park",
    city: "Pune",
    country: "India",
    rating: 4.9,
    reviewCount: 76,
    description: "An invite-only jazz club that operates out of a colonial-era wine cellar, known only to Pune's music underground.",
    longDescription: "Below a nondescript restaurant on Ferguson College Road lies one of India's best-kept musical secrets. The Underground Jazz Cellar hosts intimate performances by jazz legends, emerging artists, and experimental fusion musicians — often improvising in sessions that last until dawn. With no official address listed anywhere, entrance is through word-of-mouth only. The space seats just 40 people, surrounded by original brickwork and candlelight.",
    image: "https://images.unsplash.com/photo-1722554184444-1fb116c82174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bmRlcmdyb3VuZCUyMGphenolMjBiYXIlMjBtb29keXxlbnwxfHx8fDE3NzUxOTUwNTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["jazz", "invite-only", "colonial", "intimate"],
    verified: false,
    submittedBy: "Rahul N.",
    pinX: 60,
    pinY: 46,
    lat: 18.5314,
    lng: 73.8446,
    bestTime: "Friday & Saturday nights (10 PM onward)",
    localTip: "Find Rahul at the Irani café across the street — he's the unofficial doorman.",
    reviews: [
      { id: "r1", author: "Ananya P.", avatar: "A", rating: 5, text: "Life-changing experience. I've been to jazz clubs worldwide and this tops them all.", date: "February 2026" },
      { id: "r2", author: "Dev M.", avatar: "D", rating: 5, text: "The acoustics in that cellar are insane. It sounds like the music is coming from inside the walls.", date: "March 2026" },
    ]
  },
  {
    id: "5",
    name: "Skyline Observers Deck",
    category: "Nature",
    location: "Byculla",
    city: "Mumbai",
    country: "India",
    rating: 4.5,
    reviewCount: 156,
    description: "A hidden rooftop observatory on top of an abandoned textile mill, offering a 360° panorama of the city's skyline.",
    longDescription: "In a city where every square foot is monetized, this free rooftop viewpoint is nothing short of miraculous. Discovered by urban explorers in 2019, the rooftop of the old Byculla Textile Mill is now an unofficial gathering spot for photographers, couples, and solo wanderers who want a perspective on Mumbai that money can't buy. The view stretches from the Victorian Gothic buildings of CST to the gleaming towers of Lower Parel.",
    image: "https://images.unsplash.com/photo-1640108820517-59bad49db431?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwdmlldyUyMGNpdHklMjBzdW5zZXR8ZW58MXx8fHwxNzc1MTk1MDUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["rooftop", "photography", "skyline", "free"],
    verified: true,
    submittedBy: "Siddharth K.",
    pinX: 57,
    pinY: 46,
    lat: 18.9794,
    lng: 72.8328,
    bestTime: "Golden hour (5:30–7 PM)",
    localTip: "The main gate looks locked but the side entrance on the left is always open.",
    reviews: [
      { id: "r1", author: "Lena R.", avatar: "L", rating: 5, text: "Best sunset spot in all of Mumbai, period. No tourists, no noise.", date: "March 2026" },
      { id: "r2", author: "Kiran P.", avatar: "K", rating: 4, text: "Climb is a bit sketchy but the view absolutely justifies it.", date: "February 2026" },
    ]
  },
  {
    id: "6",
    name: "Shiva's Secret Temple",
    category: "History",
    location: "Hampi Ruins",
    city: "Hampi",
    country: "India",
    rating: 4.9,
    reviewCount: 43,
    description: "A forgotten 14th-century Shiva temple buried deep in the banana plantations behind the main Virupaksha site.",
    longDescription: "While tourists crowd the main Virupaksha temple, locals know that walking 3 km east through the banana plantations leads to a perfectly preserved 14th-century Shiva temple that sees fewer than 10 visitors per month. The temple's intricate stone carvings remain sharp as the day they were carved, protected by centuries of foliage. An elderly priest still maintains the oil lamp inside — he has been doing so every single day for the past 40 years.",
    image: "https://images.unsplash.com/photo-1758627697776-37db54df9bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwdGVtcGxlJTIwaGlkZGVuJTIwZm9yZXN0fGVufDF8fHx8MTc3NTE5NTA1MHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["temple", "ruins", "14th-century", "offbeat"],
    verified: true,
    submittedBy: "Ananya S.",
    pinX: 61,
    pinY: 49,
    lat: 15.325,
    lng: 76.46,
    bestTime: "Early morning (sunrise)",
    localTip: "Leave an offering of flowers at the entrance — the priest will share stories of the temple's history.",
    reviews: [
      { id: "r1", author: "Pablo R.", avatar: "P", rating: 5, text: "I've traveled through 40 countries and this is one of the most spiritual places I've ever been.", date: "January 2026" },
      { id: "r2", author: "Priti L.", avatar: "P", rating: 5, text: "Deeply moving. The priest's stories alone are worth the walk.", date: "March 2026" },
    ]
  },
  {
    id: "7",
    name: "Pages & Chai Antiquarian",
    category: "Books & Literature",
    location: "Connaught Place",
    city: "Delhi",
    country: "India",
    rating: 4.7,
    reviewCount: 98,
    description: "A tiny bookshop hidden behind a tailor's stall, stocking rare first-edition books and out-of-print Indian literature.",
    longDescription: "Behind a tailor's stall in the back lanes of Connaught Place, Pages & Chai has been operating since 1958. The current owner, a retired professor, personally curates every book. You'll find first editions of R.K. Narayan, signed copies of Ruskin Bond, and rare Urdu poetry collections that libraries would pay fortunes for. The professor brews chai for every visitor and loves debating literature — come prepared for a 2-hour conversation.",
    image: "https://images.unsplash.com/photo-1763368230669-3a2e97368032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hvcCUyMHZpbnRhZ2UlMjBsaWJyYXJ5JTIwY296eXxlbnwxfHx8fDE3NzUxOTUwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["books", "first-editions", "chai", "literature"],
    verified: true,
    submittedBy: "Meera J.",
    pinX: 63,
    pinY: 38,
    lat: 28.6315,
    lng: 77.2167,
    bestTime: "Afternoon (2–5 PM)",
    localTip: "Don't rush. The best books are in the storeroom — ask the professor to show you.",
    reviews: [
      { id: "r1", author: "Neil M.", avatar: "N", rating: 5, text: "Found a 1962 first edition of 'Malgudi Days' here for ₹200. I almost fainted.", date: "February 2026" },
      { id: "r2", author: "Shreya A.", avatar: "S", rating: 5, text: "The professor's chai is as good as his book recommendations.", date: "March 2026" },
    ]
  },
  {
    id: "8",
    name: "Valley of Echoes Waterfall",
    category: "Nature",
    location: "Coorg Foothills",
    city: "Coorg",
    country: "India",
    rating: 4.8,
    reviewCount: 61,
    description: "A triple-tier waterfall accessible only through a bamboo forest trail known to local Kodava tribes.",
    longDescription: "The Valley of Echoes is accessible only via a 4-km trail through a dense bamboo forest that the local Kodava community considers sacred. Unlike Abbey Falls (which sees thousands of tourists daily), this waterfall sees perhaps 5 visitors per week. The three cascading tiers create a natural amphitheater of sound, giving the valley its name. The pool at the base is crystal clear and perfectly safe for swimming.",
    image: "https://images.unsplash.com/photo-1696912161705-54f8126d6b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBoaWRkZW4lMjBuYXR1cmUlMjB0cmFpbHxlbnwxfHx8fDE3NzUxOTUwNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["waterfall", "trek", "sacred", "swimming"],
    verified: true,
    submittedBy: "Rohan K.",
    pinX: 62,
    pinY: 51,
    lat: 12.4244,
    lng: 75.7382,
    bestTime: "Post-monsoon (Sept–Nov)",
    localTip: "Hire a Kodava guide from the village. They know the trail and the best spots.",
    reviews: [
      { id: "r1", author: "Tara S.", avatar: "T", rating: 5, text: "The most magical place I've ever been. Worth every step of that jungle trail.", date: "October 2025" },
      { id: "r2", author: "Chris W.", avatar: "C", rating: 5, text: "Swam in the pool for 2 hours. The sound is unlike anything I've experienced.", date: "November 2025" },
    ]
  },
  {
    id: "9",
    name: "The Graffiti Corridor",
    category: "Art & Culture",
    location: "Dharavi",
    city: "Mumbai",
    country: "India",
    rating: 4.6,
    reviewCount: 119,
    description: "A 200-meter underground walkway beneath a railway bridge, covered floor-to-ceiling in evolving street art by local artists.",
    longDescription: "Beneath the Western Railway tracks in Dharavi, a walkway has been transformed into one of India's most vibrant open-air art galleries. Over 50 local artists have painted the walls, ceiling, and floor with murals that rotate every few months. Unlike commercialized street art districts, this space is entirely grassroots — maintained and refreshed by the Dharavi arts collective, which runs free mural workshops every Sunday.",
    image: "https://images.unsplash.com/photo-1769613758100-a5d12762b1ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBtdXJhbCUyMGNvbG9yZnVsJTIwd2FsbHxlbnwxfHx8fDE3NzUxOTUwNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["street-art", "graffiti", "community", "free"],
    verified: true,
    submittedBy: "Aisha M.",
    pinX: 58,
    pinY: 47,
    lat: 19.043,
    lng: 72.8555,
    bestTime: "Sunday mornings (workshop day)",
    localTip: "Visit on Sunday — join the free workshop and paint a section yourself!",
    reviews: [
      { id: "r1", author: "Felix O.", avatar: "F", rating: 5, text: "I painted a section myself! Incredibly welcoming community.", date: "March 2026" },
      { id: "r2", author: "Zara K.", avatar: "Z", rating: 4, text: "The art changes so fast. I've visited 3 times and it's never the same.", date: "February 2026" },
    ]
  },
  {
    id: "10",
    name: "Sunrise Bakery by Hajra",
    category: "Food & Drink",
    location: "Mattancherry",
    city: "Kochi",
    country: "India",
    rating: 4.8,
    reviewCount: 88,
    description: "A 4 AM bakery in the Jewish quarter, run by a 90-year-old woman using recipes from Kochi's vanishing Jewish community.",
    longDescription: "Hajra Ibrahim has been waking up at 2 AM every day for 65 years to bake. Her tiny shop in the Jewish quarter of Mattancherry opens at 4 AM and sells out completely by 6 AM. Her recipes are a remarkable fusion of Malabari and Sephardic Jewish cuisine — unique to Kochi's history. Food historians have written academic papers about her bakes. She herself refuses all media attention: 'Food should be eaten, not photographed,' she says.",
    image: "https://images.unsplash.com/photo-1761853321068-1477c9dfbbdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NhbCUyMGJha2VyeSUyMG1vcm5pbmclMjBwYXN0cnl8ZW58MXx8fHwxNzc1MTk1MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["bakery", "jewish-quarter", "heritage", "4am"],
    verified: true,
    submittedBy: "Fatima L.",
    pinX: 59,
    pinY: 53,
    lat: 9.9312,
    lng: 76.2673,
    bestTime: "4 AM – 6 AM (sells out fast!)",
    localTip: "Come before 5 AM or you'll miss the best items. Don't bring a camera — Hajra hates them.",
    reviews: [
      { id: "r1", author: "Rani P.", avatar: "R", rating: 5, text: "I set an alarm for 3:45 AM. Best decision I've ever made on a trip.", date: "March 2026" },
      { id: "r2", author: "Sam T.", avatar: "S", rating: 5, text: "The cardamom bread alone is worth traveling to Kochi for.", date: "February 2026" },
    ]
  },
  {
    id: "11",
    name: "Vinyl Vaults Record Shop",
    category: "Music & Nightlife",
    location: "Kalighat",
    city: "Kolkata",
    country: "India",
    rating: 4.7,
    reviewCount: 57,
    description: "A cramped but extraordinary record shop in a crumbling colonial building, stocking rare pressings of Indian classical, Baul folk, and Bollywood gold.",
    longDescription: "Vinyl Vaults is not on Google Maps. It doesn't have a sign. You'll know you've found it when you hear Ravi Shankar floating out of a second-floor window on Kalighat Road. The owner, Biswanath-da, has spent 40 years collecting vinyl from estate sales, radio stations, and foreign collectors. His collection of rare Baul folk music recordings is considered irreplaceable. He charges almost nothing — 'Music should be heard, not hoarded,' he says.",
    image: "https://images.unsplash.com/photo-1618972678065-f16fb5ed6afb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmVjb3JkJTIwc3RvcmUlMjBtdXNpYyUyMHNob3B8ZW58MXx8fHwxNzc1MTk1MDU4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["vinyl", "classical", "baul", "Bollywood", "rare"],
    verified: true,
    submittedBy: "Tarun D.",
    pinX: 69,
    pinY: 43,
    lat: 22.5189,
    lng: 88.3714,
    bestTime: "Weekday afternoons (3–6 PM)",
    localTip: "Tell Biswanath-da what music you love and he'll spend hours finding the perfect record for you.",
    reviews: [
      { id: "r1", author: "Omar A.", avatar: "O", rating: 5, text: "Found a 1972 pressing of Bismillah Khan here. I sobbed.", date: "January 2026" },
      { id: "r2", author: "Nandini S.", avatar: "N", rating: 5, text: "Biswanath-da is a living encyclopedia of Indian music.", date: "March 2026" },
    ]
  },
  {
    id: "12",
    name: "Stargazer's Plateau",
    category: "Nature",
    location: "Spiti Valley",
    city: "Spiti",
    country: "India",
    rating: 5.0,
    reviewCount: 32,
    description: "A high-altitude plateau at 4,400m with zero light pollution, reachable by a 2-hour jeep ride from Kaza village.",
    longDescription: "At 4,400 meters above sea level, in the cold desert of Spiti Valley, lies a flat plateau that local shepherds have used for centuries. What makes it extraordinary is its complete absence of light pollution — the Milky Way is visible with the naked eye even in summer. The plateau sits between two ancient monasteries, and on clear nights, monks from both monasteries sometimes come to meditate under the stars. No camping site, no facilities — just you, the cosmos, and silence.",
    image: "https://images.unsplash.com/photo-1666490490039-f27291bff8a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwc3RhcnJ5JTIwc2t5JTIwdHJhdmVsJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc3NTE5NTA1OHww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["stargazing", "Milky Way", "4400m", "monasteries"],
    verified: true,
    submittedBy: "Tenzin N.",
    pinX: 64,
    pinY: 33,
    lat: 32.2396,
    lng: 78.0413,
    bestTime: "October (clearest skies, before snowfall)",
    localTip: "Hire the jeep from Raju at Kaza's main square. He knows exactly where to go.",
    reviews: [
      { id: "r1", author: "Aarav S.", avatar: "A", rating: 5, text: "I've never cried looking at the sky before. I did here.", date: "October 2025" },
      { id: "r2", author: "Julia M.", avatar: "J", rating: 5, text: "The most profoundly beautiful experience of my life. No exaggeration.", date: "October 2025" },
    ]
  },
];

export const categories: Category[] = ["Food & Drink", "Nature", "Art & Culture", "History", "Music & Nightlife", "Books & Literature", "Markets"];

export const categoryColors: Record<Category, string> = {
  "Food & Drink": "#f59e0b",
  "Nature": "#10b981",
  "Art & Culture": "#8b5cf6",
  "History": "#ef4444",
  "Music & Nightlife": "#3b82f6",
  "Books & Literature": "#ec4899",
  "Markets": "#f97316",
};

export const categoryIcons: Record<Category, string> = {
  "Food & Drink": "🍜",
  "Nature": "🌿",
  "Art & Culture": "🎨",
  "History": "🏛️",
  "Music & Nightlife": "🎵",
  "Books & Literature": "📚",
  "Markets": "🛍️",
};
