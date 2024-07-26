import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const HeaderWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

export const HeaderLeftWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitleWrapper = styled.View`
  margin-left: 15px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-right: 12;
`;

export const HeaderSubtitle = styled.Text`
  font-size: 18;
  font-weight: 600;
  color: #0583f2;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const FooterSection = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
`;
export const PickedFooterSection = styled.View`
  flex: 1;
  align-items: center;
  padding: 10px;
  border-top-color: #000;
  border-top-width: 2px;
`;

export const PickedFooterTitle = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

export const FooterText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
