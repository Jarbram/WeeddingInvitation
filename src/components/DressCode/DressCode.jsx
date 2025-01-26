import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GiDress, GiTie } from 'react-icons/gi';

const DressCode = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const dressCodes = [
    {
      title: "Caballeros",
      description: "Traje formal oscuro o smoking",
      icon: <GiTie />,
      colors: ["#1a1a1a", "#2c3e50", "#34495e"],
      details: "Zapatos negros de vestir"
    },
    {
      title: "Damas",
      description: "Vestido largo o cocktail",
      icon: <GiDress />,
      colors: ["#d4b08c", "#c19b76", "#967259"],
      details: "Accesorios elegantes"
    }
  ];

  return (
    <DressCodeContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SectionHeader>
            <SectionTitle>Código de Vestimenta</SectionTitle>
            <SectionSubtitle>Cada detalle cuenta en este día especial</SectionSubtitle>
          </SectionHeader>

          <CardsContainer>
            {dressCodes.map((dress, index) => (
              <DressCard
                key={index}
                ref={ref}
                as={motion.div}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <IconWrapper>{dress.icon}</IconWrapper>
                <DressTitle>{dress.title}</DressTitle>
                <DressDescription>{dress.description}</DressDescription>
                <DressDetails>{dress.details}</DressDetails>
                <ColorPalette>
                  {dress.colors.map((color, i) => (
                    <ColorSwatch 
                      key={i} 
                      color={color} 
                      title="Color sugerido"
                    />
                  ))}
                </ColorPalette>
              </DressCard>
            ))}
          </CardsContainer>

          <DressCodeNote>
            <NoteDivider />
            Les sugerimos evitar el color blanco, reservado para la novia
            <NoteDivider />
          </DressCodeNote>
        </motion.div>
      </ContentWrapper>
    </DressCodeContainer>
  );
};

const DecorativeLine = styled.span`
  display: inline-block;
  width: 60px;
  height: 1px;
  background: ${props => props.theme.colors.primary.main};
  margin: 0 1rem;
  vertical-align: middle;
  opacity: 0.5;
`;

const DressCard = styled.div`
  background: ${props => props.theme.colors.sage[50]};
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-height: 380px;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  }
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  color: ${props => props.theme.colors.primary.main};
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
  
  ${DressCard}:hover & {
    transform: scale(1.1);
  }
`;

const DressDetails = styled.p`
  font-size: 0.95rem;
  color: ${props => props.theme.colors.sage[600]};
  font-style: italic;
  margin: 0.5rem 0;
`;

const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid ${props => props.theme.colors.sage[200]};
`;

const ColorSwatch = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 2px solid ${props => props.theme.colors.white};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  cursor: help;
  
  &:hover {
    transform: scale(1.15);
  }
`;

const NoteDivider = styled.div`
  width: 40px;
  height: 1px;
  background: ${props => props.theme.colors.sage[400]};
  margin: 1rem auto;
`;

const DressCodeContainer = styled.section`
  padding: 2rem 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  border-radius: 20px;
  width: 95%;
  max-width: 1400px;
  position: relative;
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

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.primary.main};
  margin-top: 0.5rem;
  font-weight: 300;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 0 auto;
  max-width: 900px;
`;

const DressTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.5rem;
  color: ${props => props.theme.colors.primary.dark};
  margin-bottom: 1rem;
`;

const DressDescription = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.sage[600]};
  margin-bottom: 1.5rem;
`;

const DressCodeNote = styled.p`
  text-align: center;
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.colors.sage[600]};
  font-style: italic;
  margin-top: 2rem;
`;

export default DressCode; 