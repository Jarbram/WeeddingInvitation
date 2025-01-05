import styled from 'styled-components';
import { motion } from 'framer-motion';

const Schedule = () => {
  const timelineEvents = [
    {
      time: "4:30 PM",
      title: "Llegada de Invitados",
      description: "Recepción en la iglesia"
    },
    {
      time: "5:00 PM",
      title: "Ceremonia Religiosa",
      description: "Inicio de la ceremonia"
    },
    {
      time: "6:30 PM",
      title: "Coctel de Bienvenida",
      description: "En el jardín del hotel"
    },
    {
      time: "7:30 PM",
      title: "Recepción",
      description: "Ingreso al salón principal"
    },
    {
      time: "8:00 PM",
      title: "Primer Baile",
      description: "Momento especial de los novios"
    },
    {
      time: "8:30 PM",
      title: "Cena",
      description: "Servicio de tres tiempos"
    },
    {
      time: "9:30 PM",
      title: "Fiesta",
      description: "¡A celebrar!"
    }
  ];

  return (
    <ScheduleContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Cronograma</SectionTitle>
          
          <Timeline>
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={index}
                as={motion.div}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TimelineDot />
                <TimelineContent isLeft={index % 2 === 0}>
                  <Time>{event.time}</Time>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </motion.div>
      </ContentWrapper>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.section`
  padding: 6rem 0;
  background-color: #fff;
  position: relative;
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
  margin-bottom: 4rem;
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
    background-color: #d4b08c;
    
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
  width: 16px;
  height: 16px;
  background-color: #d4b08c;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

const TimelineContent = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 80%;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    ${props => props.isLeft ? 'right: 100%;' : 'left: 100%;'}
    border: solid transparent;
    border-width: 10px;
    border-${props => props.isLeft ? 'right' : 'left'}-color: white;
    transform: translateY(-50%);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    
    &:before {
      left: -20px;
      border-right-color: white;
      border-left-color: transparent;
    }
  }
`;

const Time = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;
  color: #d4b08c;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const EventDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.5;
`;

export default Schedule; 