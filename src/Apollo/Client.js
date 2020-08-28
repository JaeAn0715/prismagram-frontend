import ApolloClient from "apollo-boost";
import { resolvers, defaults } from "./LocalState";

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://jstargram-2.herokuapp.com/",
  clientState: {
    defaults: defaults,
    resolvers,
  },
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
