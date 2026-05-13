import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      collectionHandle = "business",
      tabKey = "best-seller",
      first = 8,
      minPrice,
      maxPrice,
      search,
    } = req.body || {};

    if (!collectionHandle || !tabKey) {
      return res.status(400).json({
        success: false,
        message: "Thiếu collectionHandle hoặc tabKey",
      });
    }

    const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
    const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
    const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION;

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_ADMIN_TOKEN) {
      return res.status(500).json({
        success: false,
        message: "Thiếu biến môi trường Shopify",
      });
    }

    const tabMap = {
      "best-seller": {
        sortKey: "BEST_SELLING",
        reverse: false,
      },
      "price-asc": {
        sortKey: "PRICE",
        reverse: false,
      },
      "price-desc": {
        sortKey: "PRICE",
        reverse: true,
      },
      "new-arrival": {
        sortKey: "CREATED",
        reverse: true,
      },
    };

    const currentTab = tabMap[tabKey];

    if (!currentTab) {
      return res.status(400).json({
        success: false,
        message: "tabKey không hợp lệ",
      });
    }

    const query = `
      query GetCollectionProducts(
        $handle: String!,
        $first: Int!,
        $sortKey: ProductCollectionSortKeys!,
        $reverse: Boolean!,
      ) {
        collectionByIdentifier(identifier: { handle: $handle }) {
          id
          title
          handle
          products(first: $first, sortKey: $sortKey, reverse: $reverse) {
            edges {
              node {
                id
                title
                handle
                description
                featuredImage {
                  url
                  altText
                }
                   images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
                priceRangeV2 {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                  averageRating: metafield(namespace: "custom", key: "average_rating") {
  value
}
reviewCount: metafield(namespace: "custom", key: "review_count") {
  value
}
              }
            }
          }
        }
      }
    `;

    const shopifyRes = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": SHOPIFY_ADMIN_TOKEN,
        },
        body: JSON.stringify({
          query,
          variables: {
            handle: collectionHandle,
            first: Number(first),
            sortKey: currentTab.sortKey,
            reverse: currentTab.reverse,
          },
        }),
      },
    );

    const result = await shopifyRes.json();

    if (!shopifyRes.ok || result.errors) {
      return res.status(500).json({
        success: false,
        message: "Lỗi khi gọi Shopify Admin API",
        errors: result.errors || result,
      });
    }

    const collection = result?.data?.collectionByIdentifier;

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy collection: ${collectionHandle}`,
      });
    }

    const products =
      collection?.products?.edges?.map((item) => ({
        id: item.node.id,
        title: item.node.title,
        handle: item.node.handle,
        description: item.node.description,
        image: item.node.featuredImage?.url || "",
        altText: item.node.featuredImage?.altText || "",
        images:
          item.node.images?.edges?.map((img) => ({
            url: img.node.url,
            altText: img.node.altText || "",
          })) || [],
        price: Number(item.node.priceRangeV2?.minVariantPrice?.amount || 0),
        currencyCode:
          item.node.priceRangeV2?.minVariantPrice?.currencyCode || "",
        averageRating: Number(item.node.averageRating?.value || 0),
        reviewCount: Number(item.node.reviewCount?.value || 0),
      })) || [];

    const normalizedSearch = search?.trim().toLowerCase();

    let filteredProductsBySearch = products;

    if (normalizedSearch) {
      filteredProductsBySearch = products.filter((product) =>
        product.title.toLowerCase().includes(normalizedSearch),
      );
    }

    const hasPriceFilter =
      minPrice !== undefined &&
      minPrice !== null &&
      maxPrice !== undefined &&
      maxPrice !== null;

    const filteredProducts = filteredProductsBySearch.filter((product) => {
      if (!hasPriceFilter) return true;

      return (
        product.price >= Number(minPrice) && product.price <= Number(maxPrice)
      );
    });

    return res.status(200).json({
      success: true,
      collection: {
        id: collection.id,
        title: collection.title,
        handle: collection.handle,
      },
      tabKey,
      products: filteredProducts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
