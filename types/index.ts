// ─── Enums ───────────────────────────────────────────────────────────────────
export type UserRole = 'admin' | 'builder' | 'builder_moderator' | 'customer';
export type BuilderStatus = 'pending' | 'verified' | 'rejected' | 'suspended';
export type DocumentType = 'registration' | 'pan' | 'gst' | 'identity' | 'other';
export type PropertyCategory = 'residential' | 'commercial';
export type PropertyStatus = 'draft' | 'pending_approval' | 'active' | 'inactive' | 'sold';
export type TransactionType = 'builder_post_fee' | 'customer_access_fee';
export type TransactionStatus = 'initiated' | 'success' | 'failed' | 'refunded';
export type QueryStatus = 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
export type QueryPriority = 'low' | 'medium' | 'high' | 'urgent';

// ─── Core Entities ────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string;
  role: 'customer';
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_active: boolean;
  google_id: string | null;
  last_login_at: string | null;
  created_at: string;
}

export interface Builder {
  id: string;
  user_id: string;
  company_name: string;
  company_description: string | null;
  business_address: string | null;
  website_url: string | null;
  logo_url: string | null;
  status: BuilderStatus;
  verified_at: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  created_at: string;
}

export interface Amenity {
  id: string;
  title: string;
  description: string | null;
  icon_url: string | null;
  created_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  alt_text: string | null;
  sort_order: number;
  is_cover: boolean;
  created_at: string;
}

export interface Property {
  id: string;
  builder_id: string;
  property_type: string | null;
  title: string;
  description: string | null;
  category: PropertyCategory;
  status: PropertyStatus;
  target_price: number | null;
  dev_price: number | null;       // Never expose to customer UI
  location_city: string;
  location_area: string | null;
  location_lat: number | null;
  location_lng: number | null;
  whatsapp_group_link: string | null; // GATED — only show after customer_access
  is_featured: boolean;
  is_group_enabled: boolean;
  group_size: number | null;
  slots_filled: number;
  google_maps_url: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined relations
  builder?: Builder;
  images?: PropertyImage[];
  amenities?: { amenity: Amenity }[];
}

// ─── Access Gate ──────────────────────────────────────────────────────────────

export interface CustomerAccess {
  id: string;
  customer_id: string;
  builder_id: string;
  property_id: string;
  transaction_id: string;
  granted_at: string;
  property?: Property;
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export interface Transaction {
  id: string;
  user_id: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  razorpay_order_id: string;
  razorpay_payment_id: string | null;
  razorpay_signature: string | null;
  reference_id: string | null;
  invoice_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export interface Query {
  id: string;
  customer_id: string | null;
  builder_id: string | null;
  property_id: string | null;
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  message: string;
  status: QueryStatus;
  priority: QueryPriority;
  assigned_to: string | null;
  internal_note: string | null; // NEVER show to customers
  created_at: string;
  updated_at: string;
  // Joined relations
  property?: { id: string; title: string; location_city: string };
  builder?: { id: string; company_name: string; logo_url: string | null };
  responses?: QueryResponse[];
}

export interface QueryResponse {
  id: string;
  query_id: string;
  responder_id: string;
  message: string;
  is_internal: boolean; // NEVER show true to customers
  created_at: string;
}

// ─── Filter Params ────────────────────────────────────────────────────────────

export interface PropertyFilters {
  search?: string;
  category?: PropertyCategory;
  city?: string;
  area?: string;
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  isGroupEnabled?: boolean;
  typeId?: string;
  amenityIds?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'newest' | 'featured';
  page?: number;
  pageSize?: number;
}
