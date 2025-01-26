import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Gifts = () => {
  const [showBankDetails, setShowBankDetails] = useState(false);

  const bankInfo = {
    banco: "BCP",
    titular: "Elena & Josué",
    cuenta: "123-456789-0",
    cci: "002-123-456789012345-67"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <GiftsContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeader>
            <SectionTitle>Mesa de Regalos</SectionTitle>
            <SectionSubtitle>Tu presencia es nuestro mejor regalo</SectionSubtitle>
          </SectionHeader>

          <MessageCard
            as={motion.div}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <HeartIcon>💝</HeartIcon>
            <Message>
              Si deseas hacernos un presente, aquí te dejamos algunas opciones que hemos preparado con mucho cariño.
            </Message>
          </MessageCard>

          <GiftsGrid>
            <GiftOption
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <GiftIcon>🏦</GiftIcon>
              <GiftTitle>Aporte Monetario</GiftTitle>
              <GiftDescription>
                Si deseas hacernos un regalo en efectivo, puedes realizarlo a través 
                de una transferencia bancaria.
              </GiftDescription>
              <ShowDetailsButton 
                onClick={() => setShowBankDetails(!showBankDetails)}
              >
                {showBankDetails ? 'Ocultar Datos' : 'Ver Datos Bancarios'}
              </ShowDetailsButton>
            </GiftOption>

            <GiftOption
              as={motion.div}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <GiftIcon>🎁</GiftIcon>
              <GiftTitle>Lista de Deseos</GiftTitle>
              <GiftDescription>
                Hemos creado una lista de regalos en Saga Falabella para 
                que puedas elegir algo especial.
              </GiftDescription>
              <LinkButton 
                href="https://www.sagafalabella.com.pe/novios"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Lista de Deseos
              </LinkButton>
            </GiftOption>
          </GiftsGrid>

          {showBankDetails && (
            <BankDetails
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <BankCard>
                <BankInfo>
                  <BankRow>
                    <BankLabel>Banco:</BankLabel>
                    <BankValue>{bankInfo.banco}</BankValue>
                  </BankRow>
                  <BankRow>
                    <BankLabel>Titular:</BankLabel>
                    <BankValue>{bankInfo.titular}</BankValue>
                  </BankRow>
                  <BankRow>
                    <BankLabel>N° de Cuenta:</BankLabel>
                    <BankValue>
                      {bankInfo.cuenta}
                      <CopyButton onClick={() => copyToClipboard(bankInfo.cuenta)}>
                        📋
                      </CopyButton>
                    </BankValue>
                  </BankRow>
                  <BankRow>
                    <BankLabel>CCI:</BankLabel>
                    <BankValue>
                      {bankInfo.cci}
                      <CopyButton onClick={() => copyToClipboard(bankInfo.cci)}>
                        📋
                      </CopyButton>
                    </BankValue>
                  </BankRow>
                </BankInfo>
              </BankCard>
            </BankDetails>
          )}
        </motion.div>
      </ContentWrapper>
    </GiftsContainer>
  );
};

const GiftsContainer = styled.section`
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  border-radius: 20px;
  width: 95%;
  max-width: 1400px;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: 3rem 1rem;
    margin: 1rem auto;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  color: ${props => props.theme.colors.sage.main};
  font-size: 2rem;
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
  color: ${props => props.theme.colors.primary.main};
  margin-top: 0.5rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const MessageCard = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background: ${props => props.theme.colors.sage[50]};
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const HeartIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.sage[700]};
  line-height: 1.6;
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const GiftOption = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 1px solid ${props => props.theme.colors.sage[100]};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary.main};
    transform: translateY(-5px);
  }
`;

const GiftIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const GiftTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.sage[800]};
  margin-bottom: 1rem;
`;

const GiftDescription = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.sage[600]};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background: ${props => props.theme.colors.sage.main};
  color: ${props => props.theme.colors.white};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.sage[600]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(117, 135, 95, 0.2);
  }
`;

const ShowDetailsButton = styled(Button)``;

const LinkButton = styled.a`
  display: inline-block;
  background: ${props => props.theme.colors.sage.main};
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.sage[600]};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(117, 135, 95, 0.2);
  }
`;

const BankDetails = styled.div`
  margin-top: 2rem;
`;

const BankCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
`;

const BankInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BankRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const BankLabel = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 500;
  color: ${props => props.theme.colors.sage[600]};
`;

const BankValue = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.sage[800]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.2rem;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export default Gifts; 