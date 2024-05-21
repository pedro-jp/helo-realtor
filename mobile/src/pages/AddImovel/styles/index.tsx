import styled from 'styled-components/native';

export const StyledContainerView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
`;

export const StyledContentView = styled.View`
  flex: auto;
  margin: 40px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
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
