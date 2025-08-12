import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      },
      admin_users: {
        Row: {
          id: string
          email: string
          role: string | null
          added_by: string
          added_at: string | null
        }
        Insert: {
          id?: string
          email: string
          role?: string | null
          added_by: string
          added_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: string | null
          added_by?: string
          added_at?: string | null
        }
      },
      hackathon_submissions: {
        Row: {
          id: string
          team_name: string
          team_leader: any // JSONB
          team_members: any // JSONB
          problem_statement_id: number
          ppt_file_url: string | null
          ppt_file_name: string | null
          additional_info: string | null
          transaction_number: string
          registration_fee: number
          team_size: number
          user_id: string | null
          user_email: string
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          team_name: string
          team_leader: any // JSONB
          team_members: any // JSONB
          problem_statement_id: number
          ppt_file_url?: string | null
          ppt_file_name?: string | null
          additional_info?: string | null
          transaction_number: string
          registration_fee: number
          team_size: number
          user_id?: string | null
          user_email: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          team_name?: string
          team_leader?: any // JSONB
          team_members?: any // JSONB
          problem_statement_id?: number
          ppt_file_url?: string | null
          ppt_file_name?: string | null
          additional_info?: string | null
          transaction_number?: string
          registration_fee?: number
          team_size?: number
          user_id?: string | null
          user_email?: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      },
      rejected_submissions: {
        Row: {
          id: string
          team_name: string
          team_leader: any // JSONB
          team_members: any // JSONB
          problem_statement_id: number
          ppt_file_url: string | null
          ppt_file_name: string | null
          additional_info: string | null
          transaction_number: string
          registration_fee: number
          team_size: number
          user_id: string | null
          user_email: string
          status: string | null
          created_at: string | null
          updated_at: string | null
          rejected_by: string
          rejected_at: string | null
        }
        Insert: {
          id?: string
          team_name: string
          team_leader: any // JSONB
          team_members: any // JSONB
          problem_statement_id: number
          ppt_file_url?: string | null
          ppt_file_name?: string | null
          additional_info?: string | null
          transaction_number: string
          registration_fee: number
          team_size: number
          user_id?: string | null
          user_email: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          rejected_by: string
          rejected_at?: string | null
        }
        Update: {
          id?: string
          team_name?: string
          team_leader?: any // JSONB
          team_members?: any // JSONB
          problem_statement_id?: number
          ppt_file_url?: string | null
          ppt_file_name?: string | null
          additional_info?: string | null
          transaction_number?: string
          registration_fee?: number
          team_size?: number
          user_id?: string | null
          user_email?: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
          rejected_by?: string
          rejected_at?: string | null
        }
      }
    }
  }
}
