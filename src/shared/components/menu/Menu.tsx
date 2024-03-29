import {
  HomeOutlined,
  LaptopOutlined,
  ProfileOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps as MenuPropsAntD } from 'antd';
import { Menu as MenuAntD } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CategoryEnum } from '../../../modules/categories/routes';
import { FirstScreenEnum } from '../../../modules/firstScreen/routes';
import { OrderRoutesEnum } from '../../../modules/orders/routes';
import { ProductRoutesEnum } from '../../../modules/products/routes';
import { UserRoutesEnum } from '../../../modules/users/routes';
import { LogoNameContainer, MenuContainer, MenuLogo, MenuName } from './menu.style';

type MenuItem = Required<MenuPropsAntD>['items'][number];

const rootSubmenuKeys = ['home', 'product', 'category', 'order', 'user'];

interface MenuProps {
  currentPage?: string;
}

const Menu = ({ currentPage }: MenuProps) => {
  const [openKeys, setOpenKeys] = useState([currentPage || '']);
  const navigate = useNavigate();

  const items: MenuItem[] = [
    {
      key: 'home',
      label: 'Principal',
      icon: <HomeOutlined />,
      onClick: () => navigate(FirstScreenEnum.FIRST_PAGE),
    },
    {
      key: 'product',
      label: 'Produtos',
      icon: <LaptopOutlined />,
      children: [
        {
          key: 'product_view',
          label: 'Visualizar',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT),
        },
        {
          key: 'product_insert',
          label: 'Inserir',
          onClick: () => navigate(ProductRoutesEnum.PRODUCT_INSERT),
        },
      ],
    },
    {
      key: 'category',
      label: 'Categorias',
      icon: <ProfileOutlined />,
      children: [
        {
          key: 'category_view',
          label: 'Visualizar',
          onClick: () => navigate(CategoryEnum.CATEGORY),
        },
        {
          key: 'category_insert',
          label: 'Inserir',
          onClick: () => navigate(CategoryEnum.CATEGORY_INSERT),
        },
      ],
    },
    {
      key: 'order',
      label: 'Pedidos',
      icon: <SafetyCertificateOutlined />,
      onClick: () => navigate(OrderRoutesEnum.ORDER),
    },
    {
      key: 'user',
      label: 'Usuários',
      icon: <UserOutlined />,
      children: [
        {
          key: 'user_view',
          label: 'Visualizar',
          onClick: () => navigate(UserRoutesEnum.USER),
        },
        {
          key: 'user_insert',
          label: 'Inserir',
          onClick: () => navigate(UserRoutesEnum.USER_INSERT),
        },
      ],
    },
  ];

  const onOpenChange: MenuPropsAntD['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <MenuContainer>
      <LogoNameContainer>
        <MenuLogo />
        <MenuName>On-Sales</MenuName>
      </LogoNameContainer>
      <MenuAntD
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{ width: 250, border: 'none' }}
        items={items}
      />
    </MenuContainer>
  );
};

export default Menu;
