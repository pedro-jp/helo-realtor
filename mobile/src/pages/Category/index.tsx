import { AuthContext } from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../../services/api';
import * as S from './styles';
import { Feather } from '@expo/vector-icons';

export default function Category() {
  const [category, setCategory] = useState('');
  const { user } = useContext(AuthContext);

  const [state, setState] = useState(false);

  const [categoryList, setCategoryList] = useState([]);

  async function createCategory() {
    try {
      const response = await api.post('/category', {
        ownerId: user.id,
        name: category,
      });

      setCategory('');
      setState(!state);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listCategories();
  }, [state]);

  async function listCategories() {
    try {
      const response = await api.get('/category', {
        params: {
          ownerId: user.id,
        },
      });
      setCategoryList(response.data);
      console.log(response.data);
    } catch (error) {}
  }

  // async function handleDeleteCategory(id: string) {
  //   try {
  //     await api.delete('/category', {
  //       params: {
  //         id,
  //       },
  //     });

  //     setCategoryList(categoryList.filter((item) => item.id !== id));
  //     setState(!state);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <S.StyledContainerView>
      <S.StyledInputsView>
        <S.StyledTextInput
          onChangeText={setCategory}
          placeholder='Nome da categoria'
          placeholderTextColor='#f0f0f0'
          value={category}
        />
        <S.StyledButton onPress={createCategory}>
          <S.StyledText>Criar categoria</S.StyledText>
        </S.StyledButton>
      </S.StyledInputsView>

      <S.StyledScrollView>
        <S.StyledText>Categorias criadas</S.StyledText>
        {categoryList.map((item) => (
          <S.StyledListView key={item.id}>
            <S.StyledText>{item.name}</S.StyledText>
            {/* <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
              <Feather name='trash' size={24} color='red' />
            </TouchableOpacity> */}
          </S.StyledListView>
        ))}
      </S.StyledScrollView>
    </S.StyledContainerView>
  );
}
