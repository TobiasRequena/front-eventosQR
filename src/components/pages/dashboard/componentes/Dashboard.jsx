import '../styles/dashboard.css'
import { useState } from 'react';
import { Button } from 'antd'
import { Plus } from 'lucide-react';
import EventoModal from '../../../../componentes-globales/modal/ModalCrear';

export const Dashboard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleEventSubmit = (values) => {
    console.log('Evento creado:', values);
    // Aquí puedes hacer lo que necesites con los datos
  };

	// const handleNewEvento = () => {
	// 	console.log('Nuevo Evento');
	// }

	return (
		<div className='dashboard-container'>
			<Button onClick={handleOpenModal} color='primary' variant='outlined' icon={<Plus />}>
        Nuevo Evento
      </Button>
      <EventoModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleEventSubmit}
      />
		</div>
	)
}