// styles.js
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

export const MenuBlur = styled(BlurView).attrs({
  intensity: 50,
})`
  flex: 1;
  background-color: rgba(61, 53, 105, 0.4);
`;

export const TabBarBackground = styled.View`
  width: 100%;
  height: 50px;
  border-radius: 90px;
  border-top-color: white;
  border-bottom-color: white;
  overflow: hidden;
`;

export const TabBarStyle = styled.View`
  width: 70%;
  height: 50px;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-100px);
  align-items: center;
  elevation: 0;
  overflow: visible;
`;

export const TabBarIconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
