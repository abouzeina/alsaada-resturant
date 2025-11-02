import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { user_message, user_language = "en" } = body;

    if (!user_message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // Simple bot response placeholder - can be replaced with ChatGPT/Dialogflow later
    const botResponse = generateBotResponse(user_message, user_language);

    const result = await sql(
      "INSERT INTO chat_messages (user_message, bot_response, user_language) VALUES ($1, $2, $3) RETURNING *",
      [user_message, botResponse, user_language],
    );

    return Response.json(
      {
        user_message,
        bot_response: botResponse,
        message_id: result[0].id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error processing chat:", error);
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const messages = await sql(
      "SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT 50",
    );
    return Response.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return Response.json(
      { error: "Failed to fetch messages" },
      { status: 500 },
    );
  }
}

function generateBotResponse(userMessage, language) {
  // Placeholder responses - replace with AI integration
  const responses = {
    en: {
      greeting:
        "Hello! Welcome to Al Saada Restaurant. How can I help you today?",
      menu: "We offer a variety of Egyptian dishes. Would you like to see our menu?",
      reservation:
        "You can make a reservation through our website or call us at +20-100-XXX-XXXX.",
      hours: "We are open from 12 PM to 11 PM daily.",
      location: "We are located in Cairo, Egypt. Would you like directions?",
      default: "Thank you for your message. Our team will respond shortly.",
    },
    ar: {
      greeting: "أهلا وسهلا في مطعم السعادة. كيف يمكنني مساعدتك؟",
      menu: "نقدم مجموعة متنوعة من الأطباق المصرية. هل تود رؤية قائمتنا؟",
      reservation:
        "يمكنك حجز طاولة من خلال موقعنا أو الاتصال بنا على +20-100-XXX-XXXX.",
      hours: "نحن مفتوحون من الساعة 12 ظهراً إلى 11 مساءً يومياً.",
      location: "نحن في القاهرة، مصر. هل تريد الاتجاهات؟",
      default: "شكراً لرسالتك. سيرد فريقنا عليك قريباً.",
    },
  };

  const langResponses = responses[language] || responses.en;
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return langResponses.greeting;
  } else if (lowerMessage.includes("menu") || lowerMessage.includes("food")) {
    return langResponses.menu;
  } else if (
    lowerMessage.includes("reservation") ||
    lowerMessage.includes("book")
  ) {
    return langResponses.reservation;
  } else if (lowerMessage.includes("hour") || lowerMessage.includes("open")) {
    return langResponses.hours;
  } else if (
    lowerMessage.includes("location") ||
    lowerMessage.includes("address")
  ) {
    return langResponses.location;
  }

  return langResponses.default;
}
