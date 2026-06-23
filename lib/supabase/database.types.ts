export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      parts_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      parts: {
        Row: {
          id: string
          category_id: string | null
          sku: string
          name: string
          slug: string
          description: string | null
          price: number
          unit: string
          stock_quantity: number
          min_order_qty: number
          image_url: string | null
          specs: Json | null
          compatible_with: string[] | null
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          sku: string
          name: string
          slug: string
          description?: string | null
          price: number
          unit?: string
          stock_quantity?: number
          min_order_qty?: number
          image_url?: string | null
          specs?: Json | null
          compatible_with?: string[] | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          sku?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          unit?: string
          stock_quantity?: number
          min_order_qty?: number
          image_url?: string | null
          specs?: Json | null
          compatible_with?: string[] | null
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          user_id: string
          company_name: string | null
          phone: string | null
          address: string | null
          city: string | null
          state: string | null
          postcode: string | null
          country: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postcode?: string | null
          country?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string | null
          phone?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          postcode?: string | null
          country?: string | null
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          customer_id: string | null
          status: string
          total_amount: number
          shipping_address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id?: string | null
          status?: string
          total_amount?: number
          shipping_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string | null
          status?: string
          total_amount?: number
          shipping_address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          part_id: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Insert: {
          id?: string
          order_id: string
          part_id: string
          quantity: number
          unit_price: number
          total_price: number
        }
        Update: {
          id?: string
          order_id?: string
          part_id?: string
          quantity?: number
          unit_price?: number
          total_price?: number
        }
      }
      cart_items: {
        Row: {
          id: string
          customer_id: string
          part_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          part_id: string
          quantity: number
          created_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          part_id?: string
          quantity?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
