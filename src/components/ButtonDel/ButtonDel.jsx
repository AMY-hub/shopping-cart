import { useContext } from 'react';
import { cartContext } from '../Cart';

export const ButtonDel = ({ id }) => {
  const { deleteProduct } = useContext(cartContext);
  return (
    <button type="button"
      onClick={() => deleteProduct(id)}>
      <img src="./img/icons/cross.svg" alt="Delete" />
    </button>
  )
}
