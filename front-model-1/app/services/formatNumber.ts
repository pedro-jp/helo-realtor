export function formatarNumero(numero: string) {
  // Remove tudo que não for dígito
  numero = numero.replace(/\D/g, '');

  // Verifica se o número tem 11 dígitos (para incluir o DDD)
  if (numero.length === 11) {
    // Aplica a formatação (XX) XXXXX-XXXX
    return numero.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else {
    // Se não tiver 11 dígitos, retorna o número sem formatação
    return numero;
  }
}

// Exemplo de uso
const numeroFormatado = formatarNumero('11970707400');
console.log(numeroFormatado); // Saída: (11) 97070-7400
