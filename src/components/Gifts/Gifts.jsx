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
          <SectionTitle>Mesa de Regalos</SectionTitle>
          
          <MessageCard>
            <HeartIcon>💝</HeartIcon>
            <Message>
              Tu presencia en nuestra boda es el regalo más valioso. Sin embargo, 
              si deseas hacernos un presente, aquí te dejamos algunas opciones.
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
  padding: 6rem 0;
  background-color: #fff;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
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

const MessageCard = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
`;

const HeartIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #666;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const GiftIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const GiftTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const GiftDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const Button = styled.button`
  background-color: #d4b08c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c49b7c;
  }
`;

const ShowDetailsButton = styled(Button)``;

const LinkButton = styled.a`
  display: inline-block;
  background-color: #d4b08c;
  color: white;
  text-decoration: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c49b7c;
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #666;
`;

const BankValue = styled.span`
  font-family: 'Montserrat', sans-serif;
  color: #1a1a1a;
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