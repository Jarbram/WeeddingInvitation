import styled from 'styled-components';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer>
      <ContentWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        <WeddingDate
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          23.08.2025
        </WeddingDate>
        
        <Names
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          Elena & Josué
        </Names>
        
        <Quote
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          "El amor no se mide por el tiempo que dura,
          sino por los momentos que se crean"
        </Quote>
      </ContentWrapper>

      <ScrollIndicator
        onClick={scrollToContent}
        whileHover={{ y: 5 }}
        transition={{ duration: 0.3 }}
        aria-label="Desplazarse hacia abajo"
      >
        <ScrollIcon
          animate={{ 
            y: [0, 12, 0]
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  min-height: 100vh;
  height: auto;
  padding: 120px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.2), 
    rgba(0,0,0,0.4)
  ),
  url('/foto1.jpeg') center/cover no-repeat fixed;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0,0,0,0.2) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 100px 20px;
    background-attachment: scroll;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 900px;
  width: 100%;
  padding: 60px 20px;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 40px 15px;
  }
`;

const WeddingDate = styled(motion.h2)`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  color: #f8f8f8;
  margin-bottom: 3rem;
  letter-spacing: 6px;
  font-weight: 300;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 2rem;
    letter-spacing: 4px;
  }
`;

const Names = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: 6.5rem;
  color: white;
  margin: 2.5rem 0;
  font-weight: 400;
  line-height: 1.2;
  text-shadow: 2px 4px 8px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 3.8rem;
    margin: 1.5rem 0;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    animation: shimmer 3s infinite;
  }
`;

const Quote = styled(motion.p)`
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.6rem;
  color: #f0f0f0;
  font-style: italic;
  max-width: 700px;
  margin: 3rem auto;
  line-height: 1.8;
  letter-spacing: 0.5px;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin: 2rem auto;
    line-height: 1.6;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  
  &::before {
    content: 'Descubre más';
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    bottom: 30px;
    
    &::before {
      font-size: 0.75rem;
    }
  }
`;

const ScrollIcon = styled(motion.div)`
  width: 26px;
  height: 42px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 4px;
    background-color: white;
    border-radius: 50%;
  }
`;

export default Hero; 