import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarCheck, FaTimes } from 'react-icons/fa';

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <EventContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader>
            <SectionTitle>Ceremonia & Celebración</SectionTitle>
            <SectionSubtitle>Acompáñanos en este momento tan especial</SectionSubtitle>
          </SectionHeader>
          
          <EventCard>
            <TimeSection>
              <DetailIcon>
                <FaClock size={24} color="#d4b08c" />
              </DetailIcon>
              <TimeBlock>
                17:00
                <TimeLabel>Ceremonia & Recepción</TimeLabel>
              </TimeBlock>
            </TimeSection>

            <LocationSection>
              <DetailIcon>
                <FaMapMarkerAlt size={24} color="#d4b08c" />
              </DetailIcon>
              <LocationInfo>
                <LocationName>Hotel Real</LocationName>
                <LocationAddress>Calle Las Flores 456, Lima</LocationAddress>
              </LocationInfo>
            </LocationSection>

            <ButtonsWrapper>
              <MapButton 
                href="https://maps.google.com/?q=Hotel+Real+Lima" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaMapMarkerAlt size={16} />
                Cómo llegar
              </MapButton>

              <ConfirmButton
                as={motion.button}
                onClick={() => setShowModal(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCalendarCheck size={16} />
                Confirmar asistencia
              </ConfirmButton>
            </ButtonsWrapper>
          </EventCard>
        </motion.div>
      </ContentWrapper>

      <AnimatePresence>
        {showModal && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <CloseButton onClick={() => setShowModal(false)}>
                <FaTimes />
              </CloseButton>

              <ModalIcon>
                <FaCalendarCheck size={32} color="#d4b08c" />
              </ModalIcon>
              
              <ModalTitle>¿Asistes a la celebración?</ModalTitle>
              
              <RadioGroup>
                <RadioOption>
                  <RadioInput 
                    type="radio" 
                    name="attendance" 
                    id="confirm" 
                    value="confirm" 
                  />
                  <RadioLabel htmlFor="confirm">¡Sí, confirmo!</RadioLabel>
                </RadioOption>

                <RadioOption>
                  <RadioInput 
                    type="radio" 
                    name="attendance" 
                    id="decline" 
                    value="decline" 
                  />
                  <RadioLabel htmlFor="decline">No puedo :( </RadioLabel>
                </RadioOption>
              </RadioGroup>

              <FormInput
                type="text"
                placeholder="Ingrese su nombre completo"
              />

              <FormTextarea
                placeholder="Ingrese algún dato importante. Ej: Soy vegetariano"
                rows="3"
              />

              <SubmitButton
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enviar
              </SubmitButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </EventContainer>
  );
};

const EventContainer = styled.section`
  padding: 4rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const EventCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
`;

const TimeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const LocationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`;

const DetailIcon = styled.span`
  display: flex;
  align-items: center;
`;

const TimeBlock = styled.div`
  font-size: 2rem;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 300;
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.2rem;
`;

const LocationInfo = styled.div`
  flex: 1;
`;

const LocationName = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #1a1a1a;
`;

const LocationAddress = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.2rem;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const BaseButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  flex: 1;
`;

const MapButton = styled(BaseButton)`
  color: ${props => props.theme.colors.primary.main};
  border: 1px solid ${props => props.theme.colors.primary.main};
  
  &:hover {
    background: ${props => props.theme.colors.primary.light};
    color: white;
  }
`;

const ConfirmButton = styled(BaseButton)`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
  &:hover {
    color: #333;
  }
`;

const ModalIcon = styled.div`
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 2rem;
  font-weight: 400;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid ${props => props.theme.colors.primary.main};
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: ${props => props.theme.colors.primary.main};
    border-color: ${props => props.theme.colors.primary.main};
    
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.4rem;
      height: 0.4rem;
      background: white;
      border-radius: 50%;
    }
  }
`;

const RadioLabel = styled.label`
  font-size: 1rem;
  color: #333;
  cursor: pointer;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.9rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.primary.main};
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  width: 100%;
  
  &:hover {
    background: ${props => props.theme.colors.primary.dark};
  }
`;

const SectionHeader = styled.header`
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 2rem;
  color: ${props => props.theme.colors.primary.dark};
  margin-bottom: 0.5rem;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 2px;
    background: ${props => props.theme.colors.primary.main};
    margin: 0.5rem auto;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.sage[600]};
  margin-top: 0.5rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export default Event; 