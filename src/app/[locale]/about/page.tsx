import { PageHeader } from "@/components/page-header";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `About Us - ${siteConfig.title}`,
  });
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader header={""} title="About" />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-[60rem] prose dark:prose-invert">
          <p>
            Welcome to our Chinese culture website:{" "}
            <span className="font-bold">{siteConfig.name}</span>, a gateway to
            exploring the profound and extensive heritage of Chinese
            civilization. Chinese culture, with its origins stretching back over
            five millennia, has evolved into a uniquely rich and diverse
            cultural system. From ancient oracle bone scripts to exquisite
            porcelain, from profound philosophical thought to splendid literary
            and artistic achievements, every aspect reflects the wisdom and
            creativity of the Chinese nation.
          </p>
          <p>
            Here, you can delve into traditional Chinese festivals, folk arts,
            classical literature, calligraphy, painting, opera, music, and a
            myriad of folk customs. Whether it is the benevolent teachings of
            Confucianism, the natural philosophy of Taoism, or the compassionate
            spirit of Buddhism, all have taken root and flourished on this land,
            influencing the lifestyles and values of generations of Chinese
            people.
          </p>

          <p>
            We are committed to providing you with detailed information, vivid
            stories, and interactive experiences that will transport you across
            time and space, allowing you to feel the unique charm of Chinese
            culture. Whether you are a culture enthusiast, a scholar, or someone
            new to Chinese culture, this site offers a comprehensive and
            in-depth cultural journey. Let us step into the magnificent world of
            Chinese culture together, appreciate its depth and breadth, and
            experience its long and enduring historical legacy.
          </p>

          <p>
            In conclusion, our website is more than just a resource; it is a
            bridge connecting you to the heart of Chinese culture. As you
            navigate through the various sections, we hope you gain not only
            knowledge but also a deeper appreciation for the values, traditions,
            and artistic expressions that have shaped Chinese society. Join us
            in celebrating the timeless beauty and enduring spirit of Chinese
            culture, and let this journey inspire a greater understanding and
            connection with one of the {"world's"} oldest and most influential
            civilizations. Thank you for visiting, and we look forward to being
            your guide on this enriching cultural adventure.
          </p>

          <p>
            If you have any questions or requests, please send an email to{" "}
            <Link
              title={siteConfig?.legal?.email}
              href={"mailto:" + siteConfig?.legal?.email}
            >
              {siteConfig?.legal?.email}
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
}
