import { supabase } from "./supabaseClient";
export async function uploadImage(file) {
  if (!file) throw new Error("No file provided");

  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("memories")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  
  return filePath;
}

export async function createMemory({
  title,
  description,
  date,
  tags,
  imageFile,
}) {
  try {
    
    const filePath = await uploadImage(imageFile);

    
    const { data, error } = await supabase
      .from("memories")
      .insert([
        {
          title,
          description,
          image_url: filePath, 
          date,
          tags,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getSignedImageUrl(filePath) {
  const { data, error } = await supabase.storage
    .from("memories")
    .createSignedUrl(filePath, 60 * 60); 

  if (error) throw error;

  return data.signedUrl;
}

export async function getMemories() {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);

  const memoriesWithImages = await Promise.all(
    data.map(async (memory) => {
      const imageUrl = await getSignedImageUrl(memory.image_url);

      return {
        ...memory,
        signedUrl: imageUrl,
        filePath: memory.image_url,
      };
    })
  );

  return memoriesWithImages;
}

export async function deleteMemory(memory) {
  try {
    // delete image using REAL storage path
    const { error: storageError } = await supabase.storage
      .from("memories")
      .remove([memory.filePath]);

    if (storageError) throw storageError;

    const { error: dbError } = await supabase
      .from("memories")
      .delete()
      .eq("id", memory.id);

    if (dbError) throw dbError;

  } catch (error) {
    throw new Error(error.message);
  }
}
