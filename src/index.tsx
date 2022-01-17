import { graphql, useLazyLoadQuery, NovaGraphQLProvider } from "@nova/react";
import * as React from "react";
import * as ReactDOM from "react-dom";

export const myQuery = graphql`
  fragment SomeFragment on SomeType {
    __typename
    hash
    type
    id
    socialDistance
    vieweeDisplayName
    vieweeEmail
  }
`;

function MyComponent() {
  const data = useLazyLoadQuery(myQuery, {});

  return <div>{data}</div>;
}

const novaGraphQl = {};

ReactDOM.render(
  <NovaGraphQLProvider graphql={novaGraphQl}>
    <MyComponent />
  </NovaGraphQLProvider>,
  document.getElementById("myId")
);
