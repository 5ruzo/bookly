export type LinkItem = {
  text: string;
  href?: string;
  onClick?: () => void;
};

export type HeaderLinksProps = {
  links: LinkItem[];
};
