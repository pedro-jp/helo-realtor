import styled from 'styled-components/native';

export const StyledContainerView = styled.View`
  flex: 1;
  background-color: #111111;
`;

export const StyledContentView = styled.View`
  flex: auto;
  margin: 40px 16px;
  flex-direction: column;
  gap: 10px;
  background-color: #00000050;
  padding: 16px;
  border-radius: 16px;
`;

export const StyledRowView = styled.View`
  flex: auto;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledText = styled.Text`
  font-size: 20px;
  color: #fff;
`;

export const StyledTitle = styled.Text`
  font-size: 30px;
  color: #fff;
`;
