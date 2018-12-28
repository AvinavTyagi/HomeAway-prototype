import axios from "axios";

// export const FETCH_BOOKS = "fetch_books";
export const OWNER_LOGIN = "owner_login";
export const CREATE_BOOK = "create_book";

const ROOT_URL = "http://localhost:3001";

//target action
export function fetchBooks() {
  //middleware call
  //receive response from backend
  const response = axios.get(`${ROOT_URL}/ownerLogin`);
  //Action dispatched
  console.log("Response",response);
  return {
    type: CREATE_BOOK,
    payload: response
  };
}

// export function createBook(values, callback) {
//   const request = axios
//     .post(`${ROOT_URL}/book`, values)
//     .then(() => callback());

//   return {
//     type: FETCH_BOOKS,
//     payload: request
//   };
// }
export function ownerLoginAction(values, callback) {
  // const request = axios
  //   .post(`${ROOT_URL}/login`, values)
  //   .then(result => {
  //   // callback()
  //   if(result.status ===200){
  //   console.log("login success");
    
  //   }
  // });
  const request = axios
    .post(`${ROOT_URL}/login`, values,{withCredentials: true})
    .then(() => callback());

  return {
    type: OWNER_LOGIN,
    payload: request
  };
}


