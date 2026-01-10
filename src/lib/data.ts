import { Rashi, Tree } from './types';

export const rashiList: Rashi[] = [
  {
    key: "MESHA",
    label: "Mesh",
    englishName: "Aries",
    symbol: "♈",
    element: "Fire",
    ruling_planet: "Mars",
    color: "hsl(0, 70%, 50%)",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    key: "VRISHABHA",
    label: "Vrishabh",
    englishName: "Taurus",
    symbol: "♉",
    element: "Earth",
    ruling_planet: "Venus",
    color: "hsl(120, 40%, 35%)",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    key: "MITHUNA",
    label: "Mithun",
    englishName: "Gemini",
    symbol: "♊",
    element: "Air",
    ruling_planet: "Mercury",
    color: "hsl(45, 80%, 50%)",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    key: "KARKA",
    label: "Kark",
    englishName: "Cancer",
    symbol: "♋",
    element: "Water",
    ruling_planet: "Moon",
    color: "hsl(200, 60%, 55%)",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    key: "SIMHA",
    label: "Simha",
    englishName: "Leo",
    symbol: "♌",
    element: "Fire",
    ruling_planet: "Sun",
    color: "hsl(35, 90%, 55%)",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },
  {
    key: "KANYA",
    label: "Kanya",
    englishName: "Virgo",
    symbol: "♍",
    element: "Earth",
    ruling_planet: "Mercury",
    color: "hsl(80, 45%, 45%)",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    key: "TULA",
    label: "Tula",
    englishName: "Libra",
    symbol: "♎",
    element: "Air",
    ruling_planet: "Venus",
    color: "hsl(330, 50%, 60%)",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    key: "VRISHCHIKA",
    label: "Vrishchik",
    englishName: "Scorpio",
    symbol: "♏",
    element: "Water",
    ruling_planet: "Mars",
    color: "hsl(350, 60%, 40%)",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    key: "DHANU",
    label: "Dhanu",
    englishName: "Sagittarius",
    symbol: "♐",
    element: "Fire",
    ruling_planet: "Jupiter",
    color: "hsl(270, 50%, 55%)",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    key: "MAKARA",
    label: "Makar",
    englishName: "Capricorn",
    symbol: "♑",
    element: "Earth",
    ruling_planet: "Saturn",
    color: "hsl(25, 35%, 35%)",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },
  {
    key: "KUMBHA",
    label: "Kumbh",
    englishName: "Aquarius",
    symbol: "♒",
    element: "Air",
    ruling_planet: "Saturn",
    color: "hsl(195, 70%, 50%)",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    key: "MEENA",
    label: "Meen",
    englishName: "Pisces",
    symbol: "♓",
    element: "Water",
    ruling_planet: "Jupiter",
    color: "hsl(180, 50%, 45%)",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  }
];

// Gujarat Native/Naturalised Trees Database based on Rashi-Tree Association
export const treesDatabase: Tree[] = [
  // Mesh (Aries) Trees - Mars
  {
    id: "khair",
    name: "Khair",
    scientific_name: "Acacia catechu",
    description: "A thorny deciduous tree known for producing catechu (katha). Symbolizes strength and resilience, perfect for the warrior spirit of Aries.",
    care_tips: "Drought-tolerant. Full sun. Grows well in dry, rocky soils.",
    ideal_region: "Gujarat dry deciduous forests",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },
  {
    id: "palash",
    name: "Palash",
    scientific_name: "Butea monosperma",
    description: "The Flame of the Forest with brilliant orange-red flowers. Its fiery blooms represent the passionate Mars energy.",
    care_tips: "Full sun. Drought-tolerant. Thrives in poor, dry soil.",
    ideal_region: "Tropical dry deciduous forests",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    id: "khejri",
    name: "Khejri/Shami",
    scientific_name: "Prosopis cineraria",
    description: "The sacred Shami tree worshipped during Dussehra. Known as the 'King of the Desert', embodying courage.",
    care_tips: "Extremely drought-resistant. Full sun. Thrives in arid conditions.",
    ideal_region: "Arid regions of Gujarat and Rajasthan",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: "gorad_babool",
    name: "Gorad Babool",
    scientific_name: "Acacia nilotica",
    description: "A hardy acacia tree with medicinal bark. Represents protection and strength in harsh conditions.",
    care_tips: "Drought-tolerant. Full sun. Grows in saline and alkaline soils.",
    ideal_region: "Arid and semi-arid Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "bordi",
    name: "Bordi",
    scientific_name: "Ziziphus mauritiana",
    description: "The Indian Jujube, known for its sweet fruits. A resilient tree symbolizing prosperity and sustenance.",
    care_tips: "Very drought-tolerant. Full sun. Minimal maintenance once established.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },

  // Vrishabh (Taurus) Trees - Venus
  {
    id: "gular",
    name: "Gular",
    scientific_name: "Ficus racemosa",
    description: "The cluster fig tree, sacred in Hindu tradition. Represents abundance and fertility - perfect for Venus-ruled Taurus.",
    care_tips: "Moist soil preferred. Full sun to partial shade. Regular watering.",
    ideal_region: "Along water bodies in Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "jamun",
    name: "Jamun",
    scientific_name: "Syzygium cumini",
    description: "The Java Plum with purple-black fruits. A tree of prosperity and health, aligned with Taurus' love for earthly pleasures.",
    care_tips: "Full sun. Regular watering. Tolerates waterlogging.",
    ideal_region: "Tropical Gujarat",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },
  {
    id: "amla",
    name: "Amla",
    scientific_name: "Phyllanthus emblica",
    description: "The Indian Gooseberry, richest natural source of Vitamin C. Sacred tree representing health and beauty.",
    care_tips: "Full sun. Drought-tolerant once established. Minimal maintenance.",
    ideal_region: "Tropical and subtropical Gujarat",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    id: "mango",
    name: "Mango",
    scientific_name: "Mangifera indica",
    description: "The King of Fruits! Gujarat's Kesar mangoes are world-famous. Represents sweetness and luxury.",
    care_tips: "Full sun essential. Deep watering during dry spells. Protect from frost when young.",
    ideal_region: "Tropical lowlands, especially Junagadh and Amreli",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    id: "banyan",
    name: "Banyan",
    scientific_name: "Ficus benghalensis",
    description: "The majestic national tree of India. Its vast canopy represents protection and immortality.",
    care_tips: "Requires full sun and plenty of space. Water deeply but infrequently.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },

  // Mithun (Gemini) Trees - Mercury
  {
    id: "neem",
    name: "Neem",
    scientific_name: "Azadirachta indica",
    description: "The divine healer with incredible medicinal properties. Mercury's tree of wisdom and communication.",
    care_tips: "Drought-tolerant once established. Full sun. Can grow in poor soil.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: "bamboo",
    name: "Bamboo",
    scientific_name: "Bambusa spp.",
    description: "The fastest-growing plant on Earth. Symbol of flexibility and rapid growth - matching Gemini's adaptability.",
    care_tips: "Moist, well-drained soil. Full sun to partial shade. Can spread aggressively.",
    ideal_region: "Tropical and temperate zones",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "bael",
    name: "Bael",
    scientific_name: "Aegle marmelos",
    description: "Sacred to Lord Shiva. Its trifoliate leaves represent the three aspects of consciousness.",
    care_tips: "Drought-tolerant. Full sun. Can grow in poor, rocky soil.",
    ideal_region: "Dry forests of Gujarat",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    id: "karanj",
    name: "Karanj",
    scientific_name: "Pongamia pinnata",
    description: "The Indian Beech, known for its oil-rich seeds. Represents knowledge and utility.",
    care_tips: "Very adaptable. Tolerates drought and saline conditions. Full sun.",
    ideal_region: "Coastal and tropical Gujarat",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    id: "desi_babool",
    name: "Desi Babool",
    scientific_name: "Vachellia nilotica",
    description: "A versatile acacia species with multiple uses. Symbolizes practical wisdom.",
    care_tips: "Drought-tolerant. Full sun. Grows in various soil types.",
    ideal_region: "Arid regions of Gujarat",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },

  // Kark (Cancer) Trees - Moon
  {
    id: "kadamba",
    name: "Kadamba",
    scientific_name: "Neolamarckia cadamba",
    description: "Associated with Lord Krishna and monsoons. Its fragrant flowers bloom during rains, connecting to Moon's watery nature.",
    care_tips: "Moist soil. Full sun. Fast-growing in suitable conditions.",
    ideal_region: "Tropical moist forests",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: "arjun",
    name: "Arjun",
    scientific_name: "Terminalia arjuna",
    description: "Named after the legendary warrior. Its bark is a renowned heart tonic - nurturing like Cancer.",
    care_tips: "Grows near water bodies. Full sun. Tolerates flooding.",
    ideal_region: "River banks across Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "coconut",
    name: "Coconut",
    scientific_name: "Cocos nucifera",
    description: "The Tree of Life! Provides food, water, oil - nurturing in every way, like Moon-ruled Cancer.",
    care_tips: "Full sun and sandy soil. Regular watering. Tolerates salt spray.",
    ideal_region: "Coastal Gujarat",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },
  {
    id: "tad_palm",
    name: "Tad Palm",
    scientific_name: "Borassus flabellifer",
    description: "The Palmyra Palm, providing neera and toddy. A nurturing tree for communities.",
    care_tips: "Full sun. Drought-tolerant once established. Sandy soil preferred.",
    ideal_region: "Coastal and semi-arid Gujarat",
    image: "https://images.unsplash.com/photo-com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    id: "banana",
    name: "Banana",
    scientific_name: "Musa spp.",
    description: "Sacred in Hindu rituals. Every part is useful - the ultimate nurturing plant.",
    care_tips: "Moist, rich soil. Full sun. Regular feeding and watering.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },

  // Simha (Leo) Trees - Sun
  {
    id: "peepal",
    name: "Peepal",
    scientific_name: "Ficus religiosa",
    description: "The sacred fig under which Buddha attained enlightenment. The royal tree of spiritual awakening.",
    care_tips: "Full sun to partial shade. Regular watering when young. Extremely long-lived.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: "arka_aak",
    name: "Arka/Aak",
    scientific_name: "Calotropis gigantea",
    description: "The Crown Flower, sacred to Lord Shiva and Sun God. Its regal purple flowers suit Leo's majesty.",
    care_tips: "Extremely drought-tolerant. Full sun. Grows in poor soil.",
    ideal_region: "Arid regions of Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "rudraksha",
    name: "Rudraksha",
    scientific_name: "Elaeocarpus ganitrus",
    description: "The sacred bead tree. Its seeds are worn for spiritual power and protection.",
    care_tips: "Moist, well-drained soil. Partial shade. Humid conditions preferred.",
    ideal_region: "Himalayan foothills (can be grown in Gujarat gardens)",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },

  // Kanya (Virgo) Trees - Mercury
  {
    id: "harad",
    name: "Harad",
    scientific_name: "Terminalia chebula",
    description: "The 'King of Medicines' in Ayurveda. Perfect for detail-oriented, health-conscious Virgo.",
    care_tips: "Moist soil. Full sun to partial shade. Moderate watering.",
    ideal_region: "Deciduous forests of Gujarat",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    id: "kachnar",
    name: "Kachnar",
    scientific_name: "Bauhinia variegata",
    description: "The Orchid Tree with beautiful flowers. Represents purity and precision.",
    care_tips: "Full sun. Moderate watering. Prune after flowering.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },

  // Tula (Libra) Trees - Venus
  {
    id: "ashoka",
    name: "Ashoka",
    scientific_name: "Saraca asoca",
    description: "The tree of love and beauty. Its name means 'without sorrow' - balancing like Libra.",
    care_tips: "Prefers partial shade. Keep soil consistently moist. Slow-growing but worth the wait.",
    ideal_region: "Moist forests of Gujarat",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },
  {
    id: "champa",
    name: "Champa",
    scientific_name: "Plumeria rubra",
    description: "Frangipani with intensely fragrant flowers. Symbol of devotion and beauty.",
    care_tips: "Full sun. Allow soil to dry between watering. Protect from frost.",
    ideal_region: "Tropical and subtropical Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "parijat",
    name: "Parijat",
    scientific_name: "Nyctanthes arbor-tristis",
    description: "Night Jasmine with heavenly fragrance. Its delicate beauty suits Venus-ruled Libra.",
    care_tips: "Partial shade. Regular watering. Prune after flowering.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },

  // Vrishchik (Scorpio) Trees - Mars
  {
    id: "ber_bordi",
    name: "Ber/Bordi",
    scientific_name: "Ziziphus mauritiana",
    description: "The thorny Jujube tree. Its protective thorns match Scorpio's defensive nature.",
    care_tips: "Very drought-tolerant. Full sun. Minimal maintenance.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },
  {
    id: "nagkesar",
    name: "Nagkesar",
    scientific_name: "Mesua ferrea",
    description: "The Ceylon Ironwood with fragrant flowers. Represents transformation and depth.",
    care_tips: "Partial shade. Moist, rich soil. Slow-growing.",
    ideal_region: "Moist forests (can be grown in Gujarat gardens)",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  },

  // Dhanu (Sagittarius) Trees - Jupiter
  {
    id: "gular_dhanu",
    name: "Gular",
    scientific_name: "Ficus racemosa",
    description: "The sacred fig of abundance. Jupiter's expansive energy flows through this generous tree.",
    care_tips: "Moist soil preferred. Full sun to partial shade. Regular watering.",
    ideal_region: "Along water bodies in Gujarat",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop"
  },

  // Makar (Capricorn) Trees - Saturn
  {
    id: "tamarind",
    name: "Tamarind",
    scientific_name: "Tamarindus indica",
    description: "The ancient tamarind, slow-growing but long-lived. Saturn's patience in tree form.",
    care_tips: "Drought-tolerant. Full sun. Minimal care once established.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=300&fit=crop"
  },
  {
    id: "vilayati_babool",
    name: "Vilayati Babool",
    scientific_name: "Prosopis juliflora",
    description: "The hardy mesquite tree. Represents discipline and survival against odds.",
    care_tips: "Extremely drought-tolerant. Full sun. Grows in poorest soils.",
    ideal_region: "Arid Gujarat",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&h=300&fit=crop"
  },

  // Kumbh (Aquarius) Trees - Saturn
  {
    id: "fig_group",
    name: "Fig Group",
    scientific_name: "Ficus spp.",
    description: "The community of fig trees. Aquarius' humanitarian nature reflected in trees that feed many.",
    care_tips: "Varies by species. Generally adaptable and easy to grow.",
    ideal_region: "Throughout Gujarat",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=300&fit=crop"
  },

  // Meen (Pisces) Trees - Jupiter
  {
    id: "kadamba_meen",
    name: "Kadamba",
    scientific_name: "Neolamarckia cadamba",
    description: "The monsoon tree with ethereal fragrance. Jupiter's spiritual wisdom for dreamy Pisces.",
    care_tips: "Moist soil. Full sun. Fast-growing in suitable conditions.",
    ideal_region: "Tropical moist forests",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=300&fit=crop"
  }
];

// Gujarat Rashi-Tree Mapping based on the reference chart
export const rashiTreeMapping: Record<string, { primary: string; alternates: string[]; graha: string }> = {
  MESHA: { 
    primary: "khair", 
    alternates: ["palash", "khejri", "gorad_babool", "bordi"],
    graha: "Mars"
  },
  VRISHABHA: { 
    primary: "gular", 
    alternates: ["jamun", "amla", "mango", "banyan"],
    graha: "Venus"
  },
  MITHUNA: { 
    primary: "neem", 
    alternates: ["bamboo", "bael", "karanj", "desi_babool"],
    graha: "Mercury"
  },
  KARKA: { 
    primary: "kadamba", 
    alternates: ["arjun", "coconut", "tad_palm", "banana"],
    graha: "Moon"
  },
  SIMHA: { 
    primary: "peepal", 
    alternates: ["banyan", "arka_aak", "rudraksha", "khejri"],
    graha: "Sun"
  },
  KANYA: { 
    primary: "neem", 
    alternates: ["bael", "karanj", "harad", "kachnar"],
    graha: "Mercury"
  },
  TULA: { 
    primary: "ashoka", 
    alternates: ["champa", "mango", "parijat", "kadamba"],
    graha: "Venus"
  },
  VRISHCHIKA: { 
    primary: "khejri", 
    alternates: ["palash", "ber_bordi", "nagkesar", "kachnar"],
    graha: "Mars"
  },
  DHANU: { 
    primary: "peepal", 
    alternates: ["banyan", "bael", "amla", "gular_dhanu"],
    graha: "Jupiter"
  },
  MAKARA: { 
    primary: "khejri", 
    alternates: ["gorad_babool", "tamarind", "ber_bordi", "vilayati_babool"],
    graha: "Saturn"
  },
  KUMBHA: { 
    primary: "neem", 
    alternates: ["peepal", "arjun", "khejri", "banyan"],
    graha: "Saturn"
  },
  MEENA: { 
    primary: "kadamba_meen", 
    alternates: ["peepal", "amla", "banana", "fig_group"],
    graha: "Jupiter"
  }
};

export function getTreesForRashi(rashiKey: string): Tree[] {
  const mapping = rashiTreeMapping[rashiKey];
  if (!mapping) return [];

  const primaryTree = treesDatabase.find(t => t.id === mapping.primary);
  const alternateTrees = mapping.alternates
    .map(id => treesDatabase.find(t => t.id === id))
    .filter(Boolean) as Tree[];

  const trees: Tree[] = [];
  if (primaryTree) {
    trees.push({ ...primaryTree, isPrimary: true });
  }
  trees.push(...alternateTrees.map(t => ({ ...t, isPrimary: false })));

  return trees;
}

export function getRashiByKey(key: string): Rashi | undefined {
  return rashiList.find(r => r.key === key);
}

// Mock computation - in production this would call the backend
export function mockComputeRashi(dateOfBirth: string): { rashiKey: string; siderealLongitude: number } {
  // This is a simplified mock - real computation would use Swiss Ephemeris
  const date = new Date(dateOfBirth);
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
  const rashiIndex = Math.floor(((dayOfYear + 9) % 360) / 30);
  const rashiKeys = Object.keys(rashiTreeMapping);
  
  return {
    rashiKey: rashiKeys[rashiIndex % 12],
    siderealLongitude: (rashiIndex * 30 + 15) + Math.random() * 10
  };
}
