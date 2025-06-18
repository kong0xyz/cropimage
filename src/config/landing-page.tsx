import { Gemini, GooglePaLM, MagicUI, MediaWiki, Replit, VSCodium } from '@/components/logos';
import { subtitle } from "@/components/primitives";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Icon } from "@iconify/react";
import {
  IconArrowRight,
  IconBowlChopsticks,
  IconBuildingPavilion,
} from "@tabler/icons-react";


const iconSize = 36;

// ANNOUCEMENT
export const announcement = {
  title: "kong0.xyz is Launched!",
};

// HERO (need a h1)
export const hero = {
  title: "Easy to build, powerful to scale",
  subtitle: "",
  description: "Next Maker is a powerful framework for building online tools",
  snippet: null,
  // snippet: (
  //   <Snippet hideCopyButton hideSymbol color="primary" variant="bordered">
  //     <span>{`Hosts, Servers, Clients, Local Data Sources Remote Services etc. 🚀`}</span>
  //   </Snippet>
  // ),
  actions: [
    <Button asChild key="action-search-all" size="lg">
      <Link href="/">
        Get Started <IconArrowRight />
      </Link>
    </Button>,
  ],
};
// categories section
export const categoryTitle = "Categories";
export const categoryDescription = "Browse by category";
export const categories = [{
  title: "Google Gemini",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <Gemini className="w-10 h-10" />,
  link: "https://gemini.google.com/",
},
{
  title: "Replit",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <Replit className="w-10 h-10" />,
  link: "https://replit.com/",
},
{
  title: "Magic UI",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <MagicUI className="w-10 h-10" />,
  link: "https://magicui.design/",
},
{
  title: "VSCodium",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <VSCodium className="w-10 h-10" />,
  link: "https://vscodium.com/",
},
{
  title: "MediaWiki",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <MediaWiki className="w-10 h-10" />,
  link: "https://www.mediawiki.org/",
},
{
  title: "Google PaLM",
  description: "Amet praesentium deserunt ex commodi tempore fuga voluptatem. Sit, sapiente.",
  icon: <GooglePaLM className="w-10 h-10" />,
  link: "https://www.google.com/palm/",
}];

// feature section
export const featureTitle = "Features";
export const featureDescription = "For any hackers";
export const features = [
  {
    title: "Food",
    description:
      "A harmonious blend of flavors, textures, and traditions, offering a culinary journey through thousands of years of culture and innovation.",
    icon: <IconBowlChopsticks size={iconSize} />,
  },
  {
    title: "Architecture",
    description:
      "A timeless fusion of elegance and symbolism, reflecting harmony with nature and profound cultural heritage.",
    icon: <IconBuildingPavilion size={iconSize} />,
  },
  {
    title: "Kung Fu",
    description:
      "Esoteric martial arts that combine physical strength, mental discipline and centuries of cultural wisdom.",
    icon: (
      <Icon
        icon="icon-park-outline:gongfu"
        width={iconSize}
        height={iconSize}
      />
    ),
  },
  {
    title: "Calligraphy",
    description:
      "The art of writing as a dance of the brush, where every stroke embodies grace, rhythm, and the soul of the artist.",
    icon: <Icon icon="icons8:brush" width={iconSize} height={iconSize} />,
  },
  {
    title: "Scenery",
    description: "Mountain, LakesMountains, rivers, lakes and seas...",
    icon: (
      <Icon
        icon="icon-park-outline:mountain"
        width={iconSize}
        height={iconSize}
      />
    ),
  },
  {
    title: "City & Country",
    description: "Peking, Shanghai, Shenzhen, Guangzhou, ChongQing, Xi'an...",
    icon: (
      <Icon
        icon="icon-park-outline:city-one"
        width={iconSize}
        height={iconSize}
      />
    ),
  },
  {
    title: "Music & Opera",
    description:
      "A captivating art form that blends music, movement and storytelling, intricate costumes and expressive gestures convey timeless stories.",
    icon: <Icon icon="mingcute:drum-line" width={iconSize} height={iconSize} />,
  },
  {
    title: "Literature",
    description: "Poetry, Masterpiece",
    icon: (
      <Icon
        icon="hugeicons:graduation-scroll"
        width={iconSize}
        height={iconSize}
      />
    ),
  },
];

// testimonial section
export const testimonialTitle = "User Reviews";
export const testimonialDescription = "Trusted by people worldwide";

export const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Amazun",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1734613876170-079f67aa0d15?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial:
      "This library has completely transformed how we build our UI components. The attention to detail and smooth animations make our application stand out. Highly recommended!",
  },
  {
    name: "John Doe",
    role: "Software Engineer",
    company: "Goggle",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1734613876170-079f67aa0d15?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial:
      "The components are well documented and easy to customize. The code quality is top-notch and the support is excellent. I'm very happy with my purchase.",
  },
  {
    name: "Emily Chen",
    role: "UX Designer",
    company: "Microsift",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1734613876170-079f67aa0d15?q=80&w=640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    testimonial:
      "The accessibility features and design system consistency are impressive. It's saved us countless hours in development time.",
  },
];

// faq section
export const faqTitle = "Frequently Asked Questions";
export const faqDescription = "Everything you need to know about our platform";
export const faqs = [
  {
    question: "What makes your platform unique?",
    answer:
      "Our platform stands out through its intuitive design, powerful automation capabilities, and seamless integration options. We've focused on creating a user experience that combines simplicity with advanced features.",
  },
  {
    question: "How does the pricing structure work?",
    answer:
      "We offer flexible, transparent pricing tiers designed to scale with your needs. Each tier includes a core set of features, with additional capabilities as you move up. All plans start with a 14-day free trial.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We provide comprehensive support through multiple channels. This includes 24/7 live chat, detailed documentation, video tutorials, and dedicated account managers for enterprise clients.",
  },
];
