import NextAuth from "next-auth"

export function get(id) {
  return client
      .get(`/api/v1/ideas/${id}`)
      .then(({ data }) => data);
}
