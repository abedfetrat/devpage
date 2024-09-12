import {supabase} from "../supabaseClient.ts";

export async function uploadAvatar(photo: File) {
  const {data, error} = await supabase.storage
    .from('avatars')
    .upload(`public/${photo.name}`, photo, {upsert: true})

  if (error) {
    throw new Error(`Error uploading avatar with file name: ${photo.name}`);
  }

  return supabase.storage.from("avatars").getPublicUrl(data?.path).data.publicUrl;
}