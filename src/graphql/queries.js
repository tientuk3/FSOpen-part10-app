import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
        edges {
            node {
            id
            fullName
            description
            language
            ownerAvatarUrl
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            }
        }
        }
    }
`;

export const GET_ME = gql`
    {
        me {
            id
            username
        }
    }
`;

export const GET_SINGLE = gql`
    query Repository($id: ID!) {
        repository(id: $id) {
            id
            fullName
            description
            language
            ownerAvatarUrl
            stargazersCount
            forksCount
            reviewCount
            ratingAverage
            url
        }
    }
`;
