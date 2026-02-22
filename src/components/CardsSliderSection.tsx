import { useState } from "react"
import { ChevronLeft, ChevronRight, Wifi, Snowflake, Plus, SnowflakeIcon, Palette, RefreshCw, ShoppingBag, Coffee, Gamepad2, Bus, Check } from "lucide-react"

const cardDesigns = [
  { id: "green", label: "Зелёная", color: "from-green-700 to-green-500", preview: "bg-green-600" },
  { id: "pink", label: "Розовая", color: "from-pink-700 to-pink-500", preview: "bg-pink-600" },
  { id: "blue", label: "Синяя", color: "from-blue-700 to-blue-500", preview: "bg-blue-600" },
  { id: "purple", label: "Фиолет.", color: "from-purple-700 to-purple-500", preview: "bg-purple-600" },
  { id: "orange", label: "Оранжевая", color: "from-orange-700 to-orange-500", preview: "bg-orange-600" },
  { id: "teal", label: "Бирюза", color: "from-teal-700 to-teal-500", preview: "bg-teal-600" },
]

const transactionsByCard: Record<number, { icon: React.ElementType; label: string; place: string; amount: string; positive: boolean; date: string }[]> = {
  1: [
    { icon: ShoppingBag, label: "Магнит", place: "Продукты", amount: "-120 ₽", positive: false, date: "Сегодня" },
    { icon: Gamepad2, label: "Steam", place: "Игры", amount: "-299 ₽", positive: false, date: "Вчера" },
    { icon: Bus, label: "Метро", place: "Транспорт", amount: "-57 ₽", positive: false, date: "Вчера" },
    { icon: Plus, label: "Пополнение", place: "От мамы", amount: "+500 ₽", positive: true, date: "22 фев" },
  ],
  2: [
    { icon: ShoppingBag, label: "ВкусВилл", place: "Продукты", amount: "-340 ₽", positive: false, date: "Сегодня" },
    { icon: Coffee, label: "Шоколадница", place: "Кафе", amount: "-210 ₽", positive: false, date: "Вчера" },
    { icon: Plus, label: "Пополнение", place: "От папы", amount: "+1 000 ₽", positive: true, date: "21 фев" },
    { icon: Bus, label: "Автобус", place: "Транспорт", amount: "-40 ₽", positive: false, date: "20 фев" },
  ],
  3: [
    { icon: Plus, label: "Пополнение", place: "От родителей", amount: "+300 ₽", positive: true, date: "20 фев" },
    { icon: Gamepad2, label: "Roblox", place: "Игры", amount: "-199 ₽", positive: false, date: "19 фев" },
    { icon: Bus, label: "Трамвай", place: "Транспорт", amount: "-40 ₽", positive: false, date: "19 фев" },
  ],
  4: [
    { icon: ShoppingBag, label: "Зара", place: "Одежда", amount: "-1 200 ₽", positive: false, date: "Сегодня" },
    { icon: Coffee, label: "Stars Coffee", place: "Кафе", amount: "-320 ₽", positive: false, date: "Вчера" },
    { icon: Plus, label: "Пополнение", place: "От мамы", amount: "+2 000 ₽", positive: true, date: "21 фев" },
    { icon: Bus, label: "Метро", place: "Транспорт", amount: "-57 ₽", positive: false, date: "20 фев" },
    { icon: Gamepad2, label: "App Store", place: "Приложения", amount: "-149 ₽", positive: false, date: "19 фев" },
  ],
}

const initialCards = [
  { id: 1, owner: "Миша Петров", age: "8 лет", number: "4521 •••• •••• 3847", balance: "350 ₽", limit: "500 ₽ / день", color: "from-green-700 to-green-500", frozen: false, avatar: "МП", avatarColor: "bg-blue-500" },
  { id: 2, owner: "Соня Петрова", age: "11 лет", number: "4521 •••• •••• 9214", balance: "1 240 ₽", limit: "700 ₽ / день", color: "from-pink-700 to-pink-500", frozen: false, avatar: "СП", avatarColor: "bg-pink-500" },
  { id: 3, owner: "Артём Иванов", age: "9 лет", number: "4521 •••• •••• 6603", balance: "75 ₽", limit: "300 ₽ / день", color: "from-blue-700 to-blue-500", frozen: true, avatar: "АИ", avatarColor: "bg-indigo-500" },
  { id: 4, owner: "Лера Смирнова", age: "13 лет", number: "4521 •••• •••• 1189", balance: "3 600 ₽", limit: "1 000 ₽ / день", color: "from-teal-700 to-teal-500", frozen: false, avatar: "ЛС", avatarColor: "bg-teal-500" },
]

type Panel = "topup" | "design" | "reissue" | null

export function CardsSliderSection() {
  const [active, setActive] = useState(0)
  const [cards, setCards] = useState(initialCards)
  const [panel, setPanel] = useState<Panel>(null)
  const [reissued, setReissued] = useState<number | null>(null)

  const prev = () => { setActive((i) => (i === 0 ? cards.length - 1 : i - 1)); setPanel(null) }
  const next = () => { setActive((i) => (i === cards.length - 1 ? 0 : i + 1)); setPanel(null) }

  const toggleFreeze = (id: number) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, frozen: !c.frozen } : c)))
  }

  const changeDesign = (color: string) => {
    setCards((prev) => prev.map((c, i) => (i === active ? { ...c, color } : c)))
    setPanel(null)
  }

  const handleReissue = (id: number) => {
    setReissued(id)
    setTimeout(() => setReissued(null), 2500)
    setPanel(null)
  }

  const togglePanel = (p: Panel) => setPanel((cur) => (cur === p ? null : p))

  const card = cards[active]
  const transactions = transactionsByCard[card.id] ?? []

  return (
    <section className="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Карты ваших детей</h2>
        <p className="text-gray-400 text-sm">Все карты в одном месте — управляйте балансом и лимитами</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Слайдер */}
        <div className="relative flex items-center gap-6 w-full justify-center">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#222] transition-colors shrink-0">
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative w-full max-w-sm">
            {cards.map((c, i) => {
              const offset = i - active
              const isActive = offset === 0
              const isAdjacent = Math.abs(offset) === 1
              return (
                <div
                  key={c.id}
                  onClick={() => !isActive && setActive(i)}
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    transform: `translateX(${offset * 60}px) scale(${isActive ? 1 : 0.88})`,
                    opacity: isActive ? 1 : isAdjacent ? 0.45 : 0,
                    zIndex: isActive ? 10 : isAdjacent ? 5 : 0,
                    pointerEvents: isActive ? "auto" : isAdjacent ? "auto" : "none",
                    cursor: isActive ? "default" : "pointer",
                  }}
                >
                  <div className={`rounded-3xl bg-gradient-to-br ${c.color} p-6 h-48 flex flex-col justify-between shadow-2xl relative overflow-hidden`}>
                    {c.frozen && (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] rounded-3xl z-10 flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-1.5 text-sm text-white">
                          <Snowflake className="h-4 w-4" /> Карта заморожена
                        </div>
                      </div>
                    )}
                    {reissued === c.id && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl z-20 flex items-center justify-center">
                        <div className="flex items-center gap-2 rounded-full bg-green-600/90 px-4 py-2 text-sm text-white font-medium">
                          <Check className="h-4 w-4" /> Заявка подана
                        </div>
                      </div>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white/70 text-xs mb-0.5">СберKids</p>
                        <p className="text-white font-semibold text-base">{c.owner}</p>
                        <p className="text-white/60 text-xs">{c.age}</p>
                      </div>
                      <Wifi className="h-5 w-5 text-white/60 rotate-90" />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs mb-1 font-mono">{c.number}</p>
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-xs">Баланс</p>
                          <p className="text-white font-bold text-xl">{c.balance}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-xs">Лимит</p>
                          <p className="text-white text-sm font-medium">{c.limit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="h-48 w-full" />
          </div>

          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white hover:bg-[#222] transition-colors shrink-0">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Основные кнопки */}
        <div className="flex gap-2 w-full max-w-sm">
          <button onClick={() => togglePanel("topup")} className={`flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-medium py-3 transition-colors ${panel === "topup" ? "bg-green-600 text-white" : "bg-green-600 hover:bg-green-500 text-white"}`}>
            <Plus className="h-4 w-4" /> Пополнить
          </button>
          <button onClick={() => toggleFreeze(card.id)} className={`flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-medium py-3 transition-colors border ${card.frozen ? "bg-blue-500/10 border-blue-500/40 text-blue-400 hover:bg-blue-500/20" : "bg-[#1a1a1a] border-[#262626] text-gray-400 hover:text-white hover:bg-[#222]"}`}>
            <SnowflakeIcon className="h-4 w-4" />
            {card.frozen ? "Разморозить" : "Заморозить"}
          </button>
        </div>

        {/* Дополнительные кнопки */}
        <div className="flex gap-2 w-full max-w-sm">
          <button onClick={() => togglePanel("design")} className={`flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-medium py-2.5 transition-colors border ${panel === "design" ? "bg-purple-500/10 border-purple-500/50 text-purple-400" : "bg-[#141414] border-[#262626] text-gray-400 hover:text-white hover:bg-[#1a1a1a]"}`}>
            <Palette className="h-4 w-4" /> Дизайн карты
          </button>
          <button onClick={() => togglePanel("reissue")} className={`flex-1 flex items-center justify-center gap-1.5 rounded-2xl text-sm font-medium py-2.5 transition-colors border ${panel === "reissue" ? "bg-amber-500/10 border-amber-500/50 text-amber-400" : "bg-[#141414] border-[#262626] text-gray-400 hover:text-white hover:bg-[#1a1a1a]"}`}>
            <RefreshCw className="h-4 w-4" /> Перевыпустить
          </button>
        </div>

        {/* Панель пополнения */}
        {panel === "topup" && (
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-[#262626] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-white font-medium">Пополнить карту — {card.owner.split(" ")[0]}</p>
            <div className="flex items-center rounded-xl bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
              <span className="text-gray-500 mr-2 text-sm">₽</span>
              <input type="number" placeholder="Введите сумму" className="flex-1 bg-transparent text-white placeholder-gray-600 outline-none text-sm" autoFocus />
            </div>
            <div className="flex gap-2">
              {[100, 500, 1000].map((a) => (
                <button key={a} className="flex-1 rounded-lg bg-[#1a1a1a] border border-[#262626] text-gray-400 hover:text-white text-xs py-1.5 transition-colors">+{a} ₽</button>
              ))}
            </div>
            <button className="w-full rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-medium py-2.5 transition-colors">Перевести</button>
          </div>
        )}

        {/* Панель смены дизайна */}
        {panel === "design" && (
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-[#262626] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-white font-medium">Выберите дизайн карты</p>
            <div className="grid grid-cols-3 gap-2">
              {cardDesigns.map((d) => (
                <button
                  key={d.id}
                  onClick={() => changeDesign(d.color)}
                  className={`relative rounded-xl h-14 ${d.preview} bg-gradient-to-br transition-all border-2 ${card.color === d.color ? "border-white" : "border-transparent hover:border-white/30"}`}
                >
                  <span className="absolute bottom-1.5 left-0 right-0 text-center text-white/80 text-[10px] font-medium">{d.label}</span>
                  {card.color === d.color && (
                    <div className="absolute top-1.5 right-1.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center">Смена дизайна бесплатна</p>
          </div>
        )}

        {/* Панель перевыпуска */}
        {panel === "reissue" && (
          <div className="w-full max-w-sm rounded-2xl bg-[#141414] border border-[#262626] p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-white font-medium">Перевыпустить карту</p>
            <p className="text-xs text-gray-400">Карта {card.owner.split(" ")[0]} будет заблокирована. Новая придёт в течение 5–7 рабочих дней по адресу доставки.</p>
            <div className="rounded-xl bg-[#0f0f0f] border border-[#262626] px-3 py-2.5">
              <p className="text-xs text-gray-500 mb-0.5">Причина</p>
              <select className="w-full bg-transparent text-white text-sm outline-none">
                <option value="lost" className="bg-[#1a1a1a]">Утеряна</option>
                <option value="damaged" className="bg-[#1a1a1a]">Повреждена</option>
                <option value="compromised" className="bg-[#1a1a1a]">Данные скомпрометированы</option>
                <option value="other" className="bg-[#1a1a1a]">Другое</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPanel(null)} className="flex-1 rounded-xl bg-[#1a1a1a] border border-[#262626] text-gray-400 text-sm py-2.5 hover:text-white transition-colors">Отмена</button>
              <button onClick={() => handleReissue(card.id)} className="flex-1 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium py-2.5 transition-colors">Перевыпустить</button>
            </div>
          </div>
        )}

        {/* Точки */}
        <div className="flex gap-2">
          {cards.map((_, i) => (
            <button key={i} onClick={() => { setActive(i); setPanel(null) }} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-green-500" : "w-1.5 bg-gray-600"}`} />
          ))}
        </div>

        {/* Миниатюры */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
          {cards.map((c, i) => (
            <button key={c.id} onClick={() => { setActive(i); setPanel(null) }} className={`flex items-center gap-2 rounded-xl px-3 py-2.5 border transition-all ${i === active ? "bg-[#1a1a1a] border-green-500/50 text-white" : "bg-[#141414] border-[#262626] text-gray-500 hover:text-gray-300"}`}>
              <div className={`h-7 w-7 rounded-full ${c.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{c.avatar}</div>
              <div className="text-left min-w-0">
                <p className="text-xs font-medium truncate">{c.owner.split(" ")[0]}</p>
                <p className={`text-xs ${c.frozen ? "text-blue-400" : "text-gray-600"}`}>{c.frozen ? "❄️ заморожена" : c.age}</p>
              </div>
            </button>
          ))}
        </div>

        {/* История транзакций */}
        <div className="w-full max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">История — {card.owner.split(" ")[0]}</p>
            <button className="text-xs text-green-400 hover:text-green-300 transition-colors">Все операции</button>
          </div>
          <div className="rounded-2xl bg-[#141414] border border-[#262626] divide-y divide-[#1f1f1f] overflow-hidden">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1f1f1f]">
                  <tx.icon className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">{tx.label}</p>
                  <p className="text-xs text-gray-500">{tx.place}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-medium ${tx.positive ? "text-green-400" : "text-white"}`}>{tx.amount}</p>
                  <p className="text-xs text-gray-600">{tx.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
