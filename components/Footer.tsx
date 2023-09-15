import { SiGithub, SiTwitter } from "react-icons/si";
import Logo from "./Logo";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: <SiTwitter />, url: "https://twitter.com/logdropapi" },
    { icon: <SiGithub />, url: "https://github.com/akinloluwami/logdropapi" },
  ];
  const footerLinks = [
    {
      title: "Product",
      links: [
        { title: "Pricing", url: "/pricing" },
        { title: "Changelog", url: "/changelog" },
      ],
    },
    {
      title: "Developers",
      links: [
        { title: "Docs", url: "/docs" },
        {
          title: "Feedback and Requests",
          url: "https://github.com/akinloluwami/logdropapi/issues",
        },
      ],
    },
    {
      title: "Company",
      links: [
        {
          title: "Blog",
          url: "/blog",
        },
        { title: "Contact", url: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { title: "Privacy", url: "/privacy" },
        { title: "Terms", url: "/terms" },
      ],
    },
  ];
  return (
    <div className="px-20 py-20 flex justify-between mt-10">
      <div className="flex flex-col items-start gap-5">
        <Logo />
        <small className="">Powerful analytics for NodeJS APIs</small>
        <div className="flex items-center gap-5">
          {socialLinks.map((link, i) => (
            <Link
              href={link.url}
              key={i}
              className="text-xl hover:text-purple-400 transition-colors"
            >
              {link.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex gap-24">
        {footerLinks.map((link, i) => (
          <div key={i} className="flex flex-col gap-2">
            <h4 className="font-semibold">{link.title}</h4>
            {link.links.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className="hover:text-purple-400 transition-colors text-sm"
              >
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
