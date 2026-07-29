export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  verified: boolean;
  rating: number;
  result: string; // e.g. "₦450,000 in 1st Month"
  quote: string;
  platform: 'Selar' | 'Paystack' | 'WhatsApp' | 'Flutterwave' | 'Direct Sales' | 'Nestuge' | 'Multi-Currency' | 'Etsy' | 'Gumroad';
  proofImage?: string;
  date: string;
}

export interface CourseModule {
  id: number;
  title: string;
  duration: string;
  description: string;
  iconName: string;
  lessons: {
    title: string;
    duration: string;
    type: 'video' | 'pdf' | 'template' | 'prompt';
    previewAvailable?: boolean;
  }[];
}

export interface BonusItem {
  id: string;
  title: string;
  value: number; // in Naira or USD equivalent
  description: string;
  badge: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'monetization' | 'access' | 'resell';
}

export interface OrderState {
  fullName: string;
  email: string;
  phone?: string;
  paymentMethod: 'paystack' | 'bank_transfer' | 'flutterwave' | 'card';
  includeOrderBump: boolean;
  isProcessing: boolean;
  isSuccess: boolean;
  downloadKey?: string;
}
