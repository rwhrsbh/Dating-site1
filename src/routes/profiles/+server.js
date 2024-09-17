import { json } from "@sveltejs/kit";

const profiles = [
  {
    id: 1,
    name: "Alice",
    age: 28,
    bio: "Love hiking and photography",
    photo:
      "https://img.freepik.com/free-photo/portrait-of-a-young-businesswoman-holding-eyeglasses-in-hand-against-gray-backdrop_23-2148029483.jpg?size=626&ext=jpg",
  },
  {
    id: 2,
    name: "Bob",
    age: 32,
    bio: "Foodie and traveler",
    photo:
      "https://img.freepik.com/free-photo/inside-portrait-of-confident-young-man-in-white-clothes-posing-with-charming-smile-over-isolated-wall_291650-95.jpg?size=626&ext=jpg",
  },
  {
    id: 3,
    name: "Charlie",
    age: 25,
    bio: "Musician and coffee enthusiast",
    photo:
      "https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg?size=626&ext=jpg",
  },
  {
    id: 4,
    name: "Diana",
    age: 30,
    bio: "Tech geek and bookworm",
    photo:
      "https://img.freepik.com/free-photo/portrait-of-young-blonde-woman_273609-11526.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 5,
    name: "Ethan",
    age: 27,
    bio: "Fitness freak and dog lover",
    photo:
      "https://img.freepik.com/free-photo/handsome-serious-looking-businessman-cross-arms-and-looking-determined_176420-21732.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 6,
    name: "Fiona",
    age: 29,
    bio: "Artist and nature lover",
    photo:
      "https://img.freepik.com/free-photo/serious-lovely-woman-student-in-spectacles-keeps-hands-folded-listenes-attentively-professor-s-lecture-wears-elegant-shirt_273609-16914.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 7,
    name: "George",
    age: 31,
    bio: "Chef and wine connoisseur",
    photo:
      "https://img.freepik.com/premium-photo/confident-young-man-with-beard-and-glasses-in-casual-attire_1225171-2424.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 8,
    name: "Hannah",
    age: 26,
    bio: "Yoga instructor and vegan",
    photo:
      "https://img.freepik.com/free-photo/young-and-beautiful-woman-in-pink-warm-sweater-natural-look-smiling-portrait-on-isolated-long-hair_285396-896.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 9,
    name: "Ian",
    age: 33,
    bio: "Entrepreneur and surfer",
    photo:
      "https://img.freepik.com/free-photo/portrait-of-modern-man_23-2147961425.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
  {
    id: 10,
    name: "Julia",
    age: 24,
    bio: "Student and part-time model",
    photo:
      "https://img.freepik.com/free-photo/indoor-portrait-of-bearded-young-man-with-trendy-hairstyle_273609-3903.jpg?size=626&ext=jpg&ga=GA1.1.843874631.1726601117&semt=ais_hybrid",
  },
];

export function GET() {
  return json(profiles);
}
