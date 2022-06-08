export interface User {
    id: number,
    fullname: string,
    phone_number: string,
    role_id: number,
    email: string,
    email_verified_at: string,
    current_team_id: number,
    profile_photo_path: string,
    roles: string,
    created_at: string,
    updated_at: string,
    profile_photo_url: string
    role: Role
}

export interface Role {
    id: number,
    name: string,
    created_at: string,
    updated_at: string
}