import axios from "axios";
import rootURL from '../config/urlRoot';
const ROOT_URL = rootURL.ROOT_URL;
// export const FETCH_BOOKS = "fetch_books";
export const OWNER_LOGIN = "owner_login";
export const CREATE_BOOK = "create_book";

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
// export function ownerLoginAction(values, history) {
//   // const request = axios
//   //   .post(`${ROOT_URL}/login`, values)
//   //   .then(result => {
//   //   // callback()
//   //   if(result.status ===200){
//   //   console.log("login success");
    
//   //   }
//   // });
//   console.log("VALUES: "+ JSON.stringify(values));
//   const request = axios
//     .post(`${ROOT_URL}/api/users/login`, values,{withCredentials: true})
//     .then(res => history.push('/'));

//   return {
//     type: OWNER_LOGIN,
//     payload: request
//   };
// }


