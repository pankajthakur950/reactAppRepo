import React from "react";
import {
  Box,
  Container,
  Heading,
  Card,
  Image,
  Text,
  SearchField,
  Icon,
  Spinner
} from "gestalt";
import { Link } from "react-router-dom";

import { FETCH_BRANDS } from "./../GraphQL/queries";
import {postData} from "./../api/strapi";
import API_URL from "./../api/strapi-config";

function App() {
  const [brands, setBrands] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");
  const filterBrandData = (brands, filterValue)=>{
    return brands.filter(brand=>{
      return (
        brand.name.toLowerCase().includes(filterValue.toLowerCase()) || 
        brand.description.toLowerCase().includes(filterValue.toLowerCase())
      );
    })
  };

  React.useEffect(() => {
    const loadBrandData = async () => {
      try {
        const response = await postData(FETCH_BRANDS);
        setBrands(response.brands);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadBrandData();
  }, []);

  return (
    <Container>
      {/* Brands Section */}
      <Box display="flex" justifyContent="end" alignItems="center" margin={4}>
        <SearchField
          accessibilityLabel="Brand Search Field"
          id="brandSearchTerm"
          onChange={({ value }) => setSearchTerm(value)}
          placeholder="Search Brands"
          value={searchTerm}
        />
        <Box margin={2}>
          <Icon
            accessibilityLabel="Filter"
            icon="filter"
            size={20}
            color={searchTerm ? "orange" : "gray"}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom={2}>
        {/* Brands Header */}
        <Heading color="midnight" size="md">
          Brew Brands
        </Heading>
      </Box>
      {/* Brands  */}
      <Box
        display="flex"
        justifyContent="around"
        wrap
        shape="rounded"
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: "#d6c8ec"
          }
        }}
      >
        {filterBrandData(brands, searchTerm).map(brand => {
          return (
            <Box key={brand.id} width={200} margin={2} paddingY={4}>
              <Card
                image={
                  <Box height={200} width={200}>
                    <Image
                      fit="cover"
                      src={`${API_URL}${brand.Image[0].url}`}
                      naturalWidth={1}
                      naturalHeight={1}
                      alt="Brand"
                    />
                  </Box>
                }
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  direction="column"
                >
                  <Text bold size="xl">
                    {brand.name}
                  </Text>
                  <Text>{brand.description}</Text>
                  <Text bold size="xl">
                    <Link to={`/brews/${brand.id}`}>See Brews</Link>
                  </Text>
                </Box>
              </Card>
            </Box>
          );
        })}
      </Box>
      <Spinner accessibilityLabel="Loading Spinner" show={loading}/>
    </Container>
  );
}

export default App;
