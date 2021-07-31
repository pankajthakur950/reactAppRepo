import React from "react";
import axios from 'axios';

export const PropertyListContext = React.createContext();

function applyFilter(propertyList, filter){
    const { priceFrom, postcode, sortOrder } = filter;
    let result = propertyList;
    if (priceFrom) {
      const from = priceFrom;
      result = result.filter(item => item.price >= from);
    }
    if (postcode) {
      result = result.filter(item =>
        item.postcode.toLowerCase().startsWith(postcode)
      );
    }
    if (sortOrder) {
      if (sortOrder === "highestfirst") {
        result = result.sort((a, b) => b.price - a.price);
      }
      if (sortOrder === "lowestfirst") {
        result = result.sort((a, b) => a.price - b.price);
      }
    }
    return result;
}

export default function PropertyListProvider(props) {
  const [propertyList, setPropertyList] = React.useState([]);
  const [propertyListFilter, setPropertyListFilter] = React.useState({});
  React.useEffect(() => {
    console.log("getting called...11111");
    const fetchPropertyList = async () => {
      const response = await axios.get("http://localhost:3000/property");
      setPropertyList(response.data);
    };
    fetchPropertyList();
  }, []);

  const updateFilter = filter => setPropertyListFilter(filter);
  const getPropertyById =  id => {
    return propertyList.find((property)=> property.id === Number(id));
  }
  
  const filteredList = applyFilter(propertyList, propertyListFilter)
  const providerValue = {
    propertyList: filteredList,
    updateFilter,
    allPropertyList: propertyList,
    getPropertyById
  };

  return (
    <PropertyListContext.Provider value={providerValue}>
      {props.children}
    </PropertyListContext.Provider>
  );

  /*const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    console.log(state.users);
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );*/
}
