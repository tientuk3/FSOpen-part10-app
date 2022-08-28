import { render, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/RepositoryList';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
      it('renders repository information correctly', () => {

        // mock repository data
        const repositories = {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4',
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4',
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            },
          ],
        };
        // end mock data

        const { debug, getAllByTestId } = render(<RepositoryListContainer repositories={repositories}/>);
  
        const repositoryItems = getAllByTestId('repositoryItem');
        const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

        // first repo
        expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
        expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears');
        expect(firstRepositoryItem).toHaveTextContent('TypeScript');

        const repository1SubItems = within(firstRepositoryItem).getAllByTestId('repositorySubItem')
        expect(repository1SubItems[0]).toHaveTextContent("21.9k");
        expect(repository1SubItems[0]).toHaveTextContent("Stars");
        expect(repository1SubItems[1]).toHaveTextContent("1.6k");
        expect(repository1SubItems[1]).toHaveTextContent("Forks");
        expect(repository1SubItems[2]).toHaveTextContent("3");
        expect(repository1SubItems[2]).toHaveTextContent("Reviews");
        expect(repository1SubItems[3]).toHaveTextContent("88");
        expect(repository1SubItems[3]).toHaveTextContent("Rating");

        //second repo
        expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');
        expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader');
        expect(secondRepositoryItem).toHaveTextContent('JavaScript');

        const repository2SubItems = within(secondRepositoryItem).getAllByTestId('repositorySubItem')
        expect(repository2SubItems[0]).toHaveTextContent("1.8k");
        expect(repository2SubItems[0]).toHaveTextContent("Stars");
        expect(repository2SubItems[1]).toHaveTextContent("69");
        expect(repository2SubItems[1]).toHaveTextContent("Forks");
        expect(repository2SubItems[2]).toHaveTextContent("3");
        expect(repository2SubItems[2]).toHaveTextContent("Reviews");
        expect(repository2SubItems[3]).toHaveTextContent("72");
        expect(repository2SubItems[3]).toHaveTextContent("Rating");

      });
    });
});