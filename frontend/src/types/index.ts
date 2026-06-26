export interface User {
  id: string
  username: string
  email: string
  full_name: string
  bio?: string
  avatar_url?: string
  followers_count: number
  following_count: number
  points: number
  level: number
}

export interface Video {
  id: string
  user_id: string
  title: string
  description: string
  video_url: string
  thumbnail_url?: string
  category: string
  tags: string[]
  duration: number
  views_count: number
  likes_count: number
  comments_count: number
  user_liked: boolean
  user?: User
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  video_id: string
  user_id: string
  content: string
  likes_count: number
  replies_count: number
  user_liked: boolean
  user: User
  created_at: string
  updated_at: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  theme: string
  start_date: string
  end_date: string
  prize: string
  participants: number
  submissions: number
  user_submitted?: boolean
}

export interface AuthResponse {
  id: string
  username: string
  email: string
  token: string
  refresh_token: string
}
