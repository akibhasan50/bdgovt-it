export function shortDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
    month: "short",
    day: "numeric",
  });
}

export function longDate(date: Date, locale: string): string {
  return date.toLocaleDateString(locale === "bn" ? "bn-BD" : "en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function accuracyTone(accuracy: number): string {
  if (accuracy >= 70) return "border-success/35 bg-success/10 text-success";
  if (accuracy >= 40) return "border-warning/35 bg-warning/10 text-warning";
  return "border-danger/35 bg-danger/10 text-danger";
}
