import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Imovel() {
  const Routes = useRoute();
  const { imovelId } = Routes.params as { imovelId: string };

  return (
    <View>
      <Text>{imovelId}</Text>
    </View>
  );
}
