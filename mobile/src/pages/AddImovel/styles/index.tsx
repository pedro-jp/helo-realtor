import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const StyledContainerView = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const StyledContentView = styled.View`
  flex: auto;
  margin: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding-bottom: 50px;
`;

export const StyledInputsView = styled.View`
  flex: auto;
  margin: 40px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const StyledTextInput = styled.TextInput`
  height: 50px;
  width: 90%;
  background-color: #022859;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
`;

export const StyledButton = styled.TouchableOpacity`
  height: 50px;
  width: 250px;
  margin-top: 40px;
  background-color: #0583f2;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: #fff;
`;

export const StyledScrollView = styled.ScrollView`
  background-color: #111111;
  padding-top: 40px;
`;

export const StyledListView = styled.TouchableOpacity`
  flex: auto;
  width: 90%;
  margin: 12px auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 4px;
`;

export const StyledModal = styled.Modal`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

// New Components

export const StyledScrollContainer = styled.ScrollView`
  flex: 1;
  background-color: #111111;
  padding-top: 40px;
  padding-bottom: 20px;
`;

export const StyledHeader = styled.Text`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center;
`;

export const StyledModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 20px;
`;

export const StyledModalText = styled.Text`
  font-size: 18px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 15px;
`;

export const StyledCategoryButton = styled.TouchableOpacity`
  height: 50px;
  width: 90%;
  background-color: #0563c1;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const StyledRealtorList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 20,
  },
})`
  width: 100%;
  background-color: #1d1d1d;
`;

export const StyledRealtorItem = styled.TouchableOpacity`
  background-color: #333333;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 4px;
  align-items: center;
`;
