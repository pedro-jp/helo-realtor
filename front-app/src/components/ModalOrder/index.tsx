import { OrderItemProps } from '@/pages/propertys';
import Modal from 'react-modal';
import styles from './styles.module.scss';
import { FiX } from 'react-icons/fi';

interface ModalOrderProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (id: string) => void;
}

const customStyle = {
  content: {
    top: '50%',
    bottom: 'auto',
    left: '50%',
    right: 'auto',
    padding: '30px',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1d1d2e',
  },
};

export function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: ModalOrderProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyle}>
      <button
        type='button'
        onClick={onRequestClose}
        className='reat-modal-close'
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color='#f34748' />
      </button>
      <div className={styles.content}>
        <h2>Detalhes do pedido</h2>
        <span>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>
        {order.map((item) => {
          return (
            <section key={item.id}>
              <span>
                {item.amount} - <strong>{item.product.name}</strong>
              </span>
              <span>{item.product.description}</span>
            </section>
          );
        })}
        <button onClick={() => handleFinishOrder(order[0].order_id)}>
          Concluir Pedido
        </button>
      </div>
    </Modal>
  );
}
