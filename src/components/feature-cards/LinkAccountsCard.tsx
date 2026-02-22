import { Users, ArrowUpRight, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const children = [
  { name: "Миша Петров", info: "Карманные расходы", code: "8 лет", image: "/placeholder-user.jpg" },
  { name: "Соня Петрова", info: "Накопления", code: "11 лет", initials: "СП", color: "bg-pink-600" },
  { name: "Артём Иванов", info: "Карманные расходы", code: "9 лет", initials: "АИ", color: "bg-blue-600" },
  { name: "Лера Смирнова", info: "Накопления", code: "13 лет", initials: "ЛС", color: "bg-teal-600" },
]

export function LinkAccountsCard() {
  return (
    <div className="rounded-2xl bg-[#141414] border border-[#262626] p-6 flex flex-col">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1f1f1f] border border-[#2a2a2a]">
        <Users className="h-5 w-5 text-gray-400" />
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white">Семейный контроль</h3>
      <p className="mb-4 text-sm text-gray-400">Подключите всех детей к одному родительскому счёту — следите за балансами и расходами каждого</p>

      <a href="#" className="mb-6 inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors">
        Подробнее <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>

      <div className="mt-auto space-y-2 rounded-xl bg-[#1a1a1a] border border-[#262626] p-3">
        {children.map((child, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg bg-[#0f0f0f] px-3 py-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                {child.image ? (
                  <AvatarImage src={child.image} alt={child.name} />
                ) : null}
                <AvatarFallback className={`${child.color || "bg-gray-600"} text-white text-xs`}>
                  {child.initials ||
                    child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{child.name}</p>
                <p className="text-xs text-gray-500">{child.info}</p>
              </div>
            </div>
            <span className="text-xs text-gray-500">{child.code}</span>
          </div>
        ))}

        <Button
          variant="ghost"
          className="w-full justify-center text-gray-500 hover:text-white hover:bg-[#1f1f1f] mt-2"
        >
          <Plus className="mr-2 h-4 w-4" /> Добавить ребёнка
        </Button>
      </div>
    </div>
  )
}
