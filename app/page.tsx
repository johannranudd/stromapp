import DonutRechartsClient from "./components/charts/recharts/DonutRechartsClient";
import XYChart from "./components/charts/recharts/XYChart";
import { getElectricityPrice } from "@/app/utils/gets";
import { use } from "react";
import BtnCta from "./components/ui/BtnCta";
import HeroVector from "../assets/images/verctor-hero.svg";
import Image from "next/image";

export default function Home() {
  const currentDate: Date = new Date();
  const todayStringDate: string = currentDate.toISOString().slice(0, 10);
  const dataFromAPI = use(
    getElectricityPrice(todayStringDate, todayStringDate, 1)
  );
  return (
    <>
      <Image
        src={HeroVector}
        alt="logo"
        className="absolute top-[calc(40%-4rem)] md:top-[calc(30%-4rem)] "
      />
      <main className="relative w-[95%] max-w-screen-xl mx-auto overflow-x-hidden">
        <div className="md:flex md:justify-between md:items-center">
          <div className="text-center  space-y-3 max-w-[400px] mx-auto md:text-left md:m-0 md:max-w-[600px]">
            <h1 className="text-2xl md:text-4xl mlg:text-5xl">
              Sjekk strømprisene
            </h1>
            <p className="md:text-lg mlg:text-xl">
              Lorem ipsum habackllkcnalxc SSDA sssdf some randome words her and
              then jist write more in done vare if i write wrong more in done
              vare if i write wrong
            </p>
            <BtnCta props={"hidden md:block"} />
          </div>
          <div className="mt-3">
            <DonutRechartsClient {...dataFromAPI} />
          </div>
        </div>
        <BtnCta props={"flex justify-center mt-2 md:hidden"} />
        <div className="mt-3">
          <XYChart {...dataFromAPI} />
        </div>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto
          mollitia ratione odio, error consectetur eveniet nesciunt adipisci.
          Dolorum iure placeat dignissimos eum consectetur earum sapiente eius
          quasi, repellat numquam. Dolores rem asperiores tempore iusto fugiat
          esse, eaque eum nobis doloribus, provident corrupti quo natus magni
          nesciunt accusantium, alias neque odio! Facere voluptas sint
          exercitationem ipsum maxime iure beatae, eligendi alias omnis, quam
          numquam consectetur placeat delectus, odit dolores quod asperiores
          quibusdam sapiente amet veritatis ad? Nihil, laboriosam repellat
          tempore debitis accusantium quis provident cumque perspiciatis
          repudiandae, inventore fuga ullam mollitia numquam optio praesentium
          ex expedita minima quidem, totam doloribus veniam itaque rem impedit
          adipisci? Non, veritatis voluptatibus! Sed reprehenderit eveniet
          nostrum facilis, soluta, odio perspiciatis magnam enim necessitatibus
          eligendi cumque deleniti. Veniam sapiente eius quos id labore. Placeat
          cum dicta ut fugiat quidem, qui sed laborum beatae eius vero quae,
          fuga dignissimos dolores illo? Cum nulla amet vero laboriosam ipsa
          nemo iste modi ad ipsum adipisci, dolorum, repellendus qui quae saepe
          fugit soluta fuga consequatur beatae? Error, odio mollitia iste
          repellat aliquam beatae recusandae vitae earum neque omnis, deleniti
          temporibus numquam, aspernatur impedit nulla iusto sequi atque culpa!
          Debitis, error fuga eligendi corporis laboriosam nulla tempora a, quod
          perferendis cupiditate, quo voluptatum cumque veritatis iste? Ratione
          quisquam, porro expedita qui quae animi voluptate? Cupiditate enim ex
          labore nostrum ea eaque nihil odit neque accusantium earum eveniet
          dicta, quo nulla adipisci ducimus quibusdam ratione dolor molestiae
          quae non minima expedita? Officiis quisquam mollitia, necessitatibus,
          dicta, laborum magnam accusantium veniam voluptates consectetur
          repellat labore? Molestias impedit, mollitia autem numquam cum
          repudiandae corrupti! Odit hic voluptatibus voluptas illo minus
          provident doloribus voluptate omnis architecto harum corporis, facilis
          dolores nemo porro excepturi. Praesentium inventore nulla culpa et
          nostrum! In ducimus ratione hic laudantium delectus, eos debitis
          veniam natus quibusdam! Ad debitis suscipit molestiae, unde velit
          officiis aspernatur ut dolor, alias vel tempora ea veniam rem quo
          facilis. Minima architecto eaque, illo ipsa tenetur ex quis. Amet
          commodi adipisci voluptates aliquid doloribus nam, deserunt minima
          voluptas quod quae repudiandae, numquam maxime modi, molestias a? Quas
          ducimus quaerat eius provident velit nesciunt distinctio, ex maxime
          laborum, modi odit. Facilis ullam eius sed. Nemo laudantium voluptates
          amet, enim maxime optio sequi incidunt eius nesciunt accusamus facilis
          temporibus perferendis? Eos vitae, temporibus molestias hic neque a
          numquam, voluptate delectus nihil odit mollitia quidem porro.
          Molestiae aliquid accusamus assumenda esse ipsa temporibus odio
          dolores nesciunt aspernatur aut iste saepe impedit molestias
          repellendus suscipit, non exercitationem soluta? Nam autem soluta
          consequuntur adipisci repudiandae repellendus ratione dolorem
          aspernatur sint! Adipisci, repudiandae numquam praesentium nobis a
          nulla. Totam laborum fuga in deserunt nobis fugit tempore minus
          pariatur doloribus a velit, amet obcaecati dolor eius cum tenetur quam
          quos voluptatem, culpa sapiente quas! Quasi, dolor molestiae at
          dignissimos eius mollitia laudantium, voluptates ea veritatis esse
          delectus enim modi ipsa! Quo iste eos quod. Facere voluptate nihil
          libero temporibus distinctio harum tempora voluptatum nulla quas
          eveniet eaque esse eos neque, explicabo eligendi autem impedit
          officiis ducimus accusamus doloremque quod pariatur aspernatur enim
          quidem. Alias.
        </p>
      </main>
    </>
  );
}
