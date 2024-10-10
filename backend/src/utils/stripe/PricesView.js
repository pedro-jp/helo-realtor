const createSubscription = async (priceId, customerId) => {
  const apiEndpoint = process.env.ENDPOINT;

  const response = await fetch(`${apiEndpoint}/create-subscription`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: priceId,
      customerId: customerId,
    }),
  });
  if (response.status === 200) {
    const subscription = await response.json();
    return subscription;
  }
};
