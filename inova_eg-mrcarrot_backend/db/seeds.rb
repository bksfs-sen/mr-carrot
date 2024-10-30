# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
# Seed Riyadh City
# Seed Riyadh City
riyadh = City.create!(
  name_en: "Riyadh", name_ar: "الرياض",
  country_id: 1
)

# ------------------ North Riyadh ------------------ #
north_riyadh = riyadh.regions.create!(name_en: "North Riyadh", name_ar: "شمال الرياض")

north_riyadh_neighborhoods = [
  { name_en: "Al Sahafa", name_ar: "الصحافة" },
  { name_en: "Al Nakheel", name_ar: "النخيل" },
  { name_en: "Al Muruj", name_ar: "المروج" },
  { name_en: "Al Olaya", name_ar: "العليا" },
  { name_en: "King Fahd", name_ar: "الملك فهد" },
  { name_en: "Al Yasmin", name_ar: "الياسمين" },
  { name_en: "Al Malqa", name_ar: "الملقا" },
  { name_en: "Hittin", name_ar: "حطين" },
  { name_en: "Al Aqeeq", name_ar: "العقيق" },
  { name_en: "Al Ghadeer", name_ar: "الغدير" },
  { name_en: "Al Nafal", name_ar: "النفل" },
  { name_en: "Al Izdihar", name_ar: "الازدهار" },
  { name_en: "Al Wadi", name_ar: "الوادي" },
  { name_en: "Al Masif", name_ar: "المصيف" },
  { name_en: "Al Taawun", name_ar: "التعاون" },
  { name_en: "Al Falah", name_ar: "الفلاح" },
  { name_en: "Al Rabi", name_ar: "الربيع" },
  { name_en: "East Al Nakheel", name_ar: "النخيل الشرقي" },
  { name_en: "West Al Nakheel", name_ar: "النخيل الغربي" },
  { name_en: "Al Hamra", name_ar: "الحمراء" },
  { name_en: "Al Nada", name_ar: "الندى" },
  { name_en: "Qurtubah", name_ar: "قرطبة" },
  { name_en: "Al Qirawan", name_ar: "القيروان" },
  { name_en: "Al Aredh", name_ar: "العارض" },
  { name_en: "Banban", name_ar: "بنبان" },
  { name_en: "Al Khair", name_ar: "الخير" },
  { name_en: "Al Narjis", name_ar: "النرجس" },
  { name_en: "Imam Muhammad ibn Saud Islamic University", name_ar: "جامعة الإمام محمد بن سعود الإسلامية" }
]

north_riyadh_neighborhoods.each do |neighborhood|
  north_riyadh.neighborhoods.create!(neighborhood)
end

# ------------------ East Riyadh ------------------ #
east_riyadh = riyadh.regions.create!(name_en: "East Riyadh", name_ar: "شرق الرياض")

east_riyadh_neighborhoods = [
  { name_en: "Al Rawdah", name_ar: "الروضة" },
  { name_en: "Al Naseem", name_ar: "النسيم" },
  { name_en: "As Sulay", name_ar: "السلي" },
  { name_en: "Al Quds", name_ar: "القدس" },
  { name_en: "Ishbilia", name_ar: "إشبيليا" },
  { name_en: "Qurtubah", name_ar: "قرطبة" },
  { name_en: "Al Remal", name_ar: "الرمال" },
  { name_en: "Al Farouq", name_ar: "الفاروق" },
  { name_en: "Al Manar", name_ar: "المنار" },
  { name_en: "Al Jazirah", name_ar: "الجزيرة" },
  { name_en: "An Nahda", name_ar: "النهضة" },
  { name_en: "Al Hamra", name_ar: "الحمراء" },
  { name_en: "Al Khaleej", name_ar: "الخليج" },
  { name_en: "Al Yarmuk", name_ar: "اليرموك" },
  { name_en: "Al Janadriyah", name_ar: "الجنادرية" },
  { name_en: "Al Maizilah", name_ar: "المعيزيلة" },
  { name_en: "Al Qadisiyah", name_ar: "القادسية" },
  { name_en: "Al Saadah", name_ar: "السعادة" },
  { name_en: "Al Rawabi", name_ar: "الروابي" },
  { name_en: "An Nazeem", name_ar: "النظيم" },
  { name_en: "Al Rayyan", name_ar: "الريان" },
  { name_en: "Al Fayha", name_ar: "الفيحاء" },
  { name_en: "As Salam", name_ar: "السلام" },
  { name_en: "Al Nadwa", name_ar: "الندوة" },
  { name_en: "Granada", name_ar: "غرناطة" },
  { name_en: "Ash Shuhada", name_ar: "الشهداء" },
  { name_en: "Al Munsiyah", name_ar: "المونسية" },
  { name_en: "Al Yarmuk", name_ar: "اليرموك" }
]

east_riyadh_neighborhoods.each do |neighborhood|
  east_riyadh.neighborhoods.create!(neighborhood)
end

# ------------------ West Riyadh ------------------ #
west_riyadh = riyadh.regions.create!(name_en: "West Riyadh", name_ar: "غرب الرياض")

west_riyadh_neighborhoods = [
  { name_en: "As Suwaidi", name_ar: "السويدي" },
  { name_en: "Al Uraija", name_ar: "العريجاء" },
  { name_en: "Al Badea", name_ar: "البديعة" },
  { name_en: "Shubra", name_ar: "شبرا" },
  { name_en: "Dhahrat Laban", name_ar: "ظهرة لبن" },
  { name_en: "Al Hazm", name_ar: "الحزم" },
  { name_en: "Tuwaiq", name_ar: "طويق" },
  { name_en: "Namar", name_ar: "نمار" },
  { name_en: "Al Awali", name_ar: "العوالي" },
  { name_en: "Limited Income", name_ar: "الدخل المحدود" },
  { name_en: "Central Al Uraija", name_ar: "العريجاء الوسطى" },
  { name_en: "Sultanah District", name_ar: "حي سلطانة" },
  { name_en: "Ad Diriyah", name_ar: "الدرعية" },
  { name_en: "Irqah", name_ar: "عرقة" },
  { name_en: "Al Hada", name_ar: "الهدا" },
  { name_en: "Diplomatic Quarter", name_ar: "حي السفارات" },
  { name_en: "Dhahrat Al Badea", name_ar: "ظهرة البديعة" },
  { name_en: "Az Zahra", name_ar: "الزهرة" },
  { name_en: "Olishah", name_ar: "عليشة" },
  { name_en: "Al Fakhriyyah", name_ar: "الفاخرية" },
  { name_en: "An Nasiriyah", name_ar: "الناصرية" },
  { name_en: "Al Namudhajiyah", name_ar: "النموذجية" },
  { name_en: "Al Barriyah", name_ar: "البرية" },
  { name_en: "Al Mushail", name_ar: "المشاعل" },
  { name_en: "Wadi Laban", name_ar: "وادي لبن" },
  { name_en: "Al Mahdiyah", name_ar: "المهدية" },
  { name_en: "Aridh", name_ar: "عريض" },
  { name_en: "Al Hair", name_ar: "الحائر" },
  { name_en: "Al Ghanamiyah", name_ar: "الغنامية" }
]

west_riyadh_neighborhoods.each do |neighborhood|
  west_riyadh.neighborhoods.create!(neighborhood)
end

# ------------------ South Riyadh ------------------ #
south_riyadh = riyadh.regions.create!(name_en: "South Riyadh", name_ar: "جنوب الرياض")

south_riyadh_neighborhoods = [
  { name_en: "Ash Shifa", name_ar: "الشفا" },
  { name_en: "Al Aziziyah", name_ar: "العزيزية" },
  { name_en: "Ad Dar Al Baida", name_ar: "الدار البيضاء" },
  { name_en: "Badr", name_ar: "بدر" },
  { name_en: "Al Hazm", name_ar: "الحزم" },
  { name_en: "Al Mansoura", name_ar: "المنصورة" },
  { name_en: "Namar", name_ar: "نمار" },
  { name_en: "Al Marwa", name_ar: "المروة" },
  { name_en: "South As Suwaidi", name_ar: "السويدي الجنوبي" },
  { name_en: "Al Fawaz", name_ar: "الفواز" },
  { name_en: "Al Hair", name_ar: "الحاير" },
  { name_en: "Taybah", name_ar: "طيبة" },
  { name_en: "Al Difaa", name_ar: "الدفاع" },
  { name_en: "Al Manaq", name_ar: "المناخ" },
  { name_en: "Al Iskan", name_ar: "الاسكان" },
  { name_en: "An Noor", name_ar: "النور" },
  { name_en: "Ad Darayhimiyah", name_ar: "الدريهمية" },
  { name_en: "Namar Suburb", name_ar: "ضاحية نمار" },
  { name_en: "Dirab", name_ar: "ديراب" },
  { name_en: "King Abdullah City for Atomic and Renewable Energy", name_ar: "مدينة الملك عبد الله للطاقة" },
  { name_en: "Khurais", name_ar: "خريص" }
]

south_riyadh_neighborhoods.each do |neighborhood|
  south_riyadh.neighborhoods.create!(neighborhood)
end

# ------------------ Central Riyadh ------------------ #
central_riyadh = riyadh.regions.create!(name_en: "Central Riyadh", name_ar: "وسط الرياض")

central_riyadh_neighborhoods = [
  { name_en: "Al Batha", name_ar: "البطحاء" },
  { name_en: "Al Murabba", name_ar: "المربع" },
  { name_en: "Al Malaz", name_ar: "الملز" },
  { name_en: "Al Futah", name_ar: "الفوطة" },
  { name_en: "Al Murqab", name_ar: "المرقب" },
  { name_en: "Ad Deerah", name_ar: "الديرة" },
  { name_en: "As Salhiyah", name_ar: "الصالحية" },
  { name_en: "Al Mansouriyah", name_ar: "المنصورية" },
  { name_en: "Al Khazzan District", name_ar: "حي الخزان" },
  { name_en: "Al Faisaliyah", name_ar: "الفيصلية" },
  { name_en: "Al Amal", name_ar: "العمل" },
  { name_en: "Al Washam", name_ar: "الوشام" },
  { name_en: "Umm Sulaym", name_ar: "ام سليم" },
  { name_en: "Ash Shumaysi", name_ar: "الشميسي" },
  { name_en: "Al Jaradiyah", name_ar: "الجرادية" },
  { name_en: "Ad Dubiyah", name_ar: "الدوبية" },
  { name_en: "Jabra", name_ar: "جبرة" },
  { name_en: "Al Oud", name_ar: "العود" },
  { name_en: "Ghubairah", name_ar: "غبيرة" },
  { name_en: "Manfuhah", name_ar: "منفوحة" },
  { name_en: "Al Yamamah", name_ar: "اليمامة" },
  { name_en: "As Sina'iyah", name_ar: "الصناعية" },
  { name_en: "Thulaim", name_ar: "ثليم" }
]

central_riyadh_neighborhoods.each do |neighborhood|
  central_riyadh.neighborhoods.create!(neighborhood)
end

puts "Data for Riyadh City, its regions, and neighborhoods has been successfully seeded!"
