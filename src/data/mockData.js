export const INITIAL_USER_PROFILE = {
  name: "Alex Omari",
  email: "alex.omari@example.com",
  location: "Nairobi / Kisii, Kenya",
  currency: "KSh",
  occupation: "Software Engineering Student & Heritage Enthusiast",
  monthlyIncomeKSh: 45000,
  fixedExpensesKSh: 28000,
  availableDays: ["Wednesday", "Thursday", "Saturday", "Sunday"],
  preferredWorkoutTime: "Evening",
  preferredStudyTime: "Morning",
  budgetStyle: "Moderate",
  fitnessLevel: "beginner",
  constraints: [
    "University classes on Monday & Tuesday until 4 PM",
    "Limited weekday evening leisure budget",
    "Need stable transport and cafeteria meal funds"
  ],
  habits: [
    "Usually wakes at 6:30 AM",
    "Studies best in 90-minute blocks with tea",
    "Tracks M-Pesa statements weekly"
  ]
};

export const ARTISANS = [
  {
    id: "art-1",
    name: "Papa Charles Nyabuto",
    village: "Tabaka Quarry Valley",
    region: "Kisii County, Kenya",
    specialty: "Master Soapstone Wildlife & Abstract Sculptures",
    experienceYears: 32,
    bio: "Papa Charles learned the sacred art of chiseling Tabaka soapstone from his grandfather. He specializes in large African wildlife sculptures buffed to an obsidian sheen.",
    avatar: "https://images.unsplash.com/photo-1506863530036-1efeddceb993?auto=format&fit=crop&w=400&q=80",
    workCount: 142
  },
  {
    id: "art-2",
    name: "Mama Agnes Moraa",
    village: "Nyamache Hills",
    region: "Kisii / Lake Basin, Kenya",
    specialty: "Hand-Etched Geometric Soapstone Bowls & Dyes",
    experienceYears: 24,
    bio: "Mama Agnes hand-etches traditional Gusii triangular and sun motifs onto warm pink and ivory soapstone bowls, using plant-based pigments and beeswax polish.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    workCount: 98
  },
  {
    id: "art-3",
    name: "David 'Kaka' Onsomu",
    village: "Suneka Arts Collective",
    region: "Kisii / Rift Valley",
    specialty: "African Sunset & Acacia Oil on Canvas",
    experienceYears: 18,
    bio: "David's vibrant sunset paintings capture the golden savannah dusk, acacia silhouettes, and Maasai shepherd journeys across East Africa.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    workCount: 76
  },
  {
    id: "art-4",
    name: "Zahara Kwamboka",
    village: "Gucha Cultural Atelier",
    region: "Kisii / Nairobi",
    specialty: "Handcrafted Kitenge & Modern Afrocentric Apparel",
    experienceYears: 12,
    bio: "Zahara blends heritage East African wax prints (Kitenge) with modern urban tailoring, celebrating ancestral textile patterns and sustainable fabrics.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    workCount: 115
  }
];

export const PRODUCTS = [
  {
    id: "prod-1",
    name: "Hand-Carved Tabaka Soapstone Elephant Duo",
    category: "Soapstone Carvings",
    priceKSh: 6800,
    priceUSD: 52,
    originalPriceKSh: 7800,
    description: "An authentic heirloom sculpture of mother and calf African elephants, chiseled by hand from dense Tabaka soapstone and polished with organic beeswax to a deep, tactile midnight obsidian sheen.",
    artisanName: "Papa Charles Nyabuto",
    origin: "Tabaka, Kisii, Kenya",
    dimensions: "22cm H × 16cm W × 11cm D",
    weight: "2.4 kg",
    material: "100% Natural Kisii Steatite (Soapstone)",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    stockCount: 5,
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    tags: ["Best Seller", "Wildlife", "Heirloom", "Fair Trade"],
    culturalStory: "In Gusii tradition, elephants embody ancestral wisdom, maternal protection, and enduring perseverance. Hand-chiseled using generational iron rasps.",
    reviews: [
      {
        id: "rev-1",
        author: "Sarah Wanjiku",
        location: "Nairobi, Kenya",
        rating: 5,
        date: "2 days ago",
        comment: "The weight and smooth wax finish are breathtaking. Papa Charles is a true master artisan! Arrived in Nairobi within 24 hours.",
        verifiedBuyer: true
      },
      {
        id: "rev-2",
        author: "Marcus Vance",
        location: "London, UK",
        rating: 5,
        date: "1 week ago",
        comment: "Shipped securely via DHL to London. Looks stunning on my mahogany mantle. A true piece of Kenya.",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-2",
    name: "Hand-Etched Geometric Soapstone Offering Bowl",
    category: "Bowls & Dishes",
    priceKSh: 4200,
    priceUSD: 32,
    originalPriceKSh: 4800,
    description: "Intricately hand-engraved with ancestral chevron and diamond motifs along the outer rim. Perfectly weighted for fruit, jewelry, crystals, or centerpiece dining display.",
    artisanName: "Mama Agnes Moraa",
    origin: "Tabaka, Kisii, Kenya",
    dimensions: "26cm Diameter × 9cm Depth",
    weight: "1.8 kg",
    material: "Tabaka Pink & Charcoal Soapstone",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
    ],
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    stockCount: 8,
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    tags: ["Tableware", "Hand-Etched", "Pink Soapstone"],
    culturalStory: "The etched triangular zig-zags symbolize the rolling hills of Kisii and the seasonal rain blessings for harvest abundance.",
    reviews: [
      {
        id: "rev-3",
        author: "Grace Kemunto",
        location: "Mombasa, Kenya",
        rating: 5,
        date: "3 days ago",
        comment: "Mama Agnes's detailing is exquisite. The soft pink stone undertone brings so much warmth to our dining table.",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-3",
    name: "Golden Savannah & Acacia Sunset Canvas",
    category: "Paintings",
    priceKSh: 14500,
    priceUSD: 110,
    originalPriceKSh: 16000,
    description: "Original heavy-textured acrylic & oil on stretched cotton canvas. Depicts the golden twilight over the East African rift, silhouetted acacia, and roaming wildlife.",
    artisanName: "David 'Kaka' Onsomu",
    origin: "Suneka, Kisii",
    dimensions: "75cm × 60cm Stretched Canvas",
    weight: "1.2 kg",
    material: "Artist Oil & Acrylics on Heavy Cotton Canvas",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviewCount: 14,
    inStock: true,
    stockCount: 2,
    featured: true,
    isBestSeller: false,
    isNewArrival: true,
    tags: ["Original Painting", "Fine Art", "Wall Decor"],
    culturalStory: "Painted during the dry season twilight when the sky catches glowing ochre and amber hues over the Mara-Serengeti basin.",
    reviews: [
      {
        id: "rev-4",
        author: "Elena Rostova",
        location: "Geneva, Switzerland",
        rating: 5,
        date: "2 weeks ago",
        comment: "The brushwork textures are mesmerizing in natural light. Proud to support Kisii painters!",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-4",
    name: "Royal Ankara & Kitenge Wrap Kimono Robe",
    category: "African Clothing",
    priceKSh: 5500,
    priceUSD: 42,
    originalPriceKSh: 6200,
    description: "Tailored unisex kimono robe crafted from 100% premium Kenyan cotton Kitenge with gold-threaded geometric tribal border.",
    artisanName: "Zahara Kwamboka",
    origin: "Kisii Atelier",
    dimensions: "Free Size (Adjustable Belt)",
    weight: "450g",
    material: "100% Authentic Kenyan Cotton Kitenge",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    stockCount: 12,
    featured: false,
    isBestSeller: false,
    isNewArrival: true,
    tags: ["Wearable Art", "Kitenge", "Handcrafted"],
    culturalStory: "Kitenge patterns communicate social respect, celebration, and royal heritage throughout East African community gatherings.",
    reviews: [
      {
        id: "rev-5",
        author: "Amina J.",
        location: "Kisumu, Kenya",
        rating: 5,
        date: "5 days ago",
        comment: "Super breathable fabric and vivid wax print. Got tons of compliments at my gallery opening!",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-5",
    name: "Abstract Gusii Family Embrace Soapstone Sculpture",
    category: "Soapstone Carvings",
    priceKSh: 7200,
    priceUSD: 55,
    originalPriceKSh: 8000,
    description: "A sweeping single-ribbon abstract carving depicting two parent figures embracing their child, crafted from rare cream-veined Tabaka soapstone.",
    artisanName: "Papa Charles Nyabuto",
    origin: "Tabaka, Kisii, Kenya",
    dimensions: "30cm H × 14cm W × 10cm D",
    weight: "2.1 kg",
    material: "Cream & Amber Veined Steatite",
    image: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewCount: 46,
    inStock: true,
    stockCount: 4,
    featured: false,
    isBestSeller: true,
    isNewArrival: false,
    tags: ["Abstract", "Family Totem", "Gift Idea"],
    culturalStory: "A classic Kisii motif celebrating everlasting familial devotion, mutual protection, and community warmth.",
    reviews: [
      {
        id: "rev-6",
        author: "David Kariuki",
        location: "Nakuru, Kenya",
        rating: 5,
        date: "1 week ago",
        comment: "Given as an anniversary gift. My wife cried tears of joy. The craftsmanship is world class.",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-6",
    name: "Tournament Tabaka Soapstone Chess Set & Board",
    category: "Chess & Games",
    priceKSh: 12500,
    priceUSD: 95,
    originalPriceKSh: 14000,
    description: "Complete 32-piece tournament chess set carved from contrasting natural black and ivory soapstone with hand-etched 35cm stone playing board.",
    artisanName: "Papa Charles Nyabuto",
    origin: "Tabaka Quarry Valley",
    dimensions: "35cm × 35cm Board × 8cm King Height",
    weight: "4.8 kg",
    material: "Dual-Tone Tabaka Soapstone",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewCount: 63,
    inStock: true,
    stockCount: 3,
    featured: true,
    isBestSeller: true,
    isNewArrival: false,
    tags: ["Collector Chess", "Hand-Carved Board", "Masterpiece"],
    culturalStory: "Each chess piece represents African royalty, warriors, and wildlife figures individually carved over 18 hours of craftsmanship.",
    reviews: [
      {
        id: "rev-7",
        author: "Dr. Arthur Pendelton",
        location: "Boston, USA",
        rating: 5,
        date: "3 weeks ago",
        comment: "Hands down the most magnificent chess set in my 40-year collection. Every piece has soulful character.",
        verifiedBuyer: true
      }
    ]
  },
  {
    id: "prod-7",
    name: "Ancestral Gusii Sunburst Soapstone Plate",
    category: "Bowls & Dishes",
    priceKSh: 3600,
    priceUSD: 28,
    originalPriceKSh: 4200,
    description: "Hand-turned round stone plate etched with radiate Gusii solar rays. Polished to a smooth satin touch for serving or decorative wall hanging.",
    artisanName: "Mama Agnes Moraa",
    origin: "Tabaka, Kisii, Kenya",
    dimensions: "24cm Diameter",
    weight: "1.3 kg",
    material: "Natural Steatite & Organic Plant Dye",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    stockCount: 9,
    featured: false,
    isBestSeller: false,
    isNewArrival: true,
    tags: ["Wall Art", "Solar Motif", "Table Decor"],
    culturalStory: "The sunburst pattern represents dawn renewal and blessing over the household entrance.",
    reviews: []
  },
  {
    id: "prod-8",
    name: "Hand-Carved Soapstone Lion Pride Guardian",
    category: "Soapstone Carvings",
    priceKSh: 8500,
    priceUSD: 65,
    originalPriceKSh: 9500,
    description: "Commanding African male lion sculpture with deeply textured mane, chiseled from dark charcoal Tabaka steatite.",
    artisanName: "Papa Charles Nyabuto",
    origin: "Tabaka, Kisii, Kenya",
    dimensions: "28cm Length × 18cm Height",
    weight: "3.1 kg",
    material: "Dense Charcoal Soapstone",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    stockCount: 3,
    featured: true,
    isBestSeller: false,
    isNewArrival: true,
    tags: ["Big Five", "Lion King", "Sculpture"],
    culturalStory: "Symbol of leadership, unyielding bravery, and kingdom defense in East African lore.",
    reviews: []
  }
];

export const INITIAL_GOALS = [
  {
    id: "goal-1",
    title: "Laptop Savings & Academic Expense Plan",
    domain: "finance",
    targetMetric: "KSh 80,000",
    targetAmount: 80000,
    currentAmount: 23100,
    deadline: "December 15, 2026",
    recommendedCadence: "Save KSh 2,100 every Monday",
    summary: "Dedicated laptop fund tailored for university software coursework while protecting daily food and transit funds.",
    whyThisWorks: "Locks in KSh 2,100 every Monday immediately following weekly allowances, trimming KSh 500 from entertainment while preserving KSh 1,500/wk for essentials.",
    budgetAdjustments: [
      { category: "Weekly Savings", action: "Deposit KSh 2,100 to locked vault every Monday", amount: 2100, impact: "Reaches KSh 80,000 on schedule" },
      { category: "Entertainment", action: "Reduce weekend café/takeout spending by KSh 500/week", amount: 500, impact: "Covers 24% of weekly savings target" },
      { category: "Protected Living", action: "Safeguard KSh 1,500/week for campus transport & food", amount: 1500, impact: "Eliminates surprise overdrafts" },
      { category: "Sunday Review", action: "Reconcile M-Pesa balance and update tracker", amount: 0, impact: "Ensures full accountability" }
    ],
    milestones: [
      {
        id: "m-1",
        title: "Sprint 1 Milestone: KSh 20,000",
        targetDate: "Sept 30, 2026",
        targetValue: "KSh 20,000 Saved",
        description: "Establish automated Monday transfer habit.",
        completed: true,
        completedAt: "2026-08-15"
      },
      {
        id: "m-2",
        title: "Halfway Checkpoint: KSh 40,000",
        targetDate: "Oct 31, 2026",
        targetValue: "KSh 40,000 Saved",
        description: "Benchmark laptop deals and compare retailer warranty.",
        completed: false
      },
      {
        id: "m-3",
        title: "Final Push: KSh 65,000",
        targetDate: "Nov 30, 2026",
        targetValue: "KSh 65,000 Saved",
        description: "Lock in final specs (16GB RAM / 512GB SSD).",
        completed: false
      },
      {
        id: "m-4",
        title: "Goal Reached: KSh 80,000 Cash Ready",
        targetDate: "Dec 15, 2026",
        targetValue: "KSh 80,000 Saved",
        description: "Purchase new workstation without debt.",
        completed: false
      }
    ],
    tasks: [
      {
        id: "t-1",
        goalId: "goal-1",
        title: "Deposit KSh 2,100 into locked savings pot",
        scheduledDay: "Monday",
        priority: "high",
        estimatedTime: "5 min",
        category: "Finance",
        completed: true
      },
      {
        id: "t-2",
        goalId: "goal-1",
        title: "Track weekly incidental spending under KSh 1,500 limit",
        scheduledDay: "Today",
        priority: "medium",
        estimatedTime: "10 min",
        category: "Budget",
        completed: false
      },
      {
        id: "t-3",
        goalId: "goal-1",
        title: "Sunday weekly budget audit & reconciliation",
        scheduledDay: "Sunday",
        priority: "medium",
        estimatedTime: "15 min",
        category: "Review",
        completed: false
      }
    ],
    habits: [
      {
        id: "h-1",
        name: "Monday Auto-Save Transfer",
        frequency: "weekly",
        cue: "Monday 9:00 AM after breakfast",
        benefit: "Automates the laptop goal with zero decision fatigue",
        streak: 5,
        completedToday: true,
        domain: "finance"
      },
      {
        id: "h-2",
        name: "Instant M-Pesa Receipt Categorization",
        frequency: "daily",
        cue: "After any payment over KSh 200",
        benefit: "Prevents unseen cash drain",
        streak: 9,
        completedToday: false,
        domain: "finance"
      }
    ],
    progressPercent: 29,
    createdAt: "2026-08-01",
    status: "active"
  },
  {
    id: "goal-2",
    title: "Tabaka Soapstone Heritage Suite Commission",
    domain: "art_heritage",
    targetMetric: "3-Piece Wildlife Suite in Black Soapstone",
    targetAmount: 16500,
    currentAmount: 8250,
    deadline: "September 28, 2026",
    recommendedCadence: "Weekly Artisan Milestone Sign-offs",
    summary: "Bespoke commission with Papa Charles Nyabuto at Tabaka quarry for an heirloom sculpture set with custom engraved family crest.",
    whyThisWorks: "Direct artisan milestone disbursements guarantee ethical fair-trade sourcing while tracking stone selection, chisel contouring, and wax polishing.",
    budgetAdjustments: [
      { category: "Deposit (50%)", action: "Disbursed to Papa Charles for Tabaka stone harvest", amount: 8250, impact: "Raw materials and quarrying active" },
      { category: "Final Balance (50%)", action: "Reserved for final photo inspection and crate shipping", amount: 8250, impact: "Held in escrow until approved" }
    ],
    milestones: [
      {
        id: "m-21",
        title: "Tabaka Raw Stone Quarry Selection",
        targetDate: "Sept 05, 2026",
        targetValue: "Dark Steatite Block Harvested",
        description: "Artisan sourced dense mineral-rich stone block.",
        completed: true,
        completedAt: "2026-08-18"
      },
      {
        id: "m-22",
        title: "Structural Chisel & Rough Shaping",
        targetDate: "Sept 12, 2026",
        targetValue: "Contours Chiseled",
        description: "Elephant and Giraffe profiles rough cut.",
        completed: true,
        completedAt: "2026-08-20"
      },
      {
        id: "m-23",
        title: "Water Sanding & Custom Etching",
        targetDate: "Sept 20, 2026",
        targetValue: "Gusii Chevron Border Etched",
        description: "Hand carving delicate tribal crest.",
        completed: false
      },
      {
        id: "m-24",
        title: "Natural Sun-Drying, Wax Buff & Delivery",
        targetDate: "Sept 28, 2026",
        targetValue: "Obsidian Lustre Ready",
        description: "Museum-grade finish and courier dispatch.",
        completed: false
      }
    ],
    tasks: [
      {
        id: "t-21",
        goalId: "goal-2",
        title: "Review WhatsApp milestone photos of rough chisel contours",
        scheduledDay: "Today",
        priority: "high",
        estimatedTime: "5 min",
        category: "Artisan",
        completed: false
      },
      {
        id: "t-22",
        goalId: "goal-2",
        title: "Approve final etching dimensions for stone base",
        scheduledDay: "Saturday",
        priority: "medium",
        estimatedTime: "10 min",
        category: "Artisan",
        completed: false
      }
    ],
    habits: [
      {
        id: "h-21",
        name: "Weekly Artisan Check-In",
        frequency: "weekly",
        cue: "Thursday 2:00 PM",
        benefit: "Ensures commission stays on schedule and true to vision",
        streak: 3,
        completedToday: false,
        domain: "art_heritage"
      }
    ],
    progressPercent: 50,
    createdAt: "2026-08-10",
    status: "active"
  }
];

export const INITIAL_SCHEDULE = [
  { id: "s-1", day: "Monday", time: "Morning", activity: "Auto-transfer KSh 2,100 to Laptop Vault", category: "Finance", goalId: "goal-1" },
  { id: "s-2", day: "Monday", time: "Afternoon", activity: "University Lecture: Algorithms & Data Structures", category: "Education" },
  { id: "s-3", day: "Tuesday", time: "Afternoon", activity: "University Lab: Web Development Systems", category: "Education" },
  { id: "s-4", day: "Wednesday", time: "Evening", activity: "Software Project Sprint: Python & React (90 min)", category: "Education" },
  { id: "s-5", day: "Thursday", time: "Afternoon", activity: "Tabaka Artisan Sculpture Progress Review", category: "Artisan", goalId: "goal-2" },
  { id: "s-6", day: "Thursday", time: "Evening", activity: "45-min Calisthenics & Functional Mobility Workout", category: "Health" },
  { id: "s-7", day: "Saturday", time: "Morning", activity: "Full Body Functional Conditioning (Gym / Outdoors)", category: "Health" },
  { id: "s-8", day: "Saturday", time: "Afternoon", activity: "Kisii Heritage Art & Cultural Exploration", category: "Culture" },
  { id: "s-9", day: "Sunday", time: "Evening", activity: "Weekly Budget Audit & Next Week Schedule Setup", category: "Review", goalId: "goal-1" }
];
