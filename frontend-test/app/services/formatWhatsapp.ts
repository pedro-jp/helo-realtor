export default function formatWhatsAppLink(phone: string, message: string) {
  // Remove todos os caracteres não numéricos do telefone
  const cleanedPhone = phone.replace(/\D/g, '');

  // Codifica a mensagem para ser utilizada na URL
  const encodedMessage = encodeURIComponent(message);

  // Retorna a URL do WhatsApp com o número e a mensagem
  return `https://wa.me/+55${cleanedPhone}?text=${encodedMessage}`;
}
