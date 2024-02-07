import { Typography } from 'antd';
import styled from 'styled-components';

import SVGLogo from '../icons/SVGLogo';

const { Text } = Typography;

export const MenuContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  background-color: #fff;

  border-right: 1px solid #d3d3d3;

  width: 250px;
`;

export const LogoNameContainer = styled.div`
  height: 75px;

  display: flex;
  justify-content: center;

  border-bottom: 1px solid #d3d3d3;
`;

export const MenuLogo = styled(SVGLogo)`
  height: 90%;
`;

export const MenuName = styled(Text)`
  height: fit-content;

  font-size: 2em;
  font-weight: bold;
  text-shadow: -1px 2px 0px #555;
  color: #ffc801;

  margin: auto 0;
  margin-right: 15px;
`;
