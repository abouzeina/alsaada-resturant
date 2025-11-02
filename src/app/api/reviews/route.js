import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const reviews = await sql(
      "SELECT * FROM reviews ORDER BY created_at DESC LIMIT 20",
    );
    return Response.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return Response.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { author_name, rating, comment } = body;

    // Validate required fields
    if (!author_name || !rating || !comment) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return Response.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    const result = await sql(
      "INSERT INTO reviews (author_name, rating, comment) VALUES ($1, $2, $3) RETURNING *",
      [author_name, rating, comment],
    );

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return Response.json({ error: "Failed to create review" }, { status: 500 });
  }
}
