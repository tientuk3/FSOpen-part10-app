import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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

export const GET_ALL_REVIEWS = gql`
    query {
        repositories {
            edges {
                node {
                    reviews {
                        edges {
                            node {
                                id
                                text
                                rating
                                createdAt
                                user {
                                    id
                                    username
                                }
                                repository {
                                    name
                                    ownerName
                                }
                            }
                        }
                    }
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
            reviews {
                edges {
                  node {
                    id
                    text
                    rating
                    createdAt
                    user {
                      id
                      username
                    }
                  }
                }
            }
        }
    }
`;
