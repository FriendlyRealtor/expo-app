export const EventOrganizerCategories = [
  { key: 'open_houses', name: 'Open Houses' },
  { key: 'property_tours', name: 'Property Tours' },
  { key: 'realtor_networking', name: 'Realtor Networking' },
  { key: 'homebuyer_seminars', name: 'Homebuyer Seminars' },
  { key: 'real_estate_workshops', name: 'Real Estate Workshops' },
  { key: 'investment_property_seminars', name: 'Investment Property Seminars' },
  { key: 'property_auctions', name: 'Property Auctions' },
  { key: 'real_estate_conferences', name: 'Real Estate Conferences' },
  { key: 'realtor_training_sessions', name: 'Realtor Training Sessions' },
  { key: 'property_investment_expos', name: 'Property Investment Expos' },
  { key: 'community_outreach_events', name: 'Community Outreach Events' },
  { key: 'realtor_appreciation_dinners', name: 'Realtor Appreciation Dinners' },
  { key: 'mortgage_and_financing_workshops', name: 'Mortgage and Financing Workshops' },
  { key: 'real_estate_technology_demonstrations', name: 'Real Estate Technology Demonstrations' },
  { key: 'property_market_updates', name: 'Property Market Updates' },
];

export type CreateEventFormType = {
  title: string;
  location: string;
  description: string;
  photo?: string;
  organizer?: string;
  eventDate: string;
  dateStartTime: string;
  dateEndTime: string;
  totalParticipants: string;
  cost: string;
  category: string;
  link?: string;
  virtual: boolean;
};
