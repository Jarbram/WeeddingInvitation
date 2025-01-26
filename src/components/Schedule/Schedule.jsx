import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import { IoTimeOutline, IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { FaChurch, FaGlassCheers, FaHeart, FaUtensils, FaMusic } from 'react-icons/fa';

const Schedule = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isExpanded, setIsExpanded] = useState(false);
  
  const timelineEvents = [
    {
      time: "4:30 PM",
      title: "Llegada de Invitados",
      description: "Recepción en la iglesia",
      icon: <FaChurch />
    },
    {
      time: "5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Inicio de la ceremonia",
      icon: <FaHeart />
    },
    {
      time: "6:30 PM",
      title: "Coctel de Bienvenida",
      description: "En el jardín del hotel",
      icon: <FaGlassCheers />
    },
    {
      time: "7:30 PM",
      title: "Recepción",
      description: "Ingreso al salón principal",
      icon: <IoTimeOutline />
    },
    {
      time: "8:00 PM",
      title: "Primer Baile",
      description: "Momento especial de los novios",
      icon: <FaMusic />
    },
    {
      time: "8:30 PM",
      title: "Cena",
      description: "Servicio de tres tiempos",
      icon: <FaUtensils />
    },
    {
      time: "9:30 PM",
      title: "Fiesta",
      description: "¡A celebrar!",
      icon: <FaGlassCheers />
    }
  ];

  // Crear refs fuera del map
  const refs = timelineEvents.map(() => useInView({
    threshold: 0.2,
    triggerOnce: true
  }));

  const visibleEvents = isExpanded ? timelineEvents : timelineEvents.slice(0, 3);

  return (
    <ScheduleContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <ScheduleTitle>Nuestro Cronograma</ScheduleTitle>
          <ScheduleSubtitle>Cada momento planeado con amor</ScheduleSubtitle>
          
          <Timeline>
            <AnimatePresence>
              {visibleEvents.map((event, index) => {
                const [ref, inView] = refs[index];

                return (
                  <TimelineItem
                    key={index}
                    ref={ref}
                    as={motion.div}
                    initial={{ opacity: 0, x: isMobile ? -50 : (index % 2 === 0 ? -50 : 50) }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <TimelineDot
                      as={motion.div}
                      animate={inView ? { scale: [0, 1.2, 1] } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                      <IconWrapper>{event.icon}</IconWrapper>
                    </TimelineDot>
                    <TimelineContent isLeft={index % 2 === 0}>
                      <Time>{event.time}</Time>
                      <EventTitle>{event.title}</EventTitle>
                      <EventDescription>{event.description}</EventDescription>
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </AnimatePresence>
          </Timeline>

          <ExpandButton
            onClick={() => setIsExpanded(!isExpanded)}
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <>Ver menos <IoChevronUpOutline /></>
            ) : (
              <>Ver más <IoChevronDownOutline /></>
            )}
          </ExpandButton>
        </motion.div>
      </ContentWrapper>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.section`
  padding: 3rem 0;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  border-radius: 20px;
  width: 95%;
  max-width: 1400px;
  position: relative;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ScheduleTitle = styled.h2`
  font-family: ${props => props.theme.fonts.secondary};
  color: ${props => props.theme.colors.sage.main};
  font-size: 2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  
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

const ScheduleSubtitle = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.primary.main};
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 300;
  text-align: center;

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 100%;
    background-color: ${props => props.theme.colors.sage[300]};
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-left: 50%;
  position: relative;
  margin-bottom: 3rem;
  
  &:nth-child(even) {
    justify-content: flex-start;
    padding-left: 0;
    padding-right: 50%;
  }
  
  @media (max-width: 768px) {
    padding-left: 80px;
    justify-content: flex-start;
    
    &:nth-child(even) {
      padding-left: 80px;
      padding-right: 0;
    }
  }
`;

const TimelineDot = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, ${props => props.theme.colors.sage.main}, ${props => props.theme.colors.sage[400]});
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px ${props => props.theme.colors.sage[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    left: 30px;
    width: 32px;
    height: 32px;
  }
`;

const TimelineContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(10px);
  width: 85%;
  position: relative;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.isLeft ? 'right: 100%;' : 'left: 100%;'}
    border: solid transparent;
    border-width: 12px;
    border-${props => props.isLeft ? 'right' : 'left'}-color: rgba(255, 255, 255, 0.95);
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 1.5rem;
    
    &::before {
      left: -24px;
      border-right-color: rgba(255, 255, 255, 0.95);
      border-left-color: transparent;
    }
  }
`;

const Time = styled.span`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.1rem;
  color: ${props => props.theme.colors.sage[600]};
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-family: ${props => props.theme.fonts.secondary};
  font-size: 1.3rem;
  color: ${props => props.theme.colors.sage[800]};
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  color: ${props => props.theme.colors.sage[700]};
  line-height: 1.5;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #fff;
`;

const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 2rem auto 0;
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.sage.main}, ${props => props.theme.colors.sage[400]});
  border: none;
  border-radius: 25px;
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px ${props => props.theme.colors.sage[200]};

  &:hover {
    box-shadow: 0 6px 20px ${props => props.theme.colors.sage[300]};
  }

  svg {
    font-size: 1.2rem;
  }
`;

export default Schedule; 