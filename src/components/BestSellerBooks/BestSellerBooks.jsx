import { useNavigate } from "react-router-dom";

const bestSellerBooks = [
  {
    id: "7ea31f38675b91c1",
    title: "One Second (Seven #7)",
    description:
      "***USA TODAY BESTSELLING SERIES*** EXPLOSIVE FINAL INSTALLMENT IN THE SEVEN SERIES Book 1 is on sale for a limited time! Love. Family. Brotherhood. Lexi has faced personal struggles, but nothing has prepared her for the most perilous battle of her life. Shifters are on the brink of war as Northerners target Colorado in an attempt to infiltrate the borders. Texas winds up o ***USA TODAY BESTSELLING SERIES*** EXPLOSIVE FINAL INSTALLMENT IN THE SEVEN SERIES Book 1 is on sale for a limited time! Love. Family. Brotherhood. Lexi has faced personal struggles, but nothing has prepared her for the most perilous battle of her life. Shifters are on the brink of war as Northerners target Colorado in an attempt to infiltrate the borders. Texas winds up on the hit list, and the Weston pack prepares to fight for their land… and for their lives. Austin’s courage is put to the test when rogues want to seize his land and slaughter his pack. But that’s not all he’s facing as two shocking revelations turn their lives upside down. His love for Lexi is unwavering, but their future is uncertain. Will the local packs set aside their differences to fight together, or will this be the end of peace among Shifters? Stand witness to the epic conclusion of the Seven series. Destiny will find you. + Cliffhanger-free + HEA SEVEN SERIES READING ORDER: Book 1 - Seven Years (Seven Series #1) Book 2 - Six Months (Seven Series #2) Book 3 - Five Weeks (Seven Series #3) Book 4 - Four Days (Seven Series #4) Book 5 - Three Hours (Seven Series #5) Book 6 - Two Minutes (Seven Series #6) Book 7 - One Second (Seven Series #7) SEVEN WORLD Charming MAGERI SERIES READING ORDER: Book 1 - Sterling (Mageri Series: Book 1) Book 2 - Twist (Mageri Series: Book 2) Book 3 - Impulse (Mageri Series: Book 3) Book 4 - Gravity (Mageri Series: Book 4) Book 5 - Shine (Mageri Series: Book 5) Final Installment! MAGERI WORLD: Risk (coming soon) OTHER BOOKS: Closer: A Novella ...more",
    price: 52.94,
    image:
      "http://books.toscrape.com/media/cache/70/ad/70ad2de442bc3ffe36660ccabfe46148.jpg",
  },
  {
    id: "b228042c088b1913",
    title: "The Crossover",
    description:
      "\"With a bolt of lightning on my kicks . . .The court is SIZZLING. My sweat is DRIZZLING. Stop all that quivering. Cuz tonight I'm delivering,\" announces dread-locked, 12-year old Josh Bell. He and his twin brother Jordan are awesome on the court. But Josh has more than basketball in his blood, he's got mad beats, too, that tell his family's story in verse, in this fast and \"With a bolt of lightning on my kicks . . .The court is SIZZLING. My sweat is DRIZZLING. Stop all that quivering. Cuz tonight I'm delivering,\" announces dread-locked, 12-year old Josh Bell. He and his twin brother Jordan are awesome on the court. But Josh has more than basketball in his blood, he's got mad beats, too, that tell his family's story in verse, in this fast and furious middle grade novel of family and brotherhood. Josh and Jordan must come to grips with growing up on and off the court to realize breaking the rules comes at a terrible price, as their story's heart-stopping climax proves a game-changer for the entire family. ...more",
    price: 38.77,
    image:
      "http://books.toscrape.com/media/cache/25/fe/25fe373b974387a66ff1dea80f023ccb.jpg",
  },
  {
    id: "c7c4f55b7321cba7",
    title: "Harry Potter and the Chamber of Secrets (Harry Potter #2)",
    description:
      "All Harry Potter wants is to get away from the Dursleys and go back to Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby - who says that if Harry Potter returns to Hogwarts, disaster will strike.And strike it does. For in Harry's second year at Hogwarts, fresh torments and ho All Harry Potter wants is to get away from the Dursleys and go back to Hogwarts School for Witchcraft and Wizardry. But just as he's packing his bags, Harry receives a warning from a strange, impish creature named Dobby - who says that if Harry Potter returns to Hogwarts, disaster will strike.And strike it does. For in Harry's second year at Hogwarts, fresh torments and horrors arise, including an outrageously stuck-up new professor, Gilderoy Lockheart, a spirit named Moaning Myrtle who haunts the girls' bathroom, and the unwanted attentions of Ron Weasley's younger sister, Ginny.But each of these seem minor annoyances when the real trouble begins, and someone--or something--starts turning Hogwarts students to stone. Could it be Draco Malfoy, a more poisonous rival than ever? Could it possibly be Hagrid, whose mysterious past is finally told? Or could it be the one everyone at Hogwarts most suspects... Harry Potter himself. ...more",
    price: 14.74,
    image:
      "http://books.toscrape.com/media/cache/9e/3c/9e3c81f9694c5832a24bf590c2a0b610.jpg",
  },
  {
    id: "b54d7416bb445989",
    title: "Booked",
    description:
      "Like lightning/you strike/fast and free/legs zoom/down field/eyes fixed/on the checkered ball/on the goal/ten yards to go/can’t nobody stop you/can’t nobody cop you… In this follow-up to the Newbery-winning novel THE CROSSOVER, soccer, family, love, and friendship, take center stage as twelve-year-old Nick learns the power of words as he wrestles with problems at home, sta Like lightning/you strike/fast and free/legs zoom/down field/eyes fixed/on the checkered ball/on the goal/ten yards to go/can’t nobody stop you/can’t nobody cop you… In this follow-up to the Newbery-winning novel THE CROSSOVER,  soccer, family, love, and friendship, take center stage as twelve-year-old Nick learns the power of words as he wrestles with problems at home, stands up to a bully, and tries to impress the girl of his dreams. Helping him along are his best friend and sometimes teammate Coby, and The Mac, a rapping librarian who gives Nick inspiring books to read.   This electric and heartfelt novel-in-verse by poet Kwame Alexander bends and breaks as it captures all the thrills and setbacks, action and emotion of a World Cup match! ...more",
    price: 17.49,
    image:
      "http://books.toscrape.com/media/cache/cf/3b/cf3b0341f5f4f4ad2c1439c11d32a9b1.jpg",
  },
  {
    id: "230ac636ea0ea415",
    title: "Bright Lines",
    description:
      "A vibrant debut novel, set in Brooklyn and Bangladesh, Bright Lines follows three young women and one family struggling to make peace with secrets and their past. For as long as she can remember, Ella has longed to feel at home. Orphaned as a child after her parents’ murder, and afflicted with hallucinations at dusk, she’s always felt more at ease in nature than with peopl A vibrant debut novel, set in Brooklyn and Bangladesh, Bright Lines follows three young women and one family struggling to make peace with secrets and their past. For as long as she can remember, Ella has longed to feel at home. Orphaned as a child after her parents’ murder, and afflicted with hallucinations at dusk, she’s always felt more at ease in nature than with people. She traveled from Bangladesh to Brooklyn to live with the Saleems: her uncle Anwar, aunt Hashi, and their beautiful daughter, Charu, her complete opposite. One summer, when Ella returns home from college, she discovers Charu’s friend Maya—an Islamic cleric’s runaway daughter—asleep in her bedroom.  As the girls have a summer of clandestine adventure and sexual awakenings, Anwar—owner of a popular botanical apothecary—has his own secrets, threatening his thirty-year marriage. But when tragedy strikes, the Saleems find themselves blamed. To keep his family from unraveling, Anwar takes them on a fated trip to Bangladesh, to reckon with the past, their extended family, and each other. ...more",
    price: 39.07,
    image:
      "http://books.toscrape.com/media/cache/26/4f/264f79395041ac4b88038030da0433cd.jpg",
  },
];

const BestSellerBooks = () => {
  const navigate = useNavigate();

  const handleViewDetail = (book) => {
    navigate(`/book-${book.id}`, { state: { props: book } });
  };

  return (
    <div className="mt-8  bg-white shadow-md rounded-lg">
      <div className="border-b p-4">
        <h3 className="text-[16px] font-bold text-[#0073e6]">
          Sách Mới Bán Chạy
        </h3>
      </div>
      {/* <h3 className="text-lg font-semibold text-[#0073e6] border-b pb-2">
        Sách Mới Bán Chạy
      </h3> */}
      <div className="mt-3 space-y-4 p-4">
        {bestSellerBooks.map((book) => (
          <div
            onClick={() => handleViewDetail(book)}
            className="h-[150px] cursor-pointer p-2 flex gap-3 rounded-lg bg-white  lg:hover:scale-105 transition-transform duration-200 border border-transparent hover:border-gray-200"
          >
            <div className="relative w-full mb-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-md"
              />
              {/* Sale Tag */}
              {book.discount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                  -{book.discount}%
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {/* Title */}
              <p className="text-gray-800 text-sm font-medium line-clamp-2">
                {book.title}
              </p>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-red-500 text-lg font-bold">
                  {(book.price * 1000).toLocaleString()}₫
                </span>
                {book.price && (
                  <span className="text-gray-400 text-sm line-through">
                    {((book.price + book.price * 0.5) * 1000).toLocaleString()}₫
                  </span>
                )}
              </div>

              {/* Rating and Sold */}
              <div className="flex gap-[10px] flex-col justify-start text-gray-500 text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < book.rating ? "currentColor" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 text-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3l3.09 6.26L22 9.27l-4.91 4.78L18.18 21 12 17.27 5.82 21l1.09-6.95L2 9.27l6.91-1.01L12 3z"
                      />
                    </svg>
                  ))}
                </div>
                {/* <span>Đã bán {props.available}</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellerBooks;
