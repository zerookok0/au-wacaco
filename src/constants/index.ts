export const COLORS = {
  deep: '#0D0E0D',
  olive: '#565E47',
  oliveBright: '#727C5E',
  crema: '#D4A373',
  terracotta: '#C85A32',
} as const;

export const SPRING_CONFIG = { stiffness: 350, damping: 26, mass: 0.8 } as const;
export const SPRING_SNAPPY = { stiffness: 400, damping: 30, mass: 0.6 } as const;
export const TOTAL_QUOTA = 50;
export const CHECKOUT_URL = 'https://kmarket.cyou/checkout/?add-to-cart=8922';
export const DISPATCH_FEE = 6.85;
export const PRODUCT_VALUE = 119.0;

export interface SurveyQuestion {
  id: number;
  question: string;
  subtitle?: string;
  type: 'single' | 'multi' | 'grid';
  maxSelect?: number;
  options: { value: string; label: string; subtitle?: string; icon?: string }[];
}

export const SURVEY_QUESTIONS: SurveyQuestion[] = [
  { id: 1, question: 'How many cups of coffee do you consume per week?', type: 'single', options: [
    { value: 'casual', label: '1–3 cups', subtitle: 'Casual' },
    { value: 'daily', label: '4–7 cups', subtitle: 'Daily Ritualist' },
    { value: 'purist', label: '8–14 cups', subtitle: 'Specialty Purist' },
    { value: 'high_octane', label: '15+ cups', subtitle: 'High Octane' },
  ]},
  { id: 2, question: 'What is your primary Australian cafe order?', type: 'grid', options: [
    { value: 'flat_white', label: 'Flat White', subtitle: 'Velvety Microfoam', icon: 'coffee' },
    { value: 'long_black', label: 'Long Black', subtitle: 'Clean Crema Layer', icon: 'droplets' },
    { value: 'espresso', label: 'Straight Espresso', subtitle: 'Short & Dense', icon: 'zap' },
    { value: 'batch_brew', label: 'Batch Brew / Filter', subtitle: 'Slow & Balanced', icon: 'waves' },
  ]},
  { id: 3, question: 'Which roast profile matches your palate?', type: 'single', options: [
    { value: 'light', label: 'Light Roast', subtitle: 'Bright, Fruity, Floral' },
    { value: 'medium', label: 'Medium Roast', subtitle: 'Balanced Caramel & Nut' },
    { value: 'dark', label: 'Dark Italian Roast', subtitle: 'Bold, Smoky, Low Acid' },
  ]},
  { id: 4, question: 'How do you source your coffee grounds?', type: 'single', options: [
    { value: 'manual_grinder', label: 'Freshly ground on manual hand grinder' },
    { value: 'electric_grinder', label: 'Electric home burr grinder', subtitle: 'Breville, Eureka, etc.' },
    { value: 'pre_ground_roaster', label: 'Pre-ground bags from local specialty roasters' },
    { value: 'supermarket', label: 'Supermarket packaged ground coffee' },
  ]},
  { id: 5, question: 'In which setting do you most crave a fresh 9-bar espresso?', type: 'single', options: [
    { value: 'offgrid', label: 'Weekend 4WD / Off-Grid Bush Camping' },
    { value: 'beach', label: 'Early Morning Beach & Surf Sessions' },
    { value: 'office', label: 'Office Desk / Escaping Stale Breakroom Coffee' },
    { value: 'hiking', label: 'Long Highway Trips & Mountain Hikes' },
  ]},
  { id: 6, question: 'What frustrates you most about existing portable coffee makers?', subtitle: 'Select up to 2', type: 'multi', maxSelect: 2, options: [
    { value: 'weak_extraction', label: 'Watery extraction / Lack of thick crema' },
    { value: 'cleaning', label: 'Nightmarish cleaning & disassembly' },
    { value: 'flimsy', label: 'Cheap flimsy plastic construction' },
    { value: 'battery', label: 'Rechargeable batteries failing mid-brew' },
    { value: 'bulky', label: 'Excessive bulk and weight' },
  ]},
  { id: 7, question: "For WACACO's next flagship architecture, which mechanical feature should our R&D prioritise?", type: 'single', options: [
    { value: 'leverage', label: 'Patented leverage-assist arm for effortless pumping' },
    { value: 'double_shot', label: 'Commercial 16g–18g double-shot capacity basket' },
    { value: 'magnetic', label: 'Tool-free magnetic quick-strip cleaning system' },
    { value: 'titanium', label: 'Ultra-durable aircraft-grade titanium chassis' },
  ]},
  { id: 8, question: 'What is your perspective on single-use aluminium/plastic pods?', type: 'single', options: [
    { value: 'purist', label: 'Strictly ground coffee purist', subtitle: 'Zero pod waste' },
    { value: 'travel', label: 'I use pods purely for emergency travel convenience' },
    { value: 'hybrid', label: 'I prefer hybrid devices that support both' },
  ]},
  { id: 9, question: 'Which finish best complements your outdoor/kitchen gear?', type: 'single', options: [
    { value: 'olive', label: 'Forest Gray Olive', subtitle: 'Matte Tactical' },
    { value: 'black', label: 'Stealth Black', subtitle: 'PVD Dark Metal' },
    { value: 'khaki', label: 'Desert Dune', subtitle: 'Anodised Warm Khaki' },
    { value: 'slate', label: 'Industrial Slate', subtitle: 'Brushed Steel' },
  ]},
  { id: 10, question: 'Final confirmation: If awarded this Minipresso GR2 evaluation unit, will you test it with boiling water and fresh grounds within 14 days?', type: 'single', options: [
    { value: 'yes_test', label: 'Yes, I will rigorously test it and provide honest feedback' },
    { value: 'no_collect', label: 'I plan to keep it unused as a collector unit' },
  ]},
];

export const TERMINAL_LOGS = [
  '> Compiling sensory extraction profile...',
  '> Analysing roast preference matrix...',
  '> Checking regional allocation pool: Australia Post Hub (NSW/VIC/QLD)...',
  '> Verifying transit-blemish reserve status...',
  '> Cross-referencing eligibility criteria...',
  '> MATCH CONFIRMED',
  '> PASS ALLOCATED: #WAC-AU-2026-GR2',
];

export const PRODUCT_HOTSPOTS = [
  { id: 1, x: 45, y: 28, title: 'Patented 18-Bar Hand-Powered Piston', description: 'Zero batteries or electricity required.' },
  { id: 2, x: 55, y: 52, title: 'Precision 8g–12g Micro-Filter Basket', description: 'Stainless steel for optimal extraction.' },
  { id: 3, x: 42, y: 78, title: 'Biocomposite Eco-Polymer Body', description: 'Featherlight 336g. Built for adventure.' },
];
