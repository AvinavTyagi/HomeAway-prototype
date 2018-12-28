import {gql} from 'apollo-boost';

const getPropertiesQuery = gql`
query($place : String!) {properties (city : $place){
    user,
    country,
    street,
    city,
    unit,
    state,
    zipcode,
    headline,
    desc,
    type,
    options,
    currency,
    base,
    stay,
    id
  }
}
`;
const addBookMutation = gql`
    mutation ($email: String!, $firstName: String!, $lastName: String!, $password : String!){
        addUser(email: $email, firstName: $firstName, lastName: $lastName, password : $password){
            firstName
            lastName
        }
    }
`;
const getPropertyQuery = gql`
  {
    properties {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;

const myPropertyQuery = gql`
  query($ownerid: ID) {
    myproperties(ownerid: $ownerid) {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;

const viewBookingsQuery = gql`
  query($bookedbyid: ID) {
    mybookings(bookedByID: $bookedbyid) {
      id
      title
      description
      zip
      city
      owner {
        firstName
      }
    }
  }
`;
const updateUserMutation = gql`
    mutation updateUser($firstname: String, $lastname: String,$username:String,
        $location: String,$gender:String,$about:String,$phone:String,$company:String,$languages:String)
        {
        updateUser(firstname: $firstname, lastname: $lastname,username: $username,location:$location,about:$about,gender:$gender,phone:$phone,company:$company,languages:$languages){
            error
        }
    }
`;
export{getPropertiesQuery, addBookMutation, viewBookingsQuery, myPropertyQuery, updateUserMutation};