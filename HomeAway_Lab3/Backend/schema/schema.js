const graphql = require("graphql");
const bcrypt = require('bcryptjs');
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
var User = require("../models/User");
var Property = require("../models/Property");
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    //usertype: { type: GraphQLString },
    gender: { type: GraphQLString },
    // myProperties: {
    //   type: new GraphQLList(PropertyType),
    //   resolve(parent, args) {
    //     return Property.find({ ownerID: parent.id });
    //   }
    // }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    description: { type: GraphQLString },
    city: { type: GraphQLString },
    user: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString
    },
    street: {
      type: GraphQLString
    },
    unit: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    },
    zipcode: {
      type: GraphQLString
    },
    headline: {
      type: GraphQLString
    },
    desc: {
      type: GraphQLString
    },
    type: {
      type: GraphQLString
    },
    bedroom: {
      type: GraphQLString
    },
    bathroom: {
      type: GraphQLString
    },
    photos: {
      type: GraphQLString
    },
    options: {
      type: GraphQLString
    },
    currency: {
      type: GraphQLString
    },
    base: {
      type: GraphQLString
    },
    stay: {
      type: GraphQLString
    },
    // bookedBy: {
    //   type: UserType,
    //   resolve(parent, args) {
    //     if (parent.bookedByID === "open") return "open";
    //     else return User.findById(parent.bookedByID);
    //   }
    // },
    user: {
      //type: GraphQLID
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.user);
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

        console.log("check");
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
        return User.find();
      }
    },
    properties: {
      type: new GraphQLList(PropertyType),
      args: {
        city: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        // getting data from mLab db
        return Property.find({ city: args.city });
      },myproperties: {
        type: new GraphQLList(PropertyType),
        args: { ownerid: { type: GraphQLID } },
        resolve(parent, args) {
          // getting data from mLab db
  
          Property.find({ ownerID: args.ownerid }, (err, results) => {
            console.log(results);
          });
          return Property.find({ ownerID: args.ownerid });
        }
      },
      mybookings: {
        type: new GraphQLList(PropertyType),
        args: { bookedByID: { type: GraphQLID } },
        resolve(parent, args) {
          // getting data from mLab db
  
          Property.find({ bookedByID: args.bookedByID }, (err, results) => {
            console.log(results);
          });
          return Property.find({ bookedByID: args.bookedByID });
        }
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
        // usertype: { type: new GraphQLNonNull(GraphQLString) },
        // gender: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          email: args.email,
          usertype: args.usertype,
          firstName: args.firstName,
          // lastName: args.lastName,
          // gender: args.gender
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(args.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            return user.save();
          });
        });
      }
    },
    addProperty: {
      type: PropertyType,
      args: {
        city: { type: GraphQLString },
        zip: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        ownerID: { type: GraphQLID },
        base: { type: GraphQLString }
      },
      resolve(parent, args) {
        let property = new Property({
          city: args.city,
          zipcode: args.zipcode,
          title: args.title,
          description: args.description,
          ownerID: args.ownerID,
          base: args.base
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