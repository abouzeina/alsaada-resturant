import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = "SELECT * FROM menu_items ORDER BY category, name_en";
    let params = [];

    if (category) {
      query = "SELECT * FROM menu_items WHERE category = $1 ORDER BY name_en";
      params = [category];
    }

    const items = await sql(query, params);
    return Response.json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return Response.json(
      { error: "Failed to fetch menu items" },
      { status: 500 },
    );
  }
}
