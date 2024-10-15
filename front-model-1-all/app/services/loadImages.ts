const ownerId = process.env.NEXT_PUBLIC_OWNER_ID;
const url = process.env.NEXT_PUBLIC_URL;

export async function loadImages(id: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/images/${id}`);
  return response;
}
