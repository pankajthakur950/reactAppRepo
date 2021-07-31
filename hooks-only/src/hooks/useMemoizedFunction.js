const useMemoizedFunction = () =>{
    const fetchUserMemo = React.use(()=>{
        console.log("called...");
        return async function fetchUser(id){
            console.log("called...."+id);
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
            console.log("dispatching user....");
            dispatch({
                type: 'FETCH_USER',
                payload: response.data
            });
        }
      },[state.posts, dispatch]);
}