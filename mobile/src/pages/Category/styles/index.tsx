import styled from 'styled-components/native';

export const StyledContainerView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledInputsView = styled.View`
  flex: auto;
  margin: 40px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

export const StyledTextInput = styled.TextInput`
  height: 50px;
  width: 60%;
  background-color: #f3f3f3;
  border-radius: 4px;
  padding: 8px;
  color: #000;
`;

export const StyledButton = styled.TouchableOpacity`
  height: 50px;
  width: max-content;
  background-color: #4246ff;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  text-align: center;
  justify-content: center;
`;

export const StyledText = styled.Text`
  text-align: center;
  font-size: 20px;
  color: #fff;
`;

export const StyledScrollView = styled.ScrollView``;

export const StyledListView = styled.View`
  flex: auto;
  width: 100%;
  margin: 12px auto;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
  border: 1px solid #ffffff20;
  border-radius: 4px;
  background-color: #4246ff;
`;
