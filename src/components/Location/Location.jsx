import styled from 'styled-components';
import { motion } from 'framer-motion';

const Location = () => {
  // Coordenadas de ejemplo - reemplazar con las coordenadas reales
  const churchLocation = {
    name: "Iglesia San Francisco",
    address: "Av. Principal 123, Lima",
    coordinates: "https://www.google.com/maps/embed?pb=..." // Aquí va tu URL de Google Maps embed
  };

  const receptionLocation = {
    name: "Hotel Real",
    address: "Calle Las Flores 456, Lima",
    coordinates: "https://www.google.com/maps/embed?pb=..." // Aquí va tu URL de Google Maps embed
  };

  return (
    <LocationContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Ubicación</SectionTitle>

          <LocationsGrid>
            <LocationCard>
              <LocationTitle>Ceremonia</LocationTitle>
              <LocationInfo>
                <LocationName>{churchLocation.name}</LocationName>
                <LocationAddress>{churchLocation.address}</LocationAddress>
              </LocationInfo>
              <MapContainer>
                <iframe
                  src={churchLocation.coordinates}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </MapContainer>
              <DirectionsButton
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchLocation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NavigationIcon>🚗</NavigationIcon>
                Cómo llegar
              </DirectionsButton>
            </LocationCard>

            <LocationCard>
              <LocationTitle>Recepción</LocationTitle>
              <LocationInfo>
                <LocationName>{receptionLocation.name}</LocationName>
                <LocationAddress>{receptionLocation.address}</LocationAddress>
              </LocationInfo>
              <MapContainer>
                <iframe
                  src={receptionLocation.coordinates}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </MapContainer>
              <DirectionsButton
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(receptionLocation.address)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <NavigationIcon>🚗</NavigationIcon>
                Cómo llegar
              </DirectionsButton>
            </LocationCard>
          </LocationsGrid>

          <ParkingInfo>
            <InfoIcon>ℹ️</InfoIcon>
            <InfoText>
              Estacionamiento disponible en ambas locaciones.
              Por favor, llegar con anticipación para evitar contratiempos.
            </InfoText>
          </ParkingInfo>
        </motion.div>
      </ContentWrapper>
    </LocationContainer>
  );
};

const LocationContainer = styled.section`
  padding: 6rem 0;
  background-color: #faf9f8;
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

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const LocationCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LocationTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  text-align: center;
  padding: 1.5rem;
  background-color: #f8f8f8;
`;

const LocationInfo = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const LocationName = styled.h4`
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  color: #d4b08c;
  margin-bottom: 0.5rem;
`;

const LocationAddress = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #4a4a4a;
  line-height: 1.5;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const DirectionsButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #d4b08c;
  color: white;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c49b7c;
  }
`;

const NavigationIcon = styled.span`
  font-size: 1.2rem;
`;

const ParkingInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
`;

const InfoIcon = styled.span`
  font-size: 1.5rem;
`;

const InfoText = styled.p`
  font-family: 'Montserrat', sans-serif;
  color: #4a4a4a;
  line-height: 1.5;
`;

export default Location; 