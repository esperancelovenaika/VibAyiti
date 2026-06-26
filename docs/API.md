# 📡 VibAyiti API Documentation

**Base URL:** `https://api.vibayiti.com/api/v1`

## Authentication

Tou API routes (eksepte auth routes) bezwen JWT token sou header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Auth Endpoints

### Register User
```
POST /auth/register

Body:
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure_password_123",
  "full_name": "John Doe"
}

Response (201):
{
  "id": "uuid",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "jwt_token_here",
  "refresh_token": "refresh_token_here"
}
```

### Login
```
POST /auth/login

Body:
{
  "email": "john@example.com",
  "password": "secure_password_123"
}

Response (200):
{
  "id": "uuid",
  "username": "john_doe",
  "token": "jwt_token_here",
  "refresh_token": "refresh_token_here"
}
```

### Refresh Token
```
POST /auth/refresh

Body:
{
  "refresh_token": "refresh_token_here"
}

Response (200):
{
  "token": "new_jwt_token",
  "refresh_token": "new_refresh_token"
}
```

### Logout
```
POST /auth/logout

Headers: Authorization required

Response (200):
{
  "message": "Logged out successfully"
}
```

---

## 👤 User Endpoints

### Get User Profile
```
GET /users/:id

Response (200):
{
  "id": "uuid",
  "username": "john_doe",
  "full_name": "John Doe",
  "bio": "Creator & educator",
  "avatar_url": "https://...",
  "followers_count": 150,
  "following_count": 50,
  "points": 500,
  "level": 3,
  "verified": false
}
```

### Update Profile
```
PUT /users/:id

Headers: Authorization required

Body:
{
  "full_name": "John Doe",
  "bio": "New bio",
  "avatar_url": "https://..."
}

Response (200):
{
  "id": "uuid",
  "username": "john_doe",
  "full_name": "John Doe",
  "bio": "New bio",
  "avatar_url": "https://..."
}
```

### Get User Videos
```
GET /users/:id/videos?page=1&limit=10

Response (200):
{
  "videos": [
    {
      "id": "uuid",
      "title": "My first video",
      "description": "...",
      "video_url": "https://...",
      "thumbnail_url": "https://...",
      "views_count": 100,
      "likes_count": 50,
      "comments_count": 10,
      "created_at": "2024-06-26T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "total_pages": 3
  }
}
```

### Follow User
```
POST /users/:id/follow

Headers: Authorization required

Response (200):
{
  "message": "User followed successfully",
  "follower_count": 151
}
```

### Unfollow User
```
POST /users/:id/unfollow

Headers: Authorization required

Response (200):
{
  "message": "User unfollowed successfully",
  "follower_count": 150
}
```

### Get Followers
```
GET /users/:id/followers?page=1&limit=20

Response (200):
{
  "followers": [
    {
      "id": "uuid",
      "username": "follower_user",
      "full_name": "Follower Name",
      "avatar_url": "https://..."
    }
  ],
  "pagination": { ... }
}
```

---

## 🎬 Video Endpoints

### Get Feed (All Videos)
```
GET /videos?page=1&limit=10&category=all

Query Params:
- page: Page number (default: 1)
- limit: Videos per page (default: 10)
- category: Video category (all, education, dance, music, etc.)
- sort: newest, trending, popular (default: newest)

Response (200):
{
  "videos": [ ... ],
  "pagination": { ... }
}
```

### Get Video Detail
```
GET /videos/:id

Response (200):
{
  "id": "uuid",
  "title": "Amazing Haitian Dance",
  "description": "...",
  "video_url": "https://...",
  "thumbnail_url": "https://...",
  "category": "dance",
  "tags": ["dance", "haiti", "culture"],
  "duration": 45,
  "views_count": 1000,
  "likes_count": 500,
  "comments_count": 50,
  "user": {
    "id": "uuid",
    "username": "creator",
    "avatar_url": "https://..."
  },
  "user_liked": false,
  "created_at": "2024-06-26T10:30:00Z"
}
```

### Upload Video
```
POST /videos

Headers: 
- Authorization required
- Content-Type: multipart/form-data

Form Data:
- video: (file, required)
- title: "Video Title" (required)
- description: "Video description" (optional)
- category: "dance" (required)
- tags: ["tag1", "tag2"] (optional)

Response (201):
{
  "id": "uuid",
  "title": "Video Title",
  "video_url": "https://...",
  "status": "processing",
  "message": "Video uploading, processing in background"
}
```

### Update Video
```
PUT /videos/:id

Headers: Authorization required

Body:
{
  "title": "Updated title",
  "description": "Updated description",
  "category": "music",
  "tags": ["tag1", "tag2"]
}

Response (200):
{
  "id": "uuid",
  "title": "Updated title",
  "description": "Updated description",
  ...
}
```

### Delete Video
```
DELETE /videos/:id

Headers: Authorization required

Response (200):
{
  "message": "Video deleted successfully"
}
```

### Like Video
```
POST /videos/:id/like

Headers: Authorization required

Response (200):
{
  "message": "Video liked",
  "likes_count": 501,
  "user_liked": true
}
```

### Unlike Video
```
POST /videos/:id/unlike

Headers: Authorization required

Response (200):
{
  "message": "Video unliked",
  "likes_count": 500,
  "user_liked": false
}
```

---

## 💬 Comment Endpoints

### Get Comments for Video
```
GET /comments/video/:videoId?page=1&limit=20

Response (200):
{
  "comments": [
    {
      "id": "uuid",
      "content": "Great video!",
      "user": {
        "id": "uuid",
        "username": "commenter",
        "avatar_url": "https://..."
      },
      "likes_count": 5,
      "user_liked": false,
      "replies_count": 2,
      "created_at": "2024-06-26T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Create Comment
```
POST /comments/video/:videoId

Headers: Authorization required

Body:
{
  "content": "Great video!"
}

Response (201):
{
  "id": "uuid",
  "content": "Great video!",
  "user": { ... },
  "likes_count": 0,
  "replies_count": 0,
  "created_at": "2024-06-26T10:30:00Z"
}
```

### Reply to Comment
```
POST /comments/:commentId/reply

Headers: Authorization required

Body:
{
  "content": "Thanks!"
}

Response (201):
{
  "id": "uuid",
  "content": "Thanks!",
  "parent_id": "parent_uuid",
  ...
}
```

### Update Comment
```
PUT /comments/:id

Headers: Authorization required

Body:
{
  "content": "Updated comment"
}

Response (200):
{
  "id": "uuid",
  "content": "Updated comment",
  ...
}
```

### Delete Comment
```
DELETE /comments/:id

Headers: Authorization required

Response (200):
{
  "message": "Comment deleted successfully"
}
```

### Like Comment
```
POST /comments/:id/like

Headers: Authorization required

Response (200):
{
  "message": "Comment liked",
  "likes_count": 6,
  "user_liked": true
}
```

---

## 🏆 Challenge Endpoints

### Get All Challenges
```
GET /challenges?page=1&limit=10&status=active

Query Params:
- status: active, ended, upcoming (default: active)

Response (200):
{
  "challenges": [
    {
      "id": "uuid",
      "title": "Best Dance Move 2024",
      "description": "...",
      "theme": "dance",
      "start_date": "2024-06-26T00:00:00Z",
      "end_date": "2024-07-02T23:59:59Z",
      "prize": "$100 USD",
      "participants": 500,
      "submissions": 250
    }
  ],
  "pagination": { ... }
}
```

### Get Challenge Detail
```
GET /challenges/:id

Response (200):
{
  "id": "uuid",
  "title": "Best Dance Move 2024",
  "description": "...",
  "theme": "dance",
  "start_date": "2024-06-26T00:00:00Z",
  "end_date": "2024-07-02T23:59:59Z",
  "prize": "$100 USD",
  "participants": 500,
  "submissions": 250,
  "user_submitted": true,
  "user_submission_id": "uuid"
}
```

### Submit Challenge Entry
```
POST /challenges/:id/submit

Headers: 
- Authorization required
- Content-Type: multipart/form-data

Form Data:
- video: (file, required)
- title: "Submission Title" (optional)
- description: "..." (optional)

Response (201):
{
  "id": "uuid",
  "challenge_id": "uuid",
  "video_url": "https://...",
  "status": "processing",
  "message": "Submission received, processing..."
}
```

### Get Challenge Leaderboard
```
GET /challenges/:id/leaderboard?page=1&limit=20

Response (200):
{
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "uuid",
        "username": "dancer",
        "avatar_url": "https://..."
      },
      "video": {
        "id": "uuid",
        "video_url": "https://..."
      },
      "score": 950,
      "likes": 1000,
      "comments": 50
    }
  ],
  "pagination": { ... }
}
```

---

## 🎮 Gamification Endpoints

### Get User Points
```
GET /gamification/user/:id/points

Response (200):
{
  "total_points": 500,
  "level": 3,
  "level_progress": 75,
  "points_for_next_level": 100,
  "breakdown": {
    "video_uploads": 200,
    "likes": 100,
    "comments": 50,
    "challenges": 100,
    "follows": 50
  }
}
```

### Get User Badges
```
GET /gamification/user/:id/badges

Response (200):
{
  "badges": [
    {
      "id": "uuid",
      "name": "First Upload",
      "description": "Upload your first video",
      "icon_url": "https://...",
      "earned_at": "2024-06-26T10:30:00Z"
    }
  ],
  "total": 5
}
```

### Get Global Leaderboard
```
GET /gamification/leaderboard?page=1&limit=20&period=week

Query Params:
- period: day, week, month, all (default: week)

Response (200):
{
  "leaderboard": [
    {
      "rank": 1,
      "user": {
        "id": "uuid",
        "username": "top_user",
        "avatar_url": "https://..."
      },
      "points": 5000,
      "level": 10
    }
  ],
  "pagination": { ... }
}
```

---

## 🔔 Notification Endpoints

### Get User Notifications
```
GET /notifications?page=1&limit=20&unread=false

Query Params:
- unread: true/false (default: false, get all)

Response (200):
{
  "notifications": [
    {
      "id": "uuid",
      "type": "like",
      "message": "john_doe liked your video",
      "data": {
        "video_id": "uuid",
        "user_id": "uuid"
      },
      "read": false,
      "created_at": "2024-06-26T10:30:00Z"
    }
  ],
  "pagination": { ... }
}
```

### Mark Notification as Read
```
POST /notifications/:id/read

Headers: Authorization required

Response (200):
{
  "message": "Notification marked as read"
}
```

---

## 🔍 Search Endpoints

### Search Videos
```
GET /search/videos?q=dance&page=1&limit=10

Query Params:
- q: Search query (required)
- category: Category filter (optional)
- sort: newest, trending, popular

Response (200):
{
  "results": [ ... videos ... ],
  "pagination": { ... }
}
```

### Search Users
```
GET /search/users?q=john&page=1&limit=10

Response (200):
{
  "results": [ ... users ... ],
  "pagination": { ... }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You don't have permission to perform this action"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Something went wrong on the server"
}
```

---

## Rate Limiting

- **Anonymous:** 100 requests/hour
- **Authenticated:** 1000 requests/hour
- **Premium:** Unlimited

Rate limit info returned in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1624689600
```

---

**API Documentation - Version 1.0**
**Last Updated: June 2024**
