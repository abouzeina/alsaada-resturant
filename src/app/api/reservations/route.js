import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      reservation_date,
      reservation_time,
      guests_count,
      special_requests,
    } = body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !reservation_date ||
      !reservation_time ||
      !guests_count
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await sql(
      "INSERT INTO reservations (name, email, phone, reservation_date, reservation_time, guests_count, special_requests) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        name,
        email,
        phone,
        reservation_date,
        reservation_time,
        guests_count,
        special_requests || null,
      ],
    );

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating reservation:", error);
    return Response.json(
      { error: "Failed to create reservation" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const reservations = await sql(
      "SELECT * FROM reservations ORDER BY reservation_date DESC, reservation_time DESC",
    );
    return Response.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    return Response.json(
      { error: "Failed to fetch reservations" },
      { status: 500 },
    );
  }
}
