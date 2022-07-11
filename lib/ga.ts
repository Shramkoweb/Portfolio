interface Event {
  action: string;
  category: string;
  label: string;
  value?: string;
}

export const event = ({
  action, category, label, value,
}: Event) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
