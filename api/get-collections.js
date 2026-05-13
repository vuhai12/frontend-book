import dotenv from "dotenv";
dotenv.config();

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`;

async function shopifyAdminFetch(query, variables = {}) {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN || !SHOPIFY_API_VERSION) {
    throw new Error("Thiếu biến môi trường Shopify");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      `Shopify Admin API error: ${response.status} - ${JSON.stringify(json)}`,
    );
  }

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const first = Number(req.query.first || 20);

    const query = `
      query GetCollections($first: Int!) {
        collections(first: $first) {
          edges {
            cursor
            node {
              id
              title
              handle
              description
              updatedAt
              image {
                url
                altText
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    const data = await shopifyAdminFetch(query, { first });

    const collections = data.collections.edges.map(({ node }) => node);

    return res.status(200).json({
      success: true,
      collections,
      pageInfo: data.collections.pageInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Lỗi server",
    });
  }
}
