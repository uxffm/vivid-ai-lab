import React from "react";

/**
 * Reusable text module: a title on the left, short sentences or short
 * paragraphs on the right. Typography is fixed here so every instance looks
 * the same: title in the display font, all copy in the body font.
 *
 * Usage:
 *   <TextBlock title="Kennen Sie diese Probleme?">
 *     <TextBlock.P><b>Fett.</b> Normaler Text.</TextBlock.P>
 *     <TextBlock.P>Zweiter Satz im gleichen Stil.</TextBlock.P>
 *   </TextBlock>
 *
 * or with plain text: <TextBlock title="..." text="..." />
 */

type TextBlockProps = {
  title: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
  id?: string;
};

type PProps = {
  children: React.ReactNode;
};

const P = ({ children }: PProps) => (
  <p className="font-sans text-lg font-normal leading-relaxed text-foreground [&_b]:font-bold [&_strong]:font-bold">
    {children}
  </p>
);

const TextBlock = ({ title, text, children, className = "", id }: TextBlockProps) => (
  <div
    id={id}
    className={`grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-6 ${className}`}
  >
    <h2 className="lg:col-span-5 font-display text-3xl md:text-4xl leading-tight">{title}</h2>
    <div className="lg:col-span-7 space-y-5">
      {text && <P>{text}</P>}
      {children}
    </div>
  </div>
);

TextBlock.P = P;

export default TextBlock;
