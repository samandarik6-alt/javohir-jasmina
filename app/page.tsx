"use client"

import type React from "react"

import Image from "next/image"
import { Heart, Calendar, Clock, MapPin, Instagram, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

export default function WeddingInvitation() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const carouselImages = [
    "https://crm.uzjoylar.uz/img/8a991b57-0ef0-4c53-94ea-4f061c27f99e.jpg",
    "https://crm.uzjoylar.uz/img/5b45aa77-bf41-414a-afdc-a2db4ce7c4e7.jpg",
    "https://crm.uzjoylar.uz/img/4c7d402a-02be-426a-a6f7-837988221247.jpg",
    "https://crm.uzjoylar.uz/img/2673947a-bf1e-4af8-b23d-9c251826a6ba.jpg",
  ]

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [formData, setFormData] = useState({
    name: "",
    canAttend: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000) // increased interval from 3000ms to 5000ms for slower transitions

    return () => clearInterval(carouselTimer)
  }, [carouselImages.length])

  useEffect(() => {
    const weddingDate = new Date("2025-08-24T19:00:00")

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.canAttend) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          canAttend: formData.canAttend,
        }),
      })

      if (response.ok) {
        alert("Спасибо! Ваш ответ отправлен.")
        setFormData({ name: "", canAttend: "" })
      } else {
        throw new Error("Failed to send")
      }
    } catch (error) {
      console.error("Error sending form:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <Image
              key={index}
              src={image || "/placeholder.svg"}
              alt="Жавохир и Жасмина"
              fill
              className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-40xl px-8 py-6 mx-6 border border-white/20 shadow-2xl mb-6">
              <div className="text-center space-y-4">
                <div className="space-y-3">
                  <h1 className="text-5xl font-serif font-bold text-white drop-shadow-2xl tracking-wide">Жавохир</h1>
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-px bg-white/70"></div>
                    <Heart className="mx-4 w-7 h-7 text-white fill-white/30 drop-shadow-lg" />
                    <div className="w-12 h-px bg-white/70"></div>
                  </div>
                  <h1 className="text-5xl font-serif font-bold text-white drop-shadow-2xl tracking-wide">Жасмина</h1>
                </div>
                <p className="text-xl text-white/95 font-light tracking-wide drop-shadow-lg">
                  Приглашают вас на свою свадьбу
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-16 flex justify-center z-10">
        <div className="animate-bounce">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 border border-gray-200 shadow-lg">
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="px-6 py-16 bg-gradient-to-b from-gray-50 via-white to-gray-50">
        <div className="max-w-md mx-auto space-y-10">
          <div className="flex items-center justify-center">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>
            <div className="mx-6 w-3 h-3 bg-black rounded-full shadow-sm"></div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-black/30 to-transparent"></div>
          </div>

          <div className="text-center space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-4">
                  <Calendar className="w-7 h-7 text-black" />
                  <span className="text-4xl font-serif font-semibold">24 августа</span>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <Clock className="w-6 h-6 text-gray-600" />
                  <span className="text-2xl text-gray-700 font-medium">19:00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-800 text-white rounded-3xl p-8 text-center shadow-xl">
            <h3 className="text-2xl font-serif font-semibold mb-6">До свадьбы осталось:</h3>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.days}</div>
                <div className="text-sm text-gray-200 mt-1">дней</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm text-gray-200 mt-1">часов</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm text-gray-200 mt-1">минут</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="text-3xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm text-gray-200 mt-1">секунд</div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-6 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-4xl font-serif font-semibold text-black">Дорогие друзья!</h2>
            <p className="text-gray-700 leading-relaxed text-xl font-light">
              Мы будем счастливы разделить с вами один из самых важных дней в нашей жизни. Ваше присутствие сделает наш
              праздник еще более особенным.
            </p>
          </div>
<div className="bg-white border-2 border-gray-200 rounded-3xl p-8 space-y-6 shadow-lg">
            <div className="flex items-center space-x-6">
              <Image
                src="https://crm.uzjoylar.uz/img/6bd653dd-8d76-4d03-9766-86e89f3be167.jpg"
                alt="Логотип Majestic ресторана"
                width={70}
                height={70}
                className="rounded-full object-cover shadow-md"
              />
              <div className="flex-1">
                <h3 className="font-serif font-semibold text-2xl">Majestic restoran</h3>
                <p className="text-gray-600 text-lg">Место проведения</p>
              </div>
              <div className="flex space-x-3">
                <a
                  href="https://yandex.com/maps/10334/samarkand/?ll=66.981000%2C39.678658&mode=poi&poi%5Bpoint%5D=66.978144%2C39.680623&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D35251065058&z=17.03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl hover:from-gray-800 hover:to-black transition-all duration-200 shadow-md"
                >
                  <MapPin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/majestic_restaurant.uz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-black to-gray-800 text-white rounded-2xl hover:from-gray-800 hover:to-black transition-all duration-200 shadow-md"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>

            <Image
              src="https://crm.uzjoylar.uz/img/97585f38-854b-45de-995e-505bfc30f6d7.jpg"
              alt="Majestic ресторан"
              width={400}
              height={300}
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 space-y-8 shadow-lg border border-gray-200">
            <div className="text-center">
              <h3 className="text-3xl font-serif font-semibold text-black">Подтверждение</h3>
              <p className="text-gray-600 text-base mt-3 font-light">
                Пожалуйста, подтвердите свое присутствие до 20 августа 2025 года.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg transition-all duration-200"
                  required
                />
              </div>

              <div className="space-y-4">
                <label className="block text-lg font-medium text-gray-700">Присутствие:</label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="attendance"
                      value="Я смогу прийти"
                      checked={formData.canAttend === "Я смогу прийти"}
                      onChange={(e) => setFormData({ ...formData, canAttend: e.target.value })}
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-lg">Я смогу прийти</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 hover:border-gray-300 cursor-pointer transition-all duration-200">
                    <input
                      type="radio"
                      name="attendance"
                      value="Я не смогу прийти"
                      checked={formData.canAttend === "Я не смогу прийти"}
                      onChange={(e) => setFormData({ ...formData, canAttend: e.target.value })}
                      className="mr-4 w-5 h-5"
                    />
                    <span className="text-lg">Я не смогу прийти</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.canAttend}
                className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-5 rounded-2xl text-xl font-semibold hover:from-gray-800 hover:to-black transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg"
              >
                {isSubmitting ? "Отправка..." : "Отправить"}
              </button>
            </form>
          </div>

          

          <div className="text-center pt-12">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-4 h-4 bg-black/20 rounded-full"></div>
              <div className="w-3 h-3 bg-black/30 rounded-full"></div>
              <div className="w-2 h-2 bg-black/40 rounded-full"></div>
            </div>
            <p className="text-gray-500 text-lg font-serif italic">С любовью, Жавохир и Жасмина</p>
          </div>

          <div className="text-center pt-8 pb-6 border-t border-gray-200 mt-12">
            <p className="text-gray-400 text-sm mb-2">Связаться с разработчиком</p>
            <a
              href="https://t.me/uz_ai_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-500 hover:text-black transition-colors duration-200 text-sm"
            >
              <span>Tg: @uz_ai_dev</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
