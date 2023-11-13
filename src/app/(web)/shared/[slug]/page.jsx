import SharedComponent from "@/components/Universal/SharedComponent/page";
import axios from "axios";

export async function generateMetadata({ params }) {
  const slug = params.slug;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}shared.php?slug=${slug}`
  );

  const shared = res.data.results;

  return {
    title: "Passei no exame de condução",
    openGraph: {
      title: shared.user + "Passou no exame de Condução",
      description: "Venha ver meu resultado |" + shared.user,
      images: [
        {
          url:
            `${process.env.NEXT_PUBLIC_ENDPOINT_URL}images/share/` +
            shared.image,
          width: 800,
          height: 600,
          alt: shared.user,
        },
      ],
    },
  };
}

export default async function Shared({ params }) {
  const slug = params.slug;

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_ENDPOINT_URL}shared.php?slug=${slug}`
  );
  console.log(res);
  const shared = res.data.results;

  return <SharedComponent info={shared} />;
}
