import supabase from './supabase';

export async function getCabins() {
  const { data: cabins, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return cabins;
}

export async function deleteCabin(cabinId) {
  const { data: cabins, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return cabins;
}

export async function createCabin(cabin) {
  const { data, error } = await supabase
    .from('cabins')
    .insert([cabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  return data;
}
