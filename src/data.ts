import { Suite, WellnessClass } from "./types";

export const SUITES: Suite[] = [
  {
    id: "standard",
    tier: "Standard",
    name: "Heritage Studio",
    priceNumeric: 185000,
    priceFormatted: "₦185,000",
    description: "Our entry-level sanctuary provides immediate access to our botanic gardens. Featuring custom Adire textiles, floor-to-ceiling views of our inner courtyard, and rich natural light.",
    features: ["King Size Bed", "Fiber Optic Wifi", "Spacious Private Bath", "Artisan Bar", "Botanic Garden View", "Adire Cotton Textiles"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO3PAEkJe6JLpSqrVuGPH4hzaGhAhMxVrDMAkvg5sOjs9WAlvTgnzohxOgkfjKQJKFImeW-el6kisFjNUfemliKRUYBcGguLQQUI3sqlAd1Tud1qFtuQELshQnKDybIPCTVJr33_qyB9gIARCB2nKJpEsf6C8xVNvVrlJEgj0ufxVE6vNhNSqSZujGLHkyiBA7q9GiQpVBe_h3x7QFiRBZJ8rcbkNwI1yqzrl-oM0fCraWDBL03oe_oP0Ga5by_6XkgEgVtJV3Tg",
    elevation: "Ground Floor"
  },
  {
    id: "deluxe",
    tier: "Deluxe",
    name: "Sky Garden Room",
    priceNumeric: 320000,
    priceFormatted: "₦320,000",
    description: "Located on our mid-levels, these rooms feature private biophilic balconies with lush, hand-watered Lagosian flora, rattan furniture, and expanded living areas designed for comfort and cultural connoisseurs.",
    features: ["King Size Bed", "Fiber Optic Wifi", "Soaking Tub & Shower", "Artisan Bar", "Private Floral Balcony", "Rattan Loungers"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0lIy1LgtyGXyutU0AWgCzJOI6FUH_iWXOir3BS-t4qCyN9yG1akQQwvGma_BJm7-qmJnP_txcnhMfDxavdjJ5W5DeAPUl8i0_1fXzoGCzmls7rdAKysEJbFpdpqRd6JRbPVNjezvobS9CLBRbLnSkq2VYKINlsZ4nmlJzLan5aWfR39aMjp77j-sQHsSS0AOHyX7un5CeAHPvHkhAZmaReEtfKKc7A_MMiUcUKD2XW11rQhA-ECn_0kNTw2pgOxFDEm26cN-yag",
    elevation: "Mid-Level"
  },
  {
    id: "executive",
    tier: "Executive Suites",
    name: "Lagos Zenith Suite",
    priceNumeric: 750000,
    priceFormatted: "₦750,000",
    description: "The ultimate expression of breathable opulence. Our exquisite penthouse suites offer 360-degree views of the Lagos waterfront and sunset skyline, personalized 24/7 butler service, and custom-styled brass accents throughout.",
    features: ["Super King Bed", "Ultra-fast Fiber Optic", "Spa Jacuzzi & Rain Shower", "Premium Brass Curated Bar", "360 Panoramic Views", "24/7 Butler Service", "Private Plunge Pool"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-X_sZqCqiKqjlwQfrOtZOxSomWuJheOCX4ZuOprrXU_6wxrdeKO0-uEGiDMgy-uDOpMEEgGFfpzcvJDBs6ExwNgOuBSr1P7nwFpiADU8XEyxXo4BJFzzyF2dSNAwjeQavMJ-Di8pP8DnxT7F37KfyAgZlkQRf1bQrLUKolgSbF4ddkgyoBRPrT8JRLJrebcz5mrhDsn1JxNoTN2depPpBwmTDHo_RUOw_kq4VxA7x3XZdd2u9aLGzGVSJUX2214eGEBVn1ucapg",
    elevation: "Penthouse"
  }
];

export const WELLNESS_CLASSES: WellnessClass[] = [
  {
    id: "y1",
    name: "Sunrise Vinyasa Yoga",
    time: "07:00 AM",
    day: "Monday / Wednesday / Friday",
    coach: "Coach Amara",
    category: "yoga",
    description: "Connect breath and focus directly with the morning sun filtration in our biophilic sanctuary. Ideal for beginning your day with profound coastal alignment."
  },
  {
    id: "s1",
    name: "Afrobeats High-Intensity HIIT",
    time: "09:00 AM",
    day: "Tuesday / Thursday",
    coach: "Coach Femi",
    category: "strength",
    description: "An interactive, high-energy session combining functional intervals with rhythmic, modern West African coastal percussion and electronic beats."
  },
  {
    id: "m1",
    name: "Botanical soundscape Bath",
    time: "04:00 PM",
    day: "Saturday",
    coach: "Coach Nneka",
    category: "mindfulness",
    description: "Restorative acoustic resonance therapy pairing artisan singing bowls and forest moisture in our high-ceilinged botanical atrium."
  },
  {
    id: "y2",
    name: "Yin restorative Alignment",
    time: "06:00 PM",
    day: "Sunday",
    coach: "Coach Amara",
    category: "yoga",
    description: "Deep passive stretching and guided breath loops targeting physical decompression and muscular restoration after city tours."
  }
];

export const LAGOS_EXPLORATION = [
  {
    title: "Lekki Conservation Centre",
    category: "Iconic Landmark / Nature",
    description: "Step onto the longest canopy walkway in Africa. Walk high above pristine mangrove wetlands, spotting monkeys, birds, and taking in breathtaking wild canopy views.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxzEKsn6Vq4gZYW1gzRibKoP-p0dCE8esWk1KZu_IqoyvpMS3SC0eCGSsG93eBkV06TFaPZDjrhOyDYxxI3_nddKIPDNQ53DKjt59pvY6v80RfDdohnZ4-HgNUTeRhsxZS14UvxKJRMkvQLAK5KZzrwM5hgTQeIoH3QQLmOlpWHETC6GQO_WR9SuCUv7D8O1slr24fPKL78kQSu5aYzkDoWh3x5GeqT-Fa0mc_pxqF9DSAaBG2TUbsSfaZveV3RaO0q7Y0ZtfTsw",
  },
  {
    title: "Culinary Expeditions",
    category: "Gastronomy / Fine Dining",
    description: "Enjoy gourmet, pan-African courses bridging classic West African flavors with high gastronomy techniques, served in custom hand-thrown Nigerian pottery.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwsv-_Xr__xj2W1y_uZrPCEQZcWEzX3HpBAY4tiK-bgCsPrYgtOvtjm_f2FnNdOZAt9N82nsUBda18laOBJ5W2dNUMbEWJLZm5DJi_M7GsPicLNnLoSPB8KvANYElJ7m2LfIbe8zaTNCX3vkdzDuywV1eE6QPmc84v__cIDjag0W2PFRyNTurEYaXbDalNXncBFf52heBzm4SxJG1xtzcvCagNhRosVDP2tdxfaV5w-jC_pkNrzQjCE5Z0pftY0tuRfK770mZw5g",
  },
  {
    title: "Cultural Concierge Guides",
    category: "Art / Excursions",
    description: "Let our experts curate your schedule—providing private access to the Nike Art Gallery, reservation slots for live plays at Terra Kulture, and VIP tickets for gallery openings.",
    icon: "map",
    isInteractive: true,
  }
];
