import { map } from "../../data/contact";

/**
 * contact.html's `google-map` panel, sitting beside the form. The template's
 * own CSS gives it `min-height: 585px`, `height: 100%` and a grayscale
 * filter, so it matches the form column without any new styling.
 *
 * `title` is required for the iframe: without it a screen reader announces
 * only "iframe", and the embed is otherwise unlabelled.
 */
export default function ContactMap() {
  return (
    <div className="google-map wow fadeInUp" data-wow-delay="0.3s">
      <iframe src={map.embedUrl} title={map.title} style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
    </div>
  );
}
