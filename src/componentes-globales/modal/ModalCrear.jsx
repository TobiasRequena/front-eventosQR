// import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, Button, Space, InputNumber } from 'antd';

const { TextArea } = Input;

const EventoModal = ({ visible, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (onSubmit) {
          onSubmit(values);
        }

        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log('Error de validación:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={'Crear nuevo evento'}
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={500}
      centered
    >
      <Form form={form} layout='vertical'>
        <Form.Item
          label={'Nombre'}
          name='nombre'
          rules={[
            {
              required: true,
              message: 'Por favor ingresa el nombre del evento'
            }
          ]}
        >
          <Input placeholder='Nombre del evento' />
        </Form.Item>

        <Form.Item
          label={'Descripción'}
          name='descripcion'
          rules={[
            { required: true, message: 'Por favor ingresa la descripción' }
          ]}
        >
          <TextArea rows={2} placeholder='Descripción del evento' />
        </Form.Item>

        <div style={{ display: 'flex', gap: '15px' }}>
          <Form.Item
            label={'Fecha de inicio'}
            name='fechaInicio'
            rules={[
              { required: true, message: 'Selecciona la fecha de inicio' }
            ]}
          >
            <DatePicker
              showTime
              format='YYYY-MM-DD HH:mm'
              placeholder='Fecha de inicio del evento'
            />
          </Form.Item>

          <Form.Item label={'Fecha de fin (opcional)'} name='fechaFin'>
            <DatePicker
              showTime
              format='YYYY-MM-DD HH:mm'
              placeholder='Fecha de fin del evento (opcional)'
            />
          </Form.Item>
        </div>

        <Form.Item
          label={'Lugar del evento'}
          name='lugar'
          rules={[{ required: true, message: 'Por favor ingresa el lugar' }]}
        >
          <Input placeholder='Lugar del evento' />
        </Form.Item>

				<Form.Item
					label="Capacidad del evento"
					name="capacidad"
					rules={[{ required: true, message: 'La capacidad es obligatoria' }]}
				>
					<InputNumber 
						placeholder="Capacidad del evento" 
						style={{ width: '100%' }} 
						min={0} 
					/>
				</Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Button type='primary' onClick={handleSubmit}>
            Crear
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default EventoModal;
