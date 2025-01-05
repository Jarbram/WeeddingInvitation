import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const RSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica para enviar los datos
    console.log('Datos del formulario:', formData);
    setIsSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <RSVPContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Confirma tu Asistencia</SectionTitle>
          <Subtitle>Por favor, confírmanos tu asistencia antes del 1 de Agosto</Subtitle>

          {!isSubmitted ? (
            <FormContainer
              as={motion.form}
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <InputGroup>
                <Label>Nombre Completo</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu nombre completo"
                />
              </InputGroup>

              <InputGroup>
                <Label>Correo Electrónico</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tucorreo@ejemplo.com"
                />
              </InputGroup>

              <InputGroup>
                <Label>¿Asistirás?</Label>
                <Select
                  name="attendance"
                  value={formData.attendance}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="yes">Sí, asistiré</option>
                  <option value="no">No podré asistir</option>
                </Select>
              </InputGroup>

              {formData.attendance === 'yes' && (
                <InputGroup>
                  <Label>Número de Invitados</Label>
                  <Select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                  </Select>
                </InputGroup>
              )}

              <InputGroup>
                <Label>Mensaje para los novios (opcional)</Label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe un mensaje..."
                  rows="4"
                />
              </InputGroup>

              <SubmitButton
                type="submit"
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Confirmar Asistencia
              </SubmitButton>
            </FormContainer>
          ) : (
            <ThankYouMessage
              as={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ThankYouIcon>💝</ThankYouIcon>
              <h3>¡Gracias por confirmar!</h3>
              <p>Hemos recibido tu confirmación. Nos vemos en la celebración.</p>
            </ThankYouMessage>
          )}
        </motion.div>
      </ContentWrapper>
    </RSVPContainer>
  );
};

const RSVPContainer = styled.section`
  padding: 6rem 0;
  background-color: #faf9f8;
`;

const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background-color: #d4b08c;
    margin: 1rem auto;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
  font-family: 'Montserrat', sans-serif;
`;

const FormContainer = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4b08c;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #d4b08c;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #d4b08c;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #d4b08c;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c49b7c;
  }
`;

const ThankYouMessage = styled.div`
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin: 1rem 0;
    color: #1a1a1a;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    color: #666;
  }
`;

const ThankYouIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export default RSVP; 