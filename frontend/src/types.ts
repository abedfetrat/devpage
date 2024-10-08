export type Page = {
  uniqueName: string,
  userId: string,
  resumeUrl?: string,
  profileDetails?: ProfileDetails,
  links?: Link[],
  settings?: Settings
}

export type ProfileDetails = {
  photoUrl?: string,
  fullName?: string,
  title?: string,
  bio?: string,
  email?: string,
  phone?: string
}

export type Link = {
  url: string,
  name: string
}

export type Settings = {
  theme: string
}