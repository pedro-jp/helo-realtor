import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { api } from '../../services/api';

export default function Category() {
  const { user } = useContext(AuthContext);

  async function createCategory() {
    const response = await api.post('/category', {
      ownerId: user.id,
      name: 'Teste',
    });

    console.log(response.data);
  }

  return (
    <View>
      <TouchableOpacity onPress={createCategory}>
        <Text>Category</Text>
      </TouchableOpacity>
    </View>
  );
}
