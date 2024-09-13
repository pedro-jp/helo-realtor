const createSubscription = async (priceId, customerId) => {
  const apiEndpoint = 'http://192.168.1.21:3332';

  const response = await fetch(`${apiEndpoint}/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${'sk_test_51OIWpBFkkC3ZoBrE0CdfikwVVdeBAdLEsQNKuv4cwGogWVvqZAtw2f0kp9kIngjf7PAS7VSOkosp9k16Wf5RG0fu00OKveoqD8'}`, // Adiciona o Bearer token no cabeçalho
    },
    body: JSON.stringify({
      priceId: priceId,
      customerId: customerId,
    }),
  });

  if (response.status === 200) {
    const subscription = await response.json();
    return subscription;
  } else {
    console.error(
      'Erro ao criar a assinatura:',
      response.status,
      await response.json()
    );
  }
};
