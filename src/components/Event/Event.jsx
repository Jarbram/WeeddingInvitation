import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaCalendarCheck, FaTimes } from 'react-icons/fa';

const EventContainer = styled.section`
  padding: 4rem 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  border-radius: 20px;
  width: 95%;
  max-width: 1400px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const BaseCard = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 1.2rem;
  padding: 2rem;
  box-shadow: 0 10px 25px rgba(117, 135, 95, 0.08);
`;

const CardTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.sage.main};
  font-size: 1.5rem;
  margin-bottom: 1.8rem;
  text-align: center;
  
  &:after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: ${props => props.theme.colors.primary.main};
    margin: 0.6rem auto 0;
  }
`;

const ParentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 90%;
  margin: 0 auto;
`;

const FamilyGroup = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.sage.light};
  border-radius: 0.8rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(117, 135, 95, 0.1);
  }
`;

const ParentName = styled.h4`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.sage.main};
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0.4rem 0;
  line-height: 1.4;
  width: 100%;
`;

const Separator = styled.div`
  color: ${props => props.theme.colors.primary.main};
  margin: 0.4rem 0;
  font-size: 1.2rem;
  position: relative;
  width: 100%;
  text-align: center;
  
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 30%;
    height: 1px;
    background: ${props => props.theme.colors.primary.light};
  }
  
  &:before {
    left: 10%;
  }
  
  &:after {
    right: 10%;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.colors.sage.light};
  border-radius: 0.8rem;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(0.3rem);
    box-shadow: 0 4px 12px rgba(117, 135, 95, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.white};
  border-radius: 50%;
  color: ${props => props.theme.colors.sage.main};
`;

const DetailContent = styled.div`
  flex-grow: 1;
`;

const DetailLabel = styled.h4`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.sage.main};
  margin-bottom: 0.2rem;
`;

const DetailText = styled.p`
  font-size: 1rem;
  color: ${props => props.theme.colors.primary.main};
  font-weight: 500;
`;

const DetailSubtext = styled.p`
  font-size: 0.8rem;
  color: ${props => props.theme.colors.primary.main};
  opacity: 0.8;
`;

const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.sage.light};
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const BaseButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.5rem;
  border-radius: 0.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const MapButton = styled(BaseButton)`
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.sage.main};
  border: 1px solid ${props => props.theme.colors.sage.main};
  
  &:hover {
    background: ${props => props.theme.colors.sage.main};
    color: ${props => props.theme.colors.white};
  }
`;

const ConfirmButton = styled(BaseButton)`
  background: ${props => props.theme.colors.sage.main};
  color: ${props => props.theme.colors.white};
  border: none;
  
  &:hover {
    background: ${props => props.theme.colors.primary.main};
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(117, 135, 95, 0.15);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

const ModalContent = styled(motion.div)`
  background: ${props => props.theme.colors.white};
  padding: 2.5rem;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  position: relative;
  text-align: center;
  box-shadow: 0 10px 30px rgba(117, 135, 95, 0.15);
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
  color: ${props => props.theme.colors.sage.main};
`;

const ModalTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.8rem;
  color: ${props => props.theme.colors.sage.main};
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
  position: relative;
  padding: 1rem 2rem;
  border-radius: 50px;
  background: ${props => props.theme.colors.sage.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.theme.colors.primary.light};
  }
  
  input:checked + & {
    background: ${props => props.theme.colors.sage.main};
    color: ${props => props.theme.colors.white};
  }
`;

const RadioInput = styled.input`
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid ${props => props.theme.colors.sage.main};
  border-radius: 50%;
  margin: 0;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:checked {
    background-color: ${props => props.theme.colors.sage.main};
    border-color: ${props => props.theme.colors.sage.main};
    
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 0.4rem;
      height: 0.4rem;
      background: ${props => props.theme.colors.white};
      border-radius: 50%;
    }
  }

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
  }
`;

const RadioLabel = styled.label`
  font-size: 1rem;
  color: #333;
  cursor: pointer;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid ${props => props.theme.colors.sage.light};
  border-radius: 8px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.sage.main};
    box-shadow: 0 0 0 3px rgba(117, 135, 95, 0.1);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid ${props => props.theme.colors.sage.light};
  border-radius: 8px;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.sage.main};
    box-shadow: 0 0 0 3px rgba(117, 135, 95, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: ${props => props.theme.colors.sage.main};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.colors.primary.main};
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(169, 132, 101, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Event = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <EventContainer>
      <EventGrid>
        <BaseCard>
          <CardTitle>Con la bendición de nuestros padres</CardTitle>
          <ParentsContainer>
            <FamilyGroup>
              <ParentName>Carlos Jop Horna Rojas</ParentName>
              <Separator>&</Separator>
              <ParentName>Elena Aurora Pingo Nolasco</ParentName>
            </FamilyGroup>
            <FamilyGroup>
              <ParentName>Arsenio Huacchillo Garcia</ParentName>
              <Separator>&</Separator>
              <ParentName>Juana Violeta Castillo Espinoza</ParentName>
            </FamilyGroup>
          </ParentsContainer>
        </BaseCard>

        <BaseCard>
          <CardTitle>Detalles del Evento</CardTitle>
          <DetailItem>
            <IconWrapper>
              <FaCalendarCheck size={20} />
            </IconWrapper>
            <DetailContent>
              <DetailLabel>Fecha</DetailLabel>
              <DetailText>Sábado, 23 de Agosto 2025</DetailText>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <IconWrapper>
              <FaClock size={20} />
            </IconWrapper>
            <DetailContent>
              <DetailLabel>Hora</DetailLabel>
              <DetailText>17:00 hrs</DetailText>
            </DetailContent>
          </DetailItem>

          <DetailItem>
            <IconWrapper>
              <FaMapMarkerAlt size={20} />
            </IconWrapper>
            <DetailContent>
              <DetailLabel>Lugar</DetailLabel>
              <DetailText>Hotel Real</DetailText>
              <DetailSubtext>Calle Las Flores 456, Lima</DetailSubtext>
            </DetailContent>
          </DetailItem>

          <ButtonsContainer>
            <MapButton
              href="https://maps.google.com/?q=Hotel+Real+Lima"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Ver ubicación
            </MapButton>
            <ConfirmButton
              as={motion.button}
              onClick={() => setShowModal(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Confirmar asistencia
            </ConfirmButton>
          </ButtonsContainer>
        </BaseCard>
      </EventGrid>

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

export default Event; 