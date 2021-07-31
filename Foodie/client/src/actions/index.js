import jsonServer from '../apis/jsonServer'

export const fetchFoodList = () => async dispatch => {
    await jsonServer.post('/register',
        {'email':'pankajthakur950@gmail.com','password':'pankaj123'});
    const response = await jsonServer.get('/foodMenu');
    dispatch({type: 'FETCH_FOOD_LIST', payload: response.data });
};
