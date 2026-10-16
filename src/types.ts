export interface ResidenceUnit {
  id: string;
  unitCode: string;
  floor: number;
  type: 'Studio' | '1-Bedroom' | '2-Bedroom' | '3-Bedroom' | 'Penthouse';
  areaSqM: number;
  balconySqM: number;
  bedrooms: number;
  bathrooms: number;
  orientation: 'South-East (River View)' | 'South-West (Sunset Park)' | 'North-East (Courtyard)' | 'Panoramic 360°';
  status: 'Available' | 'Reserved' | 'Inquiry Only';
  priceStartingFrom: string;
  features: string[];
  description: string;
}

export interface CommercialSpace {
  id: string;
  unitCode: string;
  type: 'Retail Pavilion' | 'Flagship Corner' | 'Boutique Office' | 'Corporate Floor';
  level: string;
  areaSqM: number;
  ceilingHeightM: number;
  status: 'Available' | 'Reserved';
  features: string[];
}

export interface NearbyLandmark {
  id: string;
  name: string;
  category: 'Transit' | 'Business' | 'Education' | 'Dining & Culture' | 'Aviation';
  walkTimeMin?: number;
  driveTimeMin: number;
  description: string;
  highlight: string;
  imageUrl: string;
}

export interface BuildingFloorData {
  level: number;
  name: string;
  category: 'Retail' | 'Offices' | 'Residences' | 'Sky Penthouses';
  unitsAvailable: number;
  elevation: string;
}
