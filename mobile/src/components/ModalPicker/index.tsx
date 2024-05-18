import { CategoryProps } from '../../pages/Order';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ModalProps = {
  handleCloseModal: () => void;
  options: CategoryProps[];
  selectedItem: (item: CategoryProps) => void;
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function ModalPicker({
  handleCloseModal,
  options,
  selectedItem,
}: ModalProps) {
  function onPressItem(item: CategoryProps) {
    handleCloseModal();
    console.log(item);
    selectedItem(item);
  }

  const option = options.map((item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.option}
      onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>{item?.name}</Text>
    </TouchableOpacity>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 4,
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a',
  },
  item: {
    margin: 18,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#101026',
  },
});
