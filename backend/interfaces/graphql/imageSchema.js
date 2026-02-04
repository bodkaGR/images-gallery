const { gql } = require('graphql-tag');

const typeDefs = gql`
    type Image {
        id: ID!
        author: String!
        filename: String!
        uploadDate: String!
    }
    
    type Query {
        images: [Image!]!
        image(id: ID!): Image
    }
    
    input CreateImageInput {
        author: String!
        filename: String!
        uploadDate: String!
    }
    
    input UpdateImageInput {
        author: String
        filename: String
        uploadDate: String
    }
    
    type Mutation {
        createImage(input: CreateImageInput!): Image!
        updateImage(id: ID!, input: UpdateImageInput!): Image
        deleteImage(id: ID!): String!        
    }
`;

module.exports = {
    typeDefs
}