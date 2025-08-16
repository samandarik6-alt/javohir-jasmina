import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, canAttend } = await request.json()

    console.log("[v0] Received form data:", { name, canAttend })

    if (!name || !canAttend) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const botToken = "7767210228:AAE5LIYkm_JUGpl8OqsAmCfGai2_sMG7Ces"
    console.log("[v0] Bot token configured")

    const message = `🎉 Новый ответ на свадебное приглашение:

👤 Имя: ${name}
${canAttend === "Я смогу прийти" ? "✅ Присутствие: Подтвердил участие" : "❌ Присутствие: Не сможет прийти"}

📅 Свадьба: 24 августа 2025, 18:00`

    const chatId = "-1002662919437"

    console.log("[v0] Sending to Telegram:", { chatId, messageLength: message.length })

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const responseText = await telegramResponse.text()
    console.log("[v0] Telegram response status:", telegramResponse.status)
    console.log("[v0] Telegram response:", responseText)

    if (!telegramResponse.ok) {
      console.log("[v0] Telegram API error:", responseText)
      return NextResponse.json(
        {
          error: "Failed to send to Telegram",
          details: responseText,
        },
        { status: 500 },
      )
    }

    console.log("[v0] Message sent successfully to Telegram")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error sending to Telegram:", error)
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
