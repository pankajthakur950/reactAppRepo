import React from "react";
import {
  Box,
  Container,
  Heading,
  Card,
  Image,
  Text,
  Spinner,
  Button
} from "gestalt";

import { AppContext } from "./../context/AppContextProvider";
import { FETCH_BREWS_BY_BRAND } from "./../GraphQL/queries";
import { postData } from "./../api/strapi";
import API_URL from "./../api/strapi-config";

function Brews(props) {
  const { dispatch } = React.useContext(AppContext);
  const { brandId } = props.match.params;
  const [loading, setLoading] = React.useState(true);
  const [brews, setBrews] = React.useState([]);
  const [brand, setBrand] = React.useState("");
  const addToCart = (item) =>{
    dispatch({
      type:'ADD_TO_CART',
      payload: item
    });
  }

  React.useEffect(() => {
    const loadBrews = async () => {
      console.log(FETCH_BREWS_BY_BRAND(brandId));
      try {
        const response = await postData(FETCH_BREWS_BY_BRAND(brandId));
        setBrews(response.brand.brews);
        setBrand(response.brand.name);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    loadBrews();
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="end" alignItems="center" margin={4}>
        <Box display="flex" direction="column" alignItems="center">
          <Box margin={2}>
            {/* Brew Header */}
            <Heading color="orchid">{brand}</Heading>
          </Box>
          {/* Brews */}
          <Box
            display="flex"
            wrap
            justifyContent="center"
            padding={4}
            shape="rounded"
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: "#bdcdd9"
              }
            }}
          >
            {brews.map(brew => {
              return (
                <Box key={brew.id} width={200} margin={2} paddingY={4}>
                  <Card
                    image={
                      <Box height={200} width={200}>
                        <Image
                          fit="cover"
                          src={`${API_URL}${brew.image[0].url}`}
                          naturalWidth={1}
                          naturalHeight={1}
                          alt={`Brew ${brew.name}`}
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
                      <Box marginBottom={2}>
                        <Text bold size="xl">
                          {brew.name}
                        </Text>
                      </Box>
                      <Text>{brew.description}</Text>
                      <Text color="orchid">${brew.price}</Text>
                      <Box marginTop={2}>
                        <Text bold size="xl">
                          <Button color="blue" text="Add To Cart" onClick={()=>addToCart(brew)}/>
                        </Text>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      <Spinner accessibilityLabel="Loading Spinner" show={loading} />
    </Container>
  );
}

export default Brews;
