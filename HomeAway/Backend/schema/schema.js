const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = graphql;
var { User } = require("../models/user");
var { Property } = require("../models/property");
 
var { mongoose } = require("../db/mongoose");
 
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    usertype: { type: GraphQLString },
    gender: { type: GraphQLString },
    myProperties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        return Property.find({ ownerID: parent.id });
      }
    }
  })
});
 
const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    city: { type: GraphQLString },
    zip: { type: GraphQLInt },
    bookedBy: {
      type: UserType,
      resolve(parent, args) {
        if (parent.bookedByID === "open") return "open";
        else return User.findById(parent.bookedByID);
      }
    },
    owner: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.ownerID);
      }
    }
  })
});
 
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        usertype: { type: GraphQLString }
      },
      resolve(parent, args) {
        // getting data from mLab db
 
        return User.findById(args.id);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        usertype: { type: GraphQLString }
      },
      resolve(parent, args) {
        // getting data from mLab db
 
        console.log(check);
        return User.findById(args.id);
      }
    },
    property: {
      type: PropertyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // getting data from mLab db
        return Property.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // getting data from mLab db
        return User.find({});
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve(parent, args) {
        // getting data from mLab db
        return Property.find({});
      }
    }
  }
});
 
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        usertype: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          email: args.email,
          usertype: args.usertype,
          firstName: args.firstName,
          lastName: args.lastName,
          gender: args.gender
        });
        user.password = user.generateHash(args.password);
 
        return user.save();
      }
    },
    addProperty: {
      type: PropertyType,
      args: {
        city: { type: GraphQLString },
        zip: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        ownerID: { type: GraphQLString }
      },
      resolve(parent, args) {
        let property = new Property({
          city: args.city,
          zip: args.zip,
          title: args.title,
          description: args.description,
          ownerID: args.ownerID
        });
 
        return property.save();
      }
    }
  }
});
 
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});