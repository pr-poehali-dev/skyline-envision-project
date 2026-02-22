import { useState, useEffect, useRef } from "react"
import { Bell, ShoppingBag, Gamepad2, Coffee, Bus, Check, X, BellOff, BellRing } from "lucide-react"

const notifStream = [
  { id: 1, avatar: "МП", avatarColor: "bg-blue-500", name: "Миша", icon: ShoppingBag, category: "Магнит", amount: "-120 ₽", time: "только что", color: "text-white" },
  { id: 2, avatar: "СП", avatarColor: "bg-pink-500", name: "Соня", icon: Coffee, category: "Шоколадница", amount: "-210 ₽", time: "2 мин назад", color: "text-white" },
  { id: 3, avatar: "ЛС", avatarColor: "bg-teal-500", name: "Лера", icon: ShoppingBag, category: "Зара", amount: "-1 200 ₽", time: "5 мин назад", color: "text-white" },
  { id: 4, avatar: "МП", avatarColor: "bg-blue-500", name: "Миша", icon: Gamepad2, category: "Steam", amount: "-299 ₽", time: "12 мин назад", color: "text-white" },
  { id: 5, avatar: "СП", avatarColor: "bg-pink-500", name: "Соня", icon: Bus, category: "Метро", amount: "-57 ₽", time: "18 мин назад", color: "text-white" },
  { id: 6, avatar: "ЛС", avatarColor: "bg-teal-500", name: "Лера", icon: Coffee, category: "Stars Coffee", amount: "-320 ₽", time: "34 мин назад", color: "text-white" },
]

const channels = [
  { id: "push", label: "Push-уведомления", desc: "На смартфон", icon: BellRing, enabled: true },
  { id: "sms", label: "СМС", desc: "+7 ••• ••• 42 10", icon: Bell, enabled: false },
  { id: "email", label: "Почта", desc: "andrey@mail.ru", icon: Bell, enabled: true },
]

const limits = [
  { label: "Миша", avatar: "МП", color: "bg-blue-500", threshold: 300, enabled: true },
  { label: "Соня", avatar: "СП", color: "bg-pink-500", threshold: 500, enabled: true },
  { label: "Лера", avatar: "ЛС", color: "bg-teal-500", threshold: 1000, enabled: false },
]

export function NotificationsSection() {
  const [notifs, setNotifs] = useState(notifStream.slice(0, 3))
  const [dismissed, setDismissed] = useState<number[]>([])
  const [channelState, setChannelState] = useState(channels)
  const [limitState, setLimitState] = useState(limits)
  const [livePopup, setLivePopup] = useState<typeof notifStream[0] | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      setLivePopup(notifStream[3])
      setNotifs((prev) => [notifStream[3], ...prev.slice(0, 2)])
      timerRef.current = setTimeout(() => setLivePopup(null), 3500)
    }, 2500)
    return () => { clearTimeout(t); if (timerRef.current) clearTimeout(timerRef.current) }
  }, [])

  const dismiss = (id: number) => setDismissed((d) => [...d, id])
  const toggleChannel = (id: string) => setChannelState((s) => s.map((c) => c.id === id ? { ...c, enabled: !c.enabled } : c))
  const toggleLimit = (i: number) => setLimitState((s) => s.map((l, idx) => idx === i ? { ...l, enabled: !l.enabled } : l))

  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Уведомления о тратах</h2>
        <p className="text-gray-400 text-sm">Узнавайте мгновенно о каждой покупке — где бы вы ни были</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto relative">

        {/* Live popup */}
        {livePopup && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex items-center gap-3 rounded-2xl bg-[#1a1a1a] border border-green-500/40 px-4 py-3 shadow-2xl shadow-green-900/20 min-w-[260px]">
              <div className={`h-8 w-8 rounded-full ${livePopup.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                {livePopup.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-400 font-medium">Новая трата · {livePopup.name}</p>
                <p className="text-sm text-white truncate">{livePopup.category} <span className="text-gray-400">{livePopup.amount}</span></p>
              </div>
              <BellRing className="h-4 w-4 text-green-400 shrink-0 animate-bounce" />
            </div>
          </div>
        )}

        {/* Лента уведомлений */}
        <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Последние операции</span>
            </div>
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">{notifs.filter(n => !dismissed.includes(n.id)).length} новых</span>
          </div>

          <div className="space-y-2">
            {notifs.filter(n => !dismissed.includes(n.id)).map((n) => (
              <div key={n.id} className="flex items-center gap-3 rounded-xl bg-[#0f0f0f] border border-[#1f1f1f] px-3 py-2.5 group animate-in fade-in duration-300">
                <div className={`h-8 w-8 rounded-full ${n.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {n.avatar}
                </div>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#1a1a1a]">
                  <n.icon className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate"><span className="text-gray-400">{n.name} · </span>{n.category}</p>
                  <p className="text-xs text-gray-600">{n.time}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium text-white">{n.amount}</span>
                  <button onClick={() => dismiss(n.id)} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-gray-400">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
            {notifs.filter(n => !dismissed.includes(n.id)).length === 0 && (
              <div className="flex flex-col items-center gap-2 py-6 text-gray-600">
                <BellOff className="h-6 w-6" />
                <p className="text-xs">Нет новых уведомлений</p>
              </div>
            )}
          </div>

          <button className="text-xs text-green-400 hover:text-green-300 transition-colors text-center mt-auto">
            Показать все операции
          </button>
        </div>

        {/* Настройки */}
        <div className="flex flex-col gap-4">
          {/* Каналы */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Каналы уведомлений</p>
            {channelState.map((ch) => (
              <div key={ch.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f1f1f]">
                    <ch.icon className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white">{ch.label}</p>
                    <p className="text-xs text-gray-500">{ch.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleChannel(ch.id)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${ch.enabled ? "bg-green-600" : "bg-[#333]"}`}
                >
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${ch.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>

          {/* Пороги уведомлений */}
          <div className="rounded-2xl bg-[#141414] border border-[#262626] p-5 space-y-3">
            <p className="text-sm font-semibold text-white">Уведомлять при трате свыше</p>
            {limitState.map((l, i) => (
              <div key={l.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`h-7 w-7 rounded-full ${l.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {l.avatar}
                  </div>
                  <div>
                    <p className="text-sm text-white">{l.label}</p>
                    <p className="text-xs text-gray-500">от {l.threshold} ₽</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleLimit(i)}
                  className={`relative h-5 w-9 rounded-full transition-colors ${l.enabled ? "bg-green-600" : "bg-[#333]"}`}
                >
                  <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${l.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-xl bg-[#0f0f0f] border border-[#262626] px-3 py-2 mt-1">
              <Check className="h-3.5 w-3.5 text-green-500 shrink-0" />
              <p className="text-xs text-gray-400">Крупные траты всегда требуют подтверждения родителя</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
