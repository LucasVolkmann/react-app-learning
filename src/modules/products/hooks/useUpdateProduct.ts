import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_PRODUCT_ID } from '../../../shared/constants/Urls';
import { InsertProductDTOType } from '../../../shared/dtos/InsertProductDTOType.dto';
import { ReceivedProductDTOType } from '../../../shared/dtos/ReceivedProductDTOType';
import { MethodsEnum } from '../../../shared/enumerations/methods.enum';
import { connectionAPI_PUT } from '../../../shared/functions/connection/connectionAPI';
import { useRequests } from '../../../shared/hooks/useRequests';
import { ProductType } from '../../../shared/types/ProductType';
import { useGlobalReducer } from '../../../store/reducers/globalReducer/useGlobalReducer';
import { ProductRoutesEnum } from '../routes';

const EMPTY_PRODUCT = {
  name: '',
  image: '',
  price: 0,
  weight: 0,
  length: 0,
  height: 0,
  width: 0,
  diameter: 0,
};

export const useUpdateProduct = (productId: number) => {
  const [loading, setLoading] = useState(false);
  const [loadingGetProduct, setLoadingGetProduct] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [updateProduct, setUpdateProduct] = useState<InsertProductDTOType>(EMPTY_PRODUCT);

  const { setNotification } = useGlobalReducer();
  const navigate = useNavigate();
  const { request } = useRequests();

  useEffect(() => {
    if (
      updateProduct.name &&
      updateProduct.image &&
      updateProduct.categoryId &&
      updateProduct.price > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [updateProduct]);

  useEffect(() => {
    setLoadingGetProduct(true);
    request<ReceivedProductDTOType>(
      URL_PRODUCT_ID.replace('{productId}', `${productId}`),
      MethodsEnum.GET,
    ).then((product) => {
      if (product && product?.category) {
        const categoryId = product?.category.id;
        delete product?.category;
        setUpdateProduct({
          ...product,
          categoryId,
        });
      } else {
        setNotification({
          message: 'Erro ao buscar produto!',
          type: 'error',
        });
        navigate(ProductRoutesEnum.PRODUCT);
      }
      setLoadingGetProduct(false);
    });
  }, []);

  const handleOnClickUpdate = async () => {
    setLoading(true);
    await connectionAPI_PUT<ProductType>(
      URL_PRODUCT_ID.replace('{productId}', `${productId}`),
      updateProduct,
    )
      .then((res) => {
        setNotification({
          message: 'Sucesso!',
          type: 'success',
          description: `O produto '${res.name}' foi alterado com sucesso!`,
        });
        navigate(ProductRoutesEnum.PRODUCT);
        setUpdateProduct(EMPTY_PRODUCT);
      })
      .catch((err) => {
        setNotification({
          message: 'Erro ao inserir produto.',
          type: 'error',
          description: err.message,
        });
      });
    setLoading(false);
  };

  const handleOnClickCancel = () => {
    navigate(ProductRoutesEnum.PRODUCT);
    setUpdateProduct(EMPTY_PRODUCT);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    isNumeric?: boolean,
  ) => {
    if (isNumeric && isNaN(Number(event.target.value))) {
      return;
    }
    setUpdateProduct({
      ...updateProduct,
      [value]: isNumeric ? Number(event.target.value) : event.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setUpdateProduct({
      ...updateProduct,
      categoryId: Number(value),
    });
  };

  return {
    handleOnClickUpdate,
    handleOnClickCancel,
    handleInputChange,
    handleSelectChange,
    updateProduct,
    loading,
    loadingGetProduct,
    disabled,
  };
};
