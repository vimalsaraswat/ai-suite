export default function Footer() {
  return (
    <footer className="container flex items-center justify-center gap-4 border-t md:h-20 md:flex-row">
      <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
        Built by{" "}
        <a
          href="https://twitter.com/vimalsaraswat00"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Vimal Saraswat
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/vimalsaraswat/ai-suite"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
