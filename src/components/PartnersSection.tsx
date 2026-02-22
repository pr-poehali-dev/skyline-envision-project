import Icon from "@/components/ui/icon"

const partners = [
  { name: "Сбербанк", icon: "Building2" },
  { name: "СберПэй", icon: "CreditCard" },
  { name: "СберМаркет", icon: "ShoppingCart" },
  { name: "СберЗвук", icon: "Music" },
  { name: "СберАвто", icon: "Car" },
  { name: "СберЗдоровье", icon: "Heart" },
  { name: "СберОбразование", icon: "GraduationCap" },
]

export function PartnersSection() {
  return (
    <section className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-4 py-8">
      {partners.map((partner) => (
        <div key={partner.name} className="flex items-center gap-2 text-gray-500">
          <Icon name={partner.icon} fallback="Circle" size={16} />
          <span className="text-sm font-medium">{partner.name}™</span>
        </div>
      ))}
    </section>
  )
}