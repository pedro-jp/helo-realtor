const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

export async function loadImages(id: string) {
  const response = await fetch(`http://192.168.1.21:3332/images/${id}`);
  return response;
}
